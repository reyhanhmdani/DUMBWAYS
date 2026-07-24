// ============================================================
// #3 - DATABASE STRUCTURE
// Struktur Database: Normalisasi, Relasi, dan Best Practices
// ============================================================


// ============================================================
// 📌 APA ITU DATABASE STRUCTURE?
// ============================================================
// Database Structure = bagaimana kamu mengorganisasi tabel-tabel
// dan relasi di database agar data EFISIEN, KONSISTEN, dan MUDAH DI-QUERY.
//
// Analoginya:
// - Kode JavaScript → butuh "Clean Code" agar rapi dan maintainable.
// - Database        → butuh "Good Structure" agar tidak berantakan.
//
// Database yang strukturnya buruk = NIGHTMARE (mimpi buruk) di production!


// ============================================================
// 📌 NORMALISASI DATABASE
// ============================================================
// Normalisasi = proses menata ulang tabel agar:
// 1. Tidak ada data DUPLIKAT (redundan)
// 2. Tidak ada ANOMALI saat insert, update, atau delete
// 3. Setiap tabel punya satu tanggung jawab (Separation of Concerns!)
//
// Ada beberapa "level" normalisasi, tapi yang paling penting 3 pertama:


// ============================================================
// 📌 1NF (First Normal Form)
// ============================================================
// Aturan: Setiap kolom hanya boleh menyimpan SATU NILAI (atomic).
//         Tidak boleh ada data berupa list/array di dalam satu kolom.

// ❌ SALAH (Melanggar 1NF):
// ┌─────┬──────────┬─────────────────────────┐
// │ id  │ nama     │ skills                  │
// ├─────┼──────────┼─────────────────────────┤
// │  1  │ Rey      │ JavaScript, Python, Go  │  ← 3 nilai dalam 1 kolom!
// │  2  │ Budi     │ PHP, Laravel            │
// └─────┴──────────┴─────────────────────────┘
//
// Masalah:
// - Bagaimana cara query "cari semua user yang bisa JavaScript"?
// - Harus pakai LIKE '%JavaScript%' → lambat dan rawan salah!

// ✅ BENAR (Memenuhi 1NF):
// Pisahkan ke tabel baru!
//
// Tabel "users":
// ┌─────┬──────────┐
// │ id  │ nama     │
// ├─────┼──────────┤
// │  1  │ Rey      │
// │  2  │ Budi     │
// └─────┴──────────┘
//
// Tabel "user_skills":
// ┌─────┬──────────┬────────────┐
// │ id  │ user_id  │ skill      │
// ├─────┼──────────┼────────────┤
// │  1  │    1     │ JavaScript │
// │  2  │    1     │ Python     │
// │  3  │    1     │ Go         │
// │  4  │    2     │ PHP        │
// │  5  │    2     │ Laravel    │
// └─────┴──────────┴────────────┘
//
// Sekarang query jadi mudah:
// SELECT * FROM user_skills WHERE skill = 'JavaScript';


// ============================================================
// 📌 2NF (Second Normal Form)
// ============================================================
// Aturan: Sudah 1NF + Setiap kolom non-key harus bergantung
//         SEPENUHNYA pada Primary Key (bukan hanya sebagian).

// ❌ SALAH (Melanggar 2NF):
// Tabel "order_items" (PK gabungan: order_id + product_id)
// ┌──────────┬────────────┬────────────┬──────────────┬───────┐
// │ order_id │ product_id │ product_nm │ product_cat  │ qty   │
// ├──────────┼────────────┼────────────┼──────────────┼───────┤
// │    1     │    101     │ Laptop     │ Electronics  │  2    │
// │    1     │    102     │ Mouse      │ Electronics  │  1    │
// │    2     │    101     │ Laptop     │ Electronics  │  1    │
// └──────────┴────────────┴────────────┴──────────────┴───────┘
//
// Masalah: product_nm dan product_cat hanya bergantung pada product_id,
// BUKAN pada gabungan (order_id + product_id).
// "Laptop" tetap "Laptop" mau di order mana pun.
// → Data DUPLIKAT! "Laptop - Electronics" ditulis berulang-ulang.

// ✅ BENAR (Memenuhi 2NF):
// Tabel "products":
// ┌────────────┬────────────┬──────────────┐
// │ product_id │ nama       │ category     │
// ├────────────┼────────────┼──────────────┤
// │    101     │ Laptop     │ Electronics  │
// │    102     │ Mouse      │ Electronics  │
// └────────────┴────────────┴──────────────┘
//
// Tabel "order_items":
// ┌──────────┬────────────┬───────┐
// │ order_id │ product_id │ qty   │
// ├──────────┼────────────┼───────┤
// │    1     │    101     │  2    │
// │    1     │    102     │  1    │
// │    2     │    101     │  1    │
// └──────────┴────────────┴───────┘


