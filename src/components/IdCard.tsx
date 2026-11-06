"use client";

import dynamic from "next/dynamic";
import { Component, Suspense, useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import CardFallback from "@/components/CardFallback";
import type { CardInteraction } from "@/components/card/IdCardScene";

const IdCardScene = dynamic(() => import("@/components/card/IdCardScene"), { ssr: false });

class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("The interactive portrait card could not be rendered.", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function IdCard() {
  const shell = useRef<HTMLDivElement>(null);
  const interaction = useRef<CardInteraction>({
    active: false,
    dragging: false,
    pointerX: 0,
    pointerY: 0,
    deltaX: 0,
    deltaY: 0,
    startX: 0,
    startY: 0,
  });
  const reducedMotion = useReducedMotion();
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(true);
  const [contextFailed, setContextFailed] = useState(false);
  const [fonts, setFonts] = useState<{ mono?: string; display?: string }>({});

  useEffect(() => {
    const element = shell.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const assets = [
      ["/images/chip-card.png", "chip"],
      ["/fonts/SpaceMono-Bold.woff", "mono"],
      ["/fonts/Syne-ExtraBold.woff", "display"],
    ] as const;
    let active = true;

    Promise.all(assets.map(async ([path, name]) => {
      const response = await fetch(path, { method: "HEAD" });
      if (!response.ok) {
        if (name === "chip") {
          console.error("Card chip image is missing. Add public/images/chip-card.png.");
        } else {
          console.error(`Card font ${path} failed to load; add the requested local font file.`);
        }
      }
      return response.ok ? { name, path } : undefined;
    })).then((results) => {
      if (!active) return;
      const available = results.filter((result) => result !== undefined);
      setFonts({
        mono: available.find((asset) => asset.name === "mono")?.path,
        display: available.find((asset) => asset.name === "display")?.path,
      });
    }).catch((error: unknown) => {
      console.error("Could not check the local card font and chip assets.", error);
    });

    return () => { active = false; };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const state = interaction.current;
    state.active = true;
    state.dragging = true;
    state.startX = event.clientX;
    state.startY = event.clientY;
    state.deltaX = 0;
    state.deltaY = 0;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const state = interaction.current;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (state.dragging) {
      state.deltaX = event.clientX - state.startX;
      state.deltaY = event.clientY - state.startY;
      return;
    }

    state.active = true;
    state.pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    state.pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const state = interaction.current;
    if (!state.dragging) return;
    state.dragging = false;
    state.active = false;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const cardFallback = <CardFallback />;

  return (
    <div
      ref={shell}
      className={`pointer-events-none relative mx-auto select-none touch-pan-y will-change-transform ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ width: "min(100%, 48vh, 426.67px)", aspectRatio: "2 / 3", maxHeight: "min(72vh, 640px)" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      onPointerLeave={() => {
        if (!interaction.current.dragging) interaction.current.active = false;
      }}
      aria-label="Interactive silver portrait card"
    >
      {reducedMotion || contextFailed ? cardFallback : (
        <Suspense fallback={cardFallback}>
          <SceneErrorBoundary fallback={cardFallback}>
            <IdCardScene
              interaction={interaction}
              fonts={fonts}
              reducedMotion={Boolean(reducedMotion)}
              active={visible}
              dragging={dragging}
              onContextLost={() => setContextFailed(true)}
            />
          </SceneErrorBoundary>
        </Suspense>
      )}
    </div>
  );
}
