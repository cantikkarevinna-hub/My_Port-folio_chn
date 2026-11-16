import type { Work } from "../../src/lib/portfolio-types";

// ▼▼▼ SALIN DARI SINI ▼▼▼
// Contoh lengkap:
// {
//   slug: "nama-presentasi", // Wajib: nama folder gambar, huruf kecil dan tanda hubung.
//   title: "Nama Presentasi", // Wajib: judul yang tampil.
//   description: "Deskripsi presentasi.", // Wajib: ringkasan proyek.
//   year: 2026, // Wajib: tahun proyek.
//   kind: "ppt", // Wajib: "ppt" atau "brand-guideline".
//   tags: ["Pitch Deck"], // Opsional: kategori atau tag.
//   tools: ["PowerPoint", "Figma"], // Opsional: alat yang digunakan.
//   captions: ["Sampul", "Isi"], // Opsional: caption berurutan untuk pages/*.webp.
//   liveUrl: "https://contoh.com", // Opsional: tautan demo.
//   repoUrl: "https://github.com/user/repo", // Opsional: tautan source.
//   hidden: false, // Opsional: true untuk menyembunyikan item.
// }
// ▲▲▲ SAMPAI SINI ▲▲▲
//
// ╔═══════════════════════════════════════════════╗
// ║ ⬇⬇ TAMBAHKAN ITEM BARU TEPAT DI BAWAH INI ⬇⬇ ║
// ╚═══════════════════════════════════════════════╝
export const slides: Work[] = [
  {
    slug: "nature-brand-guideline",
    title: "Nature Brand Guideline",
    description: "Template konten untuk panduan visual brand, logo, dan penggunaan identitas.",
    year: 2026,
    kind: "brand-guideline",
    tags: ["Branding", "Guideline"],
    tools: ["Illustrator", "Figma"],
  },
  {
    slug: "creative-pitch-deck",
    title: "Creative Pitch Deck",
    description: "Template konten presentasi ide kreatif dan arah visual.",
    year: 2025,
    kind: "ppt",
    tags: ["Pitch Deck"],
    tools: ["PowerPoint", "Photoshop"],
  },
  {
    slug: "visual-story-deck",
    title: "Visual Story Deck",
    description: "Template konten untuk presentasi visual bertema storytelling.",
    year: 2025,
    kind: "ppt",
    tags: ["Presentation"],
    tools: ["Canva", "Lightroom"],
  },
];
