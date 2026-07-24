// =========================================================================
// 📘 MATERI 2: Request, Response, Routing
// =========================================================================

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware agar Express bisa membaca data JSON dari body request
app.use(express.json());

// Middleware agar Express bisa membaca data dari form HTML
app.use(express.urlencoded({ extended: true }));


// =========================================================================
// SECTION 1: APA ITU REQUEST & RESPONSE?
// =========================================================================

/*
  Ketika browser/user mengakses sebuah URL di server kita, terjadi 2 hal:

  1. REQUEST (req) = "Permintaan" dari client (browser/Postman/frontend)
     - Berisi: URL yang diminta, metode HTTP, data yang dikirim, dll.
     
  2. RESPONSE (res) = "Jawaban" dari server kita ke client
     - Berisi: Data yang kita kirim balik (teks, JSON, HTML, dll).

  Analogi:
  - Client = Pelanggan restoran yang memesan makanan (Request)
  - Server = Koki yang memasak dan menyajikan pesanan (Response)
*/


// =========================================================================
// SECTION 2: HTTP METHODS (Metode HTTP)
// =========================================================================

/*
  Ada 4 metode HTTP utama yang WAJIB diketahui (CRUD):

  | Method | Kegunaan                 | Analogi                |
  |--------|--------------------------|------------------------|
  | GET    | Mengambil/membaca data   | Melihat menu restoran  |
  | POST   | Membuat/mengirim data    | Memesan makanan baru   |
  | PUT    | Mengubah/update data     | Mengubah pesanan       |
  | DELETE | Menghapus data           | Membatalkan pesanan    |

  ⚠️ YANG HARUS DIPERHATIKAN:
  - GET tidak boleh punya body (data dikirim lewat URL/query).
  - POST dan PUT mengirim data lewat body.
  - Nama method HARUS lowercase di Express: app.get(), app.post(), BUKAN app.GET()
*/


// =========================================================================
// SECTION 3: ROUTING (Menentukan Jalur URL)
// =========================================================================

/*
  Routing = Menentukan "jalan" mana yang mengarah ke "fungsi" mana.
  Format: app.METHOD(PATH, HANDLER)
  
  - METHOD = get, post, put, delete
  - PATH = URL yang ingin diakses (contoh: "/", "/users", "/products/123")
  - HANDLER = Fungsi callback yang menerima (req, res)
*/

// --- GET Routes ---

// ✅ BENAR - Route dasar
app.get("/", (req, res) => {
  res.send("Halaman Utama");
});

app.get("/about", (req, res) => {
  res.send("Halaman Tentang Kami");
});

app.get("/contact", (req, res) => {
  res.send("Halaman Kontak");
});


// ❌ SALAH - Route tanpa diawali garis miring (/)
/*
app.get("about", (req, res) => {  // SALAH! Path HARUS diawali /
  res.send("Tentang");
});
*/


// ❌ SALAH - Duplikasi route yang sama
/*
app.get("/about", (req, res) => {
  res.send("Tentang versi 1");
});
app.get("/about", (req, res) => {
  res.send("Tentang versi 2");  // TIDAK PERNAH TEREKSEKUSI!
});
// Express hanya menjalankan route PERTAMA yang cocok. Yang kedua diabaikan.
*/


// =========================================================================
// SECTION 4: ROUTE PARAMETERS (req.params)
// =========================================================================

/*
  Route Parameter digunakan ketika kita ingin URL-nya DINAMIS (berubah-ubah).
  Ditandai dengan titik dua (:) di depan nama parameter.
  
  Contoh: /users/:id -> bisa diakses sebagai /users/1, /users/2, /users/abc, dll.
  Data dari parameter itu diambil lewat: req.params.namaParameter
*/

// ✅ BENAR - Menggunakan route parameter
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({
    pesan: `Anda sedang melihat profil user dengan ID: ${userId}`
  });
});
// Akses: http://localhost:3000/users/5 -> { pesan: "...ID: 5" }
// Akses: http://localhost:3000/users/99 -> { pesan: "...ID: 99" }

// ✅ BENAR - Multiple params
app.get("/products/:category/:productId", (req, res) => {
  res.json({
    kategori: req.params.category,
    idProduk: req.params.productId
  });
});
// Akses: http://localhost:3000/products/elektronik/42


// ❌ SALAH - Lupa titik dua (:), sehingga bukan parameter melainkan path statis
/*
app.get("/users/id", (req, res) => {
  const userId = req.params.id;  // undefined! Karena 'id' bukan parameter, melainkan teks biasa
  res.send(`User: ${userId}`);
});
// Route ini HANYA bisa diakses via /users/id (literal), bukan /users/1 atau /users/2
*/


// =========================================================================
// SECTION 5: QUERY STRING (req.query)
// =========================================================================

/*
  Query String adalah data yang dikirim lewat URL setelah tanda tanya (?).
  Biasanya digunakan untuk fitur SEARCH atau FILTER.
  
  Format URL: /search?keyword=express&page=2
  Cara akses: req.query.keyword -> "express"
              req.query.page -> "2" (selalu STRING!)

  ⚠️ YANG HARUS DIPERHATIKAN:
  - Nilai req.query SELALU bertipe STRING, meskipun isinya angka.
  - Jika butuh Number, konversi manual: Number(req.query.page)
*/

