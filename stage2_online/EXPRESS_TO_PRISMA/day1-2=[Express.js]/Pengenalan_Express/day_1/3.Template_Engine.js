// =========================================================================
// 📘 MATERI 3: Template Engine
// =========================================================================

const express = require("express");
const app = express();
const PORT = 3000;

/*
  ============================
  APA ITU TEMPLATE ENGINE?
  ============================

  Sampai sekarang, kita mengirim response berupa teks biasa atau JSON.
  Tapi bagaimana jika kita ingin mengirim HALAMAN HTML yang lengkap?

  Ada 2 cara:
  1. Kirim HTML manual lewat res.send("<html>...</html>") -> RIBET & TIDAK SCALABLE
  2. Gunakan TEMPLATE ENGINE -> Cara yang lebih rapi dan profesional

  Template Engine = Alat yang memungkinkan kita menulis HTML 
  dengan "lubang-lubang" yang bisa diisi data dinamis dari server.

  Analogi:
  - Template = Surat undangan yang sudah jadi, tapi nama tamunya masih kosong.
  - Data dari Server = Daftar nama tamu yang akan mengisi kekosongan itu.
  - Template Engine = Mesin printer yang menggabungkan keduanya.

  ============================
  JENIS-JENIS TEMPLATE ENGINE
  ============================
  1. EJS        -> Sintaks mirip HTML biasa, pakai <% %> untuk kode JS. (Paling mudah untuk pemula)
  2. Handlebars -> Sintaks pakai {{ }}, lebih sederhana tapi lebih terbatas.
  3. Pug (Jade) -> Sintaks tanpa tag HTML penutup, sangat ringkas tapi beda dari HTML biasa.
  
  Di materi ini kita fokus ke konsep umum Template Engine.
  Di materi 4 kita akan praktek dengan Handlebars.

  ============================
  YANG HARUS DIPERHATIKAN
  ============================
  ⚠️ Template Engine bekerja di sisi SERVER (Server-Side Rendering / SSR).
  ⚠️ Browser TIDAK pernah melihat kode template. Browser hanya menerima HTML jadi.
  ⚠️ Berbeda dengan React/Vue yang merender di sisi CLIENT (Client-Side Rendering / CSR).
*/


// =========================================================================
// SECTION 1: SETUP TEMPLATE ENGINE (Contoh dengan EJS)
// =========================================================================

/*
  Install EJS terlebih dahulu:
  > npm install ejs

  Lalu set di Express:
*/

// ✅ BENAR - Setup EJS sebagai template engine
app.set("view engine", "ejs");  // Memberitahu Express: "Gunakan EJS untuk me-render HTML"
app.set("views", "./views");     // Memberitahu Express: "Cari file template di folder 'views'"

/*
  Struktur folder yang dibutuhkan:
  
  project/
  ├── views/                <- Folder WAJIB untuk menyimpan file template
  │   ├── index.ejs          <- File template halaman utama
  │   ├── about.ejs          <- File template halaman about
  │   └── users.ejs          <- File template halaman users
  ├── node_modules/
  ├── package.json
  └── index.js (file ini)
*/


// ❌ SALAH - Lupa membuat folder 'views' atau salah nama folder
/*
app.set("views", "./template");  // Jika folder 'template' tidak ada, Express akan error!
// Error: Failed to lookup view "index" in views directory
*/


// ❌ SALAH - Lupa set view engine
/*
// Tanpa app.set("view engine", "ejs"):
app.get("/", (req, res) => {
  res.render("index");  // ERROR! Express tidak tahu harus pakai engine apa.
});
*/


// =========================================================================
// SECTION 2: MENGIRIM DATA KE TEMPLATE (res.render)
// =========================================================================

/*
  Perbedaan utama:
  - res.send()   -> Mengirim teks/HTML mentah
  - res.json()   -> Mengirim data JSON
  - res.render() -> Me-render file template dan mengirim HTML jadi ke browser

  Format: res.render("namaFile", { dataUntukTemplate })
  
  Parameter kedua adalah OBJECT berisi data yang ingin kita kirim ke file template.
*/

// ✅ BENAR - Mengirim data ke template
app.get("/", (req, res) => {
  res.render("index", {
    judul: "Halaman Utama",
    nama: "Rey",
    tahun: 2026
  });
});

/*
  Di dalam file views/index.ejs, data diakses dengan sintaks EJS:
  
  <!-- views/index.ejs -->
  <!DOCTYPE html>
  <html>
  <head>
    <title><%= judul %></title>       <!-- Memasukkan nilai variabel 'judul' -->
  </head>
  <body>
    <h1>Halo, <%= nama %>!</h1>       <!-- Output: Halo, Rey! -->
    <p>Tahun sekarang: <%= tahun %></p> <!-- Output: Tahun sekarang: 2026 -->
  </body>
  </html>
*/


