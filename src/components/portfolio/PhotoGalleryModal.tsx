"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ShowcasePhoto } from "@/lib/portfolio-types";
import WorkModal from "./WorkModal";
import useMounted from "./useMounted";

export default function PhotoGalleryModal({ photos, onClose }: { photos: ShowcasePhoto[]; onClose: () => void }) {
  const [selected, setSelected] = useState<ShowcasePhoto | null>(null);
  const mounted = useMounted();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!mounted || selected) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [mounted, selected]);

  if (!mounted) return null;
  if (selected) return <WorkModal item={selected} photos={photos} onClose={() => setSelected(null)} />;

  const dialog = (
    <div className="fixed inset-y-0 left-0 z-[70] flex w-screen items-center justify-center bg-black/80 p-0 backdrop-blur-md sm:p-4 lg:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Semua foto" tabIndex={-1} className="flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden border-x-0 border-y border-white/10 bg-[#181818] sm:h-auto sm:max-h-[88vh] sm:w-[min(94vw,1280px)] sm:rounded-[24px] sm:border lg:w-[min(90vw,1280px)]">
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-5 sm:py-3 sm:pt-3">
          <h2 className="font-medium text-white">Semua Foto</h2>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Tutup galeri" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/75 hover:bg-white/10 sm:h-9 sm:w-9"><X className="h-4 w-4" /></button>
        </div>
        <div className="columns-1 flex-1 gap-4 overflow-y-auto p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:columns-2 sm:pb-4 lg:columns-3">
          {photos.map((photo, index) => (
            <button key={photo.title} type="button" onClick={() => setSelected(photo)} className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-[16px] border border-white/8 bg-[#111] text-left transition hover:border-white/20">
              <ImagePlaceholder src={photo.src} alt={photo.title} title={`${photo.title} · ${index % 2 === 0 ? "4:5" : "3:4"}`} aspectRatio={index % 2 === 0 ? "4 / 5" : "3 / 4"} rounded="rounded-none" />
              <span className="block p-3 text-sm text-white">{photo.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
