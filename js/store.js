/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - CENTRAL STATE STORE
 * File: js/store.js
 * Fungsi: State Management Reaktif terpusat untuk 25 Sheet Database Google Sheets,
 *         Dukungan Offline LocalStorage, Pub-Sub Event Listeners, Relational Lookups,
 *         dan Mesin Agregasi Analitik Real-Time.
 * =========================================================================================
 */

import { APP_CONFIG, SHEET_NAMES, CONTENT_STATUSES, TASK_STATUSES } from "./config.js";

// Starter Data Realistis untuk Inisialisasi Pertama Kali
const DEFAULT_INITIAL_STATE = {
  [SHEET_NAMES.USERS]: [
    {
      user_id: "USR-001",
      username: "rian",
      password: "123",
      name: "Rian Pratama",
      email: "rian.lead@creatorhub.id",
      role: "Owner",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      status: "Active",
      permissions: ["all"],
      bio: "Lead Content Operations & Studio Founder",
      created_at: "2026-11-01T08:00:00.000Z"
    },
    {
      user_id: "USR-002",
      username: "sarah",
      password: "123",
      name: "Sarah Nabila",
      email: "sarah@creatorstudio.id",
      role: "Admin",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      status: "Active",
      permissions: ["dashboard", "content", "calendar", "tasks", "production", "media", "reports", "business", "timetracking", "targets", "notifications", "settings"],
      bio: "Studio Operations & Social Media Specialist",
      created_at: "2026-11-01T08:00:00.000Z"
    },
    {
      user_id: "USR-003",
      username: "fahri",
      password: "123",
      name: "Fahri Editor",
      email: "fahri@creatorstudio.id",
      role: "Video Editor",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      status: "Active",
      permissions: ["dashboard", "tasks", "production", "media", "timetracking", "notifications"],
      bio: "Senior Video Editor & Colorist",
      created_at: "2026-11-01T08:00:00.000Z"
    },
    {
      user_id: "USR-004",
      username: "dimas",
      password: "123",
      name: "Dimas Anggara",
      email: "dimas@creatorstudio.id",
      role: "Member / Creator",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      status: "Active",
      permissions: ["dashboard", "content", "calendar", "tasks", "production", "media", "timetracking", "notifications"],
      bio: "Talent Host, Scriptwriter & Camera Op",
      created_at: "2026-11-01T08:00:00.000Z"
    }
  ],
  [SHEET_NAMES.BRANDS]: [
    { brand_id: "BRD-001", brand_name: "GlowLab Skincare", company_name: "PT Glow Estetika Indonesia", category: "Beauty & Skincare", website: "https://glowlab.id", social_media: "@glowlab.official", contact: "Dewi (081234567890)", notes: "Brand partner kontrak Q4 retainers", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" },
    { brand_id: "BRD-002", brand_name: "TechSphere Gadgets", company_name: "TechSphere Global Ltd", category: "Technology", website: "https://techsphere.io", social_media: "@techsphere.id", contact: "Fajar (081298765432)", notes: "Sponsorship video review laptop & TWS", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" },
    { brand_id: "BRD-003", brand_name: "Kopi Nusantara Co", company_name: "CV Ragam Rasa Indonesia", category: "Food & Beverage", website: "https://kopinusantara.id", social_media: "@kopinusantara.co", contact: "Irfan (081311223344)", notes: "Endorsement campaign peluncuran varian cold brew", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" }
  ],
  [SHEET_NAMES.CLIENTS]: [
    { client_id: "CLI-001", client_name: "Dewi Lestari", company: "PT Glow Estetika Indonesia", email: "marketing@glowlab.id", phone: "081234567890", address: "Cyber 2 Tower Lt. 15, Jakarta Selatan", client_type: "Corporate Brand", notes: "Payment term Net 30 hari", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" },
    { client_id: "CLI-002", client_name: "Fajar Ramadhan", company: "TechSphere Global Ltd", email: "partnership@techsphere.io", phone: "081298765432", address: "One Pacific Place Lt. 8, SCBD Jakarta", client_type: "Agency Partner", notes: "Sering request dedicated review", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" },
    { client_id: "CLI-003", client_name: "Irfan Setiawan", company: "CV Ragam Rasa Indonesia", email: "hello@kopinusantara.id", phone: "081311223344", address: "Jl. Riau No. 45, Bandung", client_type: "SME / UMKM", notes: "Pembayaran DP 50% dan pelunasan pasca publish", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" }
  ],
  [SHEET_NAMES.PROJECTS]: [
    { project_id: "PRJ-001", project_name: "Q4 Skincare Awareness & Edukasi", brand_id: "BRD-001", client_id: "CLI-001", start_date: "2026-11-01", end_date: "2026-11-30", budget: 25000000, project_status: "In Progress", notes: "Paket 4 Reels Instagram + 4 TikTok + Whitelist ads", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" },
    { project_id: "PRJ-002", "project_name": "Review Gadget Q4 Flagship Showcase", brand_id: "BRD-002", client_id: "CLI-002", start_date: "2026-11-05", end_date: "2026-11-25", budget: 18000000, project_status: "Planning", notes: "1 Dedicated YouTube Review + 2 YouTube Shorts", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" },
    { project_id: "PRJ-003", project_name: "Campaign Cold Brew On-The-Go Launch", brand_id: "BRD-003", client_id: "CLI-003", start_date: "2026-11-10", end_date: "2026-11-20", budget: 8500000, project_status: "Planning", notes: "3 Video TikTok Soft Selling + Keranjang Kuning", created_at: "2026-11-01T08:00:00.000Z", updated_at: "2026-11-01T08:00:00.000Z" }
  ],
  [SHEET_NAMES.CAMPAIGNS]: [
    { campaign_id: "CMP-001", project_id: "PRJ-001", campaign_name: "Serum UV Brightening Mega Launch", objective: "Awareness & Sales", platform: "TikTok, Instagram", start_date: "2026-11-01", end_date: "2026-11-15", budget: 15000000, target_content: 6, status: "Active", notes: "Fokus edukasi pentingnya UV filter harian", created_at: "2026-11-01T08:00:00.000Z" },
    { campaign_id: "CMP-002", project_id: "PRJ-002", campaign_name: "Flagship Phone Camera Blind Test", objective: "Product Consideration", platform: "YouTube", start_date: "2026-11-05", end_date: "2026-11-20", budget: 12000000, target_content: 3, status: "Active", notes: "Bandingkan foto low-light dengan kamera DSLR", created_at: "2026-11-01T08:00:00.000Z" },
    { campaign_id: "CMP-003", project_id: "PRJ-003", campaign_name: "Teman Kerja Anti Ngantuk 11.11", objective: "Conversions & GMV", platform: "TikTok", start_date: "2026-11-08", end_date: "2026-11-14", budget: 5000000, target_content: 3, status: "Planning", notes: "Target pekerja kantoran WFH & WFO", created_at: "2026-11-01T08:00:00.000Z" }
  ],
  [SHEET_NAMES.SOCIAL_ACCOUNTS]: [
    { account_id: "ACC-001", platform: "TikTok", account_name: "Alex Creator Hub", username: "@alexcreator", profile_url: "https://tiktok.com/@alexcreator", brand_id: "BRD-001", niche: "Lifestyle & Technology", target_audience: "Usia 18-32 tahun, tech & creator enthusiast", followers: 185000, account_status: "Active", notes: "Akun utama video pendek dan live streaming", updated_at: "2026-11-01T08:00:00.000Z" },
    { account_id: "ACC-002", platform: "Instagram", account_name: "Alex Pratama Official", username: "@alexpratama.id", profile_url: "https://instagram.com/alexpratama.id", brand_id: "BRD-001", niche: "Business & Creative Lifestyle", target_audience: "Usia 20-35 tahun, profesional muda", followers: 94000, account_status: "Active", notes: "Fokus Reels, Carousel edukasi & IG Stories", updated_at: "2026-11-01T08:00:00.000Z" },
    { account_id: "ACC-003", platform: "YouTube", account_name: "Alex Tech & Studio", username: "AlexTechStudio", profile_url: "https://youtube.com/@AlexTechStudio", brand_id: "BRD-002", niche: "In-Depth Tech Reviews & Tutorials", target_audience: "Tech lovers, gadget buyers", followers: 52000, account_status: "Active", notes: "Fokus video panjang 10-15 menit + Shorts", updated_at: "2026-11-01T08:00:00.000Z" }
  ],
  [SHEET_NAMES.CONTENT_PLANNING]: [
    {
      content_id: "CNT-001",
      content_title: "3 Kesalahan Terbesar Pakai Serum di Pagi Hari",
      brand_id: "BRD-001",
      project_id: "PRJ-001",
      campaign_id: "CMP-001",
      platform: "TikTok",
      content_pillar: "Education",
      content_category: "Skincare Tips",
      target_audience: "Pemula Skincare 18-28 th",
      content_objective: "Awareness & Engagement",
      content_format: "Short Video (Vertical 9:16)",
      content_idea: "Banyak orang salah urutan pemakaian serum dan sunscreen sehingga kulit kusam.",
      hook: "Stop pakai serum dengan cara ini kalau gak mau muka kamu makin kusam!",
      cta: "Cek link keranjang kuning sekarang untuk promo bundlenya!",
      planned_date: "2026-11-04",
      status: "In Production",
      notes: "Gunakan pencahayaan warm natural pagi hari",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-02T10:00:00.000Z"
    },
    {
      content_id: "CNT-002",
      content_title: "Uji Ketahanan Kamera Smartphone vs Kamera Pro Rp 50 Juta",
      brand_id: "BRD-002",
      project_id: "PRJ-002",
      campaign_id: "CMP-002",
      platform: "YouTube",
      content_pillar: "Review & Before-After",
      content_category: "Tech Comparison",
      target_audience: "Gadget Enthusiast & Photographers",
      content_objective: "Product Consideration",
      content_format: "Long Video (Horizontal 16:9)",
      content_idea: "Blind test foto malam hari antara HP flagship dan kamera mirrorless mahal.",
      hook: "Bisa tebak mana foto HP dan mana kamera 50 juta? Hasilnya bikin kaget!",
      cta: "Tulis tebakan kamu di kolom komentar sekarang!",
      planned_date: "2026-11-08",
      status: "Planned",
      notes: "Sewa lighting outdoor untuk tes low light",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-02T11:00:00.000Z"
    },
    {
      content_id: "CNT-003",
      content_title: "Cara Bikin Es Kopi Susu Creamy Cuma 30 Detik di Meja Kerja",
      brand_id: "BRD-003",
      project_id: "PRJ-003",
      campaign_id: "CMP-003",
      platform: "Instagram Reels",
      content_pillar: "Tips & Tutorial",
      content_category: "Life Hack & Recipe",
      target_audience: "Pekerja Kantoran & WFH 22-35 th",
      content_objective: "Promotion",
      content_format: "Short Video (Vertical 9:16)",
      content_idea: "Tutorial praktis racik cold brew siap minum dengan susu oat saat deadline padat.",
      hook: "Rahasia tetap melek dan fokus pas lembur tanpa ribet ke kafe!",
      cta: "Simpan video ini buat contekan resep besok pagi!",
      planned_date: "2026-11-10",
      status: "Idea",
      notes: "Siapkan shot botol cold brew dengan efek embun dingin",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-02T12:00:00.000Z"
    },
    {
      content_id: "CNT-004",
      content_title: "Review Jujur Pemakaian 14 Hari GlowLab UV Serum",
      brand_id: "BRD-001",
      project_id: "PRJ-001",
      campaign_id: "CMP-001",
      platform: "Instagram Reels",
      content_pillar: "Review & Before-After",
      content_category: "Review & Before-After",
      target_audience: "Beauty Seekers 20-30 th",
      content_objective: "Promotion",
      content_format: "Short Video (Vertical 9:16)",
      content_idea: "Dokumentasi hari ke-1 sampai hari ke-14 tekstur kulit dan hasil tes UV.",
      hook: "14 hari yang lalu kulitku belang parah, ini yang terjadi setelah pakai serum ini!",
      cta: "Klik link di bio sebelum stok diskon 11.11 habis!",
      planned_date: "2026-11-06",
      status: "Ready",
      notes: "File video sudah final di folder Google Drive",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-03T09:00:00.000Z"
    }
  ],
  [SHEET_NAMES.CONTENT_TASKS]: [
    {
      task_id: "TSK-001",
      task_title: "Shooting Video 3 Kesalahan Pakai Serum",
      description: "Take visual hook, texture serum, dan b-roll wajah",
      content_id: "CNT-001",
      project_id: "PRJ-001",
      brand_id: "BRD-001",
      assigned_user: "USR-001",
      priority: "Urgent",
      start_date: "2026-11-03",
      deadline: "2026-11-04",
      status: "In Progress",
      progress: 60,
      notes: "Pastikan props cermin dan botol serum bersih",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-02T14:00:00.000Z"
    },
    {
      task_id: "TSK-002",
      task_title: "Editing Video & Color Grading CNT-001",
      description: "Cut to beat, subtitle dinamis, zoom transition",
      content_id: "CNT-001",
      project_id: "PRJ-001",
      brand_id: "BRD-001",
      assigned_user: "USR-003",
      priority: "High",
      start_date: "2026-11-04",
      deadline: "2026-11-05",
      status: "To Do",
      progress: 0,
      notes: "Gunakan sound trending upbeat lo-fi",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-01T08:00:00.000Z"
    },
    {
      task_id: "TSK-003",
      task_title: "Finalisasi Naskah Review Gadget Blind Test",
      description: "Rampungkan script breakdown dan urutan foto perbandingan",
      content_id: "CNT-002",
      project_id: "PRJ-002",
      brand_id: "BRD-002",
      assigned_user: "USR-001",
      priority: "Normal",
      start_date: "2026-11-04",
      deadline: "2026-11-06",
      status: "In Progress",
      progress: 75,
      notes: "Periksa spesifikasi sensor kamera brand",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-02T09:00:00.000Z"
    },
    {
      task_id: "TSK-004",
      task_title: "Jadwalkan Publikasi Review Jujur 14 Hari",
      description: "Upload ke Meta Business Suite dan set schedule jam 19.00",
      content_id: "CNT-004",
      project_id: "PRJ-001",
      brand_id: "BRD-001",
      assigned_user: "USR-002",
      priority: "High",
      start_date: "2026-11-05",
      deadline: "2026-11-06",
      status: "To Do",
      progress: 0,
      notes: "Pastikan tag akun brand @glowlab.official",
      created_at: "2026-11-01T08:00:00.000Z",
      updated_at: "2026-11-01T08:00:00.000Z"
    }
  ],
  [SHEET_NAMES.CONTENT_SUBTASKS]: [
    { subtask_id: "SUB-001", task_id: "TSK-001", title: "Siapkan tripod meja dan ring light 5600K", status: "Completed", completed_at: "2026-11-03T09:30:00.000Z" },
    { subtask_id: "SUB-002", task_id: "TSK-001", title: "Rekam 3 variasi hook pembuka 3 detik", status: "Completed", completed_at: "2026-11-03T11:00:00.000Z" },
    { subtask_id: "SUB-003", task_id: "TSK-001", title: "Rekam macro texture tetesan serum di punggung tangan", status: "Pending", completed_at: "" },
    { subtask_id: "SUB-004", task_id: "TSK-002", title: "Rough cut & sinkronisasi audio mic wireless", status: "Pending", completed_at: "" },
    { subtask_id: "SUB-005", task_id: "TSK-002", title: "Tambahkan subtitle kuning bold pop-up", status: "Pending", completed_at: "" }
  ],
  [SHEET_NAMES.CONTENT_CALENDAR]: [
    { calendar_id: "CAL-001", content_id: "CNT-001", production_date: "2026-11-03", deadline: "2026-11-05", publication_date: "2026-11-06", publication_time: "19:00", schedule_status: "Scheduled", notes: "Prime time TikTok Jumat malam", updated_at: "2026-11-01T08:00:00.000Z" },
    { calendar_id: "CAL-002", content_id: "CNT-004", production_date: "2026-11-02", deadline: "2026-11-05", publication_date: "2026-11-06", publication_time: "18:30", schedule_status: "Ready", notes: "Slot Reels Instagram", updated_at: "2026-11-01T08:00:00.000Z" },
    { calendar_id: "CAL-003", content_id: "CNT-002", production_date: "2026-11-06", deadline: "2026-11-08", publication_date: "2026-11-09", publication_time: "12:00", schedule_status: "Planned", notes: "YouTube long form weekend upload", updated_at: "2026-11-01T08:00:00.000Z" },
    { calendar_id: "CAL-004", content_id: "CNT-003", production_date: "2026-11-08", deadline: "2026-11-10", publication_date: "2026-11-11", publication_time: "08:00", schedule_status: "Draft", notes: "Promo 11.11 pagi hari", updated_at: "2026-11-01T08:00:00.000Z" }
  ],
  [SHEET_NAMES.CONTENT_SCRIPTS]: [
    {
      script_id: "SCP-001",
      content_id: "CNT-001",
      script_title: "Naskah 3 Kesalahan Pakai Serum",
      hook: "Stop pakai serum dengan cara ini kalau gak mau muka kamu makin kusam!",
      script_body: "[Scene 1 - Hook]: Tangan memegang pipi dengan ekspresi panik.\n[Scene 2 - Problem]: Banyak yang pakai serum langsung tempel pipet ke muka! Itu bakterinya bisa masuk botol.\n[Scene 3 - Solution]: Teteskan 2-3 pump di telapak tangan bersih, tepuk-tepuk perlahan sampai meresap sebelum pakai sunscreen.\n[Scene 4 - Proof]: Tunjukkan hasil kulit glowing tidak lengket.",
      caption: "Banyak yang belum tahu urutan skincare pagi yang bener! Jangan sampai skincare mahal kamu sia-sia ya.",
      hashtags: "#skincareroutine #serumviral #tipskecantikan #glowskin #skincarepemula",
      cta: "Cek keranjang kuning mumpung lagi diskon bundel!",
      platform: "TikTok",
      version: "v1.2",
      status: "Final",
      notes: "Disetujui brand manager GlowLab",
      updated_at: "2026-11-02T11:00:00.000Z"
    },
    {
      script_id: "SCP-002",
      content_id: "CNT-002",
      script_title: "Script Blind Test Kamera Flagship",
      hook: "Bisa tebak mana foto HP 8 jutaan dan mana kamera pro 50 juta?",
      script_body: "[Intro]: Blind test 5 situasi foto (Portrait, Sunset, Low-Light, Zoom 5x, Macro).\n[Body]: Analisis dynamic range dan noise level.\n[Conclusion]: Perbedaan makin tipis untuk konsumsi sosial media.",
      caption: "Perkembangan sensor kamera smartphone sekarang udah makin gila! Menurut kamu worth it gak upgrade tahun ini?",
      hashtags: "#techreview #smartphonephotography #cameratest #gadgetindonesia",
      cta: "Tulis tebakan kamu di kolom komentar sekarang!",
      platform: "YouTube",
      version: "v1.0",
      status: "Draft",
      notes: "Perlu tambahkan chart spesifikasi sensor",
      updated_at: "2026-11-02T13:00:00.000Z"
    }
  ],
  [SHEET_NAMES.CONTENT_PRODUCTION]: [
    {
      production_id: "PRD-001",
      content_id: "CNT-001",
      production_date: "2026-11-03",
      production_location: "Home Studio Lantai 2",
      production_team: "Alex Pratama (Talent & Cam), Rian (Audio)",
      equipment: "Sony A7C II, Lensa 24-70mm f/2.8, Wireless Mic DJI Mic 2, Godox SL60W",
      script_reference: "SCP-001",
      shooting_notes: "Gunakan backdrop abu-abu minimalis, ambil shot vertikal 4K 60fps untuk slow motion",
      raw_footage_link: "https://drive.google.com/drive/folders/sample_footage_cnt001",
      production_status: "Shooting",
      updated_at: "2026-11-03T10:00:00.000Z"
    },
    {
      production_id: "PRD-002",
      content_id: "CNT-004",
      production_date: "2026-11-02",
      production_location: "Studio Minimalis & Outdoor Rooftop",
      production_team: "Alex Pratama",
      equipment: "Sony A7C II, Tripod K&F Concept, Ring Light",
      script_reference: "SCP-001",
      shooting_notes: "Shooting before after outdoor di bawah terik matahari jam 10 pagi",
      raw_footage_link: "https://drive.google.com/drive/folders/sample_footage_cnt004",
      production_status: "Completed",
      updated_at: "2026-11-02T16:00:00.000Z"
    }
  ],
  [SHEET_NAMES.CONTENT_REVISIONS]: [
    { revision_id: "REV-001", content_id: "CNT-001", editor: "Rian Hidayat", revision_date: "2026-11-04", revision_notes: "Perbesar tulisan disclaimer di detik 04 dan percepat transisi ke scene 3", file_version: "v1_draft", review_status: "In Review", approval_status: "Revision", updated_at: "2026-11-04T10:00:00.000Z" },
    { revision_id: "REV-002", content_id: "CNT-004", editor: "Rian Hidayat", revision_date: "2026-11-03", revision_notes: "Semua teks, hook, dan warna tone sudah sesuai panduan visual brand", file_version: "v2_final", review_status: "Reviewed", approval_status: "Approved", updated_at: "2026-11-03T15:00:00.000Z" }
  ],
  [SHEET_NAMES.CONTENT_PUBLICATIONS]: [
    {
      publication_id: "PUB-001",
      content_id: "CNT-004",
      account_id: "ACC-002",
      platform: "Instagram Reels",
      publication_date: "2026-11-03",
      publication_time: "19:00",
      caption: "14 hari pembuktian tekstur serum UV GlowLab di kulit wajahku!",
      hashtags: "#skincareroutine #glowlab #reviewjujur #kulitsehat",
      content_url: "https://instagram.com/reel/DCXYZ123456",
      publication_status: "Published",
      notes: "Kolaborasi tag brand diterima",
      updated_at: "2026-11-03T19:30:00.000Z"
    },
    {
      publication_id: "PUB-002",
      content_id: "CNT-001",
      account_id: "ACC-001",
      platform: "TikTok",
      publication_date: "2026-11-06",
      publication_time: "19:00",
      caption: "Stop pakai serum dengan cara ini kalau gak mau muka makin kusam!",
      hashtags: "#skincareroutine #serumviral #tipskecantikan",
      content_url: "",
      publication_status: "Scheduled",
      notes: "Sudah dijadwalkan via TikTok Studio",
      updated_at: "2026-11-02T10:00:00.000Z"
    }
  ],
  [SHEET_NAMES.CONTENT_ANALYTICS]: [
    {
      analytics_id: "ANL-001",
      content_id: "CNT-004",
      platform: "Instagram Reels",
      snapshot_date: "2026-11-04",
      views: 48500,
      reach: 41200,
      impressions: 56300,
      likes: 3420,
      comments: 185,
      shares: 410,
      saves: 890,
      clicks: 620,
      followers: 145,
      leads: 80,
      sales: 24,
      revenue: 2856000,
      notes: "Performa 24 jam pertama sangat tinggi di save & share",
      engagement_rate: 10.11,
      updated_at: "2026-11-04T08:00:00.000Z"
    },
    {
      analytics_id: "ANL-002",
      content_id: "CNT-001",
      platform: "TikTok",
      snapshot_date: "2026-10-25",
      views: 125000,
      reach: 98000,
      impressions: 142000,
      likes: 9800,
      comments: 420,
      shares: 1250,
      saves: 3100,
      clicks: 1850,
      followers: 480,
      leads: 210,
      sales: 65,
      revenue: 7735000,
      notes: "Video viral FYP kategori skincare tips",
      engagement_rate: 11.66,
      updated_at: "2026-10-26T08:00:00.000Z"
    }
  ],
  [SHEET_NAMES.MEDIA_LIBRARY]: [
    { media_id: "MED-001", file_name: "GlowLab_Serum_Product_Shot_4K.jpg", file_type: "IMAGE", category: "Raw Footage", brand_id: "BRD-001", content_id: "CNT-001", drive_file_id: "drive_sample_001", file_url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800", version: "v1", upload_date: "2026-11-02", notes: "Foto botol serum studio lighting bersih" },
    { media_id: "MED-002", file_name: "GlowLab_Brand_Guidelines_2026.pdf", file_type: "DOCUMENT", category: "Brand Asset", brand_id: "BRD-001", content_id: "", drive_file_id: "drive_sample_002", file_url: "https://glowlab.id/assets/brandbook.pdf", version: "v2.1", upload_date: "2026-11-01", notes: "Pedoman logo, warna hex, font resmi brand" },
    { media_id: "MED-003", file_name: "Audio_Upbeat_Lofi_Commercial_License.mp3", file_type: "AUDIO", category: "Music & SFX", brand_id: "BRD-001", content_id: "CNT-001", drive_file_id: "drive_sample_003", file_url: "https://audio.example.com/lofi-commercial.mp3", version: "v1", upload_date: "2026-11-02", notes: "Lisensi komersial bebas klaim royalti" }
  ],
  [SHEET_NAMES.REFERENCES]: [
    { reference_id: "REF-001", reference_title: "Transisi Snap Zoom Hook Viral", reference_url: "https://tiktok.com/@creator_tips/video/7891", platform: "TikTok", category: "Visual Editing Hook", content_idea: "Cocok untuk video komparasi gadget atau reveal produk", screenshot_link: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400", notes: "Transisi cepat 0.3 detik dengan efek sound whoosh", created_date: "2026-11-01" },
    { reference_id: "REF-002", reference_title: "Format Hook Contrarian Skincare", reference_url: "https://instagram.com/reel/XYZ890", platform: "Instagram", category: "Copywriting Hook", content_idea: "Mengungkap fakta berlawanan dari mitos umum perawatan wajah", screenshot_link: "https://images.unsplash.com/photo-1512290900672-1f4f5f59fa4f?w=400", notes: "Gunakan kalimat 'Jangan beli ini sebelum kamu tahu...'", created_date: "2026-11-02" }
  ],
  [SHEET_NAMES.TIME_TRACKING]: [
    { time_id: "TIM-001", task_id: "TSK-001", user_id: "USR-001", activity: "Shooting scene texture & b-roll", date: "2026-11-03", start_time: "09:00", end_time: "11:30", duration: 150, notes: "Total 2.5 jam shooting di studio utama", created_at: "2026-11-03T11:30:00.000Z" },
    { time_id: "TIM-002", task_id: "TSK-003", user_id: "USR-001", activity: "Riset & Penulisan Naskah Script CNT-002", date: "2026-11-02", start_time: "14:00", end_time: "16:00", duration: 120, notes: "2 jam riset komparasi kamera", created_at: "2026-11-02T16:00:00.000Z" }
  ],
  [SHEET_NAMES.INCOME]: [
    { income_id: "INC-001", date: "2026-11-01", client_id: "CLI-001", project_id: "PRJ-001", content_id: "CNT-001", income_source: "Brand Sponsorship / Endorsement", amount: 12500000, payment_status: "Paid", payment_date: "2026-11-01", proof_link: "https://drive.google.com/file/d/proof_inc001", notes: "Pembayaran DP 50% Project Q4 Skincare Campaign", created_at: "2026-11-01T08:00:00.000Z" },
    { income_id: "INC-002", date: "2026-11-02", client_id: "CLI-002", project_id: "PRJ-002", content_id: "CNT-002", income_source: "Brand Sponsorship / Endorsement", amount: 9000000, payment_status: "Pending", payment_date: "", proof_link: "", notes: "DP 50% Review Gadget Flagship (Jatuh tempo 10 Nov)", created_at: "2026-11-02T08:00:00.000Z" },
    { income_id: "INC-003", date: "2026-10-31", client_id: "", project_id: "", content_id: "CNT-004", income_source: "Affiliate Commission", amount: 3450000, payment_status: "Paid", payment_date: "2026-10-31", proof_link: "https://drive.google.com/file/d/proof_affiliate_oct", notes: "Komisi penjualan produk keranjang kuning periode Oktober", created_at: "2026-10-31T08:00:00.000Z" }
  ],
  [SHEET_NAMES.EXPENSES]: [
    { expense_id: "EXP-001", date: "2026-11-02", category: "Equipment & Gear", description: "Beli Softbox Lantern Godox 65cm", project_id: "PRJ-001", amount: 850000, payment_method: "BCA Transfer", proof_link: "https://drive.google.com/file/d/receipt_godox", notes: "Untuk shooting video skincare studio", created_at: "2026-11-02T09:00:00.000Z" },
    { expense_id: "EXP-002", date: "2026-11-01", category: "Software & Subscriptions", description: "Langganan Adobe Creative Cloud & CapCut Pro Bulanan", project_id: "", amount: 920000, payment_method: "Kartu Kredit", proof_link: "https://drive.google.com/file/d/receipt_adobe", notes: "Operasional tim video editor", created_at: "2026-11-01T08:00:00.000Z" },
    { expense_id: "EXP-003", date: "2026-11-03", category: "Props & Wardrobe", description: "Props cermin aesthetic & kain satin backdrop", project_id: "PRJ-001", amount: 240000, payment_method: "ShopeePay", proof_link: "https://drive.google.com/file/d/receipt_props", notes: "Shooting CNT-001", created_at: "2026-11-03T08:00:00.000Z" }
  ],
  [SHEET_NAMES.INVOICES]: [
    { invoice_id: "INV-2026-001", client_id: "CLI-001", project_id: "PRJ-001", invoice_date: "2026-11-01", due_date: "2026-11-15", total: 25000000, payment_status: "Partially Paid", invoice_link: "https://drive.google.com/file/d/inv_glowlab_q4", notes: "DP Rp 12.500.000 lunas, sisa pelunasan pasca publish", created_at: "2026-11-01T08:00:00.000Z" },
    { invoice_id: "INV-2026-002", client_id: "CLI-002", project_id: "PRJ-002", invoice_date: "2026-11-02", due_date: "2026-11-16", total: 18000000, payment_status: "Unpaid", invoice_link: "https://drive.google.com/file/d/inv_techsphere_flagship", notes: "Invoice paket 1 Dedicated + 2 Shorts", created_at: "2026-11-02T08:00:00.000Z" }
  ],
  [SHEET_NAMES.PAYMENTS]: [
    { payment_id: "PAY-001", invoice_id: "INV-2026-001", income_id: "INC-001", date: "2026-11-01", amount: 12500000, payment_method: "BCA Corporate Transfer", proof_link: "https://drive.google.com/file/d/proof_inc001", notes: "Pembayaran Termin 1 (DP 50%) GlowLab Skincare", created_at: "2026-11-01T09:00:00.000Z" }
  ],
  [SHEET_NAMES.TARGETS]: [
    { target_id: "TGT-001", target_name: "Produksi Video Pendek November", target_type: "Content Production", period: "November 2026", target_value: 24, actual_value: 8, status: "On Track", achievement_pct: 33.3, notes: "Target 24 video pendek (TikTok + Reels)", updated_at: "2026-11-03T08:00:00.000Z" },
    { target_id: "TGT-002", target_name: "Pendapatan Bisnis Creator Q4", target_type: "Revenue", period: "Q4 2026", target_value: 75000000, actual_value: 24950000, status: "On Track", achievement_pct: 33.27, notes: "Target pendapatan total sponsorship & affiliate", updated_at: "2026-11-03T08:00:00.000Z" },
    { target_id: "TGT-003", target_name: "Followers TikTok 200K Milestone", target_type: "Followers", period: "November 2026", target_value: 200000, actual_value: 185000, status: "On Track", achievement_pct: 92.5, notes: "Kurang 15K followers menuju target", updated_at: "2026-11-03T08:00:00.000Z" },
    { target_id: "TGT-004", target_name: "Total Views Video November", target_type: "Views", period: "November 2026", target_value: 1500000, actual_value: 420000, status: "On Track", achievement_pct: 28.0, notes: "Akumulasi views seluruh platform", updated_at: "2026-11-03T08:00:00.000Z" }
  ],
  [SHEET_NAMES.NOTIFICATIONS]: [
    { notification_id: "NOT-001", type: "Deadline", title: "Deadline Shooting Mendekati", message: "Tugas 'Shooting Video 3 Kesalahan Pakai Serum' jatuh tempo besok!", date: "2026-11-03", read_status: "Unread", link: "#tasks", created_at: "2026-11-03T07:00:00.000Z" },
    { notification_id: "NOT-002", type: "Publication", title: "Jadwal Publikasi Siap", message: "Konten 'Review Jujur Pemakaian 14 Hari' terjadwal publish 06 Nov jam 18:30.", date: "2026-11-02", read_status: "Unread", link: "#calendar", created_at: "2026-11-02T10:00:00.000Z" },
    { notification_id: "NOT-003", type: "Payment", title: "Invoice Menunggu Pembayaran", message: "Invoice INV-2026-002 dari TechSphere jatuh tempo dalam 13 hari.", date: "2026-11-02", read_status: "Read", link: "#finance", created_at: "2026-11-02T11:00:00.000Z" }
  ],
  [SHEET_NAMES.SETTINGS]: [
    { key: "app_name", value: "ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER", category: "General", description: "Nama Resmi Aplikasi", updated_at: "2026-11-01T08:00:00.000Z" },
    { key: "creator_name", value: "Alex Pratama", category: "Profile", description: "Nama Kreator / Studio Utama", updated_at: "2026-11-01T08:00:00.000Z" },
    { key: "currency_symbol", value: "Rp", category: "Financial", description: "Simbol Mata Uang Default", updated_at: "2026-11-01T08:00:00.000Z" },
    { key: "drive_root_folder_id", value: "", category: "Google_Drive", description: "ID Folder Google Drive untuk Penyimpanan Berkas Konten", updated_at: "2026-11-01T08:00:00.000Z" },
    { key: "gas_api_url", value: "", category: "Google_Integration", description: "URL Web App Google Apps Script", updated_at: "2026-11-01T08:00:00.000Z" },
    { key: "secret_token", value: "PLANNER_SECRET_TOKEN_2026", category: "Security", description: "Token Autentikasi API REST Apps Script", updated_at: "2026-11-01T08:00:00.000Z" },
    { key: "enable_local_cache", value: "true", category: "System", description: "Gunakan cache offline browser (LocalStorage)", updated_at: "2026-11-01T08:00:00.000Z" },
    {
      key: "daily_routine_items",
      value: JSON.stringify([
        { id: "RTN-01", text: "Cek analitik & engagement 24 jam terakhir", done: true },
        { id: "RTN-02", text: "Balas 20 komentar teratas di TikTok & IG", done: true },
        { id: "RTN-03", text: "Riset tren sound & hashtag viral hari ini", done: false },
        { id: "RTN-04", text: "Draft minimal 1 ide / hook naskah baru", done: false },
        { id: "RTN-05", text: "Cek progres editing video editor & feedback", done: false }
      ]),
      category: "Routines",
      description: "Daftar Rutinitas Harian Kreator",
      updated_at: "2026-11-01T08:00:00.000Z"
    }
  ]
};

class Store {
  constructor() {
    this.state = {};
    this.listeners = [];
    this.offlineQueue = [];
    this.timerInterval = null;
    this.activeTimer = null;
    this.init();
  }

  init() {
    try {
      const cached = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.STATE);
      if (cached) {
        this.state = JSON.parse(cached);
        // Pastikan seluruh 25 keys sheet ada
        Object.keys(DEFAULT_INITIAL_STATE).forEach(key => {
          if (!this.state[key]) {
            this.state[key] = [...DEFAULT_INITIAL_STATE[key]];
          }
        });

        // Pastikan akun pengguna memiliki username, password, dan permissions
        if (this.state[SHEET_NAMES.USERS]) {
          this.state[SHEET_NAMES.USERS] = this.state[SHEET_NAMES.USERS].map((u, idx) => {
            if (!u.username) {
              if (idx === 0 || (u.role && u.role.includes("Owner"))) u.username = "rian";
              else if (idx === 1) u.username = "sarah";
              else if (idx === 2) u.username = "fahri";
              else u.username = `user${idx + 1}`;
            }
            if (!u.password) u.password = "123";
            if (!u.permissions) {
              if (u.role && u.role.includes("Owner")) u.permissions = ["all"];
              else if (u.role && u.role.includes("Admin")) u.permissions = ["dashboard", "content", "calendar", "tasks", "production", "media", "reports", "business", "timetracking", "targets", "notifications", "settings"];
              else if (u.role && u.role.includes("Editor")) u.permissions = ["dashboard", "tasks", "production", "media", "timetracking", "notifications"];
              else u.permissions = ["dashboard", "content", "calendar", "tasks", "production", "media", "timetracking", "notifications"];
            }
            return u;
          });
        }
      } else {
        this.state = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
        this.persist();
      }

      const queueCached = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.OFFLINE_QUEUE);
      if (queueCached) {
        this.offlineQueue = JSON.parse(queueCached);
      }

      const timerCached = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.TIMER);
      if (timerCached) {
        this.activeTimer = JSON.parse(timerCached);
      }
    } catch (err) {
      console.warn("Gagal memuat state dari LocalStorage, fallback ke default:", err);
      this.state = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
      this.persist();
    }
  }

  persist() {
    try {
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.STATE, JSON.stringify(this.state));
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(this.offlineQueue));
    } catch (e) {
      console.error("Gagal menyimpan ke LocalStorage:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event = { type: "STATE_CHANGE" }) {
    this.persist();
    this.listeners.forEach(fn => {
      try {
        fn(this.state, event);
      } catch (err) {
        console.error("Error in store listener:", err);
      }
    });
  }

  // ==========================================
  // GENERIC CRUD METHODS
  // ==========================================
  getItems(sheetName) {
    return this.state[sheetName] || [];
  }

  getItemById(sheetName, id) {
    const list = this.getItems(sheetName);
    const target = String(id);
    return list.find(item => this.getPrimaryId(item, sheetName) === target) || null;
  }

  getPrimaryId(item, sheetName = null) {
    if (!item) return "";
    if (sheetName) {
      const pk = this.getPrimaryIdKey(sheetName);
      if (item[pk] !== undefined && item[pk] !== null && item[pk] !== "") {
        return String(item[pk]);
      }
    }
    return String(item.id || item.user_id || item.content_id || item.task_id ||
           item.subtask_id || item.calendar_id || item.script_id || item.production_id ||
           item.revision_id || item.publication_id || item.analytics_id || item.media_id ||
           item.reference_id || item.time_id || item.income_id || item.expense_id ||
           item.invoice_id || item.payment_id || item.target_id || item.notification_id ||
           item.brand_id || item.client_id || item.project_id || item.campaign_id ||
           item.account_id || item.key || "");
  }

  createItem(sheetName, item) {
    if (!this.state[sheetName]) this.state[sheetName] = [];
    const pk = this.getPrimaryIdKey(sheetName);

    if (!item[pk]) {
      const prefix = this.getPrefix(sheetName);
      const rand = Math.floor(1000 + Math.random() * 9000);
      const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      item[pk] = `${prefix}-${today}-${rand}`;
    }

    if (!item.created_at) item.created_at = new Date().toISOString();
    item.updated_at = new Date().toISOString();

    this.state[sheetName].unshift(item);
    this.enqueueSync({ action: "create", sheet: sheetName, item });
    this.notify({ type: "CREATE", sheet: sheetName, item });

    // Supabase Realtime Auto-Save
    if (window.supabaseClient && window.supabaseClient.isConfigured()) {
      window.supabaseClient.autoSave(sheetName, "create", item);
    }

    return item;
  }

  updateItem(sheetName, id, updates) {
    if (!this.state[sheetName]) this.state[sheetName] = [];
    const list = this.state[sheetName];
    const target = String(id);
    const index = list.findIndex(i => this.getPrimaryId(i, sheetName) === target);

    // Upsert for SETTINGS sheet so configuration keys never get lost
    if (index === -1) {
      if (sheetName === SHEET_NAMES.SETTINGS) {
        const newItem = {
          key: id,
          value: updates.value !== undefined ? updates.value : (updates.setting_value !== undefined ? updates.setting_value : ""),
          setting_value: updates.value !== undefined ? updates.value : (updates.setting_value !== undefined ? updates.setting_value : ""),
          category: updates.category || "System",
          description: updates.description || id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...updates
        };
        list.push(newItem);
        this.enqueueSync({ action: "update", sheet: sheetName, id, item: newItem });
        this.notify({ type: "UPDATE", sheet: sheetName, id, item: newItem });

        if (window.supabaseClient && window.supabaseClient.isConfigured()) {
          window.supabaseClient.autoSave(sheetName, "update", newItem, id);
        }

        return newItem;
      }
      return null;
    }

    updates.updated_at = new Date().toISOString();
    const updated = { ...list[index], ...updates };
    list[index] = updated;

    this.enqueueSync({ action: "update", sheet: sheetName, id, item: updated });
    this.notify({ type: "UPDATE", sheet: sheetName, id, item: updated });

    // Supabase Realtime Auto-Save
    if (window.supabaseClient && window.supabaseClient.isConfigured()) {
      window.supabaseClient.autoSave(sheetName, "update", updated, id);
    }

    return updated;
  }

  replaceSheetData(sheetName, data) {
    if (Array.isArray(data)) {
      this.state[sheetName] = data;
      this.persist();
      this.notify({ type: "REPLACE", sheet: sheetName });
    }
  }

  getSetting(key, defaultValue = "") {
    const list = this.getItems(SHEET_NAMES.SETTINGS);
    const item = list.find(i => (i.key || i.id || this.getPrimaryId(i)) === key);
    if (!item) return defaultValue;
    if (item.value !== undefined && item.value !== null) return item.value;
    if (item.setting_value !== undefined && item.setting_value !== null) return item.setting_value;
    return defaultValue;
  }

  setSetting(key, value, description = "") {
    if (!this.state[SHEET_NAMES.SETTINGS]) this.state[SHEET_NAMES.SETTINGS] = [];
    const list = this.state[SHEET_NAMES.SETTINGS];
    const index = list.findIndex(i => (i.key || i.id || this.getPrimaryId(i)) === key);
    const now = new Date().toISOString();

    if (index >= 0) {
      list[index].value = value;
      list[index].setting_value = value;
      list[index].updated_at = now;
      if (description) list[index].description = description;
    } else {
      list.push({
        key,
        value,
        setting_value: value,
        category: "System",
        description: description || key,
        created_at: now,
        updated_at: now
      });
    }

    this.enqueueSync({ action: "update", sheet: SHEET_NAMES.SETTINGS, id: key, item: { key, value } });
    this.notify({ type: "UPDATE", sheet: SHEET_NAMES.SETTINGS, id: key });
    return value;
  }

  deleteItem(sheetName, id) {
    const list = this.state[sheetName] || [];
    const target = String(id);
    const index = list.findIndex(i => this.getPrimaryId(i, sheetName) === target);
    if (index === -1) return false;

    const removed = list.splice(index, 1)[0];
    this.enqueueSync({ action: "delete", sheet: sheetName, id });
    this.notify({ type: "DELETE", sheet: sheetName, id, item: removed });

    // Supabase Realtime Auto-Save
    if (window.supabaseClient && window.supabaseClient.isConfigured()) {
      window.supabaseClient.autoSave(sheetName, "delete", null, id);
    }

    return true;
  }

  // ==========================================
  // RELATIONAL HELPERS
  // ==========================================
  getBrandName(brandId) {
    if (!brandId) return "-";
    const brand = this.getItemById(SHEET_NAMES.BRANDS, brandId);
    return brand ? brand.brand_name : brandId;
  }

  getClientName(clientId) {
    if (!clientId) return "-";
    const client = this.getItemById(SHEET_NAMES.CLIENTS, clientId);
    return client ? client.client_name : clientId;
  }

  getProjectName(projectId) {
    if (!projectId) return "-";
    const prj = this.getItemById(SHEET_NAMES.PROJECTS, projectId);
    return prj ? prj.project_name : projectId;
  }

  getContentTitle(contentId) {
    if (!contentId) return "-";
    const cnt = this.getItemById(SHEET_NAMES.CONTENT_PLANNING, contentId);
    return cnt ? cnt.content_title : contentId;
  }

  getUserName(userId) {
    if (!userId) return "Tidak Ada PIC";
    const user = this.getItemById(SHEET_NAMES.USERS, userId);
    return user ? user.name : userId;
  }

  // ==========================================
  // DOMAIN-SPECIFIC BUSINESS ACTIONS
  // ==========================================

  /**
   * Convert Content Idea / Planning ke Pekerjaan (PRD Module 02 & Module 04)
   */
  convertContentToTask(contentId, assignedUser = "USR-001") {
    const content = this.getItemById(SHEET_NAMES.CONTENT_PLANNING, contentId);
    if (!content) throw new Error("Konten tidak ditemukan.");

    const newTask = {
      task_title: `Produksi Konten: ${content.content_title}`,
      description: `Task otomatis dari perencanaan konten ${content.platform}. Hook: ${content.hook || "-"}`,
      content_id: content.content_id,
      project_id: content.project_id || "",
      brand_id: content.brand_id || "",
      assigned_user: assignedUser,
      priority: "High",
      start_date: new Date().toISOString().slice(0, 10),
      deadline: content.planned_date || new Date().toISOString().slice(0, 10),
      status: "In Progress",
      progress: 0,
      notes: content.notes || ""
    };

    const task = this.createItem(SHEET_NAMES.CONTENT_TASKS, newTask);

    // Update status konten ke In Production jika sebelumnya Idea / Planned
    if (content.status === "Idea" || content.status === "Planned") {
      this.updateItem(SHEET_NAMES.CONTENT_PLANNING, content.content_id, { status: "In Production" });
    }

    // Tambahkan subtask default
    this.createItem(SHEET_NAMES.CONTENT_SUBTASKS, { task_id: task.task_id, title: "Siapkan Script & Props", status: "Pending" });
    this.createItem(SHEET_NAMES.CONTENT_SUBTASKS, { task_id: task.task_id, title: "Take Shooting Video", status: "Pending" });
    this.createItem(SHEET_NAMES.CONTENT_SUBTASKS, { task_id: task.task_id, title: "Editing & Color Grading", status: "Pending" });

    return task;
  }

  /**
   * Recalculate Subtask Progress on Task (PRD Module 04)
   */
  recalcTaskProgress(taskId) {
    const subtasks = (this.getItems(SHEET_NAMES.CONTENT_SUBTASKS) || []).filter(s => s.task_id === taskId);
    if (subtasks.length === 0) return;

    const completed = subtasks.filter(s => s.status === "Completed").length;
    const progress = Math.round((completed / subtasks.length) * 100);

    const updates = { progress };
    if (progress === 100) {
      updates.status = "Completed";
    } else if (progress > 0) {
      updates.status = "In Progress";
    }

    this.updateItem(SHEET_NAMES.CONTENT_TASKS, taskId, updates);
  }

  /**
   * Menghapus seluruh tugas pekerjaan (Tasks & Subtasks)
   */
  clearAllTasks() {
    const tasks = [...(this.state[SHEET_NAMES.CONTENT_TASKS] || [])];
    tasks.forEach(t => {
      this.deleteItem(SHEET_NAMES.CONTENT_TASKS, t.task_id);
    });
    const subtasks = [...(this.state[SHEET_NAMES.CONTENT_SUBTASKS] || [])];
    subtasks.forEach(s => {
      this.deleteItem(SHEET_NAMES.CONTENT_SUBTASKS, s.subtask_id);
    });
    this.state[SHEET_NAMES.CONTENT_TASKS] = [];
    this.state[SHEET_NAMES.CONTENT_SUBTASKS] = [];
    this.persist();
    this.notify({ type: "CLEAR_TASKS" });
  }

  /**
   * Menghapus seluruh data operasional kerja demo (Clean Slate)
   * Tetap menjaga data pengguna (Users), brand (Brands), dan pengaturan (Settings)
   */
  clearWorkData() {
    const workSheets = [
      SHEET_NAMES.CONTENT_TASKS,
      SHEET_NAMES.CONTENT_SUBTASKS,
      SHEET_NAMES.CONTENT_PLANNING,
      SHEET_NAMES.CONTENT_SCRIPTS,
      SHEET_NAMES.CONTENT_PRODUCTION,
      SHEET_NAMES.CONTENT_REVISIONS,
      SHEET_NAMES.CONTENT_PUBLICATIONS,
      SHEET_NAMES.CONTENT_CALENDAR,
      SHEET_NAMES.TIME_TRACKING
    ];

    workSheets.forEach(sheet => {
      const items = [...(this.state[sheet] || [])];
      items.forEach(item => {
        const id = this.getPrimaryId(item, sheet);
        if (id) {
          this.deleteItem(sheet, id);
        }
      });
      this.state[sheet] = [];
    });

    this.persist();
    this.notify({ type: "CLEAR_WORK_DATA" });
  }

  /**
   * Rumus Engagement Rate: ((Likes + Comments + Shares + Saves) / Views) * 100%
   */
  calculateEngagementRate(views, likes = 0, comments = 0, shares = 0, saves = 0) {
    const v = Number(views) || 0;
    if (v <= 0) return 0;
    const engagements = Number(likes) + Number(comments) + Number(shares) + Number(saves);
    return Number(((engagements / v) * 100).toFixed(2));
  }

  // ==========================================
  // LIVE TIMER FOR TIME TRACKING (MODULE 15)
  // ==========================================
  startTimer(taskId, activity) {
    this.activeTimer = {
      taskId: taskId || "",
      activity: activity || "Pekerjaan Konten",
      startTime: new Date().toISOString(),
      elapsedSeconds: 0,
      isRunning: true
    };
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.TIMER, JSON.stringify(this.activeTimer));
    this.notify({ type: "TIMER_START", timer: this.activeTimer });
  }

  stopTimer(notes = "") {
    if (!this.activeTimer) return null;
    const now = new Date();
    const start = new Date(this.activeTimer.startTime);
    const diffMinutes = Math.max(1, Math.round((now - start) / 60000));

    const timeEntry = {
      task_id: this.activeTimer.taskId,
      user_id: "USR-001",
      activity: this.activeTimer.activity,
      date: start.toISOString().slice(0, 10),
      start_time: start.toTimeString().slice(0, 5),
      end_time: now.toTimeString().slice(0, 5),
      duration: diffMinutes,
      notes: notes || `Selesai dicatat via live timer (${diffMinutes} menit)`
    };

    const saved = this.createItem(SHEET_NAMES.TIME_TRACKING, timeEntry);
    this.activeTimer = null;
    localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.TIMER);
    this.notify({ type: "TIMER_STOP", entry: saved });
    return saved;
  }

  getActiveTimer() {
    return this.activeTimer;
  }

  // ==========================================
  // DASHBOARD METRICS CALCULATOR (MODULE 01)
  // ==========================================
  getDashboardMetrics() {
    const today = new Date().toISOString().slice(0, 10);
    const tasks = this.getItems(SHEET_NAMES.CONTENT_TASKS);
    const content = this.getItems(SHEET_NAMES.CONTENT_PLANNING);
    const calendar = this.getItems(SHEET_NAMES.CONTENT_CALENDAR);
    const analytics = this.getItems(SHEET_NAMES.CONTENT_ANALYTICS);
    const income = this.getItems(SHEET_NAMES.INCOME);
    const expenses = this.getItems(SHEET_NAMES.EXPENSES);

    // 1. Task Metrics
    const totalTasks = tasks.length;
    const todayTasks = tasks.filter(t => t.deadline === today && t.status !== "Completed" && t.status !== "Cancelled").length;
    const pendingTasks = tasks.filter(t => t.status !== "Completed" && t.status !== "Cancelled").length;
    const overdueTasks = tasks.filter(t => t.deadline < today && t.status !== "Completed" && t.status !== "Cancelled").length;

    // 2. Content Pipeline Metrics
    const inProduction = content.filter(c => c.status === "In Production").length;
    const readyContent = content.filter(c => c.status === "Ready").length;
    const publishedContent = content.filter(c => c.status === "Published").length;
    const totalIdeas = content.filter(c => c.status === "Idea").length;

    // 3. Analytics Aggregations
    let totalViews = 0;
    let totalReach = 0;
    let totalLikes = 0;
    let totalEngagements = 0;

    analytics.forEach(a => {
      totalViews += Number(a.views) || 0;
      totalReach += Number(a.reach) || 0;
      totalLikes += Number(a.likes) || 0;
      totalEngagements += (Number(a.likes) || 0) + (Number(a.comments) || 0) + (Number(a.shares) || 0) + (Number(a.saves) || 0);
    });

    const avgEngagementRate = totalViews > 0 ? Number(((totalEngagements / totalViews) * 100).toFixed(2)) : 0;

    // 4. Financial Summary
    let totalIncome = 0;
    let pendingIncome = 0;
    let totalExpense = 0;

    income.forEach(i => {
      const amt = Number(i.amount) || 0;
      if (i.payment_status === "Paid") {
        totalIncome += amt;
      } else {
        pendingIncome += amt;
      }
    });

    expenses.forEach(e => {
      totalExpense += Number(e.amount) || 0;
    });

    const netProfit = totalIncome - totalExpense;

    // 5. Upcoming Schedule
    const upcomingSchedules = calendar
      .filter(c => c.publication_date >= today)
      .sort((a, b) => (a.publication_date > b.publication_date ? 1 : -1))
      .slice(0, 5)
      .map(cal => {
        const cnt = this.getItemById(SHEET_NAMES.CONTENT_PLANNING, cal.content_id) || {};
        return {
          ...cal,
          title: cnt.content_title || "Untitled Content",
          platform: cnt.platform || "Platform",
          brand_name: this.getBrandName(cnt.brand_id)
        };
      });

    return {
      totalTasks,
      todayTasks,
      pendingTasks,
      overdueTasks,
      inProduction,
      readyContent,
      publishedContent,
      totalIdeas,
      performance: {
        totalViews,
        totalReach,
        totalLikes,
        avgEngagementRate
      },
      finance: {
        totalIncome,
        pendingIncome,
        totalExpense,
        netProfit
      },
      upcomingSchedules
    };
  }

  // ==========================================
  // SYNC & QUEUE HELPERS
  // ==========================================
  enqueueSync(operation) {
    this.offlineQueue.push({
      ...operation,
      queuedAt: new Date().toISOString()
    });
    this.persist();
  }

  clearQueue() {
    this.offlineQueue = [];
    this.persist();
  }

  getQueue() {
    return this.offlineQueue;
  }

  // Set data batch dari cloud
  mergeRemoteData(remoteData) {
    if (!remoteData || typeof remoteData !== "object") return;
    Object.keys(remoteData).forEach(sheetName => {
      if (Array.isArray(remoteData[sheetName])) {
        this.state[sheetName] = remoteData[sheetName];
      }
    });
    this.clearQueue();
    this.notify({ type: "SYNC_MERGED" });
  }

  getPrimaryIdKey(sheetName) {
    const map = {
      [SHEET_NAMES.USERS]: "user_id",
      [SHEET_NAMES.BRANDS]: "brand_id",
      [SHEET_NAMES.CLIENTS]: "client_id",
      [SHEET_NAMES.PROJECTS]: "project_id",
      [SHEET_NAMES.CAMPAIGNS]: "campaign_id",
      [SHEET_NAMES.SOCIAL_ACCOUNTS]: "account_id",
      [SHEET_NAMES.CONTENT_PLANNING]: "content_id",
      [SHEET_NAMES.CONTENT_TASKS]: "task_id",
      [SHEET_NAMES.CONTENT_SUBTASKS]: "subtask_id",
      [SHEET_NAMES.CONTENT_CALENDAR]: "calendar_id",
      [SHEET_NAMES.CONTENT_SCRIPTS]: "script_id",
      [SHEET_NAMES.CONTENT_PRODUCTION]: "production_id",
      [SHEET_NAMES.CONTENT_REVISIONS]: "revision_id",
      [SHEET_NAMES.CONTENT_PUBLICATIONS]: "publication_id",
      [SHEET_NAMES.CONTENT_ANALYTICS]: "analytics_id",
      [SHEET_NAMES.MEDIA_LIBRARY]: "media_id",
      [SHEET_NAMES.REFERENCES]: "reference_id",
      [SHEET_NAMES.TIME_TRACKING]: "time_id",
      [SHEET_NAMES.INCOME]: "income_id",
      [SHEET_NAMES.EXPENSES]: "expense_id",
      [SHEET_NAMES.INVOICES]: "invoice_id",
      [SHEET_NAMES.PAYMENTS]: "payment_id",
      [SHEET_NAMES.TARGETS]: "target_id",
      [SHEET_NAMES.NOTIFICATIONS]: "notification_id",
      [SHEET_NAMES.SETTINGS]: "key"
    };
    return map[sheetName] || "id";
  }

  getPrefix(sheetName) {
    const map = {
      [SHEET_NAMES.USERS]: "USR",
      [SHEET_NAMES.BRANDS]: "BRD",
      [SHEET_NAMES.CLIENTS]: "CLI",
      [SHEET_NAMES.PROJECTS]: "PRJ",
      [SHEET_NAMES.CAMPAIGNS]: "CMP",
      [SHEET_NAMES.SOCIAL_ACCOUNTS]: "ACC",
      [SHEET_NAMES.CONTENT_PLANNING]: "CNT",
      [SHEET_NAMES.CONTENT_TASKS]: "TSK",
      [SHEET_NAMES.CONTENT_SUBTASKS]: "SUB",
      [SHEET_NAMES.CONTENT_CALENDAR]: "CAL",
      [SHEET_NAMES.CONTENT_SCRIPTS]: "SCP",
      [SHEET_NAMES.CONTENT_PRODUCTION]: "PRD",
      [SHEET_NAMES.CONTENT_REVISIONS]: "REV",
      [SHEET_NAMES.CONTENT_PUBLICATIONS]: "PUB",
      [SHEET_NAMES.CONTENT_ANALYTICS]: "ANL",
      [SHEET_NAMES.MEDIA_LIBRARY]: "MED",
      [SHEET_NAMES.REFERENCES]: "REF",
      [SHEET_NAMES.TIME_TRACKING]: "TIM",
      [SHEET_NAMES.INCOME]: "INC",
      [SHEET_NAMES.EXPENSES]: "EXP",
      [SHEET_NAMES.INVOICES]: "INV",
      [SHEET_NAMES.PAYMENTS]: "PAY",
      [SHEET_NAMES.TARGETS]: "TGT",
      [SHEET_NAMES.NOTIFICATIONS]: "NOT",
      [SHEET_NAMES.SETTINGS]: "SET"
    };
    return map[sheetName] || "REC";
  }

  resetToDefault() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
    this.offlineQueue = [];
    this.persist();
    this.notify({ type: "RESET" });
  }
}

export const store = new Store();
if (typeof window !== "undefined") {
  window.store = store;
}
