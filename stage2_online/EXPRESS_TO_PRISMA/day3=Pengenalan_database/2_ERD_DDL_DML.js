// ============================================================
// #2 - ERD, DDL, DML
// Entity Relationship Diagram, Data Definition & Manipulation
// ============================================================


// ============================================================
// 📌 BAGIAN 1: ERD (Entity Relationship Diagram)
// ============================================================
// ERD = "Peta/Blueprint" dari database kamu.
// Sebelum bikin tabel, kamu HARUS bikin ERD dulu.
//
// Analoginya:
// - Mau bangun rumah? → Bikin denah/blueprint dulu.
// - Mau bikin database? → Bikin ERD dulu.
//
// ERD menggambarkan:
// 1. ENTITY     = Benda/objek yang datanya mau disimpan (jadi TABEL)
// 2. ATTRIBUTE  = Informasi detail dari entity (jadi KOLOM)
// 3. RELATION   = Hubungan antar entity (dihubungkan oleh KEY)


// ============================================================
// 📌 KOMPONEN ERD
// ============================================================
//
// 1. ENTITY (Entitas)
//    Benda nyata atau konsep yang datanya perlu disimpan.
//    Contoh: User, Product, Order, Project
//    → Akan menjadi NAMA TABEL di database.
//
// 2. ATTRIBUTE (Atribut)
//    Detail/properti dari sebuah entity.
//    Contoh Entity "User":
//    - id (Primary Key)
//    - nama
//    - email
//    - password
//    - created_at
//    → Akan menjadi KOLOM di tabel.
//
// 3. RELATIONSHIP (Relasi)
//    Bagaimana entity saling berhubungan.
//    Contoh: "User MEMBUAT banyak Project"
//    → User ──< Project (One to Many)


// ============================================================
// 📌 JENIS RELASI (RELATIONSHIP)
// ============================================================
//
// Ada 3 jenis utama:
//
// ┌─────────────────────────────────────────────────────────┐
// │ 1. ONE TO ONE (1:1)                                     │
// │    Satu entity berhubungan dengan tepat satu entity lain │
// │    Contoh: User ── Profile                               │
// │    (Satu user punya satu profile)                        │
// │                                                          │
// │ 2. ONE TO MANY (1:N)                                    │
// │    Satu entity berhubungan dengan banyak entity lain     │
// │    Contoh: User ──< Project                              │
// │    (Satu user bisa punya BANYAK project)                 │
// │    INI YANG PALING SERING DIPAKAI!                       │
// │                                                          │
// │ 3. MANY TO MANY (M:N)                                   │
// │    Banyak entity berhubungan dengan banyak entity lain   │
// │    Contoh: Student >──< Course                           │
// │    (Satu student bisa ambil banyak course,               │
// │     satu course bisa diambil banyak student)             │
// │    → Butuh TABEL PENGHUBUNG (junction/pivot table)       │
// └─────────────────────────────────────────────────────────┘


// ============================================================
// 📌 CONTOH ERD: APLIKASI PORTOFOLIO (YANG KAMU BUAT!)
// ============================================================
//
//  ┌──────────────┐          ┌──────────────┐
//  │    USERS     │          │   PROJECTS   │
//  ├──────────────┤          ├──────────────┤
//  │ PK: id       │──────<── │ PK: id       │
//  │ nama         │          │ FK: user_id  │
//  │ email        │          │ nama         │
//  │ password     │          │ deskripsi    │
//  │ created_at   │          │ image        │
//  └──────────────┘          │ link         │
//                            │ created_at   │
//                            └──────────────┘
//
// Penjelasan:
// - "PK" = Primary Key (ID unik)
// - "FK" = Foreign Key (kolom yang menunjuk ke tabel lain)
// - user_id di tabel PROJECTS menunjuk ke id di tabel USERS
// - Satu User bisa punya BANYAK Project (One to Many)


