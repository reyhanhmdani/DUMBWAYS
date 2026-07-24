// ============================================================
// #4 - PRAKTIK QUERY SQL (Studi Kasus: Portofolio Project)
// Berdasarkan query yang sudah kamu tulis sendiri di PostgreSQL
// ============================================================
//
// File ini membahas dan menjelaskan setiap query yang sudah kamu buat,
// DITAMBAH hal-hal penting yang perlu kamu ketahui lebih dalam.


// ============================================================
// ============================================================
// 📌 BAGIAN 1: DDL — Membuat Struktur Database
// ============================================================
// ============================================================


// ============================================================
// 📌 1a. TABEL USERS
// ============================================================
/*
  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
*/
// PENJELASAN:
// - SERIAL         → Tipe data integer yang OTOMATIS naik (1, 2, 3, ...).
//                     Kamu tidak perlu isi manual saat INSERT.
// - PRIMARY KEY    → Menjamin setiap row punya identitas UNIK.
// - VARCHAR(100)   → Teks maksimal 100 karakter. Kenapa 100?
//                     Karena nama biasanya tidak lebih dari itu.
//                     Kalau terlalu besar (misal VARCHAR(10000)), membuang resource.
// - UNIQUE         → Tidak boleh ada 2 user dengan email yang sama.
// - NOT NULL       → Kolom WAJIB diisi. Kalau insert tanpa isi = ERROR.
// - DEFAULT CURRENT_TIMESTAMP → Otomatis terisi waktu sekarang saat INSERT.
//
// 💡 HAL PENTING:
// Kombinasi UNIQUE + NOT NULL pada email artinya:
// email HARUS diisi DAN TIDAK BOLEH SAMA dengan user lain.
// Ini pattern standar untuk kolom email/username di dunia nyata.


// ============================================================
// 📌 1b. TABEL PROJECTS (Relasi One-to-Many)
// ============================================================
/*
  CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id INT,
    title VARCHAR(100) NOT NULL,
    deskripsi TEXT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX idx_projects_user_id ON projects(user_id);
*/
// PENJELASAN:
//
// 1. FOREIGN KEY (user_id) REFERENCES users(id)
//    → Kolom user_id di tabel projects HARUS merujuk ke id yang SUDAH ADA
//      di tabel users.
//    → Kalau kamu coba INSERT project dengan user_id = 99,
//      tapi user 99 tidak ada → DATABASE MENOLAK (error).
//
// 2. ON DELETE CASCADE 
//    → Kalau sebuah user DIHAPUS, maka SEMUA project miliknya
//      juga OTOMATIS IKUT TERHAPUS.
//    → Ini penting! Tanpa ini, kamu tidak bisa menghapus user yang
//      sudah punya project (database akan error karena ada FK yang menunjuk).
//
//    Pilihan lain selain CASCADE:
//    ┌────────────────────┬──────────────────────────────────────────────┐
//    │ ON DELETE CASCADE  │ Hapus user → project-nya ikut terhapus       │
//    │ ON DELETE SET NULL │ Hapus user → user_id di project jadi NULL    │
//    │ ON DELETE RESTRICT │ Hapus user → DITOLAK kalau masih ada project │
//    │ ON DELETE NO ACTION│ Sama seperti RESTRICT (default)              │
//    └────────────────────┴──────────────────────────────────────────────┘
//
// 3. CONSTRAINT fk_user
//    → Memberi NAMA pada foreign key constraint.
//    → Gunanya: kalau ada error, pesan errornya lebih jelas
//      (muncul nama "fk_user" bukan kode random).
//
// 4. CREATE INDEX idx_projects_user_id ON projects(user_id);
//    → Membuat INDEX pada kolom user_id.
//    → Kenapa? Karena kolom ini SERING dipakai untuk JOIN dan WHERE.
//    → Tanpa index, database harus scan SELURUH TABEL untuk mencari
//      project milik user tertentu → LAMBAT untuk data besar.
//    → Dengan index, pencarian langsung LOMPAT ke data yang benar → CEPAT.
//
// 💡 HAL PENTING:
// TEXT vs VARCHAR:
// - VARCHAR(100) → Ada batas karakter. Cocok untuk data pendek (nama, email).
// - TEXT         → Tidak ada batas. Cocok untuk data panjang (deskripsi, artikel).
// Kamu sudah pakai TEXT untuk deskripsi → ✅ Tepat!


