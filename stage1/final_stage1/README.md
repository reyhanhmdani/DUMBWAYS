# ReyApp

Project slicing web sosial media sederhana pakai HTML, JS Vanilla, dan Tailwind CSS.

## Cara Install dan Menjalankan

1. Pastikan kamu sudah menginstall **Node.js** di komputermu.
2. Buka terminal di folder project ini, lalu jalankan perintah berikut untuk menginstall Tailwind:
   ```bash
   npm install
   ```

3. Untuk menjalankan Tailwind supaya otomatis meng-compile CSS setiap ada perubahan kode, jalankan:
   ```bash
   npm run watch
   ```
   *(Biarkan terminal ini tetap terbuka selama kamu ngoding).*

4. Kalau kamu mau mem-build CSS untuk versi production (sekali jalan), bisa pakai:
   ```bash
   npm run build
   ```

5. Untuk membuka web-nya, cukup buka file `home.html` (atau file HTML lainnya) langsung di browser, atau gunakan ekstensi **Live Server** di VS Code supaya halamannya otomatis refresh.

## Fitur
- Tampilan pakai efek *glassmorphism* (Tailwind).
- Data dummy feed dan profile.
- Bisa bikin post baru (langsung masuk ke paling atas).
- Data disimpan di Local Storage (jadi gak hilang kalau di-refresh).
