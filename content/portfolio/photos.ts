import type { Photo } from "../../src/lib/portfolio-types";

// ▼▼▼ SALIN DARI SINI (1 foto = 1 blok) ▼▼▼
// {
//   title: "Judul Foto",
//   meaning: "Makna / cerita di balik foto (2–3 kalimat).",
//   location: "Nama tempat",         // opsional
//   takenAt: "2025-08",              // opsional
//   camera: "Nama kamera",           // opsional
//   image: "photos/nama-file.webp",  // taruh file di /public/images/photos/
//   // ratio: "3:2",                 // opsional; kosong = dihitung otomatis dari file
// }
// ▲▲▲ SAMPAI SINI ▲▲▲
//
// ╔═══════════════════════════════════════════════╗
// ║ ⬇⬇ TEMPEL FOTO BARU TEPAT DI BAWAH INI ⬇⬇  ║
// ╚═══════════════════════════════════════════════╝
export const photos: Photo[] = [
  { title: "Forest Morning", meaning: "Momen tenang di hutan saat kabut menyapa matahari dan mengubah tanah menjadi lukisan yang hidup.", location: "Hutan", takenAt: "2026", camera: "Sony A7 IV", image: "photography-01.svg", ratio: "3:2" },
  { title: "Mountain Mist", meaning: "Langkah lambat di medan tinggi, di antara kabut dan angin yang membawa cerita alam yang tenang.", location: "Pegunungan", takenAt: "2026", camera: "Canon R5", image: "photography-02.svg", ratio: "4:5" },
  { title: "Golden Hour", meaning: "Warna hangat senja menciptakan kedalaman, emosi, dan ritme yang terasa alami pada setiap frame.", location: "Alam terbuka", takenAt: "2025", camera: "Fujifilm X-T4", image: "photography-03.svg", ratio: "16:9" },
  { title: "Ocean Waves", meaning: "Gelombang dan cahaya laut dikuak dalam komposisi yang menggambarkan ritme dan kebebasan.", location: "Pantai", takenAt: "2025", camera: "Sony A7R IV", image: "photography-04.svg", ratio: "1:1" },
  { title: "Wildflowers", meaning: "Detail kecil dari bunga liar yang mengingatkan betapa indahnya keseimbangan yang sederhana.", location: "Padang bunga", takenAt: "2025", camera: "Canon EOS R", image: "photography-05.svg", ratio: "2:3" },
  { title: "Night Sky", meaning: "Keheningan malam, bintang, dan emosi yang datang begitu perlahan dari langit yang luas.", location: "Alam terbuka", takenAt: "2025", camera: "Nikon Z6", image: "photography-06.svg", ratio: "4:3" },
  { title: "Autumn Path", meaning: "Jejak setapak melewati dedaunan musim gugur, menghadirkan suasana hangat dan perjalanan yang tenang.", location: "Hutan musim gugur", takenAt: "2025", camera: "Sony A7 IV", image: "photos/autumn-path.webp", ratio: "2:3" },
  { title: "Still Lake", meaning: "Permukaan danau yang tenang memantulkan langit dan pegunungan dalam suasana pagi yang hening.", location: "Danau pegunungan", takenAt: "2025", camera: "Canon R5", image: "photos/still-lake.webp", ratio: "3:2" },
];
