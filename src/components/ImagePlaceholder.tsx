import Image from "next/image";

type ImagePlaceholderProps = {
  src?: string;
  alt: string;
  title?: string;
  aspectRatio?: string;
  rounded?: string;
  className?: string;
};

export default function ImagePlaceholder({
  src,
  alt,
  title,
  aspectRatio = "4 / 3",
  rounded = "rounded-[16px]",
  className = "",
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`} style={{ aspectRatio }}>
        <Image src={src} alt={alt} width={1600} height={1200} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border border-dashed border-white/12 bg-[#1a1a1a] text-center ${rounded} ${className}`}
      style={{ aspectRatio }}
    >
      <div className="flex flex-col items-center gap-2 text-[#8a8a8a]">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-none stroke-current stroke-[1.5]">
          <path d="M3 15.5V7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5Z" />
          <circle cx="9" cy="10" r="2.25" />
          <path d="m21 15-4.2-4.2a1.5 1.5 0 0 0-2.1 0L9 17" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{title ?? alt}</span>
      </div>
    </div>
  );
}