// ============================================================
// 📌 TIPE DATA DI DATABASE (PostgreSQL)
// ============================================================
//
// ┌──────────────┬────────────────────────────────────────────┐
// │ Tipe Data    │ Penjelasan                                │
// ├──────────────┼────────────────────────────────────────────┤
// │ INTEGER      │ Bilangan bulat (1, 2, 100)                │
// │ SERIAL       │ Integer auto-increment (untuk PK)         │
// │ VARCHAR(n)   │ Teks dengan batas karakter n              │
// │ TEXT         │ Teks tanpa batas karakter                 │
// │ BOOLEAN      │ true / false                              │
// │ DATE         │ Tanggal saja (2025-07-09)                 │
// │ TIMESTAMP    │ Tanggal + waktu (2025-07-09 10:30:00)     │
// │ FLOAT        │ Bilangan desimal                          │
// └──────────────┴────────────────────────────────────────────┘
//
// Perbandingan dengan JavaScript:
// INTEGER/FLOAT  → number
// VARCHAR/TEXT    → string
// BOOLEAN        → boolean
// DATE/TIMESTAMP → Date object
// SERIAL         → seperti auto-increment id yang kamu buat (nextId++)


// ============================================================
// 📌 BAGIAN 2: DDL (Data Definition Language)
// ============================================================
// DDL = Perintah SQL untuk MENDEFINISIKAN STRUKTUR database.
// Ibarat DDL = membangun rak lemari (bukan mengisi barangnya).
//
// Perintah DDL:
// 1. CREATE  → Buat tabel/database baru
// 2. ALTER   → Ubah struktur tabel yang sudah ada
// 3. DROP    → Hapus tabel/database (HATI-HATI! Data ikut hilang!)
// 4. TRUNCATE → Kosongkan semua data di tabel (struktur tetap ada)


// --- CREATE TABLE ---
// ❌ SALAH: Tidak mendefinisikan Primary Key
/*
  CREATE TABLE projects (
    nama VARCHAR(100),
    deskripsi TEXT
  );
  -- Masalah: Tidak ada cara untuk membedakan satu row dari row lain!
*/

// ✅ BENAR: Ada Primary Key dan tipe data yang tepat
/*
  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    image VARCHAR(255),
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- Penjelasan:
  -- SERIAL PRIMARY KEY  = id otomatis bertambah (1, 2, 3, ...)
  -- NOT NULL            = kolom ini WAJIB diisi (tidak boleh kosong)
  -- DEFAULT             = nilai otomatis kalau tidak diisi
*/


// --- CREATE TABLE DENGAN FOREIGN KEY ---
// Contoh: Tabel projects yang terhubung ke tabel users
/*
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    nama VARCHAR(100) NOT NULL,
    deskripsi TEXT,
    image VARCHAR(255),
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- REFERENCES users(id) = Foreign Key!
  -- Artinya: kolom user_id HARUS berisi nilai id yang ada di tabel users.
  -- Kalau kamu coba masukkan user_id = 999 tapi user 999 tidak ada,
  -- database akan MENOLAK dan memberi error.
*/


// --- ALTER TABLE ---
// Menambahkan kolom baru ke tabel yang sudah ada
/*
  ALTER TABLE projects ADD COLUMN status VARCHAR(20) DEFAULT 'active';
  -- Menambahkan kolom "status" dengan nilai default "active"

  ALTER TABLE projects DROP COLUMN status;
  -- Menghapus kolom "status"

  ALTER TABLE projects RENAME COLUMN nama TO title;
  -- Mengubah nama kolom dari "nama" menjadi "title"
*/


// --- DROP TABLE ---
// ⚠️ HATI-HATI! Ini menghapus tabel BESERTA SELURUH DATANYA!
/*
  DROP TABLE projects;
  -- Tabel projects hilang selamanya. Tidak bisa di-undo!

  DROP TABLE IF EXISTS projects;
  -- Lebih aman: hanya dihapus kalau tabelnya memang ada.
*/


// --- TRUNCATE TABLE ---
/*
  TRUNCATE TABLE projects;
  -- Menghapus SEMUA data di tabel, tapi struktur tabelnya tetap ada.
  -- Bedanya dengan DROP: DROP = hapus tabel + data, TRUNCATE = hapus data saja.
*/