// ============================================================
// 📌 3NF (Third Normal Form)
// ============================================================
// Aturan: Sudah 2NF + Tidak ada kolom non-key yang bergantung
//         pada kolom non-key lainnya (transitive dependency).

// ❌ SALAH (Melanggar 3NF):
// ┌─────┬──────────┬──────────────┬─────────────────┐
// │ id  │ nama     │ kota         │ provinsi        │
// ├─────┼──────────┼──────────────┼─────────────────┤
// │  1  │ Rey      │ Klaten       │ Jawa Tengah     │
// │  2  │ Budi     │ Bandung      │ Jawa Barat      │
// │  3  │ Siti     │ Klaten       │ Jawa Tengah     │
// └─────┴──────────┴──────────────┴─────────────────┘
//
// Masalah: "provinsi" bergantung pada "kota", BUKAN pada "id".
// Klaten → Jawa Tengah (ini fakta yang tidak tergantung pada user).
// "Jawa Tengah" ditulis berulang → REDUNDAN.

// ✅ BENAR (Memenuhi 3NF):
// Tabel "cities":
// ┌─────┬──────────────┬─────────────────┐
// │ id  │ nama_kota    │ provinsi        │
// ├─────┼──────────────┼─────────────────┤
// │  1  │ Klaten       │ Jawa Tengah     │
// │  2  │ Bandung      │ Jawa Barat      │
// └─────┴──────────────┴─────────────────┘
//
// Tabel "users":
// ┌─────┬──────────┬──────────┐
// │ id  │ nama     │ city_id  │
// ├─────┼──────────┼──────────┤
// │  1  │ Rey      │    1     │
// │  2  │ Budi     │    2     │
// │  3  │ Siti     │    1     │
// └─────┴──────────┴──────────┘


// ============================================================
// 📌 PRIMARY KEY vs FOREIGN KEY
// ============================================================
//
// PRIMARY KEY (PK):
// - Identitas UNIK untuk setiap row di tabel
// - Tidak boleh NULL, tidak boleh duplikat
// - Biasanya pakai SERIAL (auto-increment)
// - Setiap tabel WAJIB punya Primary Key
//
// FOREIGN KEY (FK):
// - Kolom yang "menunjuk" ke Primary Key di tabel lain
// - Gunanya untuk MENGHUBUNGKAN dua tabel
// - Menjamin data yang direferensikan BENAR-BENAR ADA
//
// Contoh:
/*
  -- users.id adalah PRIMARY KEY
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL
  );

  -- projects.user_id adalah FOREIGN KEY yang menunjuk ke users.id
  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    nama VARCHAR(100) NOT NULL
  );

  -- Artinya:
  -- Kamu TIDAK BISA memasukkan project dengan user_id = 99
  -- kalau di tabel users tidak ada user dengan id = 99.
  -- Database akan MENOLAK! → Ini namanya REFERENTIAL INTEGRITY.
*/


// ============================================================
// 📌 STUDI KASUS: STRUKTUR DATABASE E-COMMERCE SEDERHANA
// ============================================================
//
//  ┌──────────────┐
//  │    USERS     │
//  ├──────────────┤
//  │ PK: id       │──┐
//  │ nama         │  │
//  │ email        │  │     ┌──────────────┐
//  │ password     │  │     │   ORDERS     │
//  └──────────────┘  │     ├──────────────┤
//                    ├────<│ PK: id       │──┐
//                    │     │ FK: user_id  │  │
//                    │     │ total_harga  │  │  ┌──────────────────┐
//                    │     │ status       │  │  │  ORDER_ITEMS     │
//                    │     │ created_at   │  │  ├──────────────────┤
//                    │     └──────────────┘  ├─<│ PK: id           │
//                    │                       │  │ FK: order_id     │
//  ┌──────────────┐  │                       │  │ FK: product_id   │
//  │  PRODUCTS    │  │                       │  │ quantity         │
//  ├──────────────┤  │                       │  │ harga_satuan     │
//  │ PK: id       │──┼───────────────────────┘  └──────────────────┘
//  │ nama         │  │
//  │ harga        │  │
//  │ stok         │  │
//  │ category_id  │──┘
//  └──────────────┘
//
// Relasi:
// 1. users ──< orders        (Satu user bisa punya banyak order)
// 2. orders ──< order_items   (Satu order bisa punya banyak item)
// 3. products ──< order_items (Satu product bisa ada di banyak order)
//
// order_items adalah JUNCTION TABLE (tabel penghubung)
// untuk relasi Many-to-Many antara orders dan products.


