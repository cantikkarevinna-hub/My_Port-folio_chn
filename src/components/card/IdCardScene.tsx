"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  Text,
  useTexture,
} from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import { easing } from "maath";
import { heroPortrait } from "@/data/content";
import CardFallback from "@/components/CardFallback";
import {
  CHIP_POS,
  FRAME_POINTS,
  PANEL_POINTS,
  X,
  Y,
  bottomWithHoles,
  frameWithWindow,
  polyShape,
} from "./shapes";

const bevel = { bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 3, curveSegments: 24 };
const photoWidth = 2.54;
const photoHeight = 4.06;
const FontAssets = createContext<{ mono?: string; display?: string }>({});
type TroikaTextMetrics = {
  textRenderInfo?: { blockBounds?: ArrayLike<number> };
};

export type CardInteraction = {
  active: boolean;
  dragging: boolean;
  pointerX: number;
  pointerY: number;
  deltaX: number;
  deltaY: number;
  startX: number;
  startY: number;
};

function useBrushedRoughness() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to create the card material texture.");

    const image = context.createImageData(canvas.width, canvas.height);
    for (let index = 0; index < image.data.length; index += 4) {
      const noise = (Math.imul(index + 1, 1664525) + 1013904223) >>> 0;
      const shade = 232 + (noise % 24);
      image.data[index] = shade;
      image.data[index + 1] = shade;
      image.data[index + 2] = shade;
      image.data[index + 3] = 255;
    }
    context.putImageData(image, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 10);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function createPlaceholderTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1600;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create the portrait placeholder.");

  context.fillStyle = "#141414";
  context.fillRect(0, 0, 1000, 1600);
  context.strokeStyle = "rgba(255,255,255,.25)";
  context.lineWidth = 3;
  context.setLineDash([14, 14]);
  context.strokeRect(26, 26, 948, 1548);
  context.setLineDash([]);

  context.strokeStyle = "rgba(255,255,255,.35)";
  context.lineWidth = 8;
  context.beginPath();
  context.roundRect(360, 650, 280, 220, 28);
  context.stroke();
  context.beginPath();
  context.arc(445, 720, 25, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.moveTo(380, 835);
  context.lineTo(510, 750);
  context.lineTo(620, 825);
  context.stroke();
  context.fillStyle = "#aeb3b9";
  context.font = "bold 30px monospace";
  context.textAlign = "center";
  context.fillText("Hero Portrait · 5:8", 500, 1480);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function PhotoPlaceholder() {
  const texture = useMemo(() => createPlaceholderTexture(), []);
  return (
    <mesh position={[X(173), Y(249), -0.025]}>
      <planeGeometry args={[photoWidth, photoHeight]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function PhotoImage({ src }: { src: string }) {
  const loadedTexture = useTexture(src);
  const texture = useMemo(() => {
    const cover = loadedTexture.clone();
    const image = cover.image as { width: number; height: number };
    const imageAspect = image.width / image.height;
    const targetAspect = photoWidth / photoHeight;
    if (imageAspect > targetAspect) {
      cover.repeat.set(targetAspect / imageAspect, 1);
      cover.offset.x = (1 - cover.repeat.x) / 2;
    } else {
      cover.repeat.set(1, imageAspect / targetAspect);
      cover.offset.y = (1 - cover.repeat.y) / 2;
    }
    cover.colorSpace = THREE.SRGBColorSpace;
    cover.needsUpdate = true;
    return cover;
  }, [loadedTexture]);

  return (
    <mesh position={[X(173), Y(249), -0.025]}>
      <planeGeometry args={[photoWidth, photoHeight]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function Plate({
  shape,
  depth,
  z,
  brushed,
}: {
  shape: THREE.Shape;
  depth: number;
  z: number;
  brushed: THREE.Texture;
}) {
  const geometry = useMemo(() => new THREE.ExtrudeGeometry(shape, { ...bevel, depth }), [depth, shape]);
  const face = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: "#eceff2",
      metalness: 0.9,
      roughness: 0.32,
      roughnessMap: brushed,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      envMapIntensity: 1.2,
      iridescence: 0.3,
      iridescenceIOR: 1.4,
      iridescenceThicknessRange: [120, 420],
    }),
    [brushed],
  );
  const edge = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: "#454a50",
      metalness: 1,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.4,
    }),
    [],
  );

  return <mesh geometry={geometry} material={[face, edge]} position={[0, 0, z]} castShadow receiveShadow />;
}

function EmbossedText({
  children,
  position,
  fontSize,
  maxWidth,
  letterSpacing = 0.012,
  display = false,
  rotation,
  onSync,
  scale,
}: {
  children: string;
  position: [number, number, number];
  fontSize: number;
  maxWidth?: number;
  letterSpacing?: number;
  display?: boolean;
  rotation?: [number, number, number];
  onSync?: (textMesh: TroikaTextMetrics) => void;
  scale?: [number, number, number];
}) {
  const fonts = useContext(FontAssets);
  const props = { fontSize, maxWidth, textAlign: "left" as const, anchorX: "left" as const, anchorY: "middle" as const, fontWeight: display ? 800 : 700, letterSpacing, rotation, scale };
  return (
    <>
      <Text {...props} font={display ? fonts.display : fonts.mono} position={[position[0] + 0.002, position[1] - 0.002, position[2] + 0.002]} color="#17191c" fillOpacity={0.22}>{children}</Text>
      <Text {...props} font={display ? fonts.display : fonts.mono} position={[position[0] - 0.002, position[1] + 0.002, position[2] + 0.004]} color="#ffffff" fillOpacity={0.32}>{children}</Text>
      <Text {...props} font={display ? fonts.display : fonts.mono} position={[...position]} color={display ? "#555b62" : "#5d636a"} onSync={onSync}>{children}</Text>
    </>
  );
}

const panelDetails = [
  { label: "ID NUMBER", value: "CR-0001" },
  { label: "FIELD", value: "LIFETIME" },
  { label: "ISSUE DATE", value: "8329" },
] as const;

function PanelMetadata() {
  const [lengths, setLengths] = useState(() => Array<number>(panelDetails.length * 2).fill(0));
  const lengthsRef = useRef(lengths);

  const onTextSync = useCallback((index: number, textMesh: TroikaTextMetrics) => {
    const bounds = textMesh.textRenderInfo?.blockBounds;
    if (!bounds || bounds.length < 4) return;
    const length = bounds[2] - bounds[0];
    if (!Number.isFinite(length) || length <= 0 || Math.abs(lengthsRef.current[index] - length) < 0.0001) return;
    const next = [...lengthsRef.current];
    next[index] = length;
    lengthsRef.current = next;
    setLengths(next);
  }, []);

  const spans = panelDetails.map((_, index) => Math.max(lengths[index * 2], lengths[index * 2 + 1]));
  const zoneStart = 66;
  const zoneLength = 294;
  const gap = (zoneLength - spans.reduce((sum, span) => sum + span, 0)) / (panelDetails.length - 1);
  const starts = spans.map((_, index) => (
    zoneStart + spans.slice(0, index).reduce((sum, span) => sum + span, 0) + gap * index
  ));

  return (
    <>
      {panelDetails.map(({ label, value }, index) => {
        const y = starts[index];
        const rotation: [number, number, number] = [0, 0, -Math.PI / 2];
        return (
          <group key={label}>
            <EmbossedText
              position={[X(337), Y(y), 0.278]}
              fontSize={0.085}
              rotation={rotation}
              onSync={(textMesh) => onTextSync(index * 2, textMesh)}
            >
              {label}
            </EmbossedText>
            <EmbossedText
              position={[X(351), Y(y), 0.278]}
              fontSize={0.1}
              rotation={rotation}
              onSync={(textMesh) => onTextSync(index * 2 + 1, textMesh)}
            >
              {value}
            </EmbossedText>
          </group>
        );
      })}
    </>
  );
}

function createNeonHaloTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create the neon halo texture.");

  const gradient = context.createRadialGradient(64, 256, 2, 64, 256, 64);
  gradient.addColorStop(0, "rgba(255,45,61,0.35)");
  gradient.addColorStop(0.35, "rgba(255,45,61,0.16)");
  gradient.addColorStop(1, "rgba(255,45,61,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function NeonHalo() {
  const texture = useMemo(() => createNeonHaloTexture(), []);
  return (
    <mesh position={[X(49), Y(249), 0.113]}>
      <planeGeometry args={[0.32, 4.06]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

function WindowNeon() {
  const geometry = useMemo(() => {
    const start = new THREE.Vector3(X(46), Y(452), 0.132);
    const cornerStart = new THREE.Vector3(X(46), Y(90), 0.132);
    const cornerEnd = new THREE.Vector3(X(90), Y(46), 0.132);
    const straight = new THREE.LineCurve3(start, cornerStart);
    const corner = new THREE.QuadraticBezierCurve3(
      cornerStart,
      new THREE.Vector3(X(46), Y(46), 0.132),
      cornerEnd,
    );
    const path = new THREE.CurvePath<THREE.Vector3>();
    path.add(straight);
    path.add(corner);
    return new THREE.TubeGeometry(path, 96, 0.008, 8, false);
  }, []);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#ff2d3d" emissive="#ff2d3d" emissiveIntensity={3} toneMapped={false} />
    </mesh>
  );
}

function Star({ brushed }: { brushed: THREE.Texture }) {
  const shape = useMemo(() => {
    const points: THREE.Vector2[] = [];
    for (let index = 0; index < 8; index += 1) {
      const angle = (index * Math.PI) / 4 - Math.PI / 2;
      const radius = index % 2 === 0 ? 0.095 : 0.026;
      points.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius));
    }
    const star = new THREE.Shape();
    points.forEach((point, index) => {
      const x = X(370) + point.x;
      const y = Y(52) + point.y;
      if (index === 0) star.moveTo(x, y);
      else star.lineTo(x, y);
    });
    star.closePath();
    return star;
  }, []);
  return <Plate shape={shape} depth={0.025} z={0.265} brushed={brushed} />;
}

function roundedRectPath(x: number, y: number, width: number, height: number, radius: number) {
  const path = new THREE.Path();
  path.moveTo(X(x + radius), Y(y));
  path.lineTo(X(x + width - radius), Y(y));
  path.quadraticCurveTo(X(x + width), Y(y), X(x + width), Y(y + radius));
  path.lineTo(X(x + width), Y(y + height - radius));
  path.quadraticCurveTo(X(x + width), Y(y + height), X(x + width - radius), Y(y + height));
  path.lineTo(X(x + radius), Y(y + height));
  path.quadraticCurveTo(X(x), Y(y + height), X(x), Y(y + height - radius));
  path.lineTo(X(x), Y(y + radius));
  path.quadraticCurveTo(X(x), Y(y), X(x + radius), Y(y));
  path.closePath();
  return path;
}

function ChipSocket() {
  const { bezel, inner } = useMemo(() => {
    const innerPath = roundedRectPath(309, 500, 70, 52, 3);
    const outer = new THREE.Shape(roundedRectPath(305, 496, 78, 60, 4).getPoints(8));
    outer.holes.push(innerPath);
    return { bezel: outer, inner: new THREE.Shape(innerPath.getPoints(8)) };
  }, []);
  const bezelGeometry = useMemo(
    () => new THREE.ExtrudeGeometry(bezel, { ...bevel, depth: 0.016, bevelThickness: 0.004, bevelSize: 0.004 }),
    [bezel],
  );
  const innerGeometry = useMemo(() => new THREE.ShapeGeometry(inner), [inner]);
  return (
    <group>
      <mesh geometry={bezelGeometry} position={[0, 0, 0.26]}>
        <meshPhysicalMaterial color="#d9dde2" metalness={0.95} roughness={0.25} clearcoat={0.65} envMapIntensity={1.4} />
      </mesh>
      <mesh geometry={innerGeometry} position={[0, 0, 0.277]}>
        <meshBasicMaterial color="#0b0b0c" />
      </mesh>
    </group>
  );
}

function createChipGlintTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 192;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create the chip highlight texture.");

  const gradient = context.createLinearGradient(0, 192, 256, 0);
  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.38, "rgba(255,224,160,0.06)");
  gradient.addColorStop(0.48, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.54, "rgba(255,242,205,0.55)");
  gradient.addColorStop(0.68, "rgba(255,210,120,0.04)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

function createChipAlphaMask(image: CanvasImageSource) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 192;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Unable to create the chip alpha mask.");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  for (let index = 0; index < imageData.data.length; index += 4) {
    const alpha = imageData.data[index + 3];
    imageData.data[index] = alpha;
    imageData.data[index + 1] = alpha;
    imageData.data[index + 2] = alpha;
    imageData.data[index + 3] = 255;
  }
  context.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function CardChip({ cardRotation }: { cardRotation: MutableRefObject<THREE.Group | null> }) {
  const loadedTexture = useTexture("/images/chip-card.png");
  const glint = useMemo(() => createChipGlintTexture(), []);
  const glintMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const { texture, alphaMask } = useMemo(() => {
    const colorTexture = loadedTexture.clone();
    colorTexture.colorSpace = THREE.SRGBColorSpace;
    const image = colorTexture.image as CanvasImageSource;
    return { texture: colorTexture, alphaMask: createChipAlphaMask(image) };
  }, [loadedTexture]);
  useFrame(({ clock }) => {
    const yaw = cardRotation.current?.rotation.y ?? 0;
    const map = glintMaterial.current?.map;
    if (map) map.offset.x = -yaw * 1.2 + Math.sin(clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <>
      <mesh position={[X(CHIP_POS.x + CHIP_POS.width / 2), Y(CHIP_POS.y + CHIP_POS.height / 2), 0.282]}>
        <planeGeometry args={[CHIP_POS.width * 0.01, CHIP_POS.height * 0.01]} />
        <meshPhysicalMaterial
          color="#ffe2a0"
          map={texture}
          bumpMap={texture}
          bumpScale={0.6}
          metalness={0.85}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={2.2}
          transparent
          alphaTest={0.5}
        />
      </mesh>
      <mesh position={[X(CHIP_POS.x + CHIP_POS.width / 2), Y(CHIP_POS.y + CHIP_POS.height / 2), 0.284]}>
        <planeGeometry args={[CHIP_POS.width * 0.01, CHIP_POS.height * 0.01]} />
        <meshBasicMaterial
          ref={glintMaterial}
          map={glint}
          alphaMap={alphaMask}
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#ffcf70" intensity={0.8} distance={3} position={[X(CHIP_POS.x + CHIP_POS.width / 2), Y(CHIP_POS.y + CHIP_POS.height / 2), 0.5]} />
    </>
  );
}

function NameplateDivider() {
  const geometry = useMemo(() => new THREE.PlaneGeometry((170 - 28) * 0.01, 0.008), []);
  return (
    <mesh geometry={geometry} position={[X(99), Y(526), 0.198]}>
      <meshBasicMaterial color="#8d939a" />
    </mesh>
  );
}

function IdCardModel({
  interaction,
  fonts,
  reducedMotion,
  photoIsPresent,
  dragging,
}: {
  interaction: MutableRefObject<CardInteraction>;
  fonts: { mono?: string; display?: string };
  reducedMotion: boolean;
  photoIsPresent: boolean;
  dragging: boolean;
}) {
  const brushed = useBrushedRoughness();
  const frame = useMemo(() => frameWithWindow(), []);
  const bottom = useMemo(() => bottomWithHoles(), []);
  const panel = useMemo(() => polyShape(PANEL_POINTS), []);
  const frameOutline = useMemo(() => polyShape(FRAME_POINTS), []);
  const root = useRef<THREE.Group>(null);
  const [{ scale }, springApi] = useSpring(() => ({
    scale: 1,
    config: { tension: 120, friction: 14 },
  }));

  useEffect(() => {
    springApi.start({ scale: dragging ? 1.025 : 1 });
  }, [dragging, springApi]);

  useFrame(({ clock }, delta) => {
    const group = root.current;
    if (!group) return;
    const state = interaction.current;
    const time = clock.elapsedTime;
    const idleYaw = reducedMotion || state.active ? -12 : -12 + Math.sin(time * 0.7) * 18;
    const idlePitch = reducedMotion || state.active ? 4 : 4 + Math.sin(time * 0.9) * 6;

    let targetYaw = idleYaw;
    let targetPitch = idlePitch;
    let targetX = 0;
    let targetY = reducedMotion || state.active ? 0 : Math.sin(time * 1.2) * 0.06;

    if (state.dragging) {
      targetYaw = THREE.MathUtils.clamp(-12 + (state.deltaX / 400) * 80, -40, 40);
      targetPitch = THREE.MathUtils.clamp(4 - (state.deltaY / 600) * 40, -20, 20);
      targetX = THREE.MathUtils.clamp((state.deltaX / 400) * 0.5, -0.5, 0.5);
      targetY = THREE.MathUtils.clamp((-state.deltaY / 600) * 0.5, -0.5, 0.5);
    } else if (state.active && !reducedMotion) {
      targetYaw = THREE.MathUtils.clamp(-12 + state.pointerX * 40, -20, 20);
      targetPitch = THREE.MathUtils.clamp(4 - state.pointerY * 24, -12, 12);
    }

    const radians = Math.PI / 180;
    easing.dampE(group.rotation, [targetPitch * radians, targetYaw * radians, 0], state.active ? 0.16 : 0.42, delta);
    easing.damp3(group.position, [targetX, targetY, 0], state.dragging ? 0.13 : 0.32, delta);
  });

  const frameLine = useMemo(() => {
    const points = frameOutline.getPoints(48).map((point) => new THREE.Vector3(point.x, point.y, 0.13));
    points.push(points[0]);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [frameOutline]);

  return (
    <>
      <Environment resolution={512} frames={1} background={false}>
        <Lightformer form="rect" color="#e6e9ee" intensity={1.1} position={[0, 0, 12]} scale={[24, 16, 1]} />
        <Lightformer form="rect" color="#ffffff" intensity={1.6} position={[0, 6, 10]} scale={[16, 3, 1]} />
        <Lightformer form="rect" intensity={2.2} position={[-6, 0, 3]} rotation-y={Math.PI / 2} scale={[10, 1.4, 1]} />
        <Lightformer form="rect" intensity={2.0} position={[6, 2, 2]} rotation-y={-Math.PI / 2} scale={[10, 1.2, 1]} />
        <Lightformer form="rect" color="#ff2d4a" intensity={2.2} position={[6, -1, -3]} rotation-y={-Math.PI / 2} scale={[8, 1.2, 1]} />
      </Environment>
      <ambientLight intensity={0.4} />

      <Float enabled={!reducedMotion} speed={1.2} floatIntensity={0.06} rotationIntensity={0}>
        <FontAssets.Provider value={fonts}>
          <animated.group scale={scale}>
            <group ref={root}>
              <Plate shape={frame} depth={0.1} z={0} brushed={brushed} />
              {photoIsPresent ? (
                <Suspense fallback={<PhotoPlaceholder />}>
                  <PhotoImage src={heroPortrait} />
                </Suspense>
              ) : <PhotoPlaceholder />}
              <Plate shape={bottom} depth={0.1} z={0.08} brushed={brushed} />
              <Plate shape={panel} depth={0.12} z={0.14} brushed={brushed} />
              <Star brushed={brushed} />

              <lineSegments geometry={frameLine}>
                <lineBasicMaterial color="#f2f4f6" transparent opacity={0.48} />
              </lineSegments>
              <NeonHalo />
              <WindowNeon />
              <ChipSocket />
              <Suspense fallback={null}>
                <CardChip cardRotation={root} />
              </Suspense>

              <EmbossedText position={[X(28), Y(474), 0.198]} fontSize={0.085} letterSpacing={0.14}>NAME</EmbossedText>
              <EmbossedText position={[X(28), Y(506), 0.198]} fontSize={0.28} maxWidth={1.5} scale={[0.68, 0.68, 1]} display>CHANTIKKA</EmbossedText>
              <NameplateDivider />
              <EmbossedText position={[X(28), Y(540), 0.198]} fontSize={0.1}>NATURE · ART · DESIGN</EmbossedText>
              <PanelMetadata />
            </group>
          </animated.group>
        </FontAssets.Provider>
      </Float>

    </>
  );
}

export default function IdCardScene({
  interaction,
  fonts,
  reducedMotion,
  active,
  dragging,
  onContextLost,
}: {
  interaction: MutableRefObject<CardInteraction>;
  fonts: { mono?: string; display?: string };
  reducedMotion: boolean;
  active: boolean;
  dragging: boolean;
  onContextLost: () => void;
}) {
  const photoIsPresent = Boolean(heroPortrait && !heroPortrait.endsWith(".svg"));
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, premultipliedAlpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: "transparent", pointerEvents: "auto" }}
      camera={{ fov: 30, position: [0, 0, 13] }}
      frameloop={active ? "always" : "never"}
      shadows
      fallback={<CardFallback />}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(0x000000, 0);
        scene.background = null;
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost();
        });
      }}
    >
      <IdCardModel
        interaction={interaction}
        fonts={fonts}
        reducedMotion={reducedMotion}
        photoIsPresent={photoIsPresent}
        dragging={dragging}
      />
    </Canvas>
  );
}