// ============================================================
// 📌 1c. TABEL TECH (Master Data)
// ============================================================
/*
  CREATE TABLE tech (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
  );
*/
// PENJELASAN:
// Ini disebut "Master Table" atau "Lookup Table".
// Isinya daftar teknologi yang TERSEDIA (Laravel, Express.js, React, dll).
//
// UNIQUE pada name → Tidak boleh ada duplikat.
// Kamu TIDAK BISA insert 'React' dua kali → error.
//
// 💡 HAL PENTING:
// Master table biasanya di-insert sekali di awal (seeding),
// lalu jarang diubah. Yang sering berubah adalah tabel relasinya
// (project_tech), bukan master-nya.


// ============================================================
// 📌 1d. TABEL PROJECT_TECH (Junction Table — Many-to-Many)
// ============================================================
/*
  CREATE TABLE project_tech (
    project_id INT NOT NULL,
    tech_id INT NOT NULL,
    PRIMARY KEY (project_id, tech_id),
    CONSTRAINT fk_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_tech FOREIGN KEY (tech_id) REFERENCES tech(id) ON DELETE CASCADE
  );
*/
// PENJELASAN:
// Ini adalah JUNCTION TABLE (tabel penghubung / pivot table).
// Digunakan untuk relasi MANY-TO-MANY:
// → Satu project bisa pakai BANYAK tech
// → Satu tech bisa dipakai di BANYAK project
//
// PRIMARY KEY (project_id, tech_id)
// → Ini disebut COMPOSITE PRIMARY KEY (PK gabungan dari 2 kolom).
// → Artinya: kombinasi project_id dan tech_id harus UNIK.
// → Kamu TIDAK BISA menghubungkan project 1 dengan tech 1 dua kali.
//
// Contoh data di project_tech:
// ┌────────────┬─────────┐
// │ project_id │ tech_id │
// ├────────────┼─────────┤
// │     1      │    1    │  → Project "Web Sekolah" pakai "Laravel"
// │     1      │    3    │  → Project "Web Sekolah" pakai "React"
// │     2      │    2    │  → Project "App Donasi" pakai "Express.js"
// │     2      │    1    │  → Project "App Donasi" pakai "Laravel"
// └────────────┴─────────┘
//
// 💡 HAL PENTING:
// Junction table TIDAK PUNYA kolom "id" sendiri.
// Primary Key-nya adalah GABUNGAN dari kedua FK.
// Ini pattern standar untuk relasi Many-to-Many.


// ============================================================
// 📌 URUTAN CREATE TABLE ITU PENTING!
// ============================================================
// Kamu HARUS membuat tabel PARENT dulu, baru tabel CHILD.
// Karena child (FK) merujuk ke parent (PK), parent harus sudah ada.
//
// Urutan yang BENAR:
// 1. users       → tidak punya FK ke tabel lain
// 2. tech        → tidak punya FK ke tabel lain
// 3. projects    → FK ke users → users harus sudah dibuat
// 4. project_tech → FK ke projects dan tech → keduanya harus sudah ada
//
// Urutan DROP TABLE KEBALIKANNYA:
// 1. project_tech → hapus child dulu
// 2. projects     → hapus child
// 3. users        → hapus parent
// 4. tech         → hapus parent
//
// Kalau kamu drop users duluan padahal projects masih merujuk ke users,
// database akan ERROR (kecuali pakai CASCADE).


// ============================================================
// ============================================================
// 📌 BAGIAN 2: DML — Memanipulasi Data
// ============================================================
// ============================================================


// ============================================================
// 📌 2a. INSERT DATA
// ============================================================

// --- Insert User ---
/*
  INSERT INTO users(name, email) VALUES ('Reyyy', 'rey@gmail.com');
  INSERT INTO users(name, email) VALUES ('dani', 'dani@gmail.com');
*/
// Perhatikan: Kamu TIDAK perlu isi kolom id dan created_at.
// → id diisi otomatis oleh SERIAL (1, 2, 3, ...)
// → created_at diisi otomatis oleh DEFAULT CURRENT_TIMESTAMP