// ============================================================
// 📌 SQL QUERY DENGAN RELASI: JOIN
// ============================================================
// JOIN digunakan untuk MENGGABUNGKAN data dari beberapa tabel sekaligus.

// Ambil semua project beserta nama user yang membuatnya:
/*
  SELECT projects.nama AS project_nama,
         projects.deskripsi,
         users.nama AS pembuat
  FROM projects
  JOIN users ON projects.user_id = users.id;

  -- Hasilnya:
  -- ┌────────────────┬──────────────────┬──────────┐
  -- │ project_nama   │ deskripsi        │ pembuat  │
  -- ├────────────────┼──────────────────┼──────────┤
  -- │ Ayobuatbaik    │ Web donasi...    │ Rey      │
  -- │ Andre Raditya  │ Website pribadi  │ Rey      │
  -- └────────────────┴──────────────────┴──────────┘
*/

// 💡 PENJELASAN "ON" DI DALAM JOIN:
//
// "ON" = SYARAT PENCOCOKAN. Dia memberitahu database:
// "Gabungkan baris dari tabel A dengan baris dari tabel B,
//  TAPI HANYA KALAU kondisi ini terpenuhi."
//
//   JOIN users ON projects.user_id = users.id
//   ─────────    ─────────────────────────────
//   "gabungkan"  "syaratnya: user_id di projects harus SAMA dengan id di users"
//
// Tanpa ON, database tidak tahu kolom mana yang harus dicocokkan.
// Ingat: kedua tabel itu TERPISAH. Database butuh tahu
// "kolom mana di tabel A yang nyambung ke kolom mana di tabel B?"
//
// Analoginya seperti .find() di JavaScript:
//
//   // JavaScript:
//   const user = users.find(u => u.id === project.user_id);
//                              ─────────────────────────
//                              INI sama dengan bagian ON!
//
//   // SQL:
//   JOIN users ON users.id = projects.user_id
//                 ───────────────────────────
//                 Syarat pencocokan yang SAMA
//
// Prosesnya secara visual:
//
//   Tabel projects:                Tabel users:
//   ┌─────┬───────────┬──────────┐  ┌─────┬──────┐
//   │ id  │ nama      │ user_id  │  │ id  │ nama │
//   ├─────┼───────────┼──────────┤  ├─────┼──────┤
//   │  1  │ Web Donasi│    1     │──│  1  │ Rey  │  ← user_id 1 == id 1 ✅ COCOK!
//   │  2  │ Portfolio │    2     │──│  2  │ Budi │  ← user_id 2 == id 2 ✅ COCOK!
//   │  3  │ E-commerce│    1     │──│  1  │ Rey  │  ← user_id 1 == id 1 ✅ COCOK!
//   └─────┴───────────┴──────────┘  └─────┴──────┘
//
//   Hasil JOIN (digabungkan berdasarkan ON):
//   ┌───────────┬──────┐
//   │ project   │ user │
//   ├───────────┼──────┤
//   │ Web Donasi│ Rey  │
//   │ Portfolio │ Budi │
//   │ E-commerce│ Rey  │
//   └───────────┴──────┘
//
// KESIMPULAN tentang ON:
// - ON = "aturan main" untuk mencocokkan baris antar tabel
// - Biasanya formatnya: ON tabelA.foreign_key = tabelB.primary_key
// - Tanpa ON, database tidak tahu cara menghubungkan kedua tabel


// Jenis JOIN:
// ┌──────────────────────────────────────────────────────────┐
// │ INNER JOIN  → Ambil data yang COCOK di kedua tabel       │
// │ LEFT JOIN   → Ambil SEMUA data tabel kiri + cocok kanan  │
// │ RIGHT JOIN  → Ambil SEMUA data tabel kanan + cocok kiri  │
// │ FULL JOIN   → Ambil SEMUA data dari kedua tabel          │
// └──────────────────────────────────────────────────────────┘
//
// Yang paling sering dipakai: INNER JOIN dan LEFT JOIN.