// ✅ BENAR - Mengirim Array ke template (untuk dilooping di template)
app.get("/users", (req, res) => {
  const daftarUser = [
    { nama: "Andi", umur: 22 },
    { nama: "Budi", umur: 25 },
    { nama: "Citra", umur: 19 }
  ];

  res.render("users", {
    judul: "Daftar Users",
    users: daftarUser
  });
});

/*
  Di dalam file views/users.ejs, kita bisa melakukan LOOPING:

  <!-- views/users.ejs -->
  <h1><%= judul %></h1>
  <ul>
    <% users.forEach(function(user) { %>
      <li><%= user.nama %> - Umur: <%= user.umur %></li>
    <% }) %>
  </ul>
  
  Output HTML yang diterima browser:
  <h1>Daftar Users</h1>
  <ul>
    <li>Andi - Umur: 22</li>
    <li>Budi - Umur: 25</li>
    <li>Citra - Umur: 19</li>
  </ul>
*/


// ❌ SALAH - Lupa mengirim data yang dibutuhkan template
/*
app.get("/", (req, res) => {
  res.render("index");  // Tidak mengirim object data apapun
});
// Jika di template ada <%= nama %>, akan muncul error:
// "nama is not defined"
*/


// ❌ SALAH - Nama variabel di render() tidak cocok dengan di template
/*
app.get("/", (req, res) => {
  res.render("index", {
    username: "Rey"    // Mengirim sebagai 'username'
  });
});
// Tapi di template menulis: <%= nama %>
// 'nama' tidak ditemukan -> ERROR!
// Harus konsisten: yang dikirim 'username', yang dipanggil juga <%= username %>
*/


// =========================================================================
// SECTION 3: SINTAKS EJS (Referensi Cepat)
// =========================================================================

/*
  | Sintaks          | Kegunaan                              | Contoh                     |
  |------------------|---------------------------------------|----------------------------|
  | <%= variabel %>  | Menampilkan NILAI variabel ke HTML    | <%= nama %> -> "Rey"       |
  | <% kode JS %>   | Menjalankan kode JS TANPA output      | <% if (umur > 18) { %>     |
  | <%- htmlCode %>  | Menampilkan HTML TANPA di-escape      | <%- "<b>Tebal</b>" %>      |

  ⚠️ YANG HARUS DIPERHATIKAN:
  - <%= %> akan melakukan HTML escaping (aman dari XSS attack).
    Contoh: <%= "<script>alert('hack')</script>" %> -> ditampilkan sebagai TEKS, bukan dieksekusi.
  - <%- %> TIDAK melakukan escaping (berbahaya jika data dari user).
    Gunakan <%- %> HANYA untuk HTML yang kamu buat sendiri, BUKAN dari input user!
*/


// =========================================================================
// SECTION 4: STATIC FILES (CSS, JS, Gambar)
// =========================================================================

/*
  Template Engine hanya mengurus HTML. Bagaimana dengan CSS, JavaScript frontend, 
  dan gambar? Kita butuh middleware 'express.static' untuk melayani file-file tersebut.
*/

// ✅ BENAR - Menyajikan file statis dari folder 'public'
app.use(express.static("public"));

/*
  Struktur folder:
  
  project/
  ├── public/               <- Folder untuk file statis
  │   ├── css/
  │   │   └── style.css
  │   ├── js/
  │   │   └── script.js
  │   └── images/
  │       └── logo.png
  ├── views/
  │   └── index.ejs
  └── index.js

  Di dalam template (views/index.ejs), cara memanggilnya:
  <link rel="stylesheet" href="/css/style.css">        <!-- Tidak perlu tulis 'public/' -->
  <script src="/js/script.js"></script>
  <img src="/images/logo.png">
  
  ⚠️ Perhatikan: Path dimulai dari DALAM folder 'public', bukan dari root project.
  ⚠️ Jangan tulis href="/public/css/style.css" -> SALAH!
  ⚠️ Yang benar: href="/css/style.css"
*/


// =========================================================================
// RINGKASAN MATERI 3
// =========================================================================

/*
  ✅ Template Engine = Alat untuk menggabungkan HTML + Data Dinamis dari server.
  ✅ Setup: app.set("view engine", "ejs") + app.set("views", "./views")
  ✅ Kirim data ke template dengan: res.render("namaFile", { data })
  ✅ Sintaks EJS: <%= %> untuk output, <% %> untuk logika JS.
  ✅ File statis (CSS/JS/Gambar) disajikan lewat: app.use(express.static("public"))
  ✅ Nama variabel di res.render() HARUS SAMA dengan yang dipanggil di template.
  ✅ Browser hanya menerima HTML jadi, TIDAK pernah melihat kode template.
*/

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
