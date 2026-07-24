// =========================================================================
// 📘 MATERI 1: ExpressJS Introduction
// =========================================================================

/*
  ============================
  APA ITU EXPRESS.JS?
  ============================

  Express.js adalah sebuah FRAMEWORK (kerangka kerja) untuk Node.js 
  yang digunakan untuk membangun Web Server dan REST API.

  Analoginya:
  - Node.js = Mesin mobil (bisa jalan, tapi harus rakit sendiri)
  - Express.js = Mobil jadi (tinggal pakai, semua sudah dirakit)

  Tanpa Express, kita harus menulis server HTTP dari nol pakai module 'http' bawaan Node.js.
  Dengan Express, kita bisa membuat server cukup dalam beberapa baris kode saja.

  ============================
  KENAPA PAKAI EXPRESS.JS?
  ============================
  1. Simpel & Minimalis - Tidak banyak boilerplate code.
  2. Routing mudah - Menentukan URL dan metode HTTP (GET, POST, dll) sangat gampang.
  3. Middleware - Bisa menambahkan "lapisan logika" sebelum request diproses.
  4. Komunitas besar - Banyak tutorial, plugin, dan dukungan.

  ============================
  INSTALASI
  ============================
  Sebelum mulai, pastikan Node.js sudah terinstall.

  1. Buat folder project baru
     > mkdir nama-project
     > cd nama-project

  2. Inisialisasi project Node.js
     > npm init -y
     (Ini akan membuat file package.json)

  3. Install Express
     > npm install express

  ============================
  YANG HARUS DIPERHATIKAN
  ============================
  ⚠️ Express BUKAN bahasa pemrograman baru. Express hanyalah library/framework JavaScript.
  ⚠️ Pastikan sudah paham dasar JavaScript (function, object, callback) sebelum belajar Express.
  ⚠️ Jangan lupa jalankan `npm install` setiap kali clone project baru (agar folder node_modules terisi).
  ⚠️ File 'node_modules' JANGAN pernah di-push ke GitHub. Tambahkan ke .gitignore!
*/


// =========================================================================
// MEMBUAT SERVER PERTAMA DENGAN EXPRESS
// =========================================================================

// ✅ BENAR - Cara standar membuat server Express
const express = require("express"); // 1. Import library express
const app = express();               // 2. Buat instance aplikasi Express
const PORT = 3000;                   // 3. Tentukan nomor PORT

// 4. Buat route pertama: Ketika user mengakses "/" (halaman utama)
app.get("/", (req, res) => {
  res.send("Halo! Selamat datang di Express.js");
});

// 5. Nyalakan server di PORT yang sudah ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

/*
  Cara menjalankan:
  > node 1.ExpressJS_Introduction.js

  Lalu buka browser dan ketik: http://localhost:3000
  Anda akan melihat tulisan "Halo! Selamat datang di Express.js"
*/


// ❌ SALAH - Lupa memanggil express() sebagai fungsi
/*
const app = express;  // SALAH! Ini hanya menyimpan referensi ke module, bukan membuat instance
app.get("/", ...);    // ERROR: app.get is not a function
*/


// ❌ SALAH - Lupa memanggil app.listen()
/*
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Halo!");
});

// Tanpa app.listen(), server TIDAK AKAN PERNAH MENYALA.
// Browser tidak akan bisa mengakses localhost.
*/


// ❌ SALAH - Menggunakan console.log() untuk mengirim data ke browser
/*
app.get("/", (req, res) => {
  console.log("Halo!");  // Ini hanya muncul di TERMINAL, bukan di BROWSER
  // Browser akan loading terus karena tidak ada response yang dikirim!
});
*/
// ✅ BENAR - Gunakan res.send() atau res.json() untuk mengirim data ke browser


// =========================================================================
// PERBEDAAN res.send() vs res.json()
// =========================================================================

/*
  res.send()  -> Mengirim response berupa teks, HTML, atau apapun.
  res.json()  -> Mengirim response KHUSUS dalam format JSON (biasanya untuk API).

  Kapan pakai yang mana?
  - Kalau bikin website biasa (ada HTML) -> res.send()
  - Kalau bikin REST API (data untuk frontend/mobile app) -> res.json()
*/

// ✅ BENAR - Mengirim teks biasa
app.get("/text", (req, res) => {
  res.send("Ini adalah teks biasa");
});

// ✅ BENAR - Mengirim data JSON (untuk API)
app.get("/api/user", (req, res) => {
  res.json({
    nama: "Rey",
    umur: 25,
    role: "Fullstack Developer"
  });
});

// ❌ SALAH - Mengirim response lebih dari sekali dalam satu route
/*
app.get("/double", (req, res) => {
  res.send("Pertama");
  res.send("Kedua");  // ERROR: Cannot set headers after they are sent to the client
  // Satu request hanya boleh punya SATU response!
});
*/


// =========================================================================
// STRUKTUR DASAR PROJECT EXPRESS
// =========================================================================

/*
  Berikut struktur folder yang umum digunakan:

  nama-project/
  ├── node_modules/       <- Folder library (JANGAN di-push ke GitHub)
  ├── package.json        <- Daftar dependency & konfigurasi project
  ├── package-lock.json   <- Versi exact dari semua dependency
  ├── .gitignore          <- Daftar file/folder yang diabaikan Git
  └── index.js            <- File utama server (entry point)

  Isi .gitignore yang WAJIB:
  node_modules/
*/


// =========================================================================
// RINGKASAN MATERI 1
// =========================================================================

/*
  ✅ Express.js = Framework Node.js untuk membuat Web Server & API.
  ✅ Install dengan: npm install express
  ✅ Pola dasar: require -> express() -> app.get() -> app.listen()
  ✅ res.send() untuk teks/HTML, res.json() untuk data JSON.
  ✅ Satu request = Satu response. Jangan kirim response dua kali!
  ✅ Server harus dinyalakan dengan app.listen(PORT).
  ✅ Selalu tambahkan node_modules/ ke .gitignore.
*/
