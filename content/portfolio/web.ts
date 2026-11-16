import type { Work } from "../../src/lib/portfolio-types";

// ▼▼▼ SALIN DARI SINI ▼▼▼
// Contoh lengkap:
// {
//   slug: "nama-proyek", // Wajib: nama folder gambar, gunakan huruf kecil dan tanda hubung.
//   title: "Nama Proyek", // Wajib: judul yang tampil.
//   description: "Deskripsi singkat proyek.", // Wajib: ringkasan pada kartu dan modal.
//   year: 2026, // Wajib: tahun proyek.
//   tags: ["Portfolio"], // Opsional: kategori atau tag.
//   tools: ["Next.js", "Figma"], // Opsional: alat yang digunakan.
//   captions: ["Halaman utama"], // Opsional: caption berurutan untuk pages/*.webp.
//   team: { name: "Nama", role: "Designer" }, // Opsional: nama dan peran anggota tim.
//   liveUrl: "https://contoh.com", // Opsional: tautan demo.
//   repoUrl: "https://github.com/user/repo", // Opsional: tautan source.
//   hidden: false, // Opsional: true untuk menyembunyikan item.
// }
// ▲▲▲ SAMPAI SINI ▲▲▲
//
// ╔═══════════════════════════════════════════════╗
// ║ ⬇⬇ TAMBAHKAN ITEM BARU TEPAT DI BAWAH INI ⬇⬇ ║
// ╚═══════════════════════════════════════════════╝
export const web: Work[] = [
  {
    slug: "creative-portfolio",
    title: "Creative Portfolio",
    description: "Template konten: deskripsikan pengalaman digital dan tujuan proyek.",
    year: 2026,
    tags: ["Portfolio", "Responsive"],
    tools: ["Next.js", "TypeScript", "Figma"],
    team: { name: "Chantikka Revinna", role: "Designer & Developer" },
  },
  {
    slug: "nature-journal",
    title: "Nature Journal",
    description: "Template konten untuk proyek web kedua dengan ringkasan singkat.",
    year: 2025,
    tags: ["Editorial"],
    tools: ["Figma", "React"],
  },
  {
    slug: "studio-landing",
    title: "Studio Landing",
    description: "Template konten untuk proyek web ketiga dengan ringkasan singkat.",
    year: 2025,
    tags: ["Landing Page"],
    tools: ["Figma", "HTML", "CSS"],
  },
];
