"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import type { ShowcasePhoto, ShowcaseWork, WorkPage } from "@/lib/portfolio-types";
import ModalCarousel from "./ModalCarousel";
import WritingReader from "./WritingReader";
import useMounted from "./useMounted";

type ModalItem = ShowcaseWork | ShowcasePhoto;

function isPhoto(item: ModalItem): item is ShowcasePhoto {
  return "meaning" in item;
}

function placeholderPages(item: ShowcaseWork): WorkPage[] {
  if (item.pages.length) return item.pages;
  if (item.category === "web" || item.category === "slides") {
    const count = item.category === "web" ? 4 : 6;
    return Array.from({ length: count }, (_, index) => ({
      title: `${item.title} · ${String(index + 1).padStart(2, "0")}`,
      caption: item.captions?.[index],
    }));
  }
  return [{ title: item.title, src: item.cover }];
}

export default function WorkModal({
  item,
  onClose,
  photos = [],
  writingWorks = [],
}: {
  item: ModalItem;
  onClose: () => void;
  photos?: ShowcasePhoto[];
  writingWorks?: ShowcaseWork[];
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const [photoIndex, setPhotoIndex] = useState(() => isPhoto(item) ? Math.max(0, photos.findIndex((photo) => photo.title === item.title)) : 0);
  const [writingIndex, setWritingIndex] = useState(() => writingWorks.findIndex((work) => work.slug === (isPhoto(item) ? "" : item.slug)));
  const [pageIndex, setPageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const mounted = useMounted();
  const reducedMotion = useReducedMotion();
  const photoItem = isPhoto(item) ? item : undefined;
  const workItem = isPhoto(item) ? undefined : item;
  const photo = photoItem ? photos[photoIndex] ?? photoItem : undefined;
  const writing = workItem?.category === "writing";
  const photoCount = photos.length;
  const writingCount = writingWorks.length;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!mounted) return;
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (photoItem && photoCount > 1 && event.key === "ArrowRight") setPhotoIndex((current) => (current + 1) % photoCount);
      if (photoItem && photoCount > 1 && event.key === "ArrowLeft") setPhotoIndex((current) => (current - 1 + photoCount) % photoCount);
      if (writing && writingCount > 1 && event.key === "ArrowRight") setWritingIndex((current) => (current + 1) % writingCount);
      if (writing && writingCount > 1 && event.key === "ArrowLeft") setWritingIndex((current) => (current - 1 + writingCount) % writingCount);
      if (workItem && !writing && event.key === "ArrowRight") setPageIndex((current) => (current + 1) % placeholderPages(workItem).length);
      if (workItem && !writing && event.key === "ArrowLeft") setPageIndex((current) => (current - 1 + placeholderPages(workItem).length) % placeholderPages(workItem).length);
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
  }, [mounted, photoCount, photoItem, writing, writingCount, workItem]);

  const title = photo?.title ?? item.title;
  const navigatePhoto = (delta: number) => setPhotoIndex((current) => (current + delta + photoCount) % photoCount);

  const dialog = (
    <div className="fixed inset-y-0 left-0 z-[70] flex w-screen items-center justify-center bg-black/80 p-0 backdrop-blur-md sm:p-4 lg:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} — detail karya`}
        tabIndex={-1}
        initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
        className="relative flex h-[100dvh] max-h-[100dvh] w-full flex-col overflow-hidden border-x-0 border-y border-white/10 bg-[#181818] shadow-2xl sm:h-auto sm:max-h-[88vh] sm:w-[min(94vw,1280px)] sm:rounded-[24px] sm:border lg:w-[min(90vw,1280px)]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/8 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-5 sm:py-3 sm:pt-3">
          <p className="truncate pr-4 text-sm font-medium text-white">{title}</p>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Tutup detail karya" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/75 hover:bg-white/10 hover:text-white sm:h-9 sm:w-9">
            <X className="h-4 w-4" />
          </button>
        </div>

        {photo ? (
          <div className="grid min-h-0 flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:pb-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,.7fr)]">
            <div className="relative self-center p-4">
              <div className="overflow-hidden rounded-[16px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={photo.title}
                    initial={{ opacity: 0, x: reducedMotion ? 0 : 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reducedMotion ? 0 : -40 }}
                    drag={photos.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => { if (info.offset.x < -60) navigatePhoto(1); else if (info.offset.x > 60) navigatePhoto(-1); }}
                  >
                    <ImagePlaceholder src={photo.src} alt={photo.title} title={`${photo.title} · 2400px+`} aspectRatio="16 / 9" rounded="rounded-none" />
                  </motion.div>
                </AnimatePresence>
              </div>
              {photos.length > 1 && (
                <div className="absolute inset-x-7 top-1/2 flex -translate-y-1/2 justify-between">
                  <button type="button" onClick={() => navigatePhoto(-1)} aria-label="Foto sebelumnya" className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-black/65 px-3 py-2 text-white sm:min-h-0 sm:min-w-0">←</button>
                  <button type="button" onClick={() => navigatePhoto(1)} aria-label="Foto berikutnya" className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-black/65 px-3 py-2 text-white sm:min-h-0 sm:min-w-0">→</button>
                </div>
              )}
            </div>
            <div className="border-t border-white/8 p-5 lg:border-l lg:border-t-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">Makna</div>
              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#bbb]">{photo.meaning}</p>
              <dl className="mt-6 space-y-3 text-sm">
                {photo.location && <div><dt className="text-xs text-[#777]">Lokasi</dt><dd className="mt-1 text-[#ccc]">{photo.location}</dd></div>}
                {photo.takenAt && <div><dt className="text-xs text-[#777]">Tanggal</dt><dd className="mt-1 text-[#ccc]">{photo.takenAt}</dd></div>}
                {photo.camera && <div><dt className="text-xs text-[#777]">Kamera</dt><dd className="mt-1 text-[#ccc]">{photo.camera}</dd></div>}
              </dl>
              {photos.length > 1 && <div className="mt-6 font-mono text-xs text-[#888]">{photoIndex + 1} / {photos.length}</div>}
            </div>
          </div>
        ) : workItem?.category === "writing" ? (
          <div className="min-h-0 flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:pb-0">
            <WritingReader works={writingWorks} index={Math.max(0, writingIndex)} onChange={setWritingIndex} />
          </div>
        ) : workItem ? (
          <div className="grid min-h-0 flex-1 overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+1rem)] sm:pb-0 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,.7fr)]">
            <div className="p-4 sm:p-6">
              <ModalCarousel
                pages={placeholderPages(workItem)}
                title={workItem.title}
                index={pageIndex}
                onChange={setPageIndex}
                onZoom={workItem.category === "logo" || workItem.category === "poster" ? () => setZoomed(true) : undefined}
              />
            </div>
            <div className="border-t border-white/8 p-5 lg:border-l lg:border-t-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#888]">{workItem.year} · {workItem.category}</div>
              <h2 className="mt-3 font-display text-2xl text-white">{workItem.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#aaa]">{workItem.description}</p>
              {workItem.category === "web" && workItem.team ? (
                <div className="mt-5">
                  <h3 className="text-xs uppercase tracking-wider text-[#777]">Team</h3>
                  <p className="mt-2 text-sm text-[#bbb]">{workItem.team.name} <span className="text-[#777]">· {workItem.team.role}</span></p>
                </div>
              ) : null}
              {workItem.tools?.length ? <div className="mt-5"><h3 className="text-xs uppercase tracking-wider text-[#777]">Tools</h3><div className="mt-2 flex flex-wrap gap-2">{workItem.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#bbb]">{tool}</span>)}</div></div> : null}
              {workItem.tags?.length ? <div className="mt-4"><h3 className="text-xs uppercase tracking-wider text-[#777]">Tags</h3><div className="mt-2 flex flex-wrap gap-2">{workItem.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#aaa]">{tag}</span>)}</div></div> : null}
              <div className="mt-6 flex flex-wrap gap-2">
                {workItem.liveUrl ? <a href={workItem.liveUrl} target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-[10px] bg-white px-4 py-2.5 text-sm font-medium text-black sm:min-h-0">Live Demo ↗</a> : <button disabled className="min-h-11 cursor-not-allowed rounded-[10px] border border-white/10 px-4 py-2.5 text-sm text-[#777] sm:min-h-0">No Link</button>}
                {workItem.repoUrl ? <a href={workItem.repoUrl} target="_blank" rel="noreferrer" className="flex min-h-11 items-center rounded-[10px] border border-white/12 px-4 py-2.5 text-sm text-white sm:min-h-0">Source ↗</a> : <button disabled className="min-h-11 cursor-not-allowed rounded-[10px] border border-white/10 px-4 py-2.5 text-sm text-[#777] sm:min-h-0">No Source</button>}
              </div>
            </div>
          </div>
        ) : null}
        {zoomed && workItem && (workItem.category === "logo" || workItem.category === "poster") && (
          <motion.button
            type="button"
            aria-label="Tutup zoom gambar"
            onClick={() => setZoomed(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/90 p-6 backdrop-blur"
          >
            <div className={`h-[min(74vh,760px)] ${workItem.category === "logo" ? "aspect-square" : "aspect-[4/5]"}`}>
              <ImagePlaceholder
                src={workItem.cover}
                alt={workItem.title}
                title={`${workItem.title} · zoom`}
                aspectRatio={workItem.category === "logo" ? "1 / 1" : "4 / 5"}
                rounded="rounded-[12px]"
                className="h-full w-full"
              />
            </div>
          </motion.button>
        )}
      </motion.div>
    </div>
  );

  return mounted ? createPortal(dialog, document.body) : null;
}