// --- Insert Project ---
/*
  INSERT INTO projects (user_id, title, deskripsi)
  VALUES (2, 'web sekolah', '...');

  INSERT INTO projects (user_id, title, deskripsi)
  VALUES (1, 'App Donasi', '...');

  INSERT INTO projects (user_id, title, deskripsi)
  VALUES (1, 'E-commerce', '...');
*/
// user_id = 2 → Artinya project ini milik user "dani" (id 2)
// user_id = 1 → Artinya project ini milik user "Reyyy" (id 1)
//
// 💡 Kalau kamu coba INSERT dengan user_id = 99 (yang tidak ada),
//    database akan ERROR: "FOREIGN KEY constraint violation"

// --- Insert Tech (Multiple Values) ---
/*
  INSERT INTO tech (name) VALUES ('Laravel'), ('Express.js'), ('React');
*/
// 💡 HAL PENTING:
// Kamu bisa INSERT beberapa baris sekaligus dengan memisahkan VALUES
// menggunakan koma! Ini LEBIH EFISIEN daripada 3 INSERT terpisah.
//
// ❌ Kurang efisien:
// INSERT INTO tech (name) VALUES ('Laravel');
// INSERT INTO tech (name) VALUES ('Express.js');
// INSERT INTO tech (name) VALUES ('React');
//
// ✅ Lebih efisien (yang kamu lakukan):
// INSERT INTO tech (name) VALUES ('Laravel'), ('Express.js'), ('React');

// --- Insert Junction Table ---
/*
  INSERT INTO project_tech (project_id, tech_id) VALUES (1, 1), (1, 3);
  INSERT INTO project_tech (project_id, tech_id) VALUES (2, 2), (2, 1);
*/
// (1, 1) → Project 1 (Web Sekolah) pakai Tech 1 (Laravel)
// (1, 3) → Project 1 (Web Sekolah) pakai Tech 3 (React)
// (2, 2) → Project 2 (App Donasi) pakai Tech 2 (Express.js)
// (2, 1) → Project 2 (App Donasi) pakai Tech 1 (Laravel)


// ============================================================
// 📌 2b. UPDATE DATA
// ============================================================

// --- Update User ---
/*
  UPDATE users
  SET
    name = 'raihan hamdani',
    email = 'reyyyy@gmail.com'
  WHERE id = 1;
*/
// ⚠️ SELALU PAKAI WHERE!
// Tanpa WHERE, SEMUA user akan ter-update (bukan hanya id = 1).

// --- Update Project ---
/*
  UPDATE projects
  SET
    title = 'Donate',
    deskripsi = 'app/web yang di gunakan untuk donasi'
  WHERE id = 2;
*/

// --- Update Tech ---
/*
  UPDATE tech
  SET name = 'Go'
  WHERE id = 2;
*/
// Ini mengubah "Express.js" (id 2) menjadi "Go".
// ⚠️ HATI-HATI: Karena tech adalah master table,
// mengubahnya akan berdampak ke SEMUA project yang memakai tech id 2!


// ============================================================
// 📌 2c. UPDATE JUNCTION TABLE (Cara Khusus!)
// ============================================================
/*
  -- Hapus dulu relasi lama
  DELETE FROM project_tech WHERE project_id = 2;

  -- Insert relasi baru
  INSERT INTO project_tech (project_id, tech_id) VALUES (2, 2), (2, 1), (2, 3);
*/
// 💡 HAL PENTING — KENAPA TIDAK BISA LANGSUNG UPDATE?
//
// Junction table punya COMPOSITE PRIMARY KEY (project_id + tech_id).
// Jika kamu ingin MENGGANTI tech yang dipakai sebuah project,
// kamu tidak bisa "update" seperti tabel biasa.
//
// Strateginya: DELETE semua relasi lama → INSERT relasi baru.
// Ini disebut "Delete-Insert Pattern" / "Replace Pattern".
//
// Contoh kasus:
// Project 2 sebelumnya pakai: [Express.js, Laravel]
// Kita mau ubah jadi: [Express.js, Laravel, React]
//
// Langkah:
// 1. DELETE FROM project_tech WHERE project_id = 2;
//    → Hapus semua tech yang terhubung ke project 2
// 2. INSERT INTO project_tech VALUES (2,2), (2,1), (2,3);
//    → Masukkan ulang tech yang baru (termasuk yang lama)
//
// ⚠️ Ini AMAN karena kita pakai ON DELETE CASCADE di FK,
// tapi yang dihapus di sini bukan project-nya, hanya RELASINYA.


