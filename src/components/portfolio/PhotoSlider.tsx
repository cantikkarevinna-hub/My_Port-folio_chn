"use client";

// Cara menambah foto: lihat /content/portfolio/photos.ts
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ShowcasePhoto } from "@/lib/portfolio-types";
import PhotoGalleryModal from "./PhotoGalleryModal";
import WorkModal from "./WorkModal";

// UBAH DI SINI
const AUTOPLAY_MS = 8000;
const SHIFT_DIRECTION = "right";
const CENTER_BOX = { w: 480, h: 360 };
const SIDE = { w: 150, h: 210 };
const GAP = 14;
const TILT_DEG = 30;
const DEPTH_PX = 110;
const EASE = [0.22, 1, 0.36, 1] as const;
const BREAKPOINTS = {
  mobile: {
    max: 639,
    stageHeight: 340,
    centerWidth: 0.72,
    centerHeight: 280,
    side: { w: 96, h: 140 },
    visibleRange: 1,
    gap: 10,
    tilt: 32,
    depth: 80,
  },
  tablet: {
    min: 640,
    max: 1023,
    centerBox: { w: 400, h: 320 },
    side: { w: 130, h: 180 },
    visibleRange: 2,
    gap: 14,
    tilt: 30,
    depth: 110,
  },
  desktop: {
    min: 1024,
    centerBox: CENTER_BOX,
    side: SIDE,
    gap: GAP,
    tilt: TILT_DEG,
    depth: DEPTH_PX,
  },
} as const;

const AUTOPLAY_DIRECTION = SHIFT_DIRECTION === "right" ? -1 : 1;
const EASE_PANELS = "linear";
type SliderBreakpoint = "mobile" | "tablet" | "desktop";

function parseRatio(value: string | undefined) {
  if (!value) return undefined;
  const [width, height] = value.split(/[:/]/).map(Number);
  if (width > 0 && height > 0) return width / height;
  const number = Number(value);
  return number > 0 ? number : undefined;
}

function displayRatio(photo: ShowcasePhoto, ratio: number) {
  return photo.ratio ?? `${Number(ratio.toFixed(2))}:1`;
}

function PhotoContent({
  photo,
  ratio,
  fit,
  preload,
  onLoad,
}: {
  photo: ShowcasePhoto;
  ratio: number;
  fit: "cover" | "contain";
  preload: boolean;
  onLoad?: (width: number, height: number) => void;
}) {
  const isPlaceholderAsset = photo.src?.toLowerCase().endsWith(".svg");
  if (!photo.src || (fit === "contain" && isPlaceholderAsset)) {
    return (
      <ImagePlaceholder
        alt={photo.title}
        title={`${photo.title} · ${displayRatio(photo, ratio)}`}
        aspectRatio={fit === "cover" ? "auto" : String(ratio)}
        rounded="rounded-none"
        className="h-full w-full"
      />
    );
  }

  return (
    <Image
      src={photo.src}
      alt={photo.title}
      fill
      sizes={fit === "contain"
        ? "(max-width: 639px) 72vw, (max-width: 1023px) 400px, 480px"
        : "(max-width: 639px) 96px, (max-width: 1023px) 130px, 150px"}
      preload={preload}
      onLoad={onLoad ? (event) => onLoad(event.currentTarget.naturalWidth, event.currentTarget.naturalHeight) : undefined}
      className={fit === "cover" ? "object-cover" : "object-contain"}
    />
  );
}

function getBreakpoint(width: number): SliderBreakpoint {
  if (width < BREAKPOINTS.mobile.max + 1) return "mobile";
  if (width <= BREAKPOINTS.tablet.max) return "tablet";
  return "desktop";
}

