# PANDUAN LENGKAP SETUP SUPABASE BACKEND (3 MENIT)

Aplikasi **ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER** mendukung backend **Supabase** dengan PostgreSQL, autentikasi multi-user, penyimpanan media, dan auto-sync WebSocket Realtime.

---

## Langkah 1: Buat Project Baru di Supabase (Gratis)
1. Buka [https://supabase.com](https://supabase.com) dan login / buat akun gratis.
2. Klik tombol **"New Project"**.
3. Isi informasi project:
   - **Name:** `CreatorHub Planner` (atau nama studio Anda).
   - **Database Password:** Buat password yang kuat dan catat.
   - **Region:** Pilih `Singapore (ap-southeast-1)` untuk koneksi super cepat dari Indonesia.
4. Klik **"Create new project"** dan tunggu sekitar 1-2 menit hingga database selesai disiapkan.

---

## Langkah 2: Jalankan Skrip Skema Database (1 Klik)
1. Di dashboard Supabase, buka menu **SQL Editor** (ikon terminal `>_` di sidebar kiri).
2. Klik tombol **"New query"**.
3. Buka file [`supabase/schema.sql`](./schema.sql), salin seluruh isinya, dan tempel (*paste*) ke dalam editor SQL Supabase.
4. Klik tombol hijau **"Run"** (atau tekan `Ctrl + Enter`).
5. Selesai! Seluruh **25 tabel database**, relasi Foreign Key, aturan keamanan Row Level Security (RLS), Realtime Publications, dan data pengguna awal (*Rian, Sarah, Fahri, Dimas*) telah aktif.

---

## Langkah 3: Ambil URL Project & API Key
1. Di dashboard Supabase, buka menu **Project Settings** (ikon gerigi di kiri bawah) > **API**.
2. Salin 2 kunci berikut:
   - **Project URL:** `https://your-project-id.supabase.co`
   - **Project API Keys (`anon` / `public`):** `eyJhbGciOiJIUzI1NiIsInR5cCI...`

---

## Langkah 4: Hubungkan ke Aplikasi
1. Buka aplikasi Content Planner Anda di browser atau Netlify.
2. Buka menu **Settings** > tab **Integrasi Cloud Database**.
3. Masukkan **Supabase URL** dan **Anon API Key** Anda.
4. Klik tombol **"📡 Tes Koneksi Supabase"** lalu klik **"Simpan Konfigurasi"**.
5. Sistem sekarang 100% tersambung ke Supabase Cloud:
   - Data tersimpan otomatis detik itu juga.
   - Multi-user realtime aktif antar-anggota tim!