// ============================================================
// 📌 2d. DELETE DATA
// ============================================================
/*
  DELETE FROM projects WHERE id = 3;
*/
// Menghapus project "E-commerce" (id 3).
//
// Karena project_tech punya ON DELETE CASCADE ke projects,
// maka semua row di project_tech yang project_id = 3
// OTOMATIS ikut terhapus juga.
//
// ⚠️ TANPA CASCADE:
// Kamu harus hapus data di project_tech dulu (child),
// baru bisa hapus di projects (parent).
// Kalau langsung hapus projects → ERROR: FK constraint violation.


// ============================================================
// ============================================================
// 📌 BAGIAN 3: SELECT & JOIN — Membaca Data
// ============================================================
// ============================================================


// ============================================================
// 📌 3a. SELECT DASAR
// ============================================================
/*
  SELECT * FROM users;       -- Ambil SEMUA data users
  SELECT * FROM projects;    -- Ambil SEMUA data projects
  SELECT * FROM tech;        -- Ambil SEMUA data tech
*/
// Tanda * artinya "semua kolom".
// Di production, sebaiknya SEBUTKAN kolom yang kamu butuhkan saja:
/*
  SELECT name, email FROM users;
*/
// Kenapa? Karena SELECT * mengambil SEMUA kolom termasuk yang
// tidak dibutuhkan → boros bandwidth dan memori.


// ============================================================
// 📌 3b. JOIN — Menggabungkan Data dari Beberapa Tabel
// ============================================================
/*
  SELECT
    users.name AS nama_user,
    projects.title AS nama_proyek,
    tech.name AS nama_teknologi
  FROM users
  JOIN projects ON users.id = projects.user_id
  JOIN project_tech pt ON projects.id = pt.project_id
  JOIN tech ON pt.tech_id = tech.id;
*/
// PENJELASAN LANGKAH DEMI LANGKAH:
//
// 1. FROM users
//    → Mulai dari tabel users.
//
// 2. JOIN projects ON users.id = projects.user_id
//    → Gabungkan dengan tabel projects.
//    → Syarat: kolom id di users harus COCOK dengan user_id di projects.
//    → Hasilnya: setiap user berpasangan dengan project miliknya.
//
// 3. JOIN project_tech pt ON projects.id = pt.project_id
//    → Gabungkan dengan junction table project_tech.
//    → "pt" adalah ALIAS (nama singkat) untuk project_tech.
//    → Syarat: project.id harus cocok dengan pt.project_id.
//
// 4. JOIN tech ON pt.tech_id = tech.id
//    → Gabungkan dengan tabel tech.
//    → Syarat: tech_id di junction harus cocok dengan id di tech.
//
// 💡 ALIAS (AS):
// "users.name AS nama_user" artinya: tampilkan kolom "name" dari users
// tapi GANTI NAMA kolomnya jadi "nama_user" di hasil output.
// Ini membuat hasil query lebih mudah dibaca.
//
// Hasil dari query di atas:
// ┌────────────────┬──────────────┬────────────────┐
// │ nama_user      │ nama_proyek  │ nama_teknologi │
// ├────────────────┼──────────────┼────────────────┤
// │ dani           │ web sekolah  │ Laravel        │
// │ dani           │ web sekolah  │ React          │
// │ raihan hamdani │ Donate       │ Go             │
// │ raihan hamdani │ Donate       │ Laravel        │
// └────────────────┴──────────────┴────────────────┘
//
// Perhatikan: "web sekolah" muncul 2 kali karena pakai 2 tech.
// Ini adalah perilaku NORMAL dari JOIN.


