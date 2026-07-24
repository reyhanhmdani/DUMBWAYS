# 🚀 Dumbways Fullstack Bootcamp Journey (Monorepo)

Selamat datang di repository resmi perjalanan belajar Fullstack Web Development saya di **Dumbways Indonesia**. Monorepo ini berisi seluruh kode latihan *hands-on*, tugas harian (*daily tasks*), *slicing project*, hingga integrasi *End-to-End* Backend & Frontend dari **Day 1 hingga selesai**.

---

## 👨‍💻 Developer Profile

- **Nama:** Raihan Hamdani (Rey)
- **Role:** Fullstack Developer Trainee
- **Program:** Fullstack Web Development Bootcamp — Dumbways Indonesia

---

## 🛠️ Tech Stack & Tools

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![React.js](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## 📁 Struktur Monorepo & Peta Kurikulum

```text
Bootcamp/
├── stage1/                       # Stage 1: Frontend Fundamentals & Web Slicing
│   ├── day1-3/                  # Form Handling & DOM Manipulation (Buku Tamu App)
│   ├── day2/                    # Styling & CSS Fundamentals
│   ├── day4/                    # Flexbox Layouting & Responsive Design
│   ├── day5/                    # Dynamic DOM Elements
│   ├── day6/                    # Migrasi Kode JS ke TypeScript & Array Methods (.reduce, .map, .filter)
│   └── final_stage1/            # Final Project: ReyApp (Social Media Glassmorphism + LocalStorage)
│
└── stage2_online/                # Stage 2: Fullstack Engineering (Express.js + Prisma + React)
    ├── EXPRESS_TO_PRISMA/        # Backend Development (Day 1 - Day 9)
    │   ├── day1-2=[Express.js]/ # Express setup & HTTP Methods (GET, POST, PUT, DELETE)
    │   ├── day3=Pengenalan_db/  # Konsep RDBMS, SQL DDL & DML
    │   ├── day4=db_operation/   # Native DB Drivers & Parameterized Query (SQL Injection Defense)
    │   ├── day5_express_ts/     # Express + TypeScript Separation of Concerns Architecture
    │   ├── day6_prisma/         # Prisma ORM Setup, Schema & Client CRUD
    │   ├── day7_prisma_query/   # Relasi Database (1-to-N), Filtering & Pagination (skip/take)
    │   ├── day8_error_handling/ # Custom Middleware & Centralized Error Handler
    │   └── day9_keamanan_upload/ # Password Hashing (bcrypt), JWT Token, RBAC & File Upload (Multer)
    │
    └── REACT/                    # Frontend Development (Day 10 - Day 13+)
        ├── day10_react_basic/   # JSX, Declarative UI & State Immutability
        ├── day11_routing/       # Single Page Application (SPA) React Router v6 & Outlet Layout Engine
        ├── day12_State_Forms/   # Controlled Form, Debouncing Custom Hook & Trio State Async Integration
        └── day13/               # Context API State Management & Todo App
```

---

## 🌟 Highlight Kode & Arsitektur Projek

1. **Stage 1 Final Project — ReyApp (`stage1/final_stage1`):**
   - Web sosial media modern berbasis HTML5, Vanilla JS, dan Tailwind CSS (efek *Glassmorphism*).
   - Fitur unggulan: Post Feed terbaru di posisi teratas (`unshift()`), *state persistence* via `localStorage`.

2. **Backend Express.js + Prisma ORM (`stage2_online/EXPRESS_TO_PRISMA`):**
   - Menggunakan arsitektur *Separation of Concerns* (Routes, Controllers, Middlewares, Services).
   - Keamanan API: Password Hashing via `bcrypt`, Otentikasi Stateless dengan **JWT Token**, Otorisasi **RBAC**, serta *Sanitization* upload file gambar via `Multer`.

3. **Frontend React.js SPA (`stage2_online/REACT`):**
   - Arsitektur *Lifting State Up* & `<Outlet context />` React Router v6.
   - Controlled Form (*Single Source of Truth*), Custom Hook `useDebounce` untuk pencarian ramah server, dan penanganan async API menggunakan **Trio State** (`data`, `isLoading`, `error`).

---

## 💻 Cara Menjalankan Projek Lokal

### Run Frontend React (Vite):
```bash
cd stage2_online/REACT/day12_State_Management_Hooks_Controlled_Form_API_Integration/frontend
npm install
npm run dev
```

### Run Backend Express + Prisma:
```bash
cd stage2_online/REACT/day12_State_Management_Hooks_Controlled_Form_API_Integration/backend
npm install
npx prisma migrate dev
npm run dev
```

---

## 📝 Catatan Latihan

Setiap folder `day` mewakili perkembangan tingkat lanjut dalam memahami pengembangan perangkat lunak modern. Kode ditulis dengan standar *Clean Code*, *Type Safety*, dan *Best Practices* yang siap dipakai di tingkat industri (*production-ready*).

---
*Developed with 💚 by Raihan Hamdani (Rey) @ Dumbways Bootcamp.*
