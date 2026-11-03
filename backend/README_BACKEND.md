# PANDUAN INTEGRASI GOOGLE SHEETS & GOOGLE APPS SCRIPT
## ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER

Panduan ini menjelaskan langkah-langkah menyiapkan Google Spreadsheet (25 Sheet Database Terintegrasi) dan Google Apps Script (REST API Backend) untuk dihubungkan ke aplikasi web **ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER**.

---

### LANGKAH 1: BUAT GOOGLE SPREADSHEET BARU
1. Buka browser dan buka [Google Sheets Baru](https://sheets.new).
2. Beri judul spreadsheet Anda, misalnya: `CONTENT CREATOR BUSINESS PLANNER DB`.

---

### LANGKAH 2: EKSEKUSI SCRIPT SETUP 25 SHEET OTOMATIS
1. Di menu spreadsheet Anda, klik **Extensions (Ekstensi)** > **Apps Script**.
2. Di panel kiri Apps Script, buat file baru atau salin isi dari file:
   👉 `backend/SetupSpreadsheet.gs`
3. Tempelkan (*paste*) seluruh kodenya dan simpan file (`Ctrl + S`).
4. Pada dropdown fungsi di toolbar atas, pilih fungsi `setupAllInOneDatabase`.
5. Klik tombol **Run (Jalankan)**.
6. Berikan izin otorisasi Google ketika pertama kali diminta (*Review Permissions* > pilih akun Anda > *Advanced* > *Go to ... (unsafe)* > *Allow*).
7. Tunggu beberapa detik sampai muncul popup dialog sukses.
8. Buka kembali tab Google Sheets Anda: Seluruh **25 Sheet** (Users, Brands, Clients, Projects, Campaigns, Social_Accounts, Content_Planning, Content_Tasks, Content_Subtasks, Content_Calendar, Content_Scripts, Content_Production, Content_Revisions, Content_Publications, Content_Analytics, Media_Library, References, Time_Tracking, Income, Expenses, Invoices, Payments, Targets, Notifications, Settings) telah terbuat rapi lengkap dengan header navy blue dan dataset starter realistis.

---

### LANGKAH 3: DEPLOY REST API (Code.gs)
1. Kembali ke editor Apps Script.
2. Di sebelah kiri, klik **+ (Add a file)** > pilih **Script**, beri nama `Code.gs`.
3. Salin seluruh isi dari file:
   👉 `backend/Code.gs`
4. Tempelkan ke editor Apps Script dan klik ikon **Save (Ctrl + S)**.
5. Klik tombol biru **Deploy (Terapkan)** di pojok kanan atas > pilih **New deployment (Penerapan baru)**.
6. Klik ikon gerigi (Select type) di samping kiri > pilih **Web app**.
7. Konfigurasi deployment:
   - **Description:** `REST API Content Creator Planner v1.0`
   - **Execute as (Jalankan sebagai):** `Me (emailanda@gmail.com)`
   - **Who has access (Siapa yang memiliki akses):** `Anyone (Siapa saja)`  
     *(Wajib memilih 'Anyone' agar aplikasi web browser dapat mengakses API tanpa error CORS)*.
8. Klik tombol **Deploy**.
9. Salin URL yang muncul di bagian **Web app URL** (berakhiran `/exec`).
   *Contoh format URL:*  
   `https://script.google.com/macros/s/AKfycbx.../exec`

---

### LANGKAH 4: INTEGRASI FOLDER GOOGLE DRIVE (OPSIONAL UNTUK UPLOAD MEDIA)
1. Buka [Google Drive](https://drive.google.com).
2. Buat folder baru, misalnya: `Content Creator Media Storage`.
3. Buka folder tersebut, lalu perhatikan URL di browser Anda:  
   `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i...`
4. Bagian setelah `/folders/` adalah **Folder ID**. Salin kode ID tersebut.

---

### LANGKAH 5: HUBUNGKAN KE APLIKASI WEB
1. Buka aplikasi web **ALL IN ONE CONTENT CREATOR PLANNER** di browser Anda.
2. Masuk ke menu **Pengaturan (Settings)** > tab **Integrasi Cloud & Google Sheets**.
3. Masukkan **Web App URL** yang Anda dapatkan di Langkah 3.
4. Masukkan **Token Keamanan** (Default: `PLANNER_SECRET_TOKEN_2026`).
5. Masukkan **ID Folder Google Drive** yang Anda salin di Langkah 4.
6. Klik tombol **Tes Koneksi & Simpan**.
7. Indikator di kanan atas aplikasi akan langsung berubah hijau **"🟢 Google Sheets Terhubung"**, dan sinkronisasi data 25 sheet akan aktif secara otomatis!
