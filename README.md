# ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER

Aplikasi web modern terintegrasi yang dirancang khusus untuk **Content Creator**, **Social Media Manager**, **Video Editor**, **Affiliate Marketer**, dan **Tim Produksi Konten** untuk mengelola seluruh siklus operasional bisnis dan konten dalam satu sistem: mulai dari ideasi, penulisan script hook 3 detik, jadwal shooting kalender, manajemen subtask, editing & revisi, publikasi multi-platform, analitik performa, hingga pencatatan keuangan sponsor & invoice.

Aplikasi ini menggunakan:
- **Google Sheets** sebagai database relasional utama (25 Sheet terstandarisasi).
- **Google Apps Script** sebagai REST API backend nirserver (*serverless*).
- **Google Drive** sebagai penyimpanan berkas media (foto produk, video mentah 4K, audio, guidelines).
- **Frontend Responsif** (Desktop, Laptop, Tablet, & Smartphone) berbasis Tailwind CSS & ES6 Modules tanpa kompilasi rumit.

---

## 🌟 FITUR UTAMA & 21 MODUL LENGKAP (PRD v1.0)

### 1. Executive Dashboard (Modul 01)
- **Ringkasan Aktivitas Terkini:** Total tugas, tugas deadline hari ini, pekerjaan tertunda, dan peringatan terlambat (*late alert*).
- **Pipeline Konten Real-Time:** Monitoring jumlah konten dalam tahap Ide, Terencana, Produksi, Siap Tayang, dan Published.
- **Grafik Interaktif (Chart.js):** Distribusi status pipeline konten (Doughnut) dan perbandingan arus kas pemasukan vs beban operasional (Bar Chart).
- **Quick Actions:** Akses cepat tugas mendesak, jadwal tayang mendatang, dan centang rutinitas kreator langsung dari dashboard.

### 2. Content Planning & Ideasi (Modul 02)
- **Bank Ide & Perencanaan Konten:** Pencatatan judul, platform, brand mitra, pilar konten, kategori, target audiens, dan formula hook 3 detik.
- **Mode Tampilan:** Pilihan instan antara **Kanban Board** (6 status: *Idea, Planned, In Production, Ready, Published, Archived*) dan **Tabel Rinci**.
- **Konversi 1-Klik:** Tombol **"⚡ Jadi Tugas"** untuk langsung mengubah konsep ide menjadi tugas pekerjaan baru beserta checklist subtask produksinya secara otomatis!

### 3. Content Calendar (Modul 03)
- **Kalender Terpadu:** Membedakan dengan jelas antara *Tanggal Shooting Produksi*, *Deadline Video Final*, dan *Jadwal Tayang Publikasi*.
- **Tampilan Kalender:** Pilihan tampilan **Kalender Bulanan (Month Grid)** dengan penanda tanggal hari ini serta **Agenda List View** terurut.
- **Filter Fleksibel:** Filter berdasarkan Platform media sosial dan Brand mitra.

### 4. Task Management & Subtasks (Modul 04)
- **Kanban & List Mode:** Pengelompokan status (*To Do, In Progress, Review, Revision, Completed, Cancelled*).
- **Checklist Subtask:** Pelacakan checklist mikro pekerjaan. Persentase progres tugas (0–100%) dan status selesai dihitung otomatis berdasarkan subtask yang dicentang.
- **Prioritas & Deadline:** Badge visual (*Urgent, High, Normal, Low*) dengan penanda otomatis jika pekerjaan terlambat (*Overdue*).

### 5. Content Production (Modul 05)
- **Log Sesi Shooting:** Lokasi pengambilan gambar, kru/tim produksi yang bertugas, dan checklist perlengkapan kamera/lighting/audio.
- **Integrasi Google Drive:** Tautan langsung ke folder Google Drive untuk berkas *raw footage* video resolusi tinggi.

