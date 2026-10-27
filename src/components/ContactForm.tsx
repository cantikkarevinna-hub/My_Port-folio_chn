"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail, MessageSquareText, Send, Upload, UserRound } from "lucide-react";
import { FaBehance, FaGithub, FaInstagram, FaLinkedinIn, FaPinterestP, FaTiktok, FaYoutube } from "react-icons/fa";
import Comments from "@/components/Comments";

export type Comment = {
  id: string;
  name: string;
  text: string;
  likes: number;
  liked: boolean;
  pinned: boolean;
};

const socialTiles = [
  { platform: "LinkedIn", icon: FaLinkedinIn, handle: "@username" },
  { platform: "Instagram", icon: FaInstagram, handle: "@username" },
  { platform: "YouTube", icon: FaYoutube, handle: "@username" },
  { platform: "GitHub", icon: FaGithub, handle: "@username" },
  { platform: "TikTok", icon: FaTiktok, handle: "@username" },
  { platform: "Pinterest", icon: FaPinterestP, handle: "@username" },
  { platform: "Behance", icon: FaBehance, handle: "@username" },
];

export default function ContactForm() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Message queued — I’ll get back to you soon.");
    event.currentTarget.reset();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
      <div className="rounded-[24px] border border-white/8 bg-[#181818]/90 p-6 sm:p-7">
        <h3 className="font-display text-3xl text-white">Hubungi Saya</h3>
        <p className="mt-3 text-sm leading-6 text-[#8a8a8a]">
          Feel free to reach out if you want to collaborate, discuss ideas, or simply say hello.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <UserRound className="h-4 w-4 text-[#8a8a8a]" />
            <input className="w-full bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Name" />
          </label>
          <label className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <Mail className="h-4 w-4 text-[#8a8a8a]" />
            <input type="email" className="w-full bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Email" />
          </label>
          <label className="flex items-start gap-3 rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <MessageSquareText className="mt-1 h-4 w-4 text-[#8a8a8a]" />
            <textarea rows={5} className="w-full resize-none bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Message" />
          </label>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#2d2d2d] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3a3a3a]">
            <Send className="h-4 w-4" />
            Send Message
          </button>
          {status && <p className="text-xs text-[#c084fc]">{status}</p>}
        </form>

        <div className="mt-8">
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-[#8a8a8a]">Connect With Me</div>
          <div className="space-y-3">
            {socialTiles.slice(0, 1).map(({ platform, icon: Icon, handle }) => (
              <a key={platform} href="#" className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] p-3 text-white transition hover:border-white/12">
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/8 bg-white/3">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{platform}</div>
                  <div className="text-xs text-[#8a8a8a]">{handle}</div>
                </div>
              </a>
            ))}
            <div className="grid grid-cols-2 gap-3">
              {socialTiles.slice(1, 3).map(({ platform, icon: Icon, handle }) => (
                <a key={platform} href="#" className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] p-3 text-white transition hover:border-white/12">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/8 bg-white/3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{platform}</div>
                    <div className="text-xs text-[#8a8a8a]">{handle}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {socialTiles.slice(3).map(({ platform, icon: Icon, handle }) => (
                <a key={platform} href="#" className="flex items-center gap-3 rounded-[14px] border border-white/8 bg-[#111111] p-3 text-white transition hover:border-white/12">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/8 bg-white/3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{platform}</div>
                    <div className="text-xs text-[#8a8a8a]">{handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/8 bg-[#181818]/90 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-3xl text-white">Comments</h3>
          <span className="text-xs text-[#8a8a8a]">Leave your thoughts here</span>
        </div>
        <form className="mt-6 space-y-4">
          <label className="block rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-[#8a8a8a]">
            <span className="sr-only">Your Name</span>
            <input className="w-full bg-transparent text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Name" />
          </label>
          <textarea rows={4} className="w-full resize-none rounded-[14px] border border-white/8 bg-[#111111] px-4 py-3 text-sm text-white placeholder:text-[#5c5c5c] focus:outline-none" placeholder="Your Comment" />
          <div className="flex gap-3">
            <button type="button" className="flex items-center justify-center gap-2 rounded-[12px] border border-white/12 bg-transparent px-4 py-3 text-sm text-white transition hover:border-white/20">
              <Upload className="h-4 w-4" />
              Upload Image
            </button>
            <button type="button" className="ml-auto rounded-[12px] bg-[#2d2d2d] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3a3a3a]">
              Post Comment
            </button>
          </div>
        </form>

        <div className="mt-6">
          <Comments />
        </div>
      </div>
    </div>
  );
}