// ============================================================
// 📌 BAGIAN 3: DML (Data Manipulation Language)
// ============================================================
// DML = Perintah SQL untuk MENGELOLA DATA di dalam tabel.
// Ibarat DML = mengisi, membaca, mengubah, dan membuang barang di rak.
//
// Perintah DML:
// 1. INSERT  → Tambah data baru (CREATE)
// 2. SELECT  → Ambil/baca data (READ)
// 3. UPDATE  → Ubah data yang sudah ada (UPDATE)
// 4. DELETE  → Hapus data (DELETE)
//
// Perhatikan! Ini sama persis dengan CRUD yang sudah kamu buat!


// ============================================================
// 📌 INSERT (CREATE) — Menambah data baru
// ============================================================

// ❌ SALAH: Tidak menyebutkan kolom secara eksplisit
/*
  INSERT INTO projects VALUES ('Ayobuatbaik', 'Web donasi', '/img/porto.jpg');
  -- Masalah: Kalau urutan kolom berubah, data bisa masuk ke kolom yang salah!
*/

// ✅ BENAR: Sebutkan kolom mana yang mau diisi
/*
  INSERT INTO projects (nama, deskripsi, image, link)
  VALUES ('Ayobuatbaik', 'Applikasi web donasi berbasis Laravel', '/img/Porto1.avif', 'https://ayobuatbaik.com');
*/

// Perbandingan dengan kode Express kamu:
// SQL:  INSERT INTO projects (nama, deskripsi) VALUES ('Ayobuatbaik', '...');
// JS:   daftarProject.push({ nama: "Ayobuatbaik", deskripsi: "..." });
// Fungsinya SAMA — menambahkan data baru!


// ============================================================
// 📌 SELECT (READ) — Mengambil data
// ============================================================

// Ambil SEMUA data dari tabel
/*
  SELECT * FROM projects;
  -- Hasilnya: semua row dan semua kolom
*/

// Ambil kolom tertentu saja
/*
  SELECT nama, deskripsi FROM projects;
  -- Hasilnya: hanya kolom nama dan deskripsi
*/

// Ambil data dengan KONDISI (WHERE)
/*
  SELECT * FROM projects WHERE id = 1;
  -- Hasilnya: hanya project yang id-nya = 1
*/

// ❌ SALAH: Pakai tanda sama dengan tunggal (=) untuk NULL
/*
  SELECT * FROM projects WHERE link = NULL;
  -- TIDAK AKAN BEKERJA! NULL itu bukan nilai, dia "ketiadaan"
*/

// ✅ BENAR: Pakai IS NULL
/*
  SELECT * FROM projects WHERE link IS NULL;
*/

// Sortir data (ORDER BY)
/*
  SELECT * FROM projects ORDER BY created_at DESC;
  -- ASC  = ascending (A-Z, kecil-besar, lama-baru)
  -- DESC = descending (Z-A, besar-kecil, baru-lama)
*/

// Batasi jumlah data (LIMIT)
/*
  SELECT * FROM projects ORDER BY created_at DESC LIMIT 5;
  -- Ambil 5 project terbaru saja
*/

// Perbandingan dengan kode Express kamu:
// SQL:  SELECT * FROM projects WHERE id = 1;
// JS:   daftarProject.find((p) => p.id === 1);
// Fungsinya SAMA — mencari satu data berdasarkan ID!


// ============================================================
// 📌 UPDATE — Mengubah data yang sudah ada
// ============================================================

// ❌ SALAH FATAL: UPDATE tanpa WHERE
/*
  UPDATE projects SET nama = 'Project Baru';
  -- BAHAYA! Ini akan mengubah SEMUA nama project jadi 'Project Baru'!
*/

// ✅ BENAR: Selalu pakai WHERE untuk membatasi row mana yang diubah
/*
  UPDATE projects
  SET nama = 'Ayobuatbaik V2', deskripsi = 'Versi terbaru'
  WHERE id = 1;
  -- Hanya mengubah project dengan id = 1
*/