### 6. Script & Copywriting Studio (Modul 06)
- **Formula Hook 3 Detik:** Kolom khusus perumusan hook visual & audio penahan *scroll* pemirsa.
- **Breakdown Naskah:** Format penulisan scene-by-scene (*Hook, Problem, Solution, Proof, CTA*).
- **Salin Naskah & Caption:** Tombol 1-klik untuk menyalin seluruh naskah, draf caption, dan kumpulan tagar (*hashtags*) ke clipboard.

### 7. Editing & Revision Tracker (Modul 07)
- **Alur Persetujuan Video:** Editor yang ditugaskan, versi berkas (*v1_draft, v2_final*), dan dokumentasi catatan revisi dari brand/klien.
- **Tombol Approve:** 1-klik persetujuan video final siap publikasi.

### 8. Media Library (Modul 08)
- **Penyimpanan Aset Digital:** Galeri berkas foto produk, aset brand guideline PDF, audio sound komersial, dan thumbnail.
- **Upload Google Drive:** Upload berkas lokal langsung dari browser (konversi Base64 otomatis ke Google Drive melalui Apps Script).

### 9. Social Media Management (Modul 09)
- **Multi-Akun Channel:** Manajemen seluruh akun TikTok, Instagram Reels, YouTube Channel, LinkedIn, dll.
- **Pelacakan Pertumbuhan:** Pencatatan jumlah followers/subscribers, niche konten, dan target audiens tiap channel.

### 10. Publishing Management (Modul 10)
- **Pencatatan Riwayat Tayang:** Tanggal & jam publikasi aktual, akun penayang, caption terpakai, dan tautan live postingan.
- **Tombol "Tandai Published":** Memperbarui status konten dan mencatat tautan live URL konten.

### 11. Content Analytics & KPI (Modul 11)
- **Snapshot Metrik:** Views, Reach, Impressions, Likes, Comments, Shares, Saves, Clicks, Followers Baru, hingga Penjualan/Omzet.
- **Kalkulator Engagement Rate (ER%):**  
  $$\text{ER} = \frac{\text{Likes} + \text{Comments} + \text{Shares} + \text{Saves}}{\text{Views}} \times 100\%$$

### 12. Brand & Client Management (Modul 12)
- **Direktori Mitra:** Profil brand rekanan, kontak PIC, akun media sosial brand, serta data klien/agency partner.

### 13. Project & Campaign Management (Modul 13)
- **Kontrak Sponsorship:** Nilai kontrak proyek, target kampanye, timeline pengerjaan, dan target kuota konten sponsor.

### 14. Financial Management (Modul 14)
- **Pencatatan Transaksi:** Arus kas masuk (sponsorship, komisi affiliate, AdSense) dan beban operasional studio (alat, software, props, crew).
- **Faktur & Invoice:** Pembuatan nomor invoice unik, tanggal jatuh tempo, total tagihan, dan rekonsiliasi bukti bayar.
- **Kartu Ringkasan:** Kas Diterima, Piutang (Pending), Total Beban, dan Estimasi Laba Bersih (*Net Profit Margin*).

### 15. Time Tracking (Modul 15)
- **Live Active Stopwatch:** Timer langsung di browser dengan penghitung jam:menit:detik *real-time*.
- **Otomatis Masuk Log:** Saat timer dihentikan, durasi kerja otomatis tercatat ke dalam sheet `Time_Tracking`.
- **Input Manual:** Pencatatan durasi kerja manual per tanggal dan penugasan.

### 16. Checklist & Routines (Modul 16)
- **Rutinitas Harian Kreator:** Checklist kebiasaan membangun channel (cek komentar, riset sound viral, draf hook baru).
- **Pencapaian & Reset:** Indikator progres persentase harian dan tombol reset untuk memulai hari baru.

### 17. Target & Productivity (Modul 17)
- **Penetapan Sasaran:** Target kuota produksi video, target views bulanan, target followers, dan target omzet rupiah.
- **Progress Bar & Evaluasi:** Status otomatis: *Achieved (≥100%), On Track (≥80%), Behind Target (<80%)*.

