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
    slug: "nekakultur",
    title: "NekaKultur",
    description: "NekaKultur adalah platform edukasi interaktif yang didedikasikan untuk melestarikan dan mempromosikan kekayaan budaya Indonesia. NekaKultur menghadirkan sistem pembelajaran budaya yang terstruktur berdasarkan provinsi, dilengkapi dengan konten multimedia serta fitur evaluasi dan partisipasi pengguna. Melalui pendekatan ini, platform diharapkan dapat menjadi sarana edukasi yang efektif dalam meningkatkan pemahaman, minat, serta peran aktif pelajar dalam melestarikan kebudayaan Indonesia di era digital.",
    year: 2026,
    tags: ["Edukasi Budaya", "Platform Interaktif", "Capstone Project"],
    tools: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Express", "MySQL"],
    captions: ["Halaman utama NekaKultur", "Masuk ke akun", "Daftar akun", "Jelajahi daerah", "Budaya Bali", "Payas Agung", "Tari Pendet", "Alat musik tradisional — Rindik", "Makanan khas — Sate Lilit", "Kuis budaya Bali"],
    team: { name: "Chantikka Revinna", role: "Designer & Developer" },
    liveUrl: "https://nekakultur.vercel.app",
    repoUrl: "https://github.com/Capstone-Project-CC26-PS065/nekakultur.git",
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