// ✅ BENAR - Menggunakan query string
app.get("/search", (req, res) => {
  const keyword = req.query.keyword || "kosong";  // Default jika tidak diisi
  const page = Number(req.query.page) || 1;       // Konversi ke Number, default 1

  res.json({
    pencarian: keyword,
    halaman: page,
    pesan: `Mencari "${keyword}" di halaman ${page}`
  });
});
// Akses: http://localhost:3000/search?keyword=javascript&page=3


// ❌ SALAH - Mengira query string itu otomatis jadi Number
/*
app.get("/search", (req, res) => {
  const page = req.query.page;
  const nextPage = page + 1;
  res.send(`Halaman berikutnya: ${nextPage}`);
  // Jika page = "2", maka "2" + 1 = "21" (String concatenation!)
  // BUKAN 3 seperti yang diharapkan.
});
*/


// =========================================================================
// SECTION 6: REQUEST BODY (req.body) - POST & PUT
// =========================================================================

/*
  Untuk metode POST dan PUT, data biasanya dikirim lewat BODY request
  (bukan lewat URL). Ini cocok untuk data yang besar atau sensitif (password).

  ⚠️ KRUSIAL: Agar req.body bisa dibaca, Anda WAJIB menambahkan middleware:
  - app.use(express.json())             -> Untuk data format JSON
  - app.use(express.urlencoded(...))     -> Untuk data dari form HTML
  
  Tanpa middleware ini, req.body akan bernilai UNDEFINED!
*/

// ✅ BENAR - Menerima data dari POST request
app.post("/users", (req, res) => {
  const { nama, email } = req.body; // Destructuring data dari body

  // Validasi sederhana
  if (!nama || !email) {
    return res.status(400).json({ error: "Nama dan email wajib diisi!" });
  }

  res.status(201).json({
    pesan: "User berhasil dibuat!",
    data: { nama, email }
  });
});

// ✅ BENAR - PUT untuk update data
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const { nama } = req.body;

  res.json({
    pesan: `User ${userId} berhasil diupdate`,
    namaBaru: nama
  });
});

// ✅ BENAR - DELETE untuk hapus data
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({ pesan: `User ${userId} berhasil dihapus` });
});


// ❌ SALAH - Lupa middleware, req.body jadi undefined
/*
// Jika app.use(express.json()) TIDAK dipasang di atas:
app.post("/register", (req, res) => {
  console.log(req.body);  // undefined!
  // Server tidak bisa membaca data yang dikirim oleh client.
});
*/


// ❌ SALAH - Menggunakan req.params untuk data yang seharusnya ada di body
/*
app.post("/users", (req, res) => {
  const nama = req.params.nama;  // undefined!
  // Data POST dikirim lewat BODY, bukan lewat URL.
  // Yang benar: req.body.nama
});
*/


// =========================================================================
// SECTION 7: STATUS CODE (Kode Status HTTP)
// =========================================================================

/*
  Setiap response yang dikirim server memiliki "kode status" yang menandakan hasilnya.

  | Kode | Arti                     | Kapan Digunakan                    |
  |------|--------------------------|------------------------------------|
  | 200  | OK (Sukses)              | Data berhasil diambil/diproses     |
  | 201  | Created                  | Data baru berhasil dibuat          |
  | 400  | Bad Request              | Client mengirim data yang salah    |
  | 404  | Not Found                | Data/halaman tidak ditemukan       |
  | 500  | Internal Server Error    | Ada error di server kita           |

  ⚠️ YANG HARUS DIPERHATIKAN:
  Jika Anda tidak menuliskan status code, Express akan mengirim 200 secara default.
  Namun, best practice adalah SELALU menuliskannya secara eksplisit.
*/

// ✅ BENAR - Menggunakan status code yang sesuai
app.get("/products/:id", (req, res) => {
  const produk = null; // Simulasi: produk tidak ditemukan

  if (!produk) {
    return res.status(404).json({ error: "Produk tidak ditemukan" });
  }

  res.status(200).json(produk);
});


// =========================================================================
// RINGKASAN & CHEATSHEET
// =========================================================================

/*
  ==============================
  CARA MENDAPATKAN DATA DARI CLIENT
  ==============================

  | Sumber       | Cara Akses           | Contoh URL / Data               |
  |--------------|----------------------|----------------------------------|
  | URL Params   | req.params.nama      | /users/:id -> /users/5           |
  | Query String | req.query.nama       | /search?keyword=js               |
  | Body         | req.body.nama        | POST { "nama": "Rey" }           |

  ==============================
  PERBEDAAN PARAMS vs QUERY vs BODY
  ==============================
  
  - PARAMS  -> Untuk IDENTITAS spesifik (ID user, ID produk). Bagian dari URL path.
  - QUERY   -> Untuk FILTER / PENCARIAN. Opsional, setelah tanda (?).
  - BODY    -> Untuk DATA BESAR / SENSITIF. Hanya ada di POST & PUT.
  
  ==============================
  CHECKLIST SEBELUM CODING
  ==============================
  ✅ Sudah pasang express.json() dan urlencoded() di atas route?
  ✅ Path route diawali dengan /?
  ✅ Parameter dinamis pakai titik dua (:)?
  ✅ Sudah return sebelum res berikutnya di dalam if/else?
  ✅ Status code sudah sesuai konteks?
*/


// Nyalakan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