### 18. Research & References (Modul 18)
- **Bank Inspirasi:** Simpan tautan video viral kompetitor, tangkapan layar, dan ide adaptasi konten.
- **Konversi ke Ide Konten:** 1-klik tombol **"⚡ Jadi Ide"** untuk memindahkan referensi ke perencanaan konten aktif.

### 19. Reports & Exports (Modul 19)
- **Pilihan Laporan:** Laporan Keuangan (P&L), Perencanaan Konten, Pekerjaan Tugas, Publikasi, Analitik, dan Waktu Kerja.
- **Ekspor Excel (.xlsx):** Pembuatan file spreadsheet resmi melalui SheetJS.
- **Cetak / Ekspor PDF:** Format cetak resmi berstandar dokumen eksekutif dengan kop surat studio.

### 20. Notifications Center (Modul 20)
- **Pengingat Cerdas:** Peringatan deadline mendekat, jadwal posting siap tayang, invoice jatuh tempo, dan tugas terlambat.
- **Tandai Terbaca:** Pengelolaan status notifikasi dan tautan langsung ke modul terkait.

### 21. Settings & Cloud Sync (Modul 21)
- **Konfigurasi Cloud:** Pengaturan Web App URL Google Apps Script, Secret Token, dan Folder ID Google Drive.
- **Tes Ping & Sync Sekarang:** Pengujian koneksi dua arah secara langsung.
- **Backup & Restore JSON:** Unduh salinan penuh seluruh 25 sheets dalam format JSON untuk cadangan offline.
- **Reset Database:** Opsi pemulihan dataset pabrik.

---

## 🗄️ STRUKTUR 25 SHEET DATABASE GOOGLE SHEETS (PRD SECTION 7.1)

| No | Nama Sheet | Primary Key | Deskripsi Isi Data |
|:---|:---|:---|:---|
| 1 | `Users` | `user_id` | Data pengguna studio, nama, email, role, dan foto profil. |
| 2 | `Brands` | `brand_id` | Brand mitra, perusahaan, kategori industri, website, kontak PIC. |
| 3 | `Clients` | `client_id` | Klien agency/korporat, alamat, telepon, tipe klien. |
| 4 | `Projects` | `project_id` | Kontrak proyek sponsorship, brand terkait, budget, timeline. |
| 5 | `Campaigns` | `campaign_id` | Campaign pemasaran, sasaran objektif, target kuota konten. |
| 6 | `Social_Accounts` | `account_id` | Akun channel media sosial, platform, followers, niche audiens. |
| 7 | `Content_Planning` | `content_id` | Perencanaan ide, pilar konten, formula hook, CTA, status pipeline. |
| 8 | `Content_Tasks` | `task_id` | Tugas pekerjaan, prioritas, PIC, deadline, persentase progres. |
| 9 | `Content_Subtasks` | `subtask_id` | Checklist mikro rincian tugas per task_id. |
| 10 | `Content_Calendar` | `calendar_id` | Tanggal shooting, deadline video, tanggal & jam publikasi. |
| 11 | `Content_Scripts` | `script_id` | Naskah scene by scene, hook 3 detik, caption, tagar, versi. |
| 12 | `Content_Production` | `production_id` | Log shooting, lokasi, kru, alat kamera, tautan Google Drive raw footage. |
| 13 | `Content_Revisions` | `revision_id` | Catatan revisi editor, versi file video, status approval. |
| 14 | `Content_Publications` | `publication_id`| Riwayat posting tayang, channel penayang, URL live postingan. |
| 15 | `Content_Analytics` | `analytics_id` | Snapshot performa views, reach, likes, shares, engagement rate. |
| 16 | `Media_Library` | `media_id` | Metadata file foto/video Google Drive, tipe berkas, kategori. |
| 17 | `References` | `reference_id` | Referensi konten viral, link sumber, screenshot, ide adaptasi. |
| 18 | `Time_Tracking` | `time_id` | Catatan durasi waktu kerja (menit) dari stopwatch / manual. |
| 19 | `Income` | `income_id` | Pemasukan kas sponsorship, affiliate, AdSense, status bayar. |
| 20 | `Expenses` | `expense_id` | Pengeluaran alat, software langganan, props shooting, kru. |
| 21 | `Invoices` | `invoice_id` | Nomor invoice penagihan klien, tanggal jatuh tempo, total tagihan. |
| 22 | `Payments` | `payment_id` | Bukti penerimaan pembayaran termin invoice. |
| 23 | `Targets` | `target_id` | Sasaran kuota video, views, followers, target omzet, evaluasi %. |
| 24 | `Notifications` | `notification_id`| Notifikasi peringatan deadline, jadwal tayang, invoice. |
| 25 | `Settings` | `key` | Konfigurasi sistem, Google Apps Script URL, token keamanan. |