// ============================================================
// 📌 INDEXING (PERCEPAT QUERY)
// ============================================================
// Index = "Daftar isi" di database untuk mempercepat pencarian.
//
// Tanpa Index:
// Database harus SCAN SEMUA ROW satu per satu → LAMBAT untuk data besar.
//
// Dengan Index:
// Database langsung "lompat" ke data yang dicari → CEPAT!
//
// Analoginya:
// - Tanpa index = mencari kata di kamus dari halaman 1 sampai habis
// - Dengan index = langsung buka huruf "S" untuk cari kata "Server"
//
// Kapan pakai Index?
// ✅ Kolom yang sering dipakai di WHERE, ORDER BY, atau JOIN
// ✅ Kolom yang sering dicari (email, username)
// ❌ Jangan index SEMUA kolom (index juga butuh space & memperlambat INSERT)
//
// Contoh:
/*
  CREATE INDEX idx_users_email ON users(email);
  -- Sekarang query "SELECT * FROM users WHERE email = '...'"
  -- akan jauh lebih cepat!
*/


// ============================================================
// 📌 BEST PRACTICES STRUKTUR DATABASE
// ============================================================
//
// 1. SELALU pakai Primary Key di setiap tabel
//    → Gunakan SERIAL atau UUID.
//
// 2. Gunakan NAMING CONVENTION yang konsisten
//    → Nama tabel: lowercase, plural (users, products, orders)
//    → Nama kolom: lowercase, snake_case (created_at, user_id)
//    → Foreign Key: nama_tabel_singular_id (user_id, product_id)
//
// 3. Tambahkan kolom TIMESTAMP
//    → created_at dan updated_at di setiap tabel.
//    → Sangat berguna untuk debugging dan audit.
//
// 4. Gunakan TIPE DATA yang tepat
//    → Jangan simpan angka sebagai VARCHAR!
//    → Jangan simpan tanggal sebagai TEXT!
//    → Pilih tipe data paling spesifik yang bisa menampung data.
//
// 5. NORMALISASI minimal sampai 3NF
//    → Hindari data duplikat.
//    → Satu tabel, satu tanggung jawab.
//
// 6. Gunakan FOREIGN KEY untuk menjaga integritas
//    → Jangan hanya mengandalkan kode aplikasi!
//    → Database harus jadi "benteng terakhir" validasi data.
//
// 7. Jangan simpan data yang bisa DIHITUNG
//    → Contoh: total_harga = SUM(quantity * harga_satuan)
//    → Simpan quantity dan harga_satuan saja, total dihitung saat query.
//
// ❌ SALAH:
// ┌──────────┬──────────┬───────────────┐
// │ quantity │ harga    │ total         │  ← Redundan!
// │    2     │  50000   │  100000       │
// └──────────┴──────────┴───────────────┘
//
// ✅ BENAR:
// ┌──────────┬──────────┐
// │ quantity │ harga    │  ← Total dihitung saat query
// │    2     │  50000   │
// └──────────┴──────────┘
// Query: SELECT quantity * harga AS total FROM order_items;


// ============================================================
// 📌 CONTOH PENERAPAN: DARI ARRAY KE DATABASE
// ============================================================
//
// SEBELUMNYA (Array di Express.js kamu):
//
// let daftarProject = [
//   { id: 1, nama: "Ayobuatbaik", deskripsi: "...", image: "...", link: "..." },
// ];
//
// SEKARANG (Database PostgreSQL):
//
/*
  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    image VARCHAR(255),
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
  );

  INSERT INTO projects (nama, deskripsi, image, link)
  VALUES ('Ayobuatbaik', 'Applikasi web donasi', '/img/Porto1.avif', 'https://ayobuatbaik.com');
*/
//
// Data sekarang PERMANEN! Tidak hilang saat server restart.
// Dan nanti bisa diakses dari Express.js menggunakan library "pg" atau ORM.


// ============================================================
// 📌 KESIMPULAN
// ============================================================
//
// 1. Database Structure = cara menata tabel agar efisien & konsisten
// 2. Normalisasi (1NF → 2NF → 3NF) menghilangkan duplikasi data
// 3. Primary Key = identitas unik, Foreign Key = penghubung antar tabel
// 4. JOIN digunakan untuk menggabungkan data dari beberapa tabel
// 5. Index mempercepat query, tapi jangan berlebihan
// 6. Best practices: naming convention, timestamp, tipe data tepat
//
// Langkah selanjutnya:
// → Install PostgreSQL
// → Praktik membuat tabel dan query di pgAdmin atau terminal
// → Hubungkan database ke Express.js kamu!