// ============================================================
// 📌 3c. JSON_AGG — Menggabungkan Hasil Jadi Array (PostgreSQL)
// ============================================================
/*
  SELECT
    users.name AS nama_user,
    projects.title AS nama_proyek,
    json_agg(tech.name) AS nama_teknologi
  FROM users
  JOIN projects ON users.id = projects.user_id
  JOIN project_tech ON projects.id = project_tech.project_id
  JOIN tech ON project_tech.tech_id = tech.id
  GROUP BY users.id, projects.id;
*/
// PENJELASAN:
//
// 1. json_agg(tech.name)
//    → Fungsi KHUSUS PostgreSQL yang menggabungkan beberapa nilai
//      menjadi satu JSON ARRAY.
//    → Mirip seperti Array di JavaScript!
//
// 2. GROUP BY users.id, projects.id
//    → Kelompokkan berdasarkan user dan project.
//    → Tanpa GROUP BY, json_agg tidak tahu data mana yang
//      harus digabungkan menjadi satu array.
//
// Hasil dari query di atas:
// ┌────────────────┬──────────────┬──────────────────────────┐
// │ nama_user      │ nama_proyek  │ nama_teknologi           │
// ├────────────────┼──────────────┼──────────────────────────┤
// │ dani           │ web sekolah  │ ["Laravel", "React"]     │ ← Jadi Array!
// │ raihan hamdani │ Donate       │ ["Go", "Laravel"]        │
// └────────────────┴──────────────┴──────────────────────────┘
//
// Bedakan dengan JOIN biasa (3b):
// - JOIN biasa    → Tech muncul di BARIS terpisah
// - json_agg      → Tech digabung jadi SATU ARRAY dalam 1 baris
//
// 💡 HAL PENTING:
// json_agg() hanya ada di PostgreSQL!
// Di MySQL, padanannya adalah JSON_ARRAYAGG().
// Di SQLite, kamu harus pakai GROUP_CONCAT() (hasilnya string, bukan JSON).
//
// 💡 KENAPA INI BERGUNA?
// Saat nanti dikirim ke Express.js, data sudah dalam format Array.
// Kamu bisa langsung looping di Handlebars dengan {{#each nama_teknologi}}.
// Tanpa json_agg, kamu harus proses data di JavaScript dulu (grouping manual).


// ============================================================
// ============================================================
// 📌 BAGIAN 4: TRUNCATE & DROP — Membersihkan Database
// ============================================================
// ============================================================


// ============================================================
// 📌 4a. TRUNCATE TABLE
// ============================================================
/*
  TRUNCATE TABLE users RESTART IDENTITY CASCADE;
  TRUNCATE TABLE projects RESTART IDENTITY CASCADE;
  TRUNCATE TABLE tech RESTART IDENTITY CASCADE;
*/
// PENJELASAN:
//
// TRUNCATE = Hapus SEMUA DATA di tabel, tapi tabelnya TETAP ADA.
//
// RESTART IDENTITY → Reset auto-increment id kembali ke 1.
//    Tanpa ini, kalau sebelumnya id terakhir = 5, maka insert
//    berikutnya mulai dari id = 6 (bukan 1).
//
// CASCADE → Jika ada tabel lain yang merujuk ke tabel ini (FK),
//    maka data di tabel referensi juga ikut di-truncate.
//
// TRUNCATE vs DELETE:
// ┌──────────────────┬──────────────────────┬─────────────────────┐
// │                  │ TRUNCATE             │ DELETE               │
// ├──────────────────┼──────────────────────┼─────────────────────┤
// │ Kecepatan        │ Sangat cepat         │ Lebih lambat         │
// │ WHERE clause     │ ❌ Tidak bisa        │ ✅ Bisa (selektif)   │
// │ Reset ID         │ ✅ Bisa (RESTART)    │ ❌ Tidak             │
// │ Trigger          │ ❌ Tidak aktif       │ ✅ Aktif             │
// │ Rollback         │ ❌ (di PostgreSQL)   │ ✅ Bisa              │
// │ Use case         │ Reset/clear semua    │ Hapus data tertentu  │
// └──────────────────┴──────────────────────┴─────────────────────┘


// ============================================================
// 📌 4b. DROP TABLE
// ============================================================
/*
  DROP TABLE IF EXISTS project_tech;
  DROP TABLE IF EXISTS projects;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS tech;
*/
// DROP = Hapus TABEL beserta SELURUH DATANYA. Tabelnya HILANG.
//
// IF EXISTS → Tidak error kalau tabelnya memang sudah tidak ada.
//    Tanpa IF EXISTS, kalau tabel sudah dihapus sebelumnya → ERROR.
//
// ⚠️ URUTAN DROP WAJIB DIPERHATIKAN!
// Kamu harus hapus CHILD dulu, baru PARENT:
// 1. project_tech  (child FK ke projects dan tech)
// 2. projects      (child FK ke users)
// 3. users         (parent)
// 4. tech          (parent)
//
// Kalau kamu drop users duluan padahal projects masih merujuk ke users,
// PostgreSQL akan ERROR: "cannot drop table users because other objects
// depend on it."
//
// 💡 ALTERNATIF: DROP TABLE users CASCADE;
// Ini akan DROP users DAN SEMUA tabel yang bergantung padanya.
// Tapi ini BERBAHAYA karena bisa menghapus tabel yang tidak kamu sadari!