---

## 📁 STRUKTUR FOLDER APLIKASI

```
business-content-planner/
├── backend/
│   ├── Code.gs                   # REST API Google Apps Script (CRUD 25 Sheets, Drive Upload, Batch Sync)
│   ├── SetupSpreadsheet.gs       # Wizard pembuat & pemformat 25 Sheet database otomatis
│   └── README_BACKEND.md         # Panduan instalasi dan deployment Apps Script
├── css/
│   └── custom.css                # Styling scrollbar slim, print PDF layout, transisi modal
├── js/
│   ├── app.js                    # Router hash SPA, event controller & search modal
│   ├── config.js                 # Skema 25 Sheet, daftar status standar, pilar & platform
│   ├── store.js                  # State Store reaktif terpusat (LocalStorage + Pub-Sub + Aggregation)
│   ├── api.js                    # REST API Client ke Google Apps Script (dengan offline queue)
│   └── views/
│       ├── dashboard.js          # Modul 01: Executive Dashboard & Chart.js
│       ├── content.js            # Modul 02: Content Planning & Kanban Pipeline
│       ├── calendar.js           # Modul 03: Kalender Terpadu (Bulan & Agenda)
│       ├── tasks.js              # Modul 04: Task Management & Subtasks Checklist
│       ├── production.js         # Modul 05, 06, 07: Script Studio, Shooting Log & Editing Revisi
│       ├── media.js              # Modul 08, 18: Media Library Google Drive & Riset Referensi
│       ├── social.js             # Modul 09, 10, 11: Akun Channel, Publikasi & Analitik Performa
│       ├── business.js           # Modul 12, 13: Brand Mitra, Klien Agency & Proyek Sponsorship
│       ├── finance.js            # Modul 14: Buku Kas Masuk, Beban, Invoice & Bukti Pembayaran
│       ├── timetracking.js       # Modul 15, 16: Live Stopwatch Timer & Rutinitas Harian
│       ├── targets.js            # Modul 17: Sasaran Target & Pelacakan KPI
│       ├── reports.js            # Modul 19: Laporan Resmi & Ekspor Excel (.xlsx) / Cetak PDF
│       ├── notifications.js      # Modul 20: Pusat Notifikasi Aktivitas & Deadline
│       └── settings.js           # Modul 21: Konfigurasi Cloud, Profil Studio, RBAC Tim & Backup JSON
├── js/auth.js                    # Modul Autentikasi, Sesi Login, & Kontrol Hak Akses (RBAC)
├── js/bundle.js                  # Standalone Bundle terkompilasi (zero-dependency file:/// ready)
├── index.html                    # Single Page Application Shell (Tailwind CSS responsif & Login Screen)
└── README.md                     # Dokumentasi Resmi Proyek
```

---

## 🔐 FITUR LOGIN, PROFIL & KONTROL HAK AKSES PENGGUNA (RBAC)

### 1. Dashboard Login
- **Tampilan Modern & Flat Vector Artwork:** Desain presisi dengan ilustrasi meja kerja 2D (kalender dinding, jam dinding 10:10, lampu meja berkerucut cahaya, laptop/monitor, cangkir kopi, dan kursi kantor biru ergonomis).
- **Kartu Login Mengambang:** Mengusung header *Dashboard Login*, lencana validasi otomatis (*Wrong Password!!*, *username field cannot be empty*), input Username & Password dengan ikon biru, tombol *Login to My Account*, serta tombol demo 1-klik untuk setiap peran:
  - `👑 Owner (Rian)`: Username `rian` / Password `123`
  - `🛡️ Admin (Sarah)`: Username `sarah` / Password `123`
  - `🎬 Video Editor (Fahri)`: Username `fahri` / Password `123`
  - `✍️ Creator / Member (Dimas)`: Username `dimas` / Password `123`

