"use client";

import { Heart } from "lucide-react";
import type { CommentItem } from "@/data/content";

export default function Comments({
  comments,
  onToggleLike,
}: {
  comments: CommentItem[];
  onToggleLike: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className={`rounded-[18px] border p-4 ${comment.pinned ? "border-[#c084fc]/40 bg-[#a855f713] shadow-[0_0_0_1px_rgba(168,85,247,0.12)]" : "border-white/8 bg-[#1a1a1a]"}`}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-xs font-semibold text-white">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-white">{comment.name}</span>
            </div>
            {comment.pinned && (
              <span className="rounded-full border border-[#c084fc]/40 bg-[rgba(168,85,247,0.15)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#c084fc]">
                PINNED
              </span>
            )}
          </div>
          <p className="text-sm leading-6 text-[#8a8a8a]">{comment.text}</p>
          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              onClick={() => onToggleLike(comment.id)}
              aria-pressed={comment.liked}
              aria-label={`${comment.liked ? "Unlike" : "Like"} comment by ${comment.name}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-transparent px-2.5 py-1.5 text-xs text-white/80 transition hover:border-white/15"
            >
              <Heart className={`h-3.5 w-3.5 ${comment.liked ? "fill-white/70 text-white/70" : "text-white/70"}`} />
              {comment.likes}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