// ============================================================
// ============================================================
// 📌 BAGIAN 5: HAL-HAL PENTING TAMBAHAN
// ============================================================
// ============================================================


// ============================================================
// 📌 5a. WHERE CLAUSE — Operator Penting
// ============================================================
/*
  -- Perbandingan
  SELECT * FROM users WHERE id = 1;           -- Sama dengan
  SELECT * FROM users WHERE id != 1;          -- Tidak sama dengan
  SELECT * FROM users WHERE id > 1;           -- Lebih dari
  SELECT * FROM users WHERE id >= 1;          -- Lebih dari sama dengan
  SELECT * FROM users WHERE id < 3;           -- Kurang dari

  -- BETWEEN
  SELECT * FROM users WHERE id BETWEEN 1 AND 5;  -- id 1 sampai 5

  -- IN (mencari dari daftar)
  SELECT * FROM users WHERE id IN (1, 3, 5);  -- id 1, 3, atau 5

  -- LIKE (pencarian teks)
  SELECT * FROM users WHERE name LIKE 'R%';   -- Nama dimulai huruf R
  SELECT * FROM users WHERE name LIKE '%an%'; -- Nama mengandung "an"
  SELECT * FROM users WHERE name ILIKE '%rey%'; -- Case-insensitive (PostgreSQL)

  -- IS NULL / IS NOT NULL
  SELECT * FROM projects WHERE user_id IS NULL;     -- Yang tidak punya user
  SELECT * FROM projects WHERE user_id IS NOT NULL;  -- Yang punya user

  -- AND / OR
  SELECT * FROM users WHERE id > 1 AND name LIKE 'R%';
  SELECT * FROM users WHERE id = 1 OR id = 3;
*/


// ============================================================
// 📌 5b. ORDER BY & LIMIT — Sorting dan Pagination
// ============================================================
/*
  -- Urutkan berdasarkan nama (A-Z)
  SELECT * FROM users ORDER BY name ASC;

  -- Urutkan berdasarkan terbaru (id terbesar dulu)
  SELECT * FROM users ORDER BY id DESC;

  -- Ambil 5 data pertama saja
  SELECT * FROM users ORDER BY id DESC LIMIT 5;

  -- Pagination (halaman 2, setiap halaman 5 data)
  SELECT * FROM users ORDER BY id DESC LIMIT 5 OFFSET 5;
  -- OFFSET 5 = skip 5 data pertama
*/
// 💡 HAL PENTING:
// LIMIT & OFFSET adalah cara paling umum untuk membuat PAGINATION.
// Contoh:
// Halaman 1: LIMIT 10 OFFSET 0  (data 1-10)
// Halaman 2: LIMIT 10 OFFSET 10 (data 11-20)
// Halaman 3: LIMIT 10 OFFSET 20 (data 21-30)
// Formula: OFFSET = (nomorHalaman - 1) * LIMIT


// ============================================================
// 📌 5c. AGGREGATE FUNCTIONS — Menghitung Data
// ============================================================
/*
  SELECT COUNT(*) FROM users;               -- Hitung total user
  SELECT COUNT(*) FROM projects WHERE user_id = 1;  -- Hitung project milik user 1

  SELECT MAX(id) FROM users;                -- ID terbesar
  SELECT MIN(id) FROM users;                -- ID terkecil

  -- Hitung berapa project per user
  SELECT
    users.name,
    COUNT(projects.id) AS jumlah_project
  FROM users
  LEFT JOIN projects ON users.id = projects.user_id
  GROUP BY users.id;
*/
// 💡 LEFT JOIN vs JOIN (INNER JOIN):
// - JOIN (INNER JOIN) → Hanya tampilkan user yang PUNYA project.
//   User tanpa project TIDAK MUNCUL.
// - LEFT JOIN → Tampilkan SEMUA user, meskipun tidak punya project.
//   User tanpa project tetap muncul dengan jumlah_project = 0.
//
// Hasil LEFT JOIN:
// ┌────────────────┬─────────────────┐
// │ name           │ jumlah_project  │
// ├────────────────┼─────────────────┤
// │ raihan hamdani │ 2               │
// │ dani           │ 1               │
// │ user_baru      │ 0               │  ← Tetap muncul! (LEFT JOIN)
// └────────────────┴─────────────────┘