### 2. Penggantian Profil Pengguna Langsung Melalui Aplikasi
- Pengguna dapat mengubah nama lengkap, username, email, password baru, foto avatar (via URL foto, upload berkas lokal yang otomatis diubah ke Data URL, atau pilihan preset avatar instan), dan bio/jabatan studio.
- Perubahan profil langsung memperbarui tampilan foto avatar, nama, dan peran di sidebar serta sapaan header secara seketika (*real-time*).

### 3. Manajemen Tim & Pengaturan Hak Akses (Khusus Owner)
- **Tambah Pengguna Baru:** Owner dapat mendaftarkan akun Admin, Video Editor, atau Creator/Member baru dengan username dan password unik.
- **Pengaturan Izin Akses Per Modul (13 Modul):** Owner dapat secara fleksibel mencentang atau mencabut akses ke masing-masing modul:
  1. Executive Dashboard
  2. Content Planning & Pipeline
  3. Kalender Konten
  4. Tugas & Kanban Board
  5. Script & Studio Naskah
  6. Media Library & Google Drive
  7. Database Sheets & Ekspor
  8. Bisnis, Klien & Brand
  9. Kas, Beban & Invoice (Keuangan)
  10. Stopwatch & Rutinitas
  11. Sasaran KPI & Target
  12. Pusat Notifikasi
  13. Pengaturan Sistem & API
- **Proteksi Hak Akses (Route Guard):** Jika pengguna biasa/editor mencoba mengakses menu yang tidak diizinkan (misalnya modul Keuangan/Kas), sistem secara otomatis memblokir akses, meredupkan menu di sidebar, dan menampilkan notifikasi peringatan.

---

## 🚀 PANDUAN PENGGUNAAN CEPAT

### 1. Cara Menjalankan Aplikasi di Komputer / Laptop

Anda memiliki 2 cara mudah untuk membuka aplikasi:

#### Cara A (Sangat Direkomendasikan - 1 Klik):
- Klik dua kali file **`START_APP.bat`** di dalam folder aplikasi.
- Script ini akan menjalankan server lokal otomatis dan langsung membuka aplikasi di browser default Anda pada alamat `http://localhost:8080/index.html`.

#### Cara B (Buka Langsung):
- Cukup klik dua kali file **`index.html`** langsung dari Windows Explorer.
- File bundle mandiri (`js/bundle.js`) telah disertakan sehingga aplikasi dapat berjalan langsung tanpa hambatan CORS di semua browser (Google Chrome, Microsoft Edge, Firefox, dsb).

---

### 2. Hubungkan ke Google Sheets & Google Drive (Cloud Sync)

