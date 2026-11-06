"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Mail, MessageSquareText, Send, Upload, UserRound } from "lucide-react";
import { FaBehance, FaGithub, FaInstagram, FaLinkedinIn, FaPinterestP, FaTiktok, FaYoutube } from "react-icons/fa";
import type { IconType } from "react-icons";
import Comments from "@/components/Comments";
import { defaultComments, socialLinks, type CommentItem } from "@/data/content";

const STORAGE_KEY = "chantikka-comments";
const socialIcons: Record<string, IconType> = {
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  GitHub: FaGithub,
  TikTok: FaTiktok,
  Pinterest: FaPinterestP,
  Behance: FaBehance,
};

function isCommentList(value: unknown): value is CommentItem[] {
  return Array.isArray(value) && value.every((item) =>
    typeof item === "object" &&
    item !== null &&
    "id" in item && typeof item.id === "string" &&
    "name" in item && typeof item.name === "string" &&
    "text" in item && typeof item.text === "string" &&
    "likes" in item && typeof item.likes === "number" &&
    "liked" in item && typeof item.liked === "boolean" &&
    "pinned" in item && typeof item.pinned === "boolean"
  );
}

export default function ContactForm() {
  const [comments, setComments] = useState<CommentItem[]>(defaultComments);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [contactStatus, setContactStatus] = useState("");
  const [commentStatus, setCommentStatus] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const uploadInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (!isCommentList(parsed)) throw new Error("Stored comments have an invalid format.");
          setComments(parsed);
        }
      } catch (error) {
        console.error("Could not load saved comments.", error);
        setCommentStatus("Saved comments could not be loaded. Showing the default comments.");
      } finally {
        setCommentsLoaded(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!commentsLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch (error) {
      console.error("Could not save comments.", error);
    }
  }, [comments, commentsLoaded]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus("This demo form is not connected to a messaging service yet.");
  };

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = commentName.trim();
    const text = commentText.trim();
    if (!name || !text) {
      setCommentStatus("Please enter your name and comment.");
      return;
    }

    setComments((current) => [
      ...current,
      { id: window.crypto.randomUUID(), name, text, likes: 0, liked: false, pinned: false },
    ]);
    setCommentName("");
    setCommentText("");
    setSelectedFile("");
    if (uploadInput.current) uploadInput.current.value = "";
    setCommentStatus(selectedFile
      ? "Your comment was saved. Image uploads are not connected in this demo."
      : "Your comment was added and saved in this browser.");
  };

  const toggleLike = (id: string) => {
    setComments((current) =>
      current.map((comment) => {
        if (comment.id !== id) return comment;
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.liked ? Math.max(0, comment.likes - 1) : comment.likes + 1,
        };
      })
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
      <div className="rounded-[24px] border border-white/8 bg-[#181818]/90 p-6 sm:p-7">
        <h3 className="font-display text-3xl text-white">Hubungi Saya</h3>
        <p className="mt-3 text-sm leading-6 text-[#8a8a8a]">
          Feel free to reach out if you want to collaborate, discuss ideas, or simply say hello.
        </p>

        <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
          <label className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <UserRound className="h-4 w-4 text-[#8a8a8a]" />
            <input required name="name" autoComplete="name" className="w-full bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Name" />
          </label>
          <label className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <Mail className="h-4 w-4 text-[#8a8a8a]" />
            <input required type="email" name="email" autoComplete="email" className="w-full bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Email" />
          </label>
          <label className="flex items-start gap-3 rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <MessageSquareText className="mt-1 h-4 w-4 text-[#8a8a8a]" />
            <textarea required name="message" rows={5} className="w-full resize-none bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Message" />
          </label>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#2d2d2d] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3a3a3a]">
            <Send className="h-4 w-4" />
            Send Message
          </button>
          {contactStatus && <p role="status" className="text-xs text-[#8a8a8a]">{contactStatus}</p>}
        </form>

        <div className="mt-8">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8a8a8a]">Connect With Me</div>
          <div className="space-y-3">
            {socialLinks.slice(0, 1).map(({ platform, handle, href }) => {
              const Icon = socialIcons[platform];
              return (
                <a key={platform} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] p-3 text-white transition hover:border-white/12">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/8 bg-white/3"><Icon className="h-4 w-4" /></div>
                  <div><div className="text-sm font-medium">{platform}</div><div className="text-xs text-[#8a8a8a]">{handle}</div></div>
                </a>
              );
            })}
            {[socialLinks.slice(1, 3), socialLinks.slice(3, 5), socialLinks.slice(5)].map((group, index) => (
              <div key={index} className="grid grid-cols-2 gap-3">
                {group.map(({ platform, handle, href }) => {
                  const Icon = socialIcons[platform];
                  return (
                    <a key={platform} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] p-3 text-white transition hover:border-white/12">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/8 bg-white/3"><Icon className="h-4 w-4" /></div>
                      <div className="min-w-0"><div className="text-sm font-medium">{platform}</div><div className="truncate text-xs text-[#8a8a8a]">{handle}</div></div>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/8 bg-[#181818]/90 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-3xl text-white">Comments</h3>
          <span className="text-xs text-[#8a8a8a]">Leave your thoughts here</span>
        </div>
        <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
          <label className="block rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <span className="sr-only">Your Name</span>
            <input required value={commentName} onChange={(event) => setCommentName(event.target.value)} className="w-full bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Name" />
          </label>
          <label className="block rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <span className="sr-only">Your Comment</span>
            <textarea required value={commentText} onChange={(event) => setCommentText(event.target.value)} rows={4} className="w-full resize-none bg-transparent text-sm text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Comment" />
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <input ref={uploadInput} type="file" accept="image/*" className="sr-only" onChange={(event) => setSelectedFile(event.target.files?.[0]?.name ?? "")} aria-label="Choose an image to upload" />
            <button type="button" onClick={() => uploadInput.current?.click()} className="flex items-center justify-center gap-2 rounded-[12px] border border-white/12 bg-transparent px-4 py-3 text-sm text-white transition hover:border-white/20">
              <Upload className="h-4 w-4" />
              Upload Image
            </button>
            {selectedFile && <span className="max-w-40 truncate text-xs text-[#8a8a8a]">{selectedFile}</span>}
            <button type="submit" className="ml-auto rounded-[12px] bg-[#2d2d2d] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3a3a3a]">
              Post Comment
            </button>
          </div>
          {commentStatus && <p role="status" className="text-xs text-[#8a8a8a]">{commentStatus}</p>}
        </form>

        <div className="mt-6">
          <Comments comments={comments} onToggleLike={toggleLike} />
        </div>
      </div>
    </div>
  );
}
