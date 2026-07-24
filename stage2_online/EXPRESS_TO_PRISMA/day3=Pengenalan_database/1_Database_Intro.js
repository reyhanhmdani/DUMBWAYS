// ============================================================
// #1 - DATABASE INTRO
// Materi Pengenalan Database untuk Pemula
// ============================================================

// ============================================================
// 📌 APA ITU DATABASE?
// ============================================================
// Database = tempat menyimpan data secara terstruktur dan persisten.
//
// Analoginya gini:
// - Array di JavaScript    = catatan di sticky note (hilang kalau ditutup)
// - Database               = buku catatan yang disimpan di lemari (tetap ada)
//
// Ingat waktu bikin CRUD project di Express.js pakai Array?
// Data hilang setiap kali server restart, kan?
// Nah, Database MENYELESAIKAN masalah itu.


// ============================================================
// 📌 KENAPA BUTUH DATABASE?
// ============================================================
//
// 1. PERSISTENSI DATA
//    Data tetap ada meskipun server mati/restart.
//
// 2. QUERY YANG POWERFUL
//    Bisa cari, filter, dan sortir data dengan sangat efisien.
//    Bayangkan punya 1 juta user — tidak mungkin pakai .find() di Array.
//
// 3. KEAMANAN
//    Database punya sistem autentikasi, role, dan permission.
//
// 4. CONCURRENT ACCESS
//    Banyak user bisa akses data bersamaan tanpa bentrok.
//
// 5. INTEGRITAS DATA
//    Database bisa memastikan data selalu valid (constraint, foreign key, dll).


// ============================================================
// 📌 JENIS-JENIS DATABASE
// ============================================================

// ┌──────────────────────────────────────────────────────────┐
// │              DATABASE                                    │
// │                                                          │
// │  ┌─────────────────┐      ┌─────────────────┐           │
// │  │   RELATIONAL    │      │  NON-RELATIONAL  │           │
// │  │     (SQL)       │      │    (NoSQL)       │           │
// │  ├─────────────────┤      ├─────────────────┤           │
// │  │ - PostgreSQL    │      │ - MongoDB       │           │
// │  │ - MySQL         │      │ - Redis         │           │
// │  │ - SQLite        │      │ - Firebase      │           │
// │  │ - SQL Server    │      │ - DynamoDB      │           │
// │  └─────────────────┘      └─────────────────┘           │
// └──────────────────────────────────────────────────────────┘


// ============================================================
// 📌 1. RELATIONAL DATABASE (SQL)
// ============================================================
// Data disimpan dalam TABEL (seperti Excel/spreadsheet).
// Setiap tabel punya KOLOM (field) dan BARIS (record/row).
// Hubungan antar tabel diikat menggunakan KEY.
//
// Contoh: Tabel "users"
// ┌─────┬──────────┬─────────────────┬──────┐
// │ id  │ nama     │ email           │ umur │
// ├─────┼──────────┼─────────────────┼──────┤
// │  1  │ Rey      │ rey@mail.com    │  22  │
// │  2  │ Budi     │ budi@mail.com   │  25  │
// │  3  │ Siti     │ siti@mail.com   │  20  │
// └─────┴──────────┴─────────────────┴──────┘
//
// Bahasa yang dipakai: SQL (Structured Query Language)
//
// Contoh SQL:
// SELECT * FROM users WHERE umur > 21;
// → Ambil semua user yang umurnya di atas 21.

// Kelebihan SQL:
// ✅ Struktur data jelas dan ketat (schema)
// ✅ Relasi antar tabel sangat kuat
// ✅ Cocok untuk data yang saling berhubungan (e-commerce, banking)
// ✅ ACID compliant (data konsisten & aman)

// Kekurangan SQL:
// ❌ Kurang fleksibel kalau struktur data sering berubah
// ❌ Scaling horizontal lebih susah (tapi bukan berarti tidak bisa)


// ============================================================
// 📌 2. NON-RELATIONAL DATABASE (NoSQL)
// ============================================================
// Data TIDAK disimpan dalam tabel.
// Formatnya bisa berupa: Document (JSON), Key-Value, Graph, dll.
//
// Contoh: MongoDB (Document-based)
// Data disimpan dalam format seperti Object JavaScript:
//
// {
//   "_id": "abc123",
//   "nama": "Rey",
//   "email": "rey@mail.com",
//   "umur": 22,
//   "hobi": ["coding", "baca buku"]  ← Array di dalam document!
// }
//
// Perhatikan: Mirip banget sama Object/JSON di JavaScript, kan?

// Kelebihan NoSQL:
// ✅ Fleksibel — tidak perlu definisikan schema ketat di awal
// ✅ Cocok untuk data yang strukturnya beragam
// ✅ Scaling horizontal lebih mudah (distributed database)
// ✅ Performa tinggi untuk data besar dan real-time

// Kekurangan NoSQL:
// ❌ Relasi antar data tidak sekuat SQL
// ❌ Tidak semua NoSQL mendukung transaksi ACID
// ❌ Bisa "berantakan" kalau tidak dikelola dengan baik