1. Buat spreadsheet baru di Google Drive Anda melalui [sheets.new](https://sheets.new).
2. Di Spreadsheet baru, buka menu **Extensions > Apps Script** (Ekstensi > Apps Script).
3. Buat file baru bernama `SetupSpreadsheet.gs`, salin seluruh isi dari file `backend/SetupSpreadsheet.gs`, lalu pilih fungsi **`setupAllInOneDatabase`** dan klik **Run**. Seluruh **25 Sheet** beserta header warna navy, format angka, dan data starter akan terbuat otomatis dalam beberapa detik!
4. Buat file baru lagi bernama `Code.gs`, salin seluruh isi dari file `backend/Code.gs`.
5. Klik tombol biru **Deploy > New deployment > Web app**:
   - **Execute as:** *Me (email Anda)*
   - **Who has access:** *Anyone* (Siapa saja, agar frontend dapat mengirim & membaca data)
   - Klik **Deploy**, berikan izin otorisasi Google jika diminta, lalu salin **Web App URL** yang berakhiran `/exec`.
6. Buka aplikasi Content Planner Anda, klik menu **Pengaturan & Cloud Sync** (atau klik tombol **🔄 Sinkron** di kanan atas).
7. Tempel URL Web App ke kolom **Google Apps Script Web App URL**.
8. Klik tombol **📡 Tes Ping Koneksi** untuk memastikan status hijau, lalu klik **Simpan Konfigurasi**.
9. Klik tombol **🔄 Tarik Semua Data Google Sheets** untuk memuat seluruh 25 sheet langsung ke aplikasi Anda!
10. Tombol di kanan atas aplikasi sekarang akan menampilkan badge hijau **"🟢 Sinkron Cloud"** yang siap disinkronkan kapan saja dengan 1 klik!

---

### 3. Setup Supabase (Cloud PostgreSQL Real-Time Database)

Jika aplikasi digunakan oleh **banyak pengguna secara online secara bersamaan**, sangat disarankan menghubungkannya ke **Supabase**:
- **Auto-Save Otomatis:** Setiap kali pengguna membuat ide, menggeser kanban board, mencatat durasi kerja, atau merevisi script, data otomatis tersimpan ke PostgreSQL tanpa perlu menekan tombol sinkronisasi manual!
- **Multi-User Real-time Sync:** Setiap perubahan yang dilakukan satu pengguna (misal Creator menambah draf) akan langsung muncul seketika di layar pengguna lain (misal Video Editor) melalui WebSocket Realtime!

#### Langkah Setup Supabase (Hanya 3 Menit):
1. Buat proyek gratis baru di [supabase.com](https://supabase.com).
2. Buka menu **SQL Editor**, klik **New query**, lalu salin seluruh isi file [`supabase/schema.sql`](file:///C:/Users/hp/.gemini/antigravity/scratch/business-content-planner/supabase/schema.sql) dan klik **Run**. Seluruh 25 tabel relasional, foreign keys, index, Row Level Security (RLS), dan publikasi realtime langsung siap digunakan!
3. Masuk ke **Project Settings > API**, salin:
   - **Project URL** (contoh: `https://xyzproject.supabase.co`)
   - **anon public key**
4. Buka aplikasi di menu **Settings > Tab Cloud Database & Integrasi**, tempel Project URL dan Anon Key pada bagian Supabase, lalu klik **Simpan & Uji Koneksi**.
5. Klik **Tarik Data dari Supabase** untuk sinkronisasi awal.
6. Panduan lengkap dan arsitektur database dapat dibaca di [`supabase/README_SUPABASE.md`](file:///C:/Users/hp/.gemini/antigravity/scratch/business-content-planner/supabase/README_SUPABASE.md).

---

### 4. Deploy Frontend ke Netlify (Online Production)

Aplikasi ini 100% siap di-deploy ke **Netlify** dalam hitungan detik:

#### Cara Termudah (Drag-and-Drop / 30 Detik):
1. Login ke [app.netlify.com](https://app.netlify.com).
2. Buka menu **Sites**, lalu tarik (*drag & drop*) folder `business-content-planner` langsung ke area upload Netlify.
3. Netlify akan langsung memberikan URL publik HTTPS (contoh: `https://my-content-planner.netlify.app`) yang dapat diakses oleh seluruh tim Anda dari PC, tablet, maupun smartphone!

File konfigurasi [`netlify.toml`](file:///C:/Users/hp/.gemini/antigravity/scratch/business-content-planner/netlify.toml) dan [`_redirects`](file:///C:/Users/hp/.gemini/antigravity/scratch/business-content-planner/_redirects) telah disiapkan di root folder sehingga seluruh rute navigasi SPA dan keamanan headers berjalan optimal tanpa 404 error.

Panduan deployment Netlify secara rinci tersedia di [`NETLIFY_DEPLOY.md`](file:///C:/Users/hp/.gemini/antigravity/scratch/business-content-planner/NETLIFY_DEPLOY.md).
