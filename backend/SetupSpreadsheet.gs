/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER
 * SPREADSHEET SETUP WIZARD (25 SHEETS INTEGRATED DATABASE)
 * =========================================================================================
 * Script ini secara otomatis menginisialisasi 25 Sheet Database Google Sheets sesuai
 * Product Requirements Document (PRD) v1.0 dengan header terstandar, format warna profesional,
 * dan starter dataset realistis untuk operasional content creator bisnis.
 */

function setupAllInOneDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const sheetsConfig = [
    // 1. Users
    {
      name: "Users",
      headers: ["user_id", "name", "email", "role", "avatar", "status", "created_at"],
      initialData: [
        ["USR-001", "Alex Pratama", "alex@creatorstudio.id", "Owner / Lead Creator", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", "Active", "2026-11-01T08:00:00.000Z"],
        ["USR-002", "Sarah Nabila", "sarah@creatorstudio.id", "Social Media Manager", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", "Active", "2026-11-01T08:00:00.000Z"],
        ["USR-003", "Rian Hidayat", "rian@creatorstudio.id", "Video Editor", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", "Active", "2026-11-01T08:00:00.000Z"]
      ]
    },
    // 2. Brands
    {
      name: "Brands",
      headers: ["brand_id", "brand_name", "company_name", "category", "website", "social_media", "contact", "notes", "created_at", "updated_at"],
      initialData: [
        ["BRD-001", "GlowLab Skincare", "PT Glow Estetika Indonesia", "Beauty & Skincare", "https://glowlab.id", "@glowlab.official", "Dewi (081234567890)", "Brand partner kontrak Q4 retainers", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"],
        ["BRD-002", "TechSphere Gadgets", "TechSphere Global Ltd", "Technology", "https://techsphere.io", "@techsphere.id", "Fajar (081298765432)", "Sponsorship video review laptop & TWS", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"],
        ["BRD-003", "Kopi Nusantara Co", "CV Ragam Rasa Indonesia", "Food & Beverage", "https://kopinusantara.id", "@kopinusantara.co", "Irfan (081311223344)", "Endorsement campaign peluncuran varian cold brew", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"]
      ]
    },
    // 3. Clients
    {
      name: "Clients",
      headers: ["client_id", "client_name", "company", "email", "phone", "address", "client_type", "notes", "created_at", "updated_at"],
      initialData: [
        ["CLI-001", "Dewi Lestari", "PT Glow Estetika Indonesia", "marketing@glowlab.id", "081234567890", "Cyber 2 Tower Lt. 15, Jakarta Selatan", "Corporate Brand", "Payment term Net 30 hari", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"],
        ["CLI-002", "Fajar Ramadhan", "TechSphere Global Ltd", "partnership@techsphere.io", "081298765432", "One Pacific Place Lt. 8, SCBD Jakarta", "Agency Partner", "Sering request dedicated review", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"],
        ["CLI-003", "Irfan Setiawan", "CV Ragam Rasa Indonesia", "hello@kopinusantara.id", "081311223344", "Jl. Riau No. 45, Bandung", "SME / UMKM", "Pembayaran DP 50% dan pelunasan pasca publish", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"]
      ]
    },
    // 4. Projects
    {
      name: "Projects",
      headers: ["project_id", "project_name", "brand_id", "client_id", "start_date", "end_date", "budget", "project_status", "notes", "created_at", "updated_at"],
      initialData: [
        ["PRJ-001", "Q4 Skincare Awareness & Edukasi", "BRD-001", "CLI-001", "2026-11-01", "2026-11-30", 25000000, "In Progress", "Paket 4 Reels Instagram + 4 TikTok + Whitelist ads", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"],
        ["PRJ-002", "Review Gadget Q4 Flagship Showcase", "BRD-002", "CLI-002", "2026-11-05", "2026-11-25", 18000000, "Planning", "1 Dedicated YouTube Review + 2 YouTube Shorts", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"],
        ["PRJ-003", "Campaign Cold Brew On-The-Go Launch", "BRD-003", "CLI-003", "2026-11-10", "2026-11-20", 8500000, "Planning", "3 Video TikTok Soft Selling + Keranjang Kuning", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"]
      ]
    },
    // 5. Campaigns
    {
      name: "Campaigns",
      headers: ["campaign_id", "project_id", "campaign_name", "objective", "platform", "start_date", "end_date", "budget", "target_content", "status", "notes", "created_at"],
      initialData: [
        ["CMP-001", "PRJ-001", "Serum UV Brightening Mega Launch", "Awareness & Sales", "TikTok, Instagram", "2026-11-01", "2026-11-15", 15000000, 6, "Active", "Fokus edukasi pentingnya UV filter harian", "2026-11-01T08:00:00.000Z"],
        ["CMP-002", "PRJ-002", "Flagship Phone Camera Blind Test", "Product Consideration", "YouTube", "2026-11-05", "2026-11-20", 12000000, 3, "Active", "Bandingkan foto low-light dengan kamera DSLR", "2026-11-01T08:00:00.000Z"],
        ["CMP-003", "PRJ-003", "Teman Kerja Anti Ngantuk 11.11", "Conversions & GMV", "TikTok", "2026-11-08", "2026-11-14", 5000000, 3, "Planning", "Target pekerja kantoran WFH & WFO", "2026-11-01T08:00:00.000Z"]
      ]
    },
    // 6. Social_Accounts
    {
      name: "Social_Accounts",
      headers: ["account_id", "platform", "account_name", "username", "profile_url", "brand_id", "niche", "target_audience", "followers", "account_status", "notes", "updated_at"],
      initialData: [
        ["ACC-001", "TikTok", "Alex Creator Hub", "@alexcreator", "https://tiktok.com/@alexcreator", "BRD-001", "Lifestyle & Technology", "Usia 18-32 tahun, tech & creator enthusiast", 185000, "Active", "Akun utama video pendek dan live streaming", "2026-11-01T08:00:00.000Z"],
        ["ACC-002", "Instagram", "Alex Pratama Official", "@alexpratama.id", "https://instagram.com/alexpratama.id", "BRD-001", "Business & Creative Lifestyle", "Usia 20-35 tahun, profesional muda", 94000, "Active", "Fokus Reels, Carousel edukasi & IG Stories", "2026-11-01T08:00:00.000Z"],
        ["ACC-003", "YouTube", "Alex Tech & Studio", "AlexTechStudio", "https://youtube.com/@AlexTechStudio", "BRD-002", "In-Depth Tech Reviews & Tutorials", "Tech lovers, gadget buyers", 52000, "Active", "Fokus video panjang 10-15 menit + Shorts", "2026-11-01T08:00:00.000Z"]
      ]
    },
    // 7. Content_Planning
    {
      name: "Content_Planning",
      headers: [
        "content_id", "content_title", "brand_id", "project_id", "campaign_id",
        "platform", "content_pillar", "content_category", "target_audience", "content_objective",
        "content_format", "content_idea", "hook", "cta", "planned_date",
        "status", "notes", "created_at", "updated_at"
      ],
      initialData: [
        [
          "CNT-001", "3 Kesalahan Terbesar Pakai Serum di Pagi Hari", "BRD-001", "PRJ-001", "CMP-001",
          "TikTok", "Education", "Skincare Tips", "Pemula Skincare 18-28 th", "Awareness & Engagement",
          "Short Video (Vertical 9:16)", "Banyak orang salah urutan pemakaian serum dan sunscreen sehingga kulit kusam.",
          "Stop pakai serum dengan cara ini kalau gak mau muka kamu makin kusam!",
          "Cek link keranjang kuning sekarang untuk promo bundlenya!", "2026-11-04",
          "In Production", "Gunakan pencahayaan warm natural pagi hari", "2026-11-01T08:00:00.000Z", "2026-11-02T10:00:00.000Z"
        ],
        [
          "CNT-002", "Uji Ketahanan Kamera Smartphone vs Kamera Pro Rp 50 Juta", "BRD-002", "PRJ-002", "CMP-002",
          "YouTube", "Product Review", "Tech Comparison", "Gadget Enthusiast & Photographers", "Product Consideration",
          "Long Video (Horizontal 16:9)", "Blind test foto malam hari antara HP flagship dan kamera mirrorless mahal.",
          "Bisa tebak mana foto HP dan mana kamera 50 juta? Hasilnya bikin kaget!",
          "Tulis tebakan kamu di kolom komentar sekarang!", "2026-11-08",
          "Planned", "Sewa lighting outdoor untuk tes low light", "2026-11-01T08:00:00.000Z", "2026-11-02T11:00:00.000Z"
        ],
        [
          "CNT-003", "Cara Bikin Es Kopi Susu Creamy Cuma 30 Detik di Meja Kerja", "BRD-003", "PRJ-003", "CMP-003",
          "Instagram Reels", "Lifestyle", "Life Hack & Recipe", "Pekerja Kantoran & WFH 22-35 th", "Sales & Conversion",
          "Short Video (Vertical 9:16)", "Tutorial praktis racik cold brew siap minum dengan susu oat saat deadline padat.",
          "Rahasia tetap melek dan fokus pas lembur tanpa ribet ke kafe!",
          "Simpan video ini buat contekan resep besok pagi!", "2026-11-10",
          "Idea", "Siapkan shot botol cold brew dengan efek embun dingin", "2026-11-01T08:00:00.000Z", "2026-11-02T12:00:00.000Z"
        ],
        [
          "CNT-004", "Review Jujur Pemakaian 14 Hari GlowLab UV Serum", "BRD-001", "PRJ-001", "CMP-001",
          "Instagram Reels", "Social Proof", "Review & Before-After", "Beauty Seekers 20-30 th", "Conversions",
          "Short Video (Vertical 9:16)", "Dokumentasi hari ke-1 sampai hari ke-14 tekstur kulit dan hasil tes UV.",
          "14 hari yang lalu kulitku belang parah, ini yang terjadi setelah pakai serum ini!",
          "Klik link di bio sebelum stok diskon 11.11 habis!", "2026-11-06",
          "Ready", "File video sudah final di folder Google Drive", "2026-11-01T08:00:00.000Z", "2026-11-03T09:00:00.000Z"
        ]
      ]
    },
    // 8. Content_Tasks
    {
      name: "Content_Tasks",
      headers: [
        "task_id", "task_title", "description", "content_id", "project_id",
        "brand_id", "assigned_user", "priority", "start_date", "deadline",
        "status", "progress", "notes", "created_at", "updated_at"
      ],
      initialData: [
        [
          "TSK-001", "Shooting Video 3 Kesalahan Pakai Serum", "Take visual hook, texture serum, dan b-roll wajah",
          "CNT-001", "PRJ-001", "BRD-001", "USR-001", "Urgent", "2026-11-03", "2026-11-04",
          "In Progress", 60, "Pastikan props cermin dan botol serum bersih", "2026-11-01T08:00:00.000Z", "2026-11-02T14:00:00.000Z"
        ],
        [
          "TSK-002", "Editing Video & Color Grading CNT-001", "Cut to beat, subtitle dinamis, zoom transition",
          "CNT-001", "PRJ-001", "BRD-001", "USR-003", "High", "2026-11-04", "2026-11-05",
          "To Do", 0, "Gunakan sound trending upbeat lo-fi", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"
        ],
        [
          "TSK-003", "Finalisasi Naskah Review Gadget Blind Test", "Rampungkan script breakdown dan urutan foto perbandingan",
          "CNT-002", "PRJ-002", "BRD-002", "USR-001", "Normal", "2026-11-04", "2026-11-06",
          "In Progress", 75, "Periksa spesifikasi sensor kamera brand", "2026-11-01T08:00:00.000Z", "2026-11-02T09:00:00.000Z"
        ],
        [
          "TSK-004", "Jadwalkan Publikasi Review Jujur 14 Hari", "Upload ke Meta Business Suite dan set schedule jam 19.00",
          "CNT-004", "PRJ-001", "BRD-001", "USR-002", "High", "2026-11-05", "2026-11-06",
          "To Do", 0, "Pastikan tag akun brand @glowlab.official", "2026-11-01T08:00:00.000Z", "2026-11-01T08:00:00.000Z"
        ]
      ]
    },
    // 9. Content_Subtasks
    {
      name: "Content_Subtasks",
      headers: ["subtask_id", "task_id", "title", "status", "completed_at"],
      initialData: [
        ["SUB-001", "TSK-001", "Siapkan tripod meja dan ring light 5600K", "Completed", "2026-11-03T09:30:00.000Z"],
        ["SUB-002", "TSK-001", "Rekam 3 variasi hook pembuka 3 detik", "Completed", "2026-11-03T11:00:00.000Z"],
        ["SUB-003", "TSK-001", "Rekam macro texture tetesan serum di punggung tangan", "Pending", ""],
        ["SUB-004", "TSK-002", "Rough cut & sinkronisasi audio mic wireless", "Pending", ""],
        ["SUB-005", "TSK-002", "Tambahkan subtitle kuning bold pop-up", "Pending", ""]
      ]
    },
    // 10. Content_Calendar
    {
      name: "Content_Calendar",
      headers: [
        "calendar_id", "content_id", "production_date", "deadline", "publication_date",
        "publication_time", "schedule_status", "notes", "updated_at"
      ],
      initialData: [
        ["CAL-001", "CNT-001", "2026-11-03", "2026-11-05", "2026-11-06", "19:00", "Scheduled", "Prime time TikTok Jumat malam", "2026-11-01T08:00:00.000Z"],
        ["CAL-002", "CNT-004", "2026-11-02", "2026-11-05", "2026-11-06", "18:30", "Ready", "Slot Reels Instagram", "2026-11-01T08:00:00.000Z"],
        ["CAL-003", "CNT-002", "2026-11-06", "2026-11-08", "2026-11-09", "12:00", "Planned", "YouTube long form weekend upload", "2026-11-01T08:00:00.000Z"],
        ["CAL-004", "CNT-003", "2026-11-08", "2026-11-10", "2026-11-11", "08:00", "Draft", "Promo 11.11 pagi hari", "2026-11-01T08:00:00.000Z"]
      ]
    },
    // 11. Content_Scripts
    {
      name: "Content_Scripts",
      headers: [
        "script_id", "content_id", "script_title", "hook", "script_body",
        "caption", "hashtags", "cta", "platform", "version",
        "status", "notes", "updated_at"
      ],
      initialData: [
        [
          "SCP-001", "CNT-001", "Naskah 3 Kesalahan Pakai Serum",
          "Stop pakai serum dengan cara ini kalau gak mau muka kamu makin kusam!",
          "[Scene 1 - Hook]: Tangan memegang pipi dengan ekspresi panik.\n[Scene 2 - Problem]: Banyak yang pakai serum langsung tempel pipet ke muka! Itu bakterinya bisa masuk botol.\n[Scene 3 - Solution]: Teteskan 2-3 pump di telapak tangan bersih, tepuk-tepuk perlahan sampai meresap sebelum pakai sunscreen.\n[Scene 4 - Proof]: Tunjukkan hasil kulit glowing tidak lengket.",
          "Banyak yang belum tahu urutan skincare pagi yang bener! Jangan sampai skincare mahal kamu sia-sia ya.",
          "#skincareroutine #serumviral #tipskecantikan #glowskin #skincarepemula",
          "Cek keranjang kuning mumpung lagi diskon bundel!", "TikTok", "v1.2",
          "Final", "Disetujui brand manager GlowLab", "2026-11-02T11:00:00.000Z"
        ],
        [
          "SCP-002", "CNT-002", "Script Blind Test Kamera Flagship",
          "Bisa tebak mana foto HP 8 jutaan dan mana kamera pro 50 juta?",
          "[Intro]: Blind test 5 situasi foto (Portrait, Sunset, Low-Light, Zoom 5x, Macro).\n[Body]: Analisis dynamic range dan noise level.\n[Conclusion]: Perbedaan makin tipis untuk konsumsi sosial media.",
          "Perkembangan sensor kamera smartphone sekarang udah makin gila! Menurut kamu worth it gak upgrade tahun ini?",
          "#techreview #smartphonephotography #cameratest #gadgetindonesia",
          "Tulis tebakan kamu di kolom komentar sekarang!", "YouTube", "v1.0",
          "Draft", "Perlu tambahkan chart spesifikasi sensor", "2026-11-02T13:00:00.000Z"
        ]
      ]
    },
    // 12. Content_Production
    {
      name: "Content_Production",
      headers: [
        "production_id", "content_id", "production_date", "production_location", "production_team",
        "equipment", "script_reference", "shooting_notes", "raw_footage_link", "production_status", "updated_at"
      ],
      initialData: [
        [
          "PRD-001", "CNT-001", "2026-11-03", "Home Studio Lantai 2", "Alex Pratama (Talent & Cam), Rian (Audio)",
          "Sony A7C II, Lensa 24-70mm f/2.8, Wireless Mic DJI Mic 2, Godox SL60W", "SCP-001",
          "Gunakan backdrop abu-abu minimalis, ambil shot vertikal 4K 60fps untuk slow motion",
          "https://drive.google.com/drive/folders/sample_footage_cnt001", "Shooting", "2026-11-03T10:00:00.000Z"
        ],
        [
          "PRD-002", "CNT-004", "2026-11-02", "Studio Minimalis & Outdoor Rooftop", "Alex Pratama",
          "Sony A7C II, Tripod K&F Concept, Ring Light", "SCP-001",
          "Shooting before after outdoor di bawah terik matahari jam 10 pagi",
          "https://drive.google.com/drive/folders/sample_footage_cnt004", "Completed", "2026-11-02T16:00:00.000Z"
        ]
      ]
    },
    // 13. Content_Revisions
    {
      name: "Content_Revisions",
      headers: [
        "revision_id", "content_id", "editor", "revision_date", "revision_notes",
        "file_version", "review_status", "approval_status", "updated_at"
      ],
      initialData: [
        [
          "REV-001", "CNT-001", "Rian Hidayat", "2026-11-04",
          "Perbesar tulisan disclaimer di detik 04 dan percepat transisi ke scene 3",
          "v1_draft", "In Review", "Revision", "2026-11-04T10:00:00.000Z"
        ],
        [
          "REV-002", "CNT-004", "Rian Hidayat", "2026-11-03",
          "Semua teks, hook, dan warna tone sudah sesuai panduan visual brand",
          "v2_final", "Reviewed", "Approved", "2026-11-03T15:00:00.000Z"
        ]
      ]
    },
    // 14. Content_Publications
    {
      name: "Content_Publications",
      headers: [
        "publication_id", "content_id", "account_id", "platform", "publication_date",
        "publication_time", "caption", "hashtags", "content_url", "publication_status",
        "notes", "updated_at"
      ],
      initialData: [
        [
          "PUB-001", "CNT-004", "ACC-002", "Instagram Reels", "2026-11-03",
          "19:00", "14 hari pembuktian tekstur serum UV GlowLab di kulit wajahku!",
          "#skincareroutine #glowlab #reviewjujur #kulitsehat", "https://instagram.com/reel/DCXYZ123456",
          "Published", "Kolaborasi tag brand diterima", "2026-11-03T19:30:00.000Z"
        ],
        [
          "PUB-002", "CNT-001", "ACC-001", "TikTok", "2026-11-06",
          "19:00", "Stop pakai serum dengan cara ini kalau gak mau muka makin kusam!",
          "#skincareroutine #serumviral #tipskecantikan", "",
          "Scheduled", "Sudah dijadwalkan via TikTok Studio", "2026-11-02T10:00:00.000Z"
        ]
      ]
    },
    // 15. Content_Analytics
    {
      name: "Content_Analytics",
      headers: [
        "analytics_id", "content_id", "platform", "snapshot_date", "views",
        "reach", "impressions", "likes", "comments", "shares",
        "saves", "clicks", "followers", "leads", "sales",
        "revenue", "notes", "engagement_rate", "updated_at"
      ],
      initialData: [
        [
          "ANL-001", "CNT-004", "Instagram Reels", "2026-11-04", 48500,
          41200, 56300, 3420, 185, 410,
          890, 620, 145, 80, 24,
          2856000, "Performa 24 jam pertama sangat tinggi di save & share", 10.11, "2026-11-04T08:00:00.000Z"
        ],
        [
          "ANL-002", "CNT-001", "TikTok", "2026-10-25", 125000,
          98000, 142000, 9800, 420, 1250,
          3100, 1850, 480, 210, 65,
          7735000, "Video viral FYP kategori skincare tips", 11.66, "2026-10-26T08:00:00.000Z"
        ]
      ]
    },
    // 16. Media_Library
    {
      name: "Media_Library",
      headers: [
        "media_id", "file_name", "file_type", "category", "brand_id",
        "content_id", "drive_file_id", "file_url", "version", "upload_date", "notes"
      ],
      initialData: [
        [
          "MED-001", "GlowLab_Serum_Product_Shot_4K.jpg", "IMAGE", "Raw Footage", "BRD-001",
          "CNT-001", "drive_id_sample_001", "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800", "v1", "2026-11-02", "Foto botol serum studio lighting bersih"
        ],
        [
          "MED-002", "GlowLab_Brand_Guidelines_2026.pdf", "DOCUMENT", "Brand Asset", "BRD-001",
          "", "drive_id_sample_002", "https://glowlab.id/assets/brandbook.pdf", "v2.1", "2026-11-01", "Pedoman logo, warna hex, font resmi brand"
        ],
        [
          "MED-003", "Audio_Upbeat_Lofi_Commercial_License.mp3", "AUDIO", "Music & SFX", "BRD-001",
          "CNT-001", "drive_id_sample_003", "https://audio.example.com/lofi-commercial.mp3", "v1", "2026-11-02", "Lisensi komersial bebas klaim royalti"
        ]
      ]
    },
    // 17. References
    {
      name: "References",
      headers: [
        "reference_id", "reference_title", "reference_url", "platform", "category",
        "content_idea", "screenshot_link", "notes", "created_date"
      ],
      initialData: [
        [
          "REF-001", "Transisi Snap Zoom Hook Viral", "https://tiktok.com/@creator_tips/video/7891", "TikTok", "Visual Editing Hook",
          "Cocok untuk video komparasi gadget atau reveal produk", "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400",
          "Transisi cepat 0.3 detik dengan efek sound whoosh", "2026-11-01"
        ],
        [
          "REF-002", "Format Hook Contrarian Skincare", "https://instagram.com/reel/XYZ890", "Instagram", "Copywriting Hook",
          "Mengungkap fakta berlawanan dari mitos umum perawatan wajah", "https://images.unsplash.com/photo-1512290900672-1f4f5f59fa4f?w=400",
          "Gunakan kalimat 'Jangan beli ini sebelum kamu tahu...'", "2026-11-02"
        ]
      ]
    },
    // 18. Time_Tracking
    {
      name: "Time_Tracking",
      headers: [
        "time_id", "task_id", "user_id", "activity", "date",
        "start_time", "end_time", "duration", "notes", "created_at"
      ],
      initialData: [
        [
          "TIM-001", "TSK-001", "USR-001", "Shooting scene texture & b-roll", "2026-11-03",
          "09:00", "11:30", 150, "Total 2.5 jam shooting di studio utama", "2026-11-03T11:30:00.000Z"
        ],
        [
          "TIM-002", "TSK-003", "USR-001", "Riset & Penulisan Naskah Script CNT-002", "2026-11-02",
          "14:00", "16:00", 120, "2 jam riset komparasi kamera", "2026-11-02T16:00:00.000Z"
        ]
      ]
    },
    // 19. Income
    {
      name: "Income",
      headers: [
        "income_id", "date", "client_id", "project_id", "content_id",
        "income_source", "amount", "payment_status", "payment_date", "proof_link",
        "notes", "created_at"
      ],
      initialData: [
        [
          "INC-001", "2026-11-01", "CLI-001", "PRJ-001", "CNT-001",
          "Brand Sponsorship / Endorsement", 12500000, "Paid", "2026-11-01", "https://drive.google.com/file/d/proof_inc001",
          "Pembayaran DP 50% Project Q4 Skincare Campaign", "2026-11-01T08:00:00.000Z"
        ],
        [
          "INC-002", "2026-11-02", "CLI-002", "PRJ-002", "CNT-002",
          "Brand Sponsorship / Endorsement", 9000000, "Pending", "", "",
          "DP 50% Review Gadget Flagship (Jatuh tempo 10 Nov)", "2026-11-02T08:00:00.000Z"
        ],
        [
          "INC-003", "2026-10-31", "", "", "CNT-004",
          "TikTok Affiliate Commission", 3450000, "Paid", "2026-10-31", "https://drive.google.com/file/d/proof_affiliate_oct",
          "Komisi penjualan produk keranjang kuning periode Oktober", "2026-10-31T08:00:00.000Z"
        ]
      ]
    },
    // 20. Expenses
    {
      name: "Expenses",
      headers: [
        "expense_id", "date", "category", "description", "project_id",
        "amount", "payment_method", "proof_link", "notes", "created_at"
      ],
      initialData: [
        [
          "EXP-001", "2026-11-02", "Equipment & Gear", "Beli Softbox Lantern Godox 65cm", "PRJ-001",
          850000, "BCA Transfer", "https://drive.google.com/file/d/receipt_godox", "Untuk shooting video skincare studio", "2026-11-02T09:00:00.000Z"
        ],
        [
          "EXP-002", "2026-11-01", "Software & Subscriptions", "Langganan Adobe Creative Cloud & CapCut Pro Bulanan", "",
          920000, "Kartu Kredit", "https://drive.google.com/file/d/receipt_adobe", "Operasional tim video editor", "2026-11-01T08:00:00.000Z"
        ],
        [
          "EXP-003", "2026-11-03", "Production Props", "Props cermin aesthetic & kain satin backdrop", "PRJ-001",
          240000, "ShopeePay", "https://drive.google.com/file/d/receipt_props", "Shooting CNT-001", "2026-11-03T08:00:00.000Z"
        ]
      ]
    },
    // 21. Invoices
    {
      name: "Invoices",
      headers: [
        "invoice_id", "client_id", "project_id", "invoice_date", "due_date",
        "total", "payment_status", "invoice_link", "notes", "created_at"
      ],
      initialData: [
        [
          "INV-2026-001", "CLI-001", "PRJ-001", "2026-11-01", "2026-11-15",
          25000000, "Partially Paid", "https://drive.google.com/file/d/inv_glowlab_q4", "DP Rp 12.500.000 lunas, sisa pelunasan pasca publish", "2026-11-01T08:00:00.000Z"
        ],
        [
          "INV-2026-002", "CLI-002", "PRJ-002", "2026-11-02", "2026-11-16",
          18000000, "Unpaid", "https://drive.google.com/file/d/inv_techsphere_flagship", "Invoice paket 1 Dedicated + 2 Shorts", "2026-11-02T08:00:00.000Z"
        ]
      ]
    },
    // 22. Payments
    {
      name: "Payments",
      headers: [
        "payment_id", "invoice_id", "income_id", "date", "amount",
        "payment_method", "proof_link", "notes", "created_at"
      ],
      initialData: [
        [
          "PAY-001", "INV-2026-001", "INC-001", "2026-11-01", 12500000,
          "BCA Corporate Transfer", "https://drive.google.com/file/d/proof_inc001", "Pembayaran Termin 1 (DP 50%) GlowLab Skincare", "2026-11-01T09:00:00.000Z"
        ]
      ]
    },
    // 23. Targets
    {
      name: "Targets",
      headers: [
        "target_id", "target_name", "target_type", "period", "target_value",
        "actual_value", "status", "achievement_pct", "notes", "updated_at"
      ],
      initialData: [
        [
          "TGT-001", "Produksi Video Pendek November", "Content Production", "November 2026", 24,
          8, "On Track", 33.3, "Target 24 video pendek (TikTok + Reels)", "2026-11-03T08:00:00.000Z"
        ],
        [
          "TGT-002", "Pendapatan Bisnis Creator Q4", "Revenue", "Q4 2026", 75000000,
          24950000, "On Track", 33.27, "Target pendapatan total sponsorship & affiliate", "2026-11-03T08:00:00.000Z"
        ],
        [
          "TGT-003", "Followers TikTok 200K Milestone", "Followers", "November 2026", 200000,
          185000, "On Track", 92.5, "Kurang 15K followers menuju target", "2026-11-03T08:00:00.000Z"
        ],
        [
          "TGT-004", "Total Views Video November", "Views", "November 2026", 1500000,
          420000, "On Track", 28.0, "Akumulasi views seluruh platform", "2026-11-03T08:00:00.000Z"
        ]
      ]
    },
    // 24. Notifications
    {
      name: "Notifications",
      headers: ["notification_id", "type", "title", "message", "date", "read_status", "link", "created_at"],
      initialData: [
        [
          "NOT-001", "Deadline", "Deadline Shooting Mendekati", "Tugas 'Shooting Video 3 Kesalahan Pakai Serum' jatuh tempo besok!",
          "2026-11-03", "Unread", "#tasks", "2026-11-03T07:00:00.000Z"
        ],
        [
          "NOT-002", "Publication", "Jadwal Publikasi Siap", "Konten 'Review Jujur Pemakaian 14 Hari' terjadwal publish 06 Nov jam 18:30.",
          "2026-11-02", "Unread", "#calendar", "2026-11-02T10:00:00.000Z"
        ],
        [
          "NOT-003", "Payment", "Invoice Menunggu Pembayaran", "Invoice INV-2026-002 dari TechSphere jatuh tempo dalam 13 hari.",
          "2026-11-02", "Read", "#finance", "2026-11-02T11:00:00.000Z"
        ]
      ]
    },
    // 25. Settings
    {
      name: "Settings",
      headers: ["key", "value", "category", "description", "updated_at"],
      initialData: [
        ["app_name", "ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER", "General", "Nama Resmi Aplikasi", "2026-11-01T08:00:00.000Z"],
        ["creator_name", "Alex Pratama", "Profile", "Nama Kreator / Studio Utama", "2026-11-01T08:00:00.000Z"],
        ["currency_symbol", "Rp", "Financial", "Simbol Mata Uang Default", "2026-11-01T08:00:00.000Z"],
        ["drive_root_folder_id", "", "Google_Drive", "ID Folder Google Drive untuk Penyimpanan Berkas Konten", "2026-11-01T08:00:00.000Z"],
        ["secret_token", "PLANNER_SECRET_TOKEN_2026", "Security", "Token Autentikasi API REST Apps Script", "2026-11-01T08:00:00.000Z"],
        ["enable_local_cache", "true", "System", "Gunakan cache offline browser (LocalStorage)", "2026-11-01T08:00:00.000Z"],
        ["daily_routine_items", JSON.stringify([
          { id: "RTN-01", text: "Cek analitik & engagement 24 jam terakhir", done: true },
          { id: "RTN-02", text: "Balas 20 komentar teratas di TikTok & IG", done: true },
          { id: "RTN-03", text: "Riset tren sound & hashtag viral hari ini", done: false },
          { id: "RTN-04", text: "Draft minimal 1 ide / hook naskah baru", done: false },
          { id: "RTN-05", text: "Cek progres editing video editor & feedback", done: false }
        ]), "Routines", "Daftar Rutinitas Harian Kreator", "2026-11-01T08:00:00.000Z"]
      ]
    }
  ];

  // Eksekusi pembuatan tiap Sheet
  sheetsConfig.forEach((cfg) => {
    let sheet = ss.getSheetByName(cfg.name);
    if (!sheet) {
      sheet = ss.insertSheet(cfg.name);
    } else {
      sheet.clear();
    }

    // Tulis Header
    const headerRange = sheet.getRange(1, 1, 1, cfg.headers.length);
    headerRange.setValues([cfg.headers]);
    headerRange.setBackground("#1E3A8A"); // Deep Navy Blue
    headerRange.setFontColor("#FFFFFF");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");

    // Tulis Data Starter
    if (cfg.initialData && cfg.initialData.length > 0) {
      sheet.getRange(2, 1, cfg.initialData.length, cfg.headers.length).setValues(cfg.initialData);
    }

    // Format tampilan tabel
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, cfg.headers.length);
  });

  // Hapus Sheet1 default jika ada
  const defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }

  Logger.log("Berhasil membuat seluruh 25 sheets database ALL IN ONE CONTENT CREATOR PLANNER!");
  if (ui) {
    ui.alert(
      "Setup Berhasil!",
      "Seluruh 25 Sheet Database 'ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER' telah sukses dibuat dan diformat secara otomatis!\n\nLangkah berikutnya: Deploy script Code.gs sebagai Web App dan salin URL-nya ke aplikasi.",
      ui.ButtonSet.OK
    );
  }
}