// ============================================================
// 📌 SQL vs NoSQL — KAPAN PAKAI YANG MANA?
// ============================================================
//
// ┌───────────────────────┬──────────────────┬──────────────────┐
// │ Kriteria              │ SQL              │ NoSQL            │
// ├───────────────────────┼──────────────────┼──────────────────┤
// │ Struktur data         │ Tetap & ketat    │ Fleksibel        │
// │ Relasi antar data     │ Sangat kuat      │ Lemah/manual     │
// │ Contoh kasus          │ E-commerce, Bank │ Chat app, IoT    │
// │ Bahasa query          │ SQL              │ Beda-beda tiap DB│
// │ Scaling               │ Vertikal (↑)     │ Horizontal (→)   │
// │ Learning curve        │ Menengah         │ Mudah di awal    │
// └───────────────────────┴──────────────────┴──────────────────┘
//
// TIPS PRAKTIS:
// - Baru belajar? → Mulai dari PostgreSQL (SQL). Ini standar industri.
// - Butuh cepat & fleksibel? → MongoDB (NoSQL).
// - Proyek serius (keuangan, transaksi)? → SQL WAJIB.


// ============================================================
// 📌 PERBANDINGAN DENGAN ARRAY (YANG KAMU SUDAH PAHAM)
// ============================================================

// --- SEBELUMNYA (PAKAI ARRAY) ---
// let daftarProject = [
//   { id: 1, nama: "Ayobuatbaik", deskripsi: "..." },
//   { id: 2, nama: "Andre Raditya", deskripsi: "..." },
// ];
//
// MASALAH:
// 1. Data hilang saat server restart
// 2. Tidak bisa diakses dari server lain
// 3. Tidak efisien untuk data besar
// 4. Tidak ada validasi otomatis

// --- NANTINYA (PAKAI DATABASE) ---
// Data disimpan secara permanen di PostgreSQL/MongoDB.
// Server hanya perlu "bertanya" ke database:
//
//   const projects = await db.query("SELECT * FROM projects");
//
// Atau di MongoDB:
//   const projects = await Project.find();


// ============================================================
// 📌 ISTILAH PENTING DATABASE
// ============================================================
//
// 1. TABLE (Tabel)         = Kumpulan data sejenis (seperti Array of Objects)
// 2. ROW / RECORD          = Satu baris data (seperti 1 Object di dalam Array)
// 3. COLUMN / FIELD        = Satu properti dari data (seperti key di Object)
// 4. PRIMARY KEY (PK)      = ID unik untuk setiap row (seperti .id di Object kamu)
// 5. FOREIGN KEY (FK)      = Kolom yang "menunjuk" ke tabel lain (relasi)
// 6. SCHEMA                = Definisi struktur tabel (kolom apa saja, tipe apa)
// 7. QUERY                 = Perintah untuk mengambil/mengubah data
// 8. INDEX                 = "Daftar isi" untuk mempercepat pencarian
// 9. CRUD                  = Create, Read, Update, Delete (sudah familiar, kan?)
// 10. ORM                  = Object Relational Mapping (penghubung JS ↔ Database)
//                            Contoh: Sequelize (SQL), Prisma (SQL), Mongoose (MongoDB)


// ============================================================
// 📌 PERJALANAN BELAJAR DATABASE
// ============================================================
//
// Kamu sekarang di sini:
//
// [✅] JavaScript Dasar
// [✅] Express.js + Handlebars
// [✅] CRUD pakai Array
// [📍] Database Intro            ← KAMU DI SINI
// [ ] ERD, DDL, DML              ← Materi selanjutnya
// [ ] Database Structure
// [ ] Koneksi Express + Database  ← Integrasi!
//
// Setelah belajar database, kamu akan bisa:
// 1. Menyimpan data project secara PERMANEN
// 2. Membuat query yang powerful untuk mencari data
// 3. Membangun aplikasi yang production-ready


// ============================================================
// 📌 INSTALASI DATABASE (PERSIAPAN)
// ============================================================
//
// Untuk belajar, kita akan pakai PostgreSQL:
//
// 1. Download PostgreSQL: https://www.postgresql.org/download/
// 2. Install dan catat PASSWORD yang kamu buat saat instalasi
// 3. Install pgAdmin (biasanya ikut terinstall bareng PostgreSQL)
//    → pgAdmin = GUI untuk mengelola database (mirip phpMyAdmin kalau di MySQL)
//
// Atau kalau mau coba online dulu tanpa install:
// → https://www.db-fiddle.com/ (gratis, langsung di browser)


// ============================================================
// 📌 KESIMPULAN
// ============================================================
//
// 1. Database = penyimpanan data PERMANEN yang terstruktur
// 2. Ada 2 jenis utama: SQL (tabel) dan NoSQL (document/key-value)
// 3. SQL cocok untuk data terstruktur dan saling berhubungan
// 4. NoSQL cocok untuk data fleksibel dan skala besar
// 5. Kamu akan mulai belajar dengan PostgreSQL (SQL)
// 6. Data yang sebelumnya kamu simpan di Array,
//    nantinya akan disimpan di database
