// =========================================================================
// 📘 MATERI 4: Handlebars (Template Engine)
// =========================================================================

const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const PORT = 3000;

/*
  ============================
  APA ITU HANDLEBARS?
  ============================

  Handlebars adalah salah satu Template Engine yang populer di Express.js.
  Dibandingkan EJS, Handlebars memiliki filosofi yang berbeda:
  
  EJS        -> "Logic-full" (Bisa menulis kode JS apapun di dalam template).
  Handlebars -> "Logic-less" (Logika di template SANGAT DIBATASI).
  
  Kenapa logic-less?
  Karena Handlebars percaya bahwa LOGIKA seharusnya ada di SERVER (file .js),
  bukan di dalam file HTML/template. Template hanya bertugas MENAMPILKAN data.
  
  Analogi:
  - EJS = Koki yang boleh improvisasi resep di dapur (fleksibel tapi bisa berantakan)
  - Handlebars = Koki yang harus ikuti resep baku (terbatas tapi lebih terstruktur)

  ============================
  INSTALASI
  ============================
  > npm install express-handlebars

  ============================
  YANG HARUS DIPERHATIKAN
  ============================
  ⚠️ Extension file template Handlebars biasanya .handlebars atau .hbs
  ⚠️ Handlebars TIDAK BISA menjalankan JavaScript biasa di dalam template.
  ⚠️ Untuk logika, gunakan HELPER bawaan (#if, #each, #unless, #with).
  ⚠️ Handlebars memiliki konsep LAYOUT (template induk) yang membungkus semua halaman.
*/


// =========================================================================
// SECTION 1: SETUP HANDLEBARS DI EXPRESS
// =========================================================================

// ✅ BENAR - Setup Handlebars
app.engine("handlebars", engine());           // Daftarkan engine Handlebars
app.set("view engine", "handlebars");         // Set sebagai default template engine
app.set("views", "./views");                  // Lokasi folder views

/*
  STRUKTUR FOLDER WAJIB untuk Handlebars:

  project/
  ├── views/
  │   ├── layouts/
  │   │   └── main.handlebars       <- LAYOUT UTAMA (template induk / master)
  │   ├── home.handlebars            <- Halaman home (konten)
  │   ├── about.handlebars           <- Halaman about (konten)
  │   └── users.handlebars           <- Halaman users (konten)
  ├── public/
  │   └── css/
  │       └── style.css
  ├── node_modules/
  ├── package.json
  └── index.js

  ⚠️ Folder 'layouts' di dalam 'views' itu WAJIB ada!
  ⚠️ File 'main.handlebars' adalah nama default layout. Jika tidak ada, Express akan error.
*/


// ❌ SALAH - Lupa membuat folder layouts/ atau file main.handlebars
/*
// Jika folder views/layouts/main.handlebars tidak ada:
// Error: ENOENT: no such file or directory, open '...\views\layouts\main.handlebars'
*/


// =========================================================================
// SECTION 2: LAYOUT (Template Induk)
// =========================================================================

/*
  Layout adalah kerangka HTML utama yang membungkus SEMUA halaman.
  Bagian yang berubah-ubah (konten tiap halaman) ditandai dengan: {{{body}}}

  ============================
  Contoh file: views/layouts/main.handlebars
  ============================

  <!DOCTYPE html>
  <html lang="id">
  <head>
    <meta charset="UTF-8">
    <title>{{judul}}</title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>

    <main>
      {{{body}}}         <-- Konten halaman akan dimasukkan di sini!
    </main>

    <footer>
      <p>&copy; 2026 KelasFullstackJS</p>
    </footer>
  </body>
  </html>

  ⚠️ KRUSIAL: Perhatikan perbedaan kurung kurawal!
  - {{variabel}}  = 2 kurung -> Menampilkan data DENGAN escaping (aman dari XSS)
  - {{{body}}}    = 3 kurung -> Menampilkan HTML TANPA escaping (untuk memasukkan konten mentah)
*/


// =========================================================================
// SECTION 3: HALAMAN KONTEN (Views)
// =========================================================================

/*
  Setiap halaman konten HANYA berisi bagian yang berubah (isinya saja).
  TIDAK perlu menulis ulang <html>, <head>, <body>, navbar, dan footer.
  Semua itu sudah diurus oleh LAYOUT (main.handlebars).

  ============================
  Contoh file: views/home.handlebars
  ============================

  <h1>{{judul}}</h1>
  <p>Selamat datang, {{nama}}!</p>
  <p>Pesan dari server: {{pesan}}</p>

  ============================
  Contoh file: views/about.handlebars
  ============================

  <h1>Tentang Kami</h1>
  <p>Kami adalah {{namaPerusahaan}}</p>
*/


// =========================================================================
// SECTION 4: MENGIRIM DATA KE TEMPLATE
// =========================================================================

// ✅ BENAR - Render halaman dengan data
app.get("/", (req, res) => {
  res.render("home", {
    judul: "Halaman Utama",
    nama: "Rey",
    pesan: "Semangat belajar Express.js!"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    judul: "Tentang Kami",
    namaPerusahaan: "KelasFullstackJS"
  });
});


// ❌ SALAH - Typo nama file template
/*
app.get("/", (req, res) => {
  res.render("Home");  // SALAH! File bernama 'home.handlebars', bukan 'Home.handlebars'
  // File system case-sensitive di Linux. Biasakan selalu lowercase.
});
*/


// =========================================================================
// SECTION 5: HELPER BAWAAN HANDLEBARS
// =========================================================================