export default function PhotoSlider({ photos }: { photos: ShowcasePhoto[] }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [modal, setModal] = useState<"photo" | "gallery" | null>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const [stageCenterOffset, setStageCenterOffset] = useState(0);
  const [intrinsicRatios, setIntrinsicRatios] = useState<Record<string, number>>({});
  const progress = useAnimationControls();
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const activePhoto = photos[index];
  const paused = hovered || focused || !visible || modal !== null;
  const breakpoint = getBreakpoint(stageWidth || 640);
  const mobile = breakpoint === "mobile";
  const breakpointConfig = BREAKPOINTS[breakpoint];
  const side = breakpointConfig.side;
  const gap = breakpointConfig.gap;
  const tilt = breakpointConfig.tilt;
  const depth = breakpointConfig.depth;
  const visibleRange = breakpoint === "mobile" ? 1
    : breakpoint === "tablet" ? 2
    : stageWidth >= 1536 ? 4 : 3;
  const resolvedRatio = (photo: ShowcasePhoto) =>
    parseRatio(photo.ratio) ?? intrinsicRatios[photo.image] ?? 1.5;

  const activeRatio = activePhoto ? resolvedRatio(activePhoto) : 1.5;
  const centerBox = breakpoint === "mobile"
    ? { w: stageWidth * BREAKPOINTS.mobile.centerWidth, h: BREAKPOINTS.mobile.centerHeight }
    : breakpoint === "tablet" ? BREAKPOINTS.tablet.centerBox : CENTER_BOX;
  let centerWidth = centerBox.w;
  let centerHeight = centerWidth / activeRatio;
  if (centerHeight > centerBox.h) {
    centerHeight = centerBox.h;
    centerWidth = centerHeight * activeRatio;
  }

  const move = useCallback((delta: number) => {
    setIndex((current) => (current + delta + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    let frame = 0;
    const updateSize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setStageWidth(node.getBoundingClientRect().width);
        setStageCenterOffset((window.innerWidth - document.documentElement.clientWidth) / 2);
      });
    };
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateSize);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => setVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    photos.forEach((photo) => {
      if (!photo.src) console.warn(`[PhotoSlider] Foto "${photo.title}" tidak ditemukan: /public/images/${photo.image}`);
    });
  }, [photos]);

  useEffect(() => {
    if (paused || photos.length < 2) {
      progress.stop();
      return;
    }
    let active = true;
    progress.set({ scaleX: 0 });
    progress.start({ scaleX: 1, transition: { duration: AUTOPLAY_MS / 1000, ease: EASE_PANELS } }).then(() => {
      if (active) move(AUTOPLAY_DIRECTION);
    });
    return () => {
      active = false;
      progress.stop();
    };
  }, [index, move, paused, photos.length, progress]);

  useEffect(() => {
    if (!photos.length) return;
    for (const delta of [-1, 1]) {
      const neighbor = photos[(index + delta + photos.length) % photos.length];
      if (neighbor?.src) {
        const image = new window.Image();
        image.src = neighbor.src;
      }
    }
  }, [index, photos]);

  const saveIntrinsicRatio = (photo: ShowcasePhoto, width: number, height: number) => {
    if (photo.ratio || !width || !height) return;
    setIntrinsicRatios((current) => ({ ...current, [photo.image]: width / height }));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  if (!activePhoto) {
    return <ImagePlaceholder alt="Photography" title="Photography · 3:2" aspectRatio="3 / 2" />;
  }

  return (
    <div
      className="overflow-x-clip"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <a
        href="#all-photos"
        onClick={(event) => { event.preventDefault(); setModal("gallery"); }}
        className="mb-1 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-[#111]/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#aaa] transition hover:border-white/25 hover:text-white"
      >
        Lihat Semua Foto <ArrowRight className="h-3.5 w-3.5" />
      </a>

      <div
        ref={stageRef}
        role="region"
        aria-label="Carousel foto"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative left-1/2 h-[340px] w-screen -translate-x-1/2 overflow-x-clip outline-none sm:h-[400px] lg:h-[440px]"
        style={{ perspective: 1400, touchAction: "pan-y", left: `calc(50% + ${stageCenterOffset}px)` }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <motion.div
            className="absolute inset-0"
            drag={photos.length > 1 && !reducedMotion ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragSnapToOrigin
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) move(1);
              else if (info.offset.x > 60) move(-1);
            }}
          >
            {reducedMotion ? (
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={activePhoto.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <button
                    type="button"
                    onClick={() => setModal("photo")}
                    aria-label={`Buka foto ${activePhoto.title}`}
                    className="relative block overflow-hidden rounded-[20px] border border-white/20 bg-[#181818] shadow-[0_24px_70px_rgba(0,0,0,0.48)]"
                    style={{ width: centerWidth, height: centerHeight }}
                  >
                    <PhotoContent photo={activePhoto} ratio={activeRatio} fit="contain" preload onLoad={(width, height) => saveIntrinsicRatio(activePhoto, width, height)} />
                  </button>
                </motion.div>
              </AnimatePresence>
            ) : photos.map((photo, photoIndex) => {
              const offset = ((photoIndex - index + photos.length + Math.floor(photos.length / 2)) % photos.length) - Math.floor(photos.length / 2);
              const distance = Math.abs(offset);
              const direction = Math.sign(offset);
              const isCenter = offset === 0;
              const photoRatio = resolvedRatio(photo);
              const sideStep = Math.min(
                side.w * 0.7 + gap,
                Math.max(0, (stageWidth / 2 - centerWidth / 2 - side.w - gap) / Math.max(1, visibleRange - 1)),
              );
              const x = isCenter
                ? 0
                : direction * (centerWidth / 2 + side.w / 2 + gap + (distance - 1) * sideStep);
              const opacity = distance === 0 ? 1 : distance > visibleRange ? 0 : 1 - 0.15 * distance;
              const sideGradient = direction < 0
                ? "linear-gradient(to left, transparent 30%, rgba(0,0,0,0.42))"
                : "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.42))";

              return (
                <div
                  key={photo.title}
                  className="absolute left-1/2 top-1/2"
                  style={{ zIndex: 10 - distance, transform: "translate(-50%, -50%)", pointerEvents: distance > visibleRange ? "none" : "auto" }}
                >
                  {isCenter && (
                    <>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-x-[60%] -inset-y-[24%] rounded-full"
                        style={{ background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 25%, transparent), transparent 68%)" }}
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[2px] -translate-x-1/2 -translate-y-1/2"
                        style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.9) 35%, var(--accent) 68%, transparent)", filter: "drop-shadow(0 0 8px var(--accent-glow))" }}
                      />
                    </>
                  )}
                  <motion.button
                    type="button"
                    onClick={() => isCenter ? setModal("photo") : setIndex(photoIndex)}
                    aria-label={isCenter ? `Buka foto ${photo.title}` : `Tampilkan foto ${photo.title}`}
                    aria-current={isCenter ? "true" : undefined}
                    initial={false}
                    animate={{
                      x: reducedMotion ? 0 : x,
                      z: reducedMotion ? 0 : isCenter ? 80 : -depth * distance,
                      rotateY: reducedMotion || isCenter ? 0 : direction * (tilt + (distance - 1) * 5),
                      width: isCenter ? centerWidth : side.w,
                      height: isCenter ? centerHeight : side.h,
                      opacity: reducedMotion ? (isCenter ? 1 : 0) : opacity,
                      filter: isCenter ? "brightness(1)" : "brightness(0.55)",
                    }}
                    transition={{ duration: reducedMotion ? 0.3 : 0.9, ease: EASE }}
                    className={`relative block overflow-hidden rounded-[19px] border bg-[#181818] ${isCenter ? "z-10 border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.48)]" : "border-white/[0.08] shadow-[0_14px_38px_rgba(0,0,0,0.34)]"}`}
                    style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                  >
                    <PhotoContent
                      photo={photo}
                      ratio={photoRatio}
                      fit={isCenter ? "contain" : "cover"}
                      preload={distance <= 1}
                      onLoad={(width, height) => saveIntrinsicRatio(photo, width, height)}
                    />
                    {!isCenter && <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: sideGradient }} />}
                  </motion.button>
                </div>
              );
            })}
          </motion.div>
        </div>

        {photos.length > 1 && !mobile && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 justify-between px-5">
            <button type="button" onClick={() => move(-1)} aria-label="Foto sebelumnya" className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur"><ChevronLeft className="h-5 w-5" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Foto berikutnya" className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur"><ChevronRight className="h-5 w-5" /></button>
          </div>
        )}
      </div>

      <div className="mx-auto mt-2 flex max-w-6xl items-center gap-4 px-5">
        <div className="h-px flex-1 overflow-hidden bg-white/15">
          <motion.span animate={progress} initial={{ scaleX: 0 }} className="block h-full origin-left bg-white/75" />
        </div>
        <span className="font-mono text-[10px] text-white/70">{index + 1} / {photos.length}</span>
      </div>

      <div className="mx-auto mt-5 min-h-[220px] max-w-6xl px-5 sm:min-h-[120px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activePhoto.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid min-h-[200px] grid-cols-1 items-start gap-5 text-center sm:grid-cols-2 sm:gap-6 lg:min-h-[88px] lg:grid-cols-3 lg:gap-8"
          >
            <div>
              <h3 className="text-base font-semibold text-white">{activePhoto.title}</h3>
              {(activePhoto.location || activePhoto.takenAt) && (
                <p className="mt-1 text-[12px] leading-5 text-[#8a8a8a]">
                  {[activePhoto.location, activePhoto.takenAt].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            {(activePhoto.camera || activePhoto.takenAt) && (
              <div>
                <h3 className="text-base font-semibold text-white">Kamera</h3>
                <p className="mt-1 text-[12px] leading-5 text-[#8a8a8a]">
                  {[activePhoto.camera, activePhoto.takenAt].filter(Boolean).join(" · ")}
                </p>
              </div>
            )}
            {activePhoto.meaning && (
              <div>
                <h3 className="text-base font-semibold text-white">Makna</h3>
                <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[#8a8a8a]">{activePhoto.meaning}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {modal === "photo" && <WorkModal key={activePhoto.title} item={activePhoto} photos={photos} onClose={() => setModal(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {modal === "gallery" && <PhotoGalleryModal photos={photos} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
}