// Perbandingan dengan kode Express kamu:
// SQL:  UPDATE projects SET nama = '...' WHERE id = 1;
// JS:   daftarProject[projectIndex] = { id: 1, nama: "...", ... };
// Fungsinya SAMA — mengupdate data berdasarkan ID!


// ============================================================
// 📌 DELETE — Menghapus data
// ============================================================

// ❌ SALAH FATAL: DELETE tanpa WHERE
/*
  DELETE FROM projects;
  -- BAHAYA! Ini akan menghapus SEMUA data di tabel!
  -- Tidak ada tombol undo!
*/

// ✅ BENAR: Selalu pakai WHERE
/*
  DELETE FROM projects WHERE id = 3;
  -- Hanya menghapus project dengan id = 3
*/

// Perbandingan dengan kode Express kamu:
// SQL:  DELETE FROM projects WHERE id = 3;
// JS:   daftarProject = daftarProject.filter((p) => p.id !== 3);
// Fungsinya SAMA — menghapus data berdasarkan ID!


// ============================================================
// 📌 RANGKUMAN: DDL vs DML
// ============================================================
//
// ┌──────────────────────────────────────────────────────────┐
// │          DDL (Struktur)       │      DML (Data)          │
// ├──────────────────────────────┼───────────────────────────┤
// │ CREATE TABLE ...             │ INSERT INTO ... VALUES    │
// │ ALTER TABLE ...              │ SELECT ... FROM ... WHERE │
// │ DROP TABLE ...               │ UPDATE ... SET ... WHERE  │
// │ TRUNCATE TABLE ...           │ DELETE FROM ... WHERE     │
// ├──────────────────────────────┼───────────────────────────┤
// │ Mengubah STRUKTUR tabel      │ Mengubah ISI DATA         │
// │ Jarang dijalankan            │ Sering dijalankan          │
// │ Biasanya saat setup awal     │ Setiap kali user beraksi   │
// └──────────────────────────────┴───────────────────────────┘


// ============================================================
// 📌 MAPPING CRUD → SQL → JavaScript (CHEAT SHEET)
// ============================================================
//
// ┌──────────┬──────────────────────────────┬──────────────────────────────────┐
// │ CRUD     │ SQL                          │ JavaScript (Array kamu)          │
// ├──────────┼──────────────────────────────┼──────────────────────────────────┤
// │ CREATE   │ INSERT INTO ... VALUES       │ daftarProject.push({...})        │
// │ READ     │ SELECT * FROM ...            │ daftarProject / .find()          │
// │ UPDATE   │ UPDATE ... SET ... WHERE     │ daftarProject[index] = {...}     │
// │ DELETE   │ DELETE FROM ... WHERE        │ daftarProject.filter(...)        │
// └──────────┴──────────────────────────────┴──────────────────────────────────┘
//
// Lihat? CRUD yang kamu sudah bisa di JavaScript,
// tinggal "diterjemahkan" ke bahasa SQL!


// ============================================================
// 📌 CONSTRAINT (BATASAN) PENTING
// ============================================================
//
// Constraint = aturan yang diterapkan ke kolom untuk menjaga integritas data.
//
// 1. NOT NULL      → Kolom WAJIB diisi (tidak boleh kosong)
// 2. UNIQUE        → Nilai kolom harus unik (tidak boleh duplikat)
// 3. PRIMARY KEY   → NOT NULL + UNIQUE (identitas unik setiap row)
// 4. FOREIGN KEY   → Nilai harus ada di tabel lain (menjaga relasi)
// 5. DEFAULT       → Nilai otomatis kalau tidak diisi user
// 6. CHECK         → Validasi custom (misal: umur harus > 0)
//
// Contoh lengkap:
/*
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,                   -- auto-increment + unik
    nama VARCHAR(100) NOT NULL,              -- wajib diisi
    email VARCHAR(100) UNIQUE NOT NULL,      -- wajib + tidak boleh duplikat
    umur INTEGER CHECK (umur > 0),           -- harus lebih dari 0
    role VARCHAR(20) DEFAULT 'user',         -- default 'user' kalau ga diisi
    created_at TIMESTAMP DEFAULT NOW()       -- otomatis isi waktu sekarang
  );
*/