/*
  Karena Handlebars "logic-less", ia menyediakan HELPER khusus untuk
  melakukan logika sederhana di dalam template.

  =================
  1. #if / #else
  =================
  Menampilkan konten secara KONDISIONAL.
  
  <div>
    {{#if isPremium}}
      <p>Selamat datang, member Premium! 🌟</p>
    {{else}}
      <p>Upgrade ke Premium untuk fitur lengkap.</p>
    {{/if}}
  </div>

  ⚠️ PENTING: #if di Handlebars HANYA mengecek apakah nilai itu TRUTHY atau FALSY.
  ⚠️ Handlebars TIDAK BISA melakukan komparasi: {{#if umur > 18}} -> TIDAK BISA!
  ⚠️ Logika komparasi harus dilakukan di SERVER, lalu kirim hasilnya sebagai boolean.
*/

// ✅ BENAR - Logika komparasi dilakukan di server
app.get("/profile", (req, res) => {
  const umurUser = 20;

  res.render("profile", {
    nama: "Andi",
    isPremium: true,
    bisaMasuk: umurUser >= 18  // Komparasi di sini (server), bukan di template!
  });
});

// ❌ SALAH - Mencoba komparasi di dalam template Handlebars
/*
  Template Handlebars:
  {{#if umur > 18}}           <- TIDAK BISA! Handlebars tidak mengerti operator >
    <p>Boleh masuk</p>
  {{/if}}
  
  Yang benar: Kirim hasilnya dari server sebagai boolean 'bisaMasuk: true/false'
  Lalu di template: {{#if bisaMasuk}} <p>Boleh masuk</p> {{/if}}
*/


/*
  =================
  2. #each
  =================
  Untuk melakukan LOOPING pada Array. Mirip forEach di JavaScript.
  Di dalam #each, gunakan {{this}} untuk mengakses elemen saat ini.

  Contoh data dari server:
  { buahList: ["Apel", "Mangga", "Jeruk"] }

  Template:
  <ul>
    {{#each buahList}}
      <li>{{this}}</li>         <- 'this' merujuk ke elemen saat ini
    {{/each}}
  </ul>

  Output HTML:
  <ul>
    <li>Apel</li>
    <li>Mangga</li>
    <li>Jeruk</li>
  </ul>
*/

// ✅ BENAR - Mengirim array of objects untuk di-loop di template
app.get("/products", (req, res) => {
  const daftarProduk = [
    { nama: "Laptop", harga: 15000000 },
    { nama: "Mouse", harga: 250000 },
    { nama: "Keyboard", harga: 500000 }
  ];

  res.render("products", {
    judul: "Daftar Produk",
    produkList: daftarProduk,
    adaProduk: daftarProduk.length > 0  // Kirim boolean untuk dicek #if di template
  });
});

/*
  Template views/products.handlebars:

  <h1>{{judul}}</h1>

  {{#if adaProduk}}
    <table>
      <tr><th>Nama</th><th>Harga</th></tr>
      {{#each produkList}}
        <tr>
          <td>{{this.nama}}</td>        <- Akses property 'nama' dari object saat ini
          <td>Rp {{this.harga}}</td>     <- Akses property 'harga' dari object saat ini
        </tr>
      {{/each}}
    </table>
  {{else}}
    <p>Belum ada produk.</p>
  {{/if}}
*/


/*
  =================
  3. #unless
  =================
  Kebalikan dari #if. Menampilkan konten jika nilai FALSY.

  {{#unless sudahLogin}}
    <p>Silakan login terlebih dahulu.</p>
  {{/unless}}

  Sama saja dengan: {{#if (NOT sudahLogin)}}
*/


// =========================================================================
// SECTION 6: PERBANDINGAN EJS vs HANDLEBARS
// =========================================================================

/*
  | Fitur             | EJS                      | Handlebars                |
  |--------------------|--------------------------|---------------------------|
  | Sintaks Output     | <%= variabel %>          | {{variabel}}              |
  | Logika di Template | Boleh (JS bebas)         | Terbatas (hanya helper)   |
  | Looping            | <% arr.forEach(...) %>   | {{#each arr}}...{{/each}} |
  | Kondisi            | <% if (x > 5) %>         | {{#if x}} (tanpa logika)  |
  | Layout System      | Manual (include)         | Built-in (main.handlebars)|
  | Ekstensi File      | .ejs                     | .handlebars atau .hbs     |
  | Filosofi           | Fleksibel                | Terstruktur               |

  Mana yang lebih baik?
  -> Tidak ada yang "lebih baik". Tergantung kebutuhan dan preferensi tim.
  -> EJS lebih mudah untuk pemula yang sudah terbiasa HTML + JS.
  -> Handlebars lebih aman karena memaksa pemisahan logika dan tampilan.
*/


// =========================================================================
// RINGKASAN MATERI 4
// =========================================================================

/*
  ✅ Handlebars = Template Engine "logic-less" (logika minimal di template).
  ✅ Install: npm install express-handlebars
  ✅ Setup: app.engine("handlebars", engine()) + app.set("view engine", "handlebars")
  ✅ WAJIB punya folder views/layouts/main.handlebars (Layout utama).
  ✅ Layout menggunakan {{{body}}} (3 kurung) untuk menampilkan konten halaman.
  ✅ {{variabel}} = 2 kurung = output aman (escaped).
  ✅ {{{html}}} = 3 kurung = output mentah (unescaped, hati-hati XSS!).
  ✅ Helper bawaan: #if, #else, #each, #unless, #with.
  ✅ Handlebars TIDAK BISA melakukan komparasi (>, <, ===) di template.
     -> Lakukan komparasi di SERVER, kirim hasilnya sebagai boolean.
  ✅ Di dalam #each, gunakan {{this}} atau {{this.properti}} untuk akses data.
*/

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
