import type { Work } from "../../src/lib/portfolio-types";

// ▼▼▼ SALIN DARI SINI ▼▼▼
// Contoh lengkap:
// {
//   slug: "judul-tulisan", // Wajib: ID unik, huruf kecil dan tanda hubung.
//   title: "Judul Tulisan", // Wajib: judul yang tampil.
//   description: "Ringkasan singkat tulisan.", // Wajib: ringkasan.
//   year: 2026, // Wajib: tahun tulisan.
//   tags: ["Puisi"], // Opsional: kategori atau tag.
//   writing: {
//     type: "puisi", // Wajib: "puisi", "kalimat-kiasan", atau "lainnya".
//     date: "6 November 2026", // Opsional: tanggal terbit.
//     body: "Baris pertama.\nBaris kedua.", // Wajib: isi lengkap; \n menjaga pergantian baris.
//   },
//   hidden: false, // Opsional: true untuk menyembunyikan item.
// }
// ▲▲▲ SAMPAI SINI ▲▲▲
//
// ╔═══════════════════════════════════════════════╗
// ║ ⬇⬇ TAMBAHKAN ITEM BARU TEPAT DI BAWAH INI ⬇⬇ ║
// ╚═══════════════════════════════════════════════╝
export const writing: Work[] = [
  {
    slug: "cahaya-pagi",
    title: "Cahaya Pagi",
    description: "Contoh puisi singkat tentang alam.",
    year: 2026,
    writing: { type: "puisi", date: "November 2026", body: "Cahaya menyentuh pucuk daun,\nembun menyimpan warna pagi.\nHening pun tumbuh perlahan." },
  },
  {
    slug: "seperti-hujan",
    title: "Seperti Hujan",
    description: "Contoh kalimat kiasan tentang kenangan.",
    year: 2025,
    writing: { type: "kalimat-kiasan", date: "2025", body: "Kenangan adalah hujan yang singgah sebentar, namun meninggalkan aroma tanah di dalam ingatan." },
  },
  {
    slug: "ruang-kecil",
    title: "Ruang Kecil",
    description: "Contoh tulisan pendek; ganti dengan tulisan milikmu.",
    year: 2025,
    writing: { type: "lainnya", date: "2025", body: "Tuliskan karya, catatan, atau cerita pendekmu di sini." },
  },
];
