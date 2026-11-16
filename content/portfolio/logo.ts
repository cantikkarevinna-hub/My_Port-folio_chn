import type { Work } from "../../src/lib/portfolio-types";

// ▼▼▼ SALIN DARI SINI ▼▼▼
// Contoh lengkap:
// {
//   slug: "nama-logo", // Wajib: nama folder gambar, huruf kecil dan tanda hubung.
//   title: "Nama Logo", // Wajib: nama karya.
//   description: "Deskripsi konsep logo.", // Wajib: ringkasan karya.
//   year: 2026, // Wajib: tahun karya.
//   tags: ["Branding"], // Opsional: kategori atau tag.
//   tools: ["Illustrator"], // Opsional: alat yang digunakan.
//   captions: ["Logo utama"], // Opsional: caption untuk cover/pages.
//   liveUrl: "https://contoh.com", // Opsional: tautan demo.
//   repoUrl: "https://github.com/user/repo", // Opsional: tautan source.
//   hidden: false, // Opsional: true untuk menyembunyikan item.
// }
// ▲▲▲ SAMPAI SINI ▲▲▲
//
// ╔═══════════════════════════════════════════════╗
// ║ ⬇⬇ TAMBAHKAN ITEM BARU TEPAT DI BAWAH INI ⬇⬇ ║
// ╚═══════════════════════════════════════════════╝
export const logo: Work[] = [
  { slug: "flora-mark", title: "Flora Mark", description: "Template konten untuk eksplorasi identitas flora.", year: 2026, tags: ["Nature"], tools: ["Illustrator"] },
  { slug: "monogram-study", title: "Monogram Study", description: "Template konten untuk studi bentuk monogram.", year: 2025, tags: ["Monogram"], tools: ["Illustrator", "Figma"] },
  { slug: "studio-symbol", title: "Studio Symbol", description: "Template konten untuk simbol brand studio.", year: 2025, tags: ["Identity"], tools: ["Procreate", "Illustrator"] },
];
