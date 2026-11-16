# Cara Menambah Karya

1. Buka file kategori di `content/portfolio/` (`web.ts`, `slides.ts`, `logo.ts`, `poster.ts`, `writing.ts`, atau `photos.ts`).
2. Salin contoh pada blok **SALIN DARI SINI**, isi field yang diperlukan, lalu tambahkan objek baru di bawah penanda **TAMBAHKAN ITEM BARU**. Urutan array adalah urutan tampil; item terbaru taruh paling atas.
3. Untuk karya web, slides, logo, atau poster, simpan gambar di `public/images/works/<kategori>/<slug>/`. Letakkan gambar sampul sebagai `cover.webp` dan gambar halaman di `pages/01.webp`, `02.webp`, dan seterusnya. Nama halaman diurutkan secara natural; file `*.thumb.webp` diabaikan. Caption halaman opsional diisi melalui `captions`.
4. Untuk menambah foto:
   1. Taruh file di `public/images/photos/`.
   2. Salin satu blok template di bagian atas `content/portfolio/photos.ts` dan isi datanya.
   3. Tempel blok di bawah penanda. Urutan array menentukan urutan slider/galeri; `ratio` opsional.
5. Untuk karya tulis, isi `writing.type`, `writing.body`, dan opsional `writing.date`. Gunakan `\n` untuk menjaga baris atau bait.
6. Untuk menyembunyikan item tanpa menghapus datanya, set `hidden: true`.