// ============================================================
// 📌 5d. SUBQUERY — Query di dalam Query
// ============================================================
/*
  -- Cari user yang punya project paling banyak
  SELECT name FROM users
  WHERE id = (
    SELECT user_id FROM projects
    GROUP BY user_id
    ORDER BY COUNT(*) DESC
    LIMIT 1
  );
*/
// Subquery = query di dalam tanda kurung ()
// Query dalam → dijalankan DULUAN
// Query luar  → menggunakan HASIL dari query dalam
//
// Alur:
// 1. Query dalam: cari user_id yang punya project terbanyak
// 2. Query luar: ambil nama user berdasarkan id dari langkah 1


// ============================================================
// 📌 5e. RETURNING — Ambil Data Setelah INSERT/UPDATE/DELETE
// ============================================================
/*
  INSERT INTO users (name, email)
  VALUES ('Andi', 'andi@gmail.com')
  RETURNING *;
*/
// 💡 RETURNING adalah fitur EKSKLUSIF PostgreSQL yang SANGAT BERGUNA!
//
// Tanpa RETURNING:
// → Kamu INSERT data, tapi tidak tahu id-nya berapa (harus SELECT lagi).
//
// Dengan RETURNING:
// → Setelah INSERT, langsung mendapatkan data yang baru saja dimasukkan,
//    TERMASUK kolom-kolom auto-generated (id, created_at).
//
// Ini SANGAT BERGUNA saat diintegrasikan dengan Express.js nanti:
//
//   const result = await pool.query(
//     "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
//     [nama, email]
//   );
//   const newUser = result.rows[0];  // Langsung dapat data lengkap!


// ============================================================
// 📌 CHEAT SHEET: MAPPING SQL → JAVASCRIPT (UPDATE!)
// ============================================================
//
// ┌──────────┬──────────────────────────────┬──────────────────────────────────┐
// │ CRUD     │ SQL                          │ JavaScript (Array dulu)          │
// ├──────────┼──────────────────────────────┼──────────────────────────────────┤
// │ CREATE   │ INSERT INTO ... VALUES       │ array.push({...})               │
// │ READ ALL │ SELECT * FROM ...            │ array                           │
// │ READ ONE │ SELECT ... WHERE id = ?      │ array.find(p => p.id === id)    │
// │ UPDATE   │ UPDATE ... SET ... WHERE     │ array[index] = {...}            │
// │ DELETE   │ DELETE FROM ... WHERE        │ array.filter(p => p.id !== id)  │
// │ COUNT    │ SELECT COUNT(*) FROM ...     │ array.length                    │
// │ SORT     │ ORDER BY ... ASC/DESC        │ array.sort(...)                 │
// │ FILTER   │ WHERE kolom = '...'          │ array.filter(...)               │
// │ LIMIT    │ LIMIT 5                      │ array.slice(0, 5)              │
// │ GROUP    │ GROUP BY + json_agg()        │ reduce() / Object.groupBy()    │
// └──────────┴──────────────────────────────┴──────────────────────────────────┘
//
// Kamu sudah menguasai kolom JavaScript.
// Sekarang kamu sedang belajar kolom SQL.
// Nanti, kamu akan MENGHUBUNGKAN keduanya di Express.js! 🚀


// ============================================================
// 📌 KESIMPULAN
// ============================================================
//
// Dari file query yang kamu buat, kamu sudah mempraktikkan:
// ✅ DDL: CREATE TABLE, DROP TABLE, TRUNCATE, INDEX
// ✅ DML: INSERT, UPDATE, DELETE, SELECT
// ✅ Relasi: One-to-Many (users → projects)
// ✅ Relasi: Many-to-Many (projects ↔ tech via project_tech)
// ✅ JOIN: Menggabungkan data dari 4 tabel sekaligus
// ✅ json_agg: Mengubah hasil JOIN menjadi JSON Array
// ✅ CASCADE: Auto-hapus data child saat parent dihapus
// ✅ Composite PK: Primary Key gabungan di junction table
//
// Next step:
// → Belajar menghubungkan PostgreSQL ke Express.js (pakai library "pg")
// → Mengubah project CRUD dari Array ke Database sungguhan!
