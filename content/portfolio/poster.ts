import type { Work } from "../../src/lib/portfolio-types";

// ▼▼▼ SALIN DARI SINI ▼▼▼
// Contoh lengkap:
// {
//   slug: "nama-poster", // Wajib: nama folder gambar, huruf kecil dan tanda hubung.
//   title: "Nama Poster", // Wajib: judul yang tampil.
//   description: "Deskripsi poster/desain.", // Wajib: ringkasan karya.
//   year: 2026, // Wajib: tahun karya.
//   tags: ["Editorial"], // Opsional: kategori atau tag.
//   tools: ["Photoshop"], // Opsional: alat yang digunakan.
//   captions: ["Poster utama"], // Opsional: caption berurutan untuk pages/*.webp.
//   liveUrl: "https://contoh.com", // Opsional: tautan demo.
//   repoUrl: "https://github.com/user/repo", // Opsional: tautan source.
//   hidden: false, // Opsional: true untuk menyembunyikan item.
// }
// ▲▲▲ SAMPAI SINI ▲▲▲
//
// ╔═══════════════════════════════════════════════╗
// ║ ⬇⬇ TAMBAHKAN ITEM BARU TEPAT DI BAWAH INI ⬇⬇ ║
// ╚═══════════════════════════════════════════════╝
export const poster: Work[] = [
  { slug: "wild-bloom", title: "Wild Bloom", description: "Template konten untuk desain poster bertema alam.", year: 2026, tags: ["Poster"], tools: ["Photoshop", "Illustrator"] },
  { slug: "quiet-earth", title: "Quiet Earth", description: "Template konten untuk eksplorasi desain editorial.", year: 2025, tags: ["Editorial"], tools: ["InDesign", "Photoshop"] },
  { slug: "form-and-light", title: "Form & Light", description: "Template konten untuk studi bentuk dan cahaya.", year: 2025, tags: ["Art Direction"], tools: ["Procreate", "Photoshop"] },
];
