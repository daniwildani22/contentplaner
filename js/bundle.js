/**
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - COMPLETE APPLICATION BUNDLE
 * Standalone Zero-Dependency Build (Works directly via file:/// and http://)
 * Generated: 2026-11-04 13:31:06
 */
(function(window, document) {
'use strict';

// 1. CONFIGURATION
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - CONFIGURATION & CONSTANTS
 * File: js/config.js
 * =========================================================================================
 */
const APP_CONFIG = {
  APP_NAME: "ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER",
  VERSION: "1.0.0",
  DEFAULT_CURRENCY: "IDR",
  CURRENCY_SYMBOL: "Rp",
  DEFAULT_API_TOKEN: "PLANNER_SECRET_TOKEN_2026",
  // Kredensial Cloud Database Supabase (Opsional: jika diisi di sini, seluruh perangkat yang membuka link Netlify langsung otomatis terhubung tanpa perlu input ulang)
  DEFAULT_SUPABASE_URL: "https://exxcnjldgnyawstokqmv.supabase.co",
  DEFAULT_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eGNuamxkZ255YXdzdG9rcW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MDQ1NzYsImV4cCI6MjEwOTI4MDU3Nn0.hO7mpKxWO5jAhUKk6BEiVzUvw8SVaMYcbt3dCj65fGk",
  STORAGE_KEYS: {
    STATE: "agy_creator_planner_state_v1",
    SETTINGS: "agy_creator_planner_settings_v1",
    AUTH: "agy_creator_planner_auth_v1",
    OFFLINE_QUEUE: "agy_creator_planner_offline_queue_v1",
    TIMER: "agy_creator_planner_active_timer_v1"
  }
};

/**
 * 25 Sheets Database Schema (PRD Section 7.1)
 */
const SHEET_NAMES = {
  USERS: "Users",
  BRANDS: "Brands",
  CLIENTS: "Clients",
  PROJECTS: "Projects",
  CAMPAIGNS: "Campaigns",
  SOCIAL_ACCOUNTS: "Social_Accounts",
  CONTENT_PLANNING: "Content_Planning",
  CONTENT_TASKS: "Content_Tasks",
  CONTENT_SUBTASKS: "Content_Subtasks",
  CONTENT_CALENDAR: "Content_Calendar",
  CONTENT_SCRIPTS: "Content_Scripts",
  CONTENT_PRODUCTION: "Content_Production",
  CONTENT_REVISIONS: "Content_Revisions",
  CONTENT_PUBLICATIONS: "Content_Publications",
  CONTENT_ANALYTICS: "Content_Analytics",
  MEDIA_LIBRARY: "Media_Library",
  REFERENCES: "References",
  TIME_TRACKING: "Time_Tracking",
  INCOME: "Income",
  EXPENSES: "Expenses",
  INVOICES: "Invoices",
  PAYMENTS: "Payments",
  TARGETS: "Targets",
  NOTIFICATIONS: "Notifications",
  SETTINGS: "Settings"
};

/**
 * Status Konten (PRD Module 02)
 */
const CONTENT_STATUSES = [
  { key: "Idea", label: "Idea", color: "bg-slate-100 text-slate-700 border-slate-300", dot: "bg-slate-400" },
  { key: "Planned", label: "Planned", color: "bg-sky-100 text-sky-800 border-sky-300", dot: "bg-sky-500" },
  { key: "In Production", label: "In Production", color: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500" },
  { key: "Ready", label: "Ready", color: "bg-purple-100 text-purple-800 border-purple-300", dot: "bg-purple-500" },
  { key: "Published", label: "Published", color: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" },
  { key: "Archived", label: "Archived", color: "bg-zinc-100 text-zinc-600 border-zinc-300", dot: "bg-zinc-400" }
];

/**
 * Status Pekerjaan / Tasks (PRD Module 04)
 */
const TASK_STATUSES = [
  { key: "To Do", label: "To Do", color: "bg-slate-100 text-slate-700 border-slate-300", dot: "bg-slate-400" },
  { key: "In Progress", label: "In Progress", color: "bg-blue-100 text-blue-800 border-blue-300", dot: "bg-blue-500" },
  { key: "Review", label: "Review", color: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500" },
  { key: "Revision", label: "Revision", color: "bg-rose-100 text-rose-800 border-rose-300", dot: "bg-rose-500" },
  { key: "Completed", label: "Completed", color: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" },
  { key: "Cancelled", label: "Cancelled", color: "bg-zinc-100 text-zinc-600 border-zinc-300", dot: "bg-zinc-400" }
];

/**
 * Prioritas Tugas (PRD Module 04)
 */
const TASK_PRIORITIES = [
  { key: "Urgent", label: "Urgent", color: "bg-rose-50 text-rose-700 border-rose-300 font-bold", badge: "bg-rose-500 text-white" },
  { key: "High", label: "High", color: "bg-amber-50 text-amber-700 border-amber-300 font-semibold", badge: "bg-amber-500 text-white" },
  { key: "Normal", label: "Normal", color: "bg-blue-50 text-blue-700 border-blue-200", badge: "bg-blue-500 text-white" },
  { key: "Low", label: "Low", color: "bg-slate-50 text-slate-700 border-slate-200", badge: "bg-slate-400 text-white" }
];

/**
 * Status Produksi (PRD Module 05)
 */
const PRODUCTION_STATUSES = [
  { key: "Not Started", label: "Belum Mulai", color: "bg-slate-100 text-slate-700" },
  { key: "Preparation", label: "Persiapan", color: "bg-amber-100 text-amber-800" },
  { key: "Shooting", label: "Shooting Berjalan", color: "bg-indigo-100 text-indigo-800" },
  { key: "Completed", label: "Selesai Shooting", color: "bg-emerald-100 text-emerald-800" }
];

/**
 * Status Naskah / Script (PRD Module 06)
 */
const SCRIPT_STATUSES = [
  { key: "Draft", label: "Draft", color: "bg-slate-100 text-slate-700" },
  { key: "In Review", label: "In Review", color: "bg-amber-100 text-amber-800" },
  { key: "Final", label: "Final Disetujui", color: "bg-emerald-100 text-emerald-800" }
];

/**
 * Status Revisi / Editing (PRD Module 07)
 */
const REVISION_STATUSES = [
  { key: "Editing", label: "Editing", color: "bg-blue-100 text-blue-800" },
  { key: "Review", label: "Review Tim / Brand", color: "bg-amber-100 text-amber-800" },
  { key: "Revision", label: "Revisi Diperlukan", color: "bg-rose-100 text-rose-800" },
  { key: "Approved", label: "Approved", color: "bg-teal-100 text-teal-800" },
  { key: "Final", label: "Final Siap Publish", color: "bg-emerald-100 text-emerald-800" }
];

/**
 * Status Publikasi (PRD Module 10)
 */
const PUBLICATION_STATUSES = [
  { key: "Draft", label: "Draft", color: "bg-slate-100 text-slate-700" },
  { key: "Scheduled", label: "Dijadwalkan", color: "bg-blue-100 text-blue-800" },
  { key: "Ready", label: "Siap Tayang", color: "bg-purple-100 text-purple-800" },
  { key: "Published", label: "Published (Tayang)", color: "bg-emerald-100 text-emerald-800" },
  { key: "Failed", label: "Gagal Tayang", color: "bg-rose-100 text-rose-800" },
  { key: "Cancelled", label: "Dibatalkan", color: "bg-zinc-100 text-zinc-600" }
];

/**
 * Target Types (PRD Module 17)
 */
const TARGET_TYPES = [
  "Content Production",
  "Content Publication",
  "Views",
  "Engagement",
  "Followers",
  "Revenue",
  "Task Completion"
];

/**
 * Platform Media Sosial
 */
const SOCIAL_PLATFORMS = [
  "TikTok",
  "Instagram Reels",
  "Instagram Feed/Carousel",
  "YouTube Long",
  "YouTube Shorts",
  "Facebook",
  "LinkedIn",
  "Twitter/X",
  "Blog/Website"
];

/**
 * Content Pillars
 */
const CONTENT_PILLARS = [
  "Education",
  "Entertainment",
  "Inspiration",
  "Promotion",
  "Review & Before-After",
  "Behind The Scenes",
  "Tips & Tutorial",
  "Storytelling"
];

/**
 * Format Konten
 */
const CONTENT_FORMATS = [
  "Short Video (Vertical 9:16)",
  "Long Video (Horizontal 16:9)",
  "Single Image Post",
  "Carousel Slide (10 Slides)",
  "Live Streaming",
  "Text Thread / Article"
];

/**
 * Kategori Pengeluaran
 */
const EXPENSE_CATEGORIES = [
  "Equipment & Gear",
  "Software & Subscriptions",
  "Talent & Production Team",
  "Props & Wardrobe",
  "Transportation & Location",
  "Advertising & Promotion",
  "Office & Admin",
  "Others"
];

/**
 * Sumber Pendapatan
 */
const INCOME_SOURCES = [
  "Brand Sponsorship / Endorsement",
  "Affiliate Commission",
  "AdSense / Platform Revenue",
  "Client Video Production",
  "Consulting / Mentoring",
  "Digital Products / Merch"
];


// 2. SUPABASE REALTIME CLIENT
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - SUPABASE CLIENT & REALTIME SYNC
 * File: js/supabase-client.js
 * =========================================================================================
 */
// [import stripped]
// Mapping nama Sheet ke nama tabel PostgreSQL Supabase
const TABLE_MAP = {
  [SHEET_NAMES.USERS]: "users",
  [SHEET_NAMES.BRANDS]: "brands",
  [SHEET_NAMES.CLIENTS]: "clients",
  [SHEET_NAMES.PROJECTS]: "projects",
  [SHEET_NAMES.CAMPAIGNS]: "campaigns",
  [SHEET_NAMES.SOCIAL_ACCOUNTS]: "social_accounts",
  [SHEET_NAMES.CONTENT_PLANNING]: "content_planning",
  [SHEET_NAMES.CONTENT_TASKS]: "content_tasks",
  [SHEET_NAMES.CONTENT_SUBTASKS]: "content_subtasks",
  [SHEET_NAMES.CONTENT_CALENDAR]: "content_calendar",
  [SHEET_NAMES.CONTENT_SCRIPTS]: "content_scripts",
  [SHEET_NAMES.CONTENT_PRODUCTION]: "content_production",
  [SHEET_NAMES.CONTENT_REVISIONS]: "content_revisions",
  [SHEET_NAMES.CONTENT_PUBLICATIONS]: "content_publications",
  [SHEET_NAMES.CONTENT_ANALYTICS]: "content_analytics",
  [SHEET_NAMES.MEDIA_LIBRARY]: "media_library",
  [SHEET_NAMES.REFERENCES]: "references_links",
  [SHEET_NAMES.TIME_TRACKING]: "time_tracking",
  [SHEET_NAMES.INCOME]: "income",
  [SHEET_NAMES.EXPENSES]: "expenses",
  [SHEET_NAMES.INVOICES]: "invoices",
  [SHEET_NAMES.PAYMENTS]: "payments",
  [SHEET_NAMES.TARGETS]: "targets",
  [SHEET_NAMES.NOTIFICATIONS]: "notifications",
  [SHEET_NAMES.SETTINGS]: "app_settings"
};
const PK_MAP = {
  users: "user_id",
  brands: "brand_id",
  clients: "client_id",
  projects: "project_id",
  campaigns: "campaign_id",
  social_accounts: "account_id",
  content_planning: "content_id",
  content_tasks: "task_id",
  content_subtasks: "subtask_id",
  content_calendar: "calendar_id",
  content_scripts: "script_id",
  content_production: "production_id",
  content_revisions: "revision_id",
  content_publications: "publication_id",
  content_analytics: "analytics_id",
  media_library: "media_id",
  references_links: "reference_id",
  time_tracking: "time_id",
  income: "income_id",
  expenses: "expense_id",
  invoices: "invoice_id",
  payments: "payment_id",
  targets: "target_id",
  notifications: "notification_id",
  app_settings: "key"
};

class SupabaseManager {
  constructor() {
    this.client = null;
    this.checkUrlCredentials();
    this.url = localStorage.getItem("supabase_url") || (APP_CONFIG && APP_CONFIG.DEFAULT_SUPABASE_URL) || "";
    this.key = localStorage.getItem("supabase_anon_key") || (APP_CONFIG && APP_CONFIG.DEFAULT_SUPABASE_ANON_KEY) || "";
    this.realtimeChannel = null;
    this.isRealtimeConnected = false;
    this.init();
  }

  checkUrlCredentials() {
    try {
      if (typeof window === "undefined" || !window.location) return;
      const searchParams = new URLSearchParams(window.location.search);
      const hashPart = window.location.hash.includes("?") ? window.location.hash.split("?")[1] : "";
      const hashParams = new URLSearchParams(hashPart);

      // 1. Cek parameter terenkode: ?sb_connect=base64...
      const token = searchParams.get("sb_connect") || hashParams.get("sb_connect");
      if (token) {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(token))));
        if (decoded.url && decoded.key) {
          localStorage.setItem("supabase_url", decoded.url.trim());
          localStorage.setItem("supabase_anon_key", decoded.key.trim());
          this.cleanUrl();
          console.log("Kredensial Supabase berhasil dimuat otomatis dari link undangan tim!");
          return;
        }
      }

      // 2. Cek parameter langsung: ?sb_url=...&sb_key=...
      const u = searchParams.get("sb_url") || hashParams.get("sb_url");
      const k = searchParams.get("sb_key") || hashParams.get("sb_key");
      if (u && k) {
        localStorage.setItem("supabase_url", u.trim());
        localStorage.setItem("supabase_anon_key", k.trim());
        this.cleanUrl();
        console.log("Kredensial Supabase berhasil dimuat otomatis dari URL!");
      }
    } catch (e) {
      console.warn("Gagal membaca kredensial Supabase dari URL:", e);
    }
  }

  cleanUrl() {
    try {
      const cleanHash = window.location.hash.split("?")[0] || "#dashboard";
      const clean = window.location.origin + window.location.pathname + cleanHash;
      window.history.replaceState({}, document.title, clean);
    } catch (e) {}
  }

  getShareableLink(customOrigin = null) {
    if (!this.url || !this.key) return "";
    try {
      const payload = JSON.stringify({ url: this.url, key: this.key });
      const token = btoa(unescape(encodeURIComponent(payload)));
      const base = customOrigin || (window.location.origin + window.location.pathname);
      return `${base}?sb_connect=${token}#dashboard`;
    } catch (e) {
      return "";
    }
  }

  init() {
    if (this.url && this.key && window.supabase) {
      try {
        this.client = window.supabase.createClient(this.url, this.key);
        console.log("Supabase Client initialized successfully.");
      } catch (err) {
        console.error("Gagal menginisialisasi Supabase Client:", err);
      }
    }
  }

  isConfigured() {
    return Boolean(this.url && this.key && this.client);
  }

  setCredentials(url, key) {
    this.url = (url || "").trim();
    this.key = (key || "").trim();
    if (this.url && this.key) {
      localStorage.setItem("supabase_url", this.url);
      localStorage.setItem("supabase_anon_key", this.key);
    } else {
      localStorage.removeItem("supabase_url");
      localStorage.removeItem("supabase_anon_key");
    }

    if (this.url && this.key && window.supabase) {
      this.client = window.supabase.createClient(this.url, this.key);
      return true;
    }
    this.client = null;
    return false;
  }

  getCredentials() {
    return {
      url: this.url,
      key: this.key
    };
  }

  async ping(testUrl = null, testKey = null) {
    const url = testUrl || this.url;
    const key = testKey || this.key;

    if (!url || !key) {
      return { success: false, message: "URL dan Anon Key Supabase wajib diisi." };
    }

    if (!window.supabase) {
      return { success: false, message: "Library Supabase JS belum termuat di browser." };
    }

    try {
      const tempClient = window.supabase.createClient(url, key);
      const { data, error } = await tempClient.from("users").select("user_id").limit(1);

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, message: "Koneksi ke database PostgreSQL Supabase berhasil!" };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  normalizeForSupabase(sheetName, item) {
    if (!item || typeof item !== "object") return item;
    const clean = { ...item };

    // 1. Ubah empty string "" pada foreign key menjadi null agar lolos validasi foreign key constraint Postgres
    const fkFields = [
      "brand_id", "client_id", "project_id", "campaign_id", "content_id",
      "task_id", "user_id", "assigned_user", "editor_user", "uploaded_by", "invoice_id"
    ];
    fkFields.forEach(fk => {
      if (clean[fk] === "" || clean[fk] === "undefined") {
        clean[fk] = null;
      }
    });

    // 2. Pemetaan & Sinkronisasi Alias Kolom (Aplikasi vs Skema Database PostgreSQL)
    if (sheetName === SHEET_NAMES.CONTENT_TASKS) {
      clean.task_name = clean.task_title || clean.task_name || clean.title || "Tugas Pekerjaan";
      clean.task_title = clean.task_name;
    } else if (sheetName === SHEET_NAMES.CONTENT_PLANNING) {
      if (clean.hook && !clean.hook_3sec) clean.hook_3sec = clean.hook;
      if (clean.hook_3sec && !clean.hook) clean.hook = clean.hook_3sec;
    } else if (sheetName === SHEET_NAMES.CONTENT_CALENDAR) {
      if (clean.publication_date && !clean.publish_date) clean.publish_date = clean.publication_date;
      if (clean.publish_date && !clean.publication_date) clean.publication_date = clean.publish_date;
      if (clean.production_date && !clean.shooting_date) clean.shooting_date = clean.production_date;
      if (clean.deadline && !clean.deadline_date) clean.deadline_date = clean.deadline;
      if (clean.schedule_status && !clean.status) clean.status = clean.schedule_status;
      if (!clean.title && clean.content_id) clean.title = `Jadwal Konten #${clean.content_id}`;
    } else if (sheetName === SHEET_NAMES.CONTENT_SCRIPTS) {
      if (clean.script_title && !clean.title) clean.title = clean.script_title;
      if (clean.title && !clean.script_title) clean.script_title = clean.title;
      if (clean.script_body && !clean.body_script) clean.body_script = clean.script_body;
      if (clean.caption && !clean.draft_caption) clean.draft_caption = clean.caption;
      if (clean.hook && !clean.visual_hook) clean.visual_hook = clean.hook;
    } else if (sheetName === SHEET_NAMES.MEDIA_LIBRARY) {
      if (clean.file_url && !clean.storage_url) clean.storage_url = clean.file_url;
      if (!clean.storage_url) clean.storage_url = "https://drive.google.com";
    } else if (sheetName === SHEET_NAMES.REFERENCES) {
      if (clean.reference_title && !clean.title) clean.title = clean.reference_title;
      if (clean.title && !clean.reference_title) clean.reference_title = clean.title;
      if (clean.reference_url && !clean.link_url) clean.link_url = clean.reference_url;
      if (!clean.link_url) clean.link_url = "https://tiktok.com";
    } else if (sheetName === SHEET_NAMES.TIME_TRACKING) {
      if (clean.activity && !clean.activity_type) clean.activity_type = clean.activity;
      if (clean.duration && !clean.duration_seconds) clean.duration_seconds = (Number(clean.duration) || 0) * 60;
      if (!clean.start_time || typeof clean.start_time === "string") {
        clean.start_time = new Date().toISOString();
      }
    }

    return clean;
  }

  normalizeFromSupabase(sheetName, row) {
    if (!row || typeof row !== "object") return row;
    const item = { ...row };

    // Sinkronisasi alias dari database kembali ke model data internal frontend
    if (sheetName === SHEET_NAMES.CONTENT_TASKS) {
      if (!item.task_title && item.task_name) item.task_title = item.task_name;
      if (!item.title && item.task_name) item.title = item.task_name;
    } else if (sheetName === SHEET_NAMES.CONTENT_PLANNING) {
      if (!item.hook && item.hook_3sec) item.hook = item.hook_3sec;
    } else if (sheetName === SHEET_NAMES.CONTENT_CALENDAR) {
      if (!item.publication_date && item.publish_date) item.publication_date = item.publish_date;
      if (!item.production_date && item.shooting_date) item.production_date = item.shooting_date;
      if (!item.deadline && item.deadline_date) item.deadline = item.deadline_date;
      if (!item.schedule_status && item.status) item.schedule_status = item.status;
    } else if (sheetName === SHEET_NAMES.CONTENT_SCRIPTS) {
      if (!item.script_title && item.title) item.script_title = item.title;
      if (!item.script_body && item.body_script) item.script_body = item.body_script;
      if (!item.caption && item.draft_caption) item.caption = item.draft_caption;
      if (!item.hook && item.visual_hook) item.hook = item.visual_hook;
    } else if (sheetName === SHEET_NAMES.MEDIA_LIBRARY) {
      if (!item.file_url && item.storage_url) item.file_url = item.storage_url;
    } else if (sheetName === SHEET_NAMES.REFERENCES) {
      if (!item.reference_title && item.title) item.reference_title = item.title;
      if (!item.reference_url && item.link_url) item.reference_url = item.link_url;
    } else if (sheetName === SHEET_NAMES.TIME_TRACKING) {
      if (!item.activity && item.activity_type) item.activity = item.activity_type;
      if (!item.duration && item.duration_seconds) item.duration = Math.round(item.duration_seconds / 60);
    }

    return item;
  }

  async fetchAll(storeInstance) {
    if (!this.isConfigured() || !storeInstance) return { success: false, message: "Supabase belum dikonfigurasi." };

    try {
      let totalFetched = 0;
      const promises = Object.entries(TABLE_MAP).map(async ([sheetName, tableName]) => {
        try {
          const { data, error } = await this.client.from(tableName).select("*");
          if (!error && Array.isArray(data)) {
            // Normalisasi data dari Supabase ke state store
            const normalized = data.map(row => this.normalizeFromSupabase(sheetName, row));
            storeInstance.replaceSheetData(sheetName, normalized);
            totalFetched++;
          } else if (error) {
            console.warn(`[Supabase fetchAll error on ${tableName}]:`, error.message);
          }
        } catch (e) {
          console.warn(`Gagal memuat tabel ${tableName}:`, e);
        }
      });

      await Promise.all(promises);
      storeInstance.isHydratedFromCloud = true;
      return { success: true, totalTables: totalFetched };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  async autoSave(sheetName, action, item, id = null) {
    if (!this.isConfigured()) return; // Berjalan offline / fallback ke local store

    const tableName = TABLE_MAP[sheetName];
    if (!tableName) return;
    const pk = PK_MAP[tableName] || "id";

    try {
      if (action === "create" || action === "insert") {
        let payload = this.normalizeForSupabase(sheetName, item);
        let res = await this.client.from(tableName).upsert(payload);
        
        // Resilient fallback jika terdapat kolom yang belum terdefinisi di skema Supabase
        if (res.error && res.error.code === "PGRST204" && res.error.message) {
          const match = res.error.message.match(/Could not find the '([^']+)' column/);
          if (match && match[1]) {
            console.warn(`[Supabase Schema Fallback] Kolom '${match[1]}' belum ada di tabel '${tableName}', menyimpan tanpa kolom tersebut...`);
            delete payload[match[1]];
            res = await this.client.from(tableName).upsert(payload);
          }
        }

        if (res.error) {
          console.warn(`[Supabase autoSave INSERT error on ${tableName}]:`, res.error.message, res.error.details);
        } else {
          console.log(`[Supabase autoSave] Sukses simpan ke ${tableName}`);
        }
      } else if (action === "update") {
        const targetId = id || item[pk];
        let payload = this.normalizeForSupabase(sheetName, item);
        let res = await this.client.from(tableName).update(payload).eq(pk, targetId);

        if (res.error && res.error.code === "PGRST204" && res.error.message) {
          const match = res.error.message.match(/Could not find the '([^']+)' column/);
          if (match && match[1]) {
            console.warn(`[Supabase Schema Fallback] Kolom '${match[1]}' belum ada di tabel '${tableName}', memperbarui tanpa kolom tersebut...`);
            delete payload[match[1]];
            res = await this.client.from(tableName).update(payload).eq(pk, targetId);
          }
        }

        if (res.error) {
          console.warn(`[Supabase autoSave UPDATE error on ${tableName}]:`, res.error.message);
        }
      } else if (action === "delete") {
        const targetId = id || (item ? item[pk] : null);
        if (targetId) {
          const res = await this.client.from(tableName).delete().eq(pk, targetId);
          if (res.error) {
            console.warn(`[Supabase autoSave DELETE error on ${tableName}]:`, res.error.message);
          } else {
            console.log(`[Supabase autoSave] Sukses hapus dari ${tableName} ID: ${targetId}`);
          }
        }
      }
    } catch (err) {
      console.warn(`Auto-save ke Supabase (${tableName}) gagal, tersimpan lokal:`, err);
    }
  }

  setupRealtime(storeInstance, onUpdateCallback) {
    if (!this.isConfigured() || this.realtimeChannel) return;

    try {
      this.realtimeChannel = this.client
        .channel("public-db-changes")
        .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
          console.log("Supabase Realtime Change Event:", payload);
          const tableName = payload.table;
          const eventType = payload.eventType; // 'INSERT', 'UPDATE', 'DELETE'

          // 1. Tangani Pencabutan Akses Pengguna Secara Realtime
          if (tableName === "users" && typeof auth !== "undefined") {
            const currentUser = auth.getCurrentUser();
            if (currentUser) {
              const currentId = String(currentUser.user_id || "");
              if (eventType === "DELETE" && payload.old && String(payload.old.user_id) === currentId) {
                console.warn("[Realtime Auth] Akun aktif ini telah dihapus oleh Owner!");
                auth.logout();
                if (window.handleAppLogout) window.handleAppLogout();
                else window.location.reload();
                alert("⛔ Akses Ditolak: Akun Anda telah dihapus oleh Owner. Anda telah dikeluarkan dari sistem.");
                return;
              }
              if (eventType === "UPDATE" && payload.new && String(payload.new.user_id) === currentId) {
                if (payload.new.status && payload.new.status !== "Active") {
                  console.warn("[Realtime Auth] Akun aktif ini telah dinonaktifkan oleh Owner!");
                  auth.logout();
                  if (window.handleAppLogout) window.handleAppLogout();
                  else window.location.reload();
                  alert("⛔ Akses Ditutup: Status akun Anda telah dinonaktifkan oleh Owner.");
                  return;
                }
              }
            }
          }

          // 2. Sinkronkan Perubahan Data ke Central Store
          const sheetEntry = Object.entries(TABLE_MAP).find(([, tbl]) => tbl === tableName);
          if (!sheetEntry || !storeInstance) return;

          const [sheetName] = sheetEntry;
          const pk = PK_MAP[tableName] || "id";

          if (eventType === "INSERT") {
            const normalized = this.normalizeFromSupabase(sheetName, payload.new);
            const list = storeInstance.getItems(sheetName);
            if (!list.some(i => i[pk] === normalized[pk])) {
              storeInstance.state[sheetName].unshift(normalized);
              storeInstance.persist();
            }
          } else if (eventType === "UPDATE") {
            const normalized = this.normalizeFromSupabase(sheetName, payload.new);
            const list = storeInstance.getItems(sheetName);
            const idx = list.findIndex(i => i[pk] === normalized[pk]);
            if (idx !== -1) {
              storeInstance.state[sheetName][idx] = { ...list[idx], ...normalized };
              storeInstance.persist();
            }
          } else if (eventType === "DELETE") {
            const list = storeInstance.getItems(sheetName);
            const targetId = payload.old ? payload.old[pk] : null;
            if (targetId) {
              storeInstance.state[sheetName] = list.filter(i => String(i[pk]) !== String(targetId));
              storeInstance.persist();
            }
          }

          if (onUpdateCallback) {
            onUpdateCallback({ sheetName, eventType, data: payload.new || payload.old });
          }
        })
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            this.isRealtimeConnected = true;
            console.log("🟢 Supabase Realtime WebSocket Active & Connected!");
          }
        });
    } catch (err) {
      console.warn("Gagal mengaktifkan Supabase Realtime:", err);
    }
  }
}
const supabaseClient = new SupabaseManager();
window.supabaseClient = supabaseClient;


// 3. CENTRAL STORE
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - CENTRAL STATE STORE
 * File: js/store.js
 * Fungsi: State Management Reaktif terpusat untuk 25 Sheet Database Google Sheets,
 *         Dukungan Offline LocalStorage, Pub-Sub Event Listeners, Relational Lookups,
 *         dan Mesin Agregasi Analitik Real-Time.
 * =========================================================================================
 */
// [import stripped]
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
const store = new Store();


// 4. API CLIENT
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - API CLIENT FOR GOOGLE APPS SCRIPT
 * File: js/api.js
 * Fungsi: Mengelola komunikasi REST API ke backend Google Apps Script Web App,
 *         sinkronisasi cloud dua arah, upload berkas ke Google Drive, dan offline queue.
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
class ApiClient {
  constructor() {
    this.isOnline = navigator.onLine;
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.flushQueue();
    });
    window.addEventListener("offline", () => {
      this.isOnline = false;
    });
  }

  getGasUrl() {
    const val = store.getSetting ? store.getSetting("gas_api_url") : "";
    if (val) return val.trim();
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "gas_api_url");
    if (setting) {
      return (setting.value || setting.setting_value || "").trim();
    }
    return "";
  }

  getSecretToken() {
    const val = store.getSetting ? store.getSetting("secret_token") : "";
    if (val) return val.trim();
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "secret_token");
    if (setting) {
      return (setting.value || setting.setting_value || "PLANNER_SECRET_TOKEN_2026").trim();
    }
    return "PLANNER_SECRET_TOKEN_2026";
  }

  isConfigured() {
    const url = this.getGasUrl();
    return url.length > 0 && url.startsWith("https://script.google.com");
  }

  /**
   * Menguji koneksi REST API ke Google Apps Script
   */
  async ping(customUrl = null) {
    const url = (customUrl || this.getGasUrl()).trim();
    if (!url) {
      return { success: false, message: "URL Google Apps Script belum diisi di Pengaturan." };
    }

    try {
      const sep = url.includes("?") ? "&" : "?";
      const response = await fetch(`${url}${sep}action=ping`, {
        method: "GET",
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const resJson = await response.json();
      if (resJson.status === "success") {
        return { success: true, data: resJson };
      } else {
        return { success: false, message: resJson.message || "Gagal melakukan ping ke API." };
      }
    } catch (err) {
      return { success: false, message: `Koneksi gagal: ${err.message}` };
    }
  }

  /**
   * Mengambil seluruh data 25 sheet dari Google Sheets
   */
  async fetchAll(customUrl = null) {
    const url = (customUrl || this.getGasUrl()).trim();
    if (!url) return { success: false, message: "URL API belum diset. Buka menu Pengaturan untuk memasukkan URL Web App." };

    try {
      const sep = url.includes("?") ? "&" : "?";
      const response = await fetch(`${url}${sep}action=readAll`, {
        method: "GET",
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const resJson = await response.json();
      if (resJson.status === "success" && resJson.data) {
        store.mergeRemoteData(resJson.data);
        return { success: true, totalSheets: Object.keys(resJson.data).length };
      } else {
        return { success: false, message: resJson.message || "Gagal membaca data dari Google Sheets." };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  /**
   * Mengirim data pembuatan baris baru ke backend
   */
  async syncCreate(sheetName, item) {
    if (!this.isConfigured() || !this.isOnline) return { localOnly: true };

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "create",
        sheet: sheetName,
        item: item,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      return await response.json();
    } catch (err) {
      console.warn("Gagal syncCreate ke Google Sheets, disimpan di queue:", err);
      return { localOnly: true, error: err.message };
    }
  }

  /**
   * Mengirim pembaruan baris ke backend
   */
  async syncUpdate(sheetName, id, item) {
    if (!this.isConfigured() || !this.isOnline) return { localOnly: true };

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "update",
        sheet: sheetName,
        id: id,
        item: item,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      return await response.json();
    } catch (err) {
      console.warn("Gagal syncUpdate ke Google Sheets, disimpan di queue:", err);
      return { localOnly: true, error: err.message };
    }
  }

  /**
   * Mengirim penghapusan baris ke backend
   */
  async syncDelete(sheetName, id) {
    if (!this.isConfigured() || !this.isOnline) return { localOnly: true };

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "delete",
        sheet: sheetName,
        id: id,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      return await response.json();
    } catch (err) {
      console.warn("Gagal syncDelete ke Google Sheets, disimpan di queue:", err);
      return { localOnly: true, error: err.message };
    }
  }

  /**
   * Upload Berkas Base64 ke Google Drive & Catat di Sheet Media_Library
   */
  async uploadMedia(base64Data, fileName, mimeType, category = "General", brandId = "", contentId = "", notes = "") {
    if (!this.isConfigured()) {
      // Offline fallback: simpan sebagai local dummy record di Media_Library
      const localMedia = {
        media_id: "MED-LOCAL-" + Date.now(),
        file_name: fileName,
        file_type: fileName.split(".").pop().toUpperCase(),
        category: category,
        brand_id: brandId,
        content_id: contentId,
        drive_file_id: "local_cache",
        file_url: base64Data.startsWith("data:") ? base64Data : "",
        version: "v1",
        upload_date: new Date().toISOString().slice(0, 10),
        notes: notes || "Tersimpan secara lokal (Google Drive belum terhubung)"
      };
      store.createItem(SHEET_NAMES.MEDIA_LIBRARY, localMedia);
      return { success: true, localOnly: true, media: localMedia };
    }

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "uploadFile",
        base64Data: base64Data,
        fileName: fileName,
        mimeType: mimeType,
        category: category,
        brandId: brandId,
        contentId: contentId,
        notes: notes,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      const resJson = await response.json();
      if (resJson.status === "success" && resJson.media) {
        store.createItem(SHEET_NAMES.MEDIA_LIBRARY, resJson.media);
        return { success: true, media: resJson.media };
      } else {
        throw new Error(resJson.message || "Gagal mengunggah berkas ke Google Drive.");
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  /**
   * Sinkronisasi antrean offline ke Google Sheets
   */
  async flushQueue() {
    const queue = store.getQueue();
    if (!queue || queue.length === 0) {
      return { success: true, count: 0, message: "Tidak ada data antrean." };
    }
    if (!this.isConfigured()) {
      return { success: false, message: "Google Apps Script belum dikonfigurasi." };
    }
    if (!this.isOnline) {
      return { success: false, message: "Perangkat sedang offline." };
    }

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "batchSync",
        operations: queue,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      const resJson = await response.json();
      if (resJson.status === "success") {
        const count = queue.length;
        store.clearQueue();
        console.log(`Berhasil sinkronisasi ${count} operasi antrean offline ke Google Sheets.`);
        return { success: true, count };
      } else {
        throw new Error(resJson.message || "Gagal sinkronisasi batch.");
      }
    } catch (err) {
      console.warn("Gagal flushQueue ke server:", err);
      return { success: false, message: err.message };
    }
  }
}
const api = new ApiClient();


// 5. AUTHENTICATION & ACCESS CONTROL (RBAC)
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - AUTH & ACCESS CONTROL (RBAC)
 * File: js/auth.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
const AVAILABLE_PERMISSIONS = [
  { key: "dashboard", label: "Executive Dashboard", icon: "space_dashboard" },
  { key: "content", label: "Ide & Content Pipeline", icon: "lightbulb" },
  { key: "calendar", label: "Kalender Konten Terpadu", icon: "calendar_month" },
  { key: "tasks", label: "Tugas & Kanban Board", icon: "view_kanban" },
  { key: "production", label: "Script & Copywriting Studio", icon: "edit_note" },
  { key: "media", label: "Media Library & Google Drive", icon: "folder_shared" },
  { key: "reports", label: "Database Sheets & Ekspor", icon: "table_chart" },
  { key: "business", label: "Bisnis, Klien & Brand", icon: "business_center" },
  { key: "finance", label: "Kas, Beban & Invoice (Keuangan)", icon: "payments" },
  { key: "timetracking", label: "Stopwatch & Rutinitas", icon: "timer" },
  { key: "targets", label: "Sasaran KPI & Target", icon: "insights" },
  { key: "notifications", label: "Pusat Notifikasi", icon: "notifications" },
  { key: "settings", label: "Pengaturan Sistem & API", icon: "settings" }
];
const ROLE_DEFAULT_PERMISSIONS = {
  "Owner": ["all"],
  "Admin": ["dashboard", "content", "calendar", "tasks", "production", "media", "reports", "business", "timetracking", "targets", "notifications", "settings"],
  "Member / Creator": ["dashboard", "content", "calendar", "tasks", "production", "media", "timetracking", "notifications"],
  "Video Editor": ["dashboard", "tasks", "production", "media", "timetracking", "notifications"]
};

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    try {
      const savedAuth = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH);
      if (savedAuth) {
        this.currentUser = JSON.parse(savedAuth);
      } else {
        this.currentUser = null;
      }
    } catch (e) {
      this.currentUser = null;
    }
  }

  persist() {
    try {
      if (this.currentUser) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH);
      }
    } catch (e) {
      console.error("Gagal menyimpan sesi login:", e);
    }
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getUser() {
    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  validateCurrentSession(storeInstance = null) {
    if (!this.currentUser) return { valid: false, reason: "Tidak ada sesi aktif." };

    const storeToUse = storeInstance || (typeof store !== "undefined" ? store : null);
    if (!storeToUse) return { valid: true, user: this.currentUser };

    const users = storeToUse.getItems(SHEET_NAMES.USERS) || [];
    // Jika data pengguna belum termuat sama sekali, tunggu hidrasi
    if (users.length === 0) return { valid: true, user: this.currentUser };

    const currentId = String(this.currentUser.user_id || "");
    const currentUsername = (this.currentUser.username || "").toLowerCase().trim();

    const found = users.find(u => {
      const uId = String(u.user_id || "");
      const uName = (u.username || "").toLowerCase().trim();
      return uId === currentId || (currentUsername && uName === currentUsername);
    });

    if (!found) {
      console.warn(`[Auth] Pengguna ${this.currentUser.name} (${this.currentUser.user_id}) tidak ditemukan di database. Sesi dicabut.`);
      this.logout();
      return { valid: false, reason: "Akun Anda telah dihapus oleh Owner. Akses ke sistem ini telah dicabut." };
    }

    if (found.status && found.status !== "Active") {
      console.warn(`[Auth] Pengguna ${this.currentUser.name} berstatus '${found.status}'. Sesi dicabut.`);
      this.logout();
      return { valid: false, reason: "Akun Anda telah dinonaktifkan oleh Owner." };
    }

    // Perbarui hak akses & role secara dinamis jika diubah oleh Owner
    this.currentUser = { ...this.currentUser, ...found };
    this.persist();
    return { valid: true, user: this.currentUser };
  }

  isOwner() {
    if (!this.currentUser) return false;
    const role = (this.currentUser.role || "").toLowerCase();
    return role === "owner" || role.includes("owner");
  }

  isAdminOrOwner() {
    if (!this.currentUser) return false;
    const role = (this.currentUser.role || "").toLowerCase();
    return role.includes("owner") || role.includes("admin");
  }

  hasPermission(moduleKey) {
    if (!this.currentUser) return false;
    if (this.isOwner()) return true;
    const perms = this.currentUser.permissions || [];
    if (perms.includes("all")) return true;
    return perms.includes(moduleKey);
  }

  login(username, password) {
    const uClean = (username || "").trim().toLowerCase();
    const pClean = (password || "").trim();

    if (!uClean) {
      return { success: false, message: "Username tidak boleh kosong!" };
    }
    if (!pClean) {
      return { success: false, message: "Password tidak boleh kosong!" };
    }

    const users = store.getItems(SHEET_NAMES.USERS) || [];

    // Cari user berdasarkan username atau email
    const matched = users.find(u => {
      const uName = (u.username || u.name || "").toLowerCase().trim();
      const uEmail = (u.email || "").toLowerCase().trim();
      const uPass = (u.password || "123").trim();
      return (uName === uClean || uEmail === uClean) && (uPass === pClean);
    });

    if (matched) {
      this.currentUser = { ...matched };
      this.persist();
      store.updateItem(SHEET_NAMES.USERS, matched.user_id, { last_login: new Date().toISOString() });
      return { success: true, user: this.currentUser };
    }

    // Fallback jika login dengan admin / admin123
    if (uClean === "admin" && (pClean === "admin123" || pClean === "123")) {
      const ownerUser = users[0] || {
        user_id: "USR-001",
        name: "Rian Pratama",
        username: "rian",
        role: "Owner",
        email: "rian.lead@creatorhub.id",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        permissions: ["all"]
      };
      this.currentUser = ownerUser;
      this.persist();
      return { success: true, user: this.currentUser };
    }

    return { success: false, message: "Wrong Password!! Username atau kata sandi tidak cocok." };
  }

  logout() {
    this.currentUser = null;
    this.persist();
  }

  updateProfile(profileData) {
    if (!this.currentUser) {
      return { success: false, message: "Tidak ada sesi pengguna aktif." };
    }

    const userId = this.currentUser.user_id;
    const updated = {
      ...this.currentUser,
      ...profileData,
      updated_at: new Date().toISOString()
    };

    store.updateItem(SHEET_NAMES.USERS, userId, updated);
    this.currentUser = updated;
    this.persist();
    return { success: true, user: updated };
  }

  addUser(userData) {
    if (!this.isOwner() && !this.isAdminOrOwner()) {
      return { success: false, message: "Hanya Owner atau Admin yang dapat menambahkan pengguna baru." };
    }

    const users = store.getItems(SHEET_NAMES.USERS) || [];
    const uClean = (userData.username || "").toLowerCase().trim();
    if (users.some(u => (u.username || "").toLowerCase().trim() === uClean)) {
      return { success: false, message: `Username '${userData.username}' sudah digunakan.` };
    }

    const prefix = "USR";
    const nextNum = users.length + 1;
    const newId = `${prefix}-${String(nextNum).padStart(3, "0")}`;

    const newUser = {
      user_id: newId,
      name: userData.name || "Anggota Baru",
      username: uClean || `user${nextNum}`,
      password: userData.password || "123",
      email: userData.email || "",
      role: userData.role || "Member / Creator",
      avatar: userData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      status: "Active",
      permissions: userData.permissions || ROLE_DEFAULT_PERMISSIONS[userData.role] || ["dashboard", "tasks"],
      bio: userData.bio || "",
      created_at: new Date().toISOString()
    };

    store.createItem(SHEET_NAMES.USERS, newUser);
    return { success: true, user: newUser };
  }

  updateUser(userId, updatedFields) {
    if (!this.isOwner() && !this.isAdminOrOwner()) {
      return { success: false, message: "Hanya Owner yang dapat mengubah data & hak akses pengguna." };
    }

    const updated = store.updateItem(SHEET_NAMES.USERS, userId, {
      ...updatedFields,
      updated_at: new Date().toISOString()
    });

    if (this.currentUser && this.currentUser.user_id === userId) {
      this.currentUser = { ...this.currentUser, ...updated };
      this.persist();
    }

    return { success: true, user: updated };
  }

  deleteUser(userId) {
    if (!this.isOwner()) {
      return { success: false, message: "Hanya Owner yang memiliki wewenang menghapus akun pengguna." };
    }

    const targetUser = store.getItemById(SHEET_NAMES.USERS, userId);
    if (targetUser && (targetUser.role === "Owner" || (targetUser.role && targetUser.role.includes("Owner")))) {
      return { success: false, message: "Akun Owner utama tidak dapat dihapus!" };
    }

    if (this.currentUser && this.currentUser.user_id === userId) {
      return { success: false, message: "Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif!" };
    }

    store.deleteItem(SHEET_NAMES.USERS, userId);
    return { success: true };
  }
}
const auth = new AuthManager();


// 6. VIEW MODULES

// ==================== VIEW: js\views\dashboard.js ====================
const { renderDashboard } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: DASHBOARD (MODULE 01)
 * File: js/views/dashboard.js
 * Design: Oceanic Inventory Design System (Executive Command Center)
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
function renderDashboard(container) {
  const metrics = store.getDashboardMetrics();
  const tasks = store.getItems(SHEET_NAMES.CONTENT_TASKS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
  const socialAccounts = store.getItems(SHEET_NAMES.SOCIAL_ACCOUNTS);
  const monthName = new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  // Calculate live dynamic metrics from store
  const totalFollowers = socialAccounts.reduce((acc, a) => acc + (Number(a.followers) || 0), 0);
  const formattedFollowers = totalFollowers > 0 ? `${(totalFollowers / 1000).toFixed(0)} K` : "583 K";
  
  const totalActiveContent = contents.length;
  const totalTasksCount = tasks.length;
  const totalViewsCount = metrics.performance.totalViews > 0 ? `${(metrics.performance.totalViews / 1000).toFixed(0)} K` : "0";
  const overdueCount = metrics.overdueTasks;

  // Urgent tasks list for Critical Tasks widget from actual store tasks
  const criticalTasks = tasks
    .filter(t => t.priority === "Urgent" || t.priority === "High" || t.status === "Revision" || t.status === "In Progress")
    .slice(0, 4)
    .map(t => {
      const tag = t.priority === "Urgent" ? "Urgent" : t.status === "Revision" ? "Revisi" : t.deadline || "Hari Ini";
      const tagClass = t.priority === "Urgent" ? "bg-[#fdede7] text-[#932e14]" : t.status === "Revision" ? "bg-[#fdf2e9] text-[#c05621]" : "bg-[#e3f4f8] text-[#1b6274]";
      return {
        id: t.task_id,
        title: t.task_title,
        sub: `PIC: ${t.assigned_user || 'Studio'} • ${t.status || 'To Do'}`,
        tag: tag,
        tagClass: tagClass,
        status: t.status
      };
    });

  // Top platform performance ranking (matching Image 2)
  const rankingStores = [
    { name: "Gateway str", width: "94%", val: "874k" },
    { name: "The Rustic Fox", width: "78%", val: "721k" },
    { name: "Velvet Vine", width: "65%", val: "598k" },
    { name: "Blue Harbor", width: "61%", val: "586k" },
    { name: "Nebula Novelties", width: "43%", val: "395k" },
    { name: "Crimson Crafters", width: "38%", val: "344k" },
    { name: "Tidal Treasures", width: "30%", val: "274k" },
    { name: "Whimsy Wid", width: "24%", val: "213k" },
    { name: "Mercantile", width: "20%", val: "183k" },
    { name: "Emporium", width: "19%", val: "176k" }
  ];

  container.innerHTML = `
    <div class="space-y-6">

      <!-- ================================================================= -->
      <!-- SECTION 1: OVER VIEW BAR & 4 STAT CARDS (Matching Image 2)        -->
      <!-- ================================================================= -->
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-[14px] font-bold text-[#23485c] uppercase tracking-wider">Over View</h2>
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] text-[#4d6b7b] font-medium hidden sm:inline">Bulan Ini: ${monthName}</span>
            <button onclick="window.triggerCloudSync()" class="px-3 py-1.5 rounded-full bg-white border border-[#cadbe6] text-[11px] font-semibold text-[#1b3b4d] hover:bg-[#d9ebf9] transition-colors flex items-center gap-1.5 shadow-2xs" type="button" title="Sinkronkan dengan Google Sheets">
              <span class="material-symbols-outlined text-[14px]">refresh</span>
              <span>Sync Sheets</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Card 1: Total Konten (Total Products style) -->
          <div class="bg-white rounded-2xl p-4 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center gap-4 hover:border-[#9ec1d5] transition-all cursor-pointer" onclick="window.location.hash='#content'">
            <div class="w-12 h-12 rounded-xl bg-[#dff3ee] text-[#1b7a66] flex items-center justify-center shrink-0 border border-[#bce4da]">
              <span class="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
            <div>
              <div class="text-[22px] font-extrabold text-[#112d3d] leading-tight">${totalActiveContent}</div>
              <div class="text-[12px] font-medium text-[#5c7786]">Total Konten Aktif</div>
            </div>
          </div>

          <!-- Card 2: Orders / Tugas Selesai -->
          <div class="bg-white rounded-2xl p-4 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center gap-4 hover:border-[#9ec1d5] transition-all cursor-pointer" onclick="window.location.hash='#tasks'">
            <div class="w-12 h-12 rounded-xl bg-[#e3f4f8] text-[#1a6e82] flex items-center justify-center shrink-0 border border-[#c0e7f0]">
              <span class="material-symbols-outlined text-[24px]">layers</span>
            </div>
            <div>
              <div class="text-[22px] font-extrabold text-[#112d3d] leading-tight">${totalTasksCount}</div>
              <div class="text-[12px] font-medium text-[#5c7786]">Tugas &amp; Brief Order</div>
            </div>
          </div>

          <!-- Card 3: Total Stock / Total Tayangan -->
          <div class="bg-white rounded-2xl p-4 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center gap-4 hover:border-[#9ec1d5] transition-all cursor-pointer" onclick="window.location.hash='#social'">
            <div class="w-12 h-12 rounded-xl bg-[#e3f4f8] text-[#1a6e82] flex items-center justify-center shrink-0 border border-[#c0e7f0]">
              <span class="material-symbols-outlined text-[24px]">trending_up</span>
            </div>
            <div>
              <div class="text-[22px] font-extrabold text-[#112d3d] leading-tight">${totalViewsCount}</div>
              <div class="text-[12px] font-medium text-[#5c7786]">Total Tayangan (K)</div>
            </div>
          </div>

          <!-- Card 4: Out of Stock / Revisi Kritis (Warm Peach/Coral Alert Card) -->
          <div class="bg-[#fdede7] rounded-2xl p-4 border border-[#f5cdbf] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center justify-between hover:border-[#ebb5a2] transition-all cursor-pointer relative" onclick="window.location.hash='#tasks'">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-[#fae1d7] text-[#b34927] flex items-center justify-center shrink-0 border border-[#f0c3b0]">
                <span class="material-symbols-outlined text-[24px]">production_quantity_limits</span>
              </div>
              <div>
                <div class="text-[22px] font-extrabold text-[#742710] leading-tight">${overdueCount}</div>
                <div class="text-[12px] font-semibold text-[#8b3b22]">Revisi &amp; Deadline Hari Ini</div>
              </div>
            </div>
            <span class="w-5 h-5 rounded-full bg-white/80 text-[#8b3b22] text-[11px] font-bold flex items-center justify-center shadow-xs">i</span>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- SECTION 2: MIDDLE ANALYTICS ROW (Users + Donut + Sales Ranking)   -->
      <!-- ================================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Left: No of users / Total Viewers (3 Cols) -->
        <div class="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[#143242] mb-3">
              <h3 class="text-[14px] font-bold text-[#143242]">No of users</h3>
              <button class="text-slate-400 hover:text-slate-600">
                <span class="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#e6f2f9] text-[#2c6673] flex items-center justify-center mb-4 border border-[#cfdce5]">
              <span class="material-symbols-outlined text-[24px]">group</span>
            </div>
            <div class="text-3xl font-extrabold text-[#112d3d] tracking-tight">${formattedFollowers}</div>
            <div class="text-[13px] text-[#5c7786] font-medium mt-1">Total Followers &amp; Reach</div>
          </div>
          <div class="pt-4 border-t border-[#edf3f7] mt-4 flex items-center justify-between text-[11.5px] text-[#2c6673] font-semibold">
            <span class="flex items-center gap-1 text-emerald-600">
              <span class="material-symbols-outlined text-[14px]">arrow_upward</span> +14.8% MoM
            </span>
            <span class="text-[#7c95a4] font-normal">Active Audience</span>
          </div>
        </div>

        <!-- Center: Inventory Values / Donut Chart (4 Cols) -->
        <div class="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col">
          <h3 class="text-[14px] font-bold text-[#143242] mb-3">Inventory Values</h3>
          <div class="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6">
            <!-- Donut / Pie SVG -->
            <div class="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <!-- Outer Ring background (Sold Units: 32% => #a4cbdd) -->
                <circle cx="18" cy="18" fill="#a4cbdd" r="14" stroke="none"></circle>
                <!-- Inner Slice (Total Units: 68% => #426d83) -->
                <path d="M18 18 L18 4 A14 14 0 1 1 5.2 24.3 Z" fill="#426d83"></path>
                <!-- Inner Cutout for Donut effect -->
                <circle cx="18" cy="18" fill="#ffffff" r="6.5"></circle>
              </svg>
              <!-- Percentage Overlays -->
              <span class="absolute top-5 right-6 text-[11px] font-bold text-[#1b3b4d]">32%</span>
              <span class="absolute bottom-6 left-6 text-[11px] font-bold text-white">68%</span>
            </div>
            <!-- Legend matching Reference -->
            <div class="space-y-3 text-[12px] font-medium">
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-4 rounded-md bg-[#a4cbdd] inline-block shrink-0"></span>
                <span class="text-[#436375] font-semibold">Sold units (32%)</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-4 rounded-md bg-[#426d83] inline-block shrink-0"></span>
                <span class="text-[#436375] font-semibold">Total units (68%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Top 10 Stores by sales / Top Platform Channels (5 Cols) -->
        <div class="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-[14px] font-bold text-[#143242]">Top 10 Stores by sales</h3>
            <span class="text-[11px] text-[#5c7786] font-semibold">Revenue Ranking</span>
          </div>
          <!-- Horizontal Bar Chart -->
          <div class="space-y-2 text-[11px] font-medium text-[#486372] pr-1">
            ${rankingStores.map(store => `
              <div class="flex items-center justify-between gap-2">
                <span class="w-28 truncate text-[11px]">${store.name}</span>
                <div class="flex-1 bg-transparent h-2.5 flex items-center">
                  <div class="h-2.5 bg-[#426d83] rounded-full" style="width: ${store.width};"></div>
                </div>
                <span class="w-9 text-right font-bold text-[#18394b]">${store.val}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </section>

      <!-- ================================================================= -->
      <!-- SECTION 3: BOTTOM SPLIT (Expense vs Profit + Critical Tasks)       -->
      <!-- ================================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Left: Expense vs Profit (7 Cols) with Smooth Spline & Callouts -->
        <div class="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-[14px] font-bold text-[#143242]">Expense vs Profit</h3>
            <span class="text-[11px] font-semibold text-[#5c7786]">Last 6 months</span>
          </div>

          <!-- Chart Area with Curved SVG -->
          <div class="relative w-full h-56 mt-2">
            <svg class="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 540 180">
              <!-- Dotted horizontal grid lines -->
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="20" y2="20"></line>
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="60" y2="60"></line>
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="100" y2="100"></line>
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="140" y2="140"></line>
              
              <!-- Y-axis values -->
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="24">40k</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="64">30k</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="104">20k</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="144">10k</text>

              <!-- Gradients -->
              <defs>
                <linearGradient id="profitGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#4aa882" stop-opacity="0.22"></stop>
                  <stop offset="100%" stop-color="#4aa882" stop-opacity="0.0"></stop>
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#d47955" stop-opacity="0.18"></stop>
                  <stop offset="100%" stop-color="#d47955" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>

              <!-- Area Fill 1: Profit (Green) -->
              <path d="M 45 110 C 110 125, 170 95, 235 112 C 300 130, 365 75, 430 45 C 470 30, 500 25, 520 25 L 520 150 L 45 150 Z" fill="url(#profitGrad)"></path>
              <!-- Area Fill 2: Expense (Peach) -->
              <path d="M 45 105 C 105 85, 170 120, 240 115 C 310 110, 350 68, 410 70 C 470 72, 495 105, 520 108 L 520 150 L 45 150 Z" fill="url(#expenseGrad)"></path>

              <!-- Line 1: Expense (Brown/Peach) -->
              <path d="M 45 105 C 105 85, 170 120, 240 115 C 310 110, 350 68, 410 70 C 470 72, 495 105, 520 108" fill="none" stroke="#be6d4f" stroke-width="2"></path>
              <!-- Line 2: Profit (Green/Teal) -->
              <path d="M 45 110 C 110 125, 170 95, 235 112 C 300 130, 365 75, 430 45 C 470 30, 500 25, 520 25" fill="none" stroke="#378b6a" stroke-width="2.2"></path>

              <!-- Callout Points -->
              <circle cx="370" cy="70" fill="#ba5331" r="3.5" stroke="#ffffff" stroke-width="2"></circle>
              <line stroke="#ba5331" stroke-width="1" x1="370" x2="370" y1="70" y2="58"></line>

              <circle cx="485" cy="27" fill="#2e7c5c" r="3.5" stroke="#ffffff" stroke-width="2"></circle>
              <line stroke="#2e7c5c" stroke-width="1" x1="485" x2="485" y1="27" y2="15"></line>

              <!-- Months Labels -->
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="60" y="165">Dec</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="145" y="165">Jan</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="230" y="165">Feb</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="315" y="165">Mar</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="400" y="165">April</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="470" y="165">May</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="515" y="165">Jun</text>
            </svg>

            <!-- Floating Badges matching the reference screenshot -->
            <div class="absolute top-9 left-[65%] -translate-x-1/2 px-2 py-0.5 rounded bg-[#c06b4b] text-white text-[9px] font-bold shadow-xs">
              Highest Expense
            </div>
            <div class="absolute top-1 right-[5%] px-2 py-0.5 rounded bg-[#2c7757] text-white text-[9px] font-bold shadow-xs">
              Highest Profit
            </div>
          </div>
        </div>

        <!-- Right: Real-time Creator Ops & Critical Tasks (5 Cols) -->
        <div class="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-[14px] font-bold text-[#143242] flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px] text-[#2c6673]">assignment</span>
                <span>Critical Tasks &amp; Deadlines</span>
              </h3>
              <span class="text-[11px] font-semibold text-[#8b3b22] bg-[#fdede7] px-2 py-0.5 rounded-full border border-[#f5cdbf]">
                ${criticalTasks.length} Pekerjaan
              </span>
            </div>

            <!-- Task List -->
            <div class="space-y-2.5">
              ${criticalTasks.length > 0 ? criticalTasks.map(item => `
                <div class="p-2.5 rounded-xl bg-[#f8fbfe] border border-[#d6e5ef] flex items-center justify-between gap-2.5 hover:bg-[#f0f6fa] transition-colors">
                  <div class="flex items-center gap-2.5">
                    <input class="w-4 h-4 rounded text-[#1b3b4d] border-slate-300 focus:ring-0 cursor-pointer" type="checkbox" onchange="window.toggleDashboardTask('${item.id}', this.checked)">
                    <div>
                      <h4 class="text-[12.5px] font-bold text-[#112d3d] leading-tight">${item.title}</h4>
                      <span class="text-[10.5px] text-[#637f90]">${item.sub}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${item.tagClass}">
                      ${item.tag}
                    </span>
                    <button onclick="window.confirmDeleteTask('${item.id}')" class="p-1 text-slate-300 hover:text-rose-600 transition" title="Hapus Tugas">
                      <span class="material-symbols-outlined text-[15px]">delete</span>
                    </button>
                  </div>
                </div>
              `).join('') : `
                <div class="p-6 rounded-xl border border-dashed border-[#d6e5ef] bg-[#f8fbfe] text-center text-xs text-slate-400">
                  <span class="material-symbols-outlined text-[24px] text-emerald-600 block mb-1">task_alt</span>
                  Tidak ada tugas mendesak atau deadline kritis saat ini.
                </div>
              `}
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-3 border-t border-[#edf3f7] mt-3 flex items-center justify-between gap-2">
            <button onclick="window.location.hash='#content'" class="flex-1 py-2 px-3 rounded-xl bg-[#1b3b4d] text-white hover:bg-[#142e3d] text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs" type="button">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>+ Tambah Ide Konten</span>
            </button>
            <button onclick="window.location.hash='#reports'" class="py-2 px-3 rounded-xl bg-white border border-[#cbe0ec] text-[#23485c] hover:bg-[#f0f6fa] text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs" type="button">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span>Export Sheets</span>
            </button>
          </div>
        </div>

      </section>

    </div>
  `;
}

window.toggleDashboardTask = (taskId, isChecked) => {
  store.updateItem(SHEET_NAMES.CONTENT_TASKS, taskId, {
    status: isChecked ? "Completed" : "In Progress",
    progress: isChecked ? 100 : 50
  });
  if (window.showToast) {
    window.showToast(isChecked ? "✅ Tugas ditandai selesai!" : "Tugas kembali dikerjakan", "info");
  }
  const container = document.getElementById("main-view-container");
  if (container) renderDashboard(container);
};

return { renderDashboard: renderDashboard };
})();

// ==================== VIEW: js\views\content.js ====================
const { renderContent } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: CONTENT PLANNING (MODULE 02)
 * File: js/views/content.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
let currentViewMode = "kanban"; // 'kanban' or 'list'
let searchQuery = "";
let selectedPlatform = "ALL";
let selectedBrand = "ALL";
let selectedStatus = "ALL";
function renderContent(container) {
  const allContents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
  const brands = store.getItems(SHEET_NAMES.BRANDS);
  const projects = store.getItems(SHEET_NAMES.PROJECTS);
  const campaigns = store.getItems(SHEET_NAMES.CAMPAIGNS);

  // Filter & Search Logic
  const filtered = allContents.filter(item => {
    const matchSearch = searchQuery === "" ||
      (item.content_title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content_idea || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.hook || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchPlatform = selectedPlatform === "ALL" || item.platform === selectedPlatform;
    const matchBrand = selectedBrand === "ALL" || item.brand_id === selectedBrand;
    const matchStatus = selectedStatus === "ALL" || item.status === selectedStatus;

    return matchSearch && matchPlatform && matchBrand && matchStatus;
  });

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar: Title & Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 02</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Perencanaan Konten</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Content Planning & Bank Ide</h1>
          <p class="text-xs text-slate-500 mt-0.5">Kelola ide, hook naskah, pilar konten, dan ubah konsep menjadi pekerjaan produksi secara terintegrasi.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <!-- View Switcher -->
          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button id="btn-view-kanban" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentViewMode === 'kanban' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-500 hover:text-slate-800'}">
              Kanban
            </button>
            <button id="btn-view-list" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentViewMode === 'list' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-500 hover:text-slate-800'}">
              Daftar Tabel
            </button>
          </div>

          <button id="btn-create-content" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>+ Buat Perencanaan</span>
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div class="flex-1 min-w-[240px] relative">
          <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" id="content-search-input" value="${searchQuery}" placeholder="Cari judul, ide konsep, formula hook..." class="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <select id="content-filter-platform" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${selectedPlatform === 'ALL' ? 'selected' : ''}>Semua Platform</option>
            ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${selectedPlatform === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>

          <select id="content-filter-brand" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${selectedBrand === 'ALL' ? 'selected' : ''}>Semua Brand</option>
            ${brands.map(b => `<option value="${b.brand_id}" ${selectedBrand === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
          </select>

          <select id="content-filter-status" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${selectedStatus === 'ALL' ? 'selected' : ''}>Semua Status</option>
            ${CONTENT_STATUSES.map(s => `<option value="${s.key}" ${selectedStatus === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
          </select>

          ${(searchQuery || selectedPlatform !== "ALL" || selectedBrand !== "ALL" || selectedStatus !== "ALL") ? `
            <button id="btn-reset-content-filter" class="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1">
              Reset Filter
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Main Content Render (Kanban vs List) -->
      ${currentViewMode === "kanban" ? renderKanbanView(filtered) : renderListView(filtered)}
    </div>
  `;

  // Attach Event Handlers
  setupEventListeners(container, brands, projects, campaigns);
}

function renderKanbanView(items) {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
      ${CONTENT_STATUSES.map(status => {
        const columnItems = items.filter(i => i.status === status.key);
        return `
          <div class="bg-slate-100/70 p-3.5 rounded-2xl border border-slate-200/80 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-slate-200">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full ${status.dot}"></span>
                <span class="font-bold text-xs text-slate-800">${status.label}</span>
              </div>
              <span class="text-[10px] font-extrabold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                ${columnItems.length}
              </span>
            </div>

            <div class="space-y-3 min-h-[160px]">
              ${columnItems.length === 0 ? `
                <div class="h-28 flex items-center justify-center text-[11px] text-slate-400 border border-dashed border-slate-300 rounded-xl">
                  Kosong
                </div>
              ` : columnItems.map(item => renderContentCard(item)).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderContentCard(item) {
  const brandName = store.getBrandName(item.brand_id);
  const statusCfg = CONTENT_STATUSES.find(s => s.key === item.status) || CONTENT_STATUSES[0];

  return `
    <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-xs transition space-y-2.5">
      <!-- Card Header: Platform & Format -->
      <div class="flex items-center justify-between gap-2">
        <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md truncate">
          ${item.platform || 'General'}
        </span>
        <span class="text-[10px] text-slate-400 truncate">${item.content_pillar || '-'}</span>
      </div>

      <!-- Title & Hook -->
      <div>
        <h4 class="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">${item.content_title}</h4>
        ${item.hook ? `<p class="text-[11px] text-slate-500 italic mt-1 line-clamp-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">"${item.hook}"</p>` : ''}
      </div>

      <!-- Metadata & Brand -->
      <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span class="truncate">🏢 ${brandName}</span>
        <span>📅 ${item.planned_date || 'TBD'}</span>
      </div>

      <!-- Action Buttons -->
      <div class="pt-1 flex items-center justify-between gap-1 border-t border-slate-50">
        <button class="text-[10px] font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditContentModal('${item.content_id}')">
          Edit
        </button>

        ${(item.status === 'Idea' || item.status === 'Planned') ? `
          <button class="text-[10px] font-bold text-emerald-600 hover:text-emerald-800" onclick="window.quickConvertIdea('${item.content_id}')" title="Ubah ide langsung menjadi tugas produksi">
            ⚡ Jadi Tugas
          </button>
        ` : ''}

        ${auth.isAdminOrOwner() ? `
          <button class="text-[10px] font-bold text-slate-400 hover:text-rose-600" onclick="window.confirmDeleteContent('${item.content_id}')">
            Hapus
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function renderListView(items) {
  if (items.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">📋</div>
        <div class="font-bold text-slate-800 text-sm">Tidak ada konten ditemukan</div>
        <div class="text-xs text-slate-500 mt-1">Sesuaikan kata kunci pencarian atau filter yang dipilih.</div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Judul & Konsep</th>
              <th class="py-3.5 px-4">Platform</th>
              <th class="py-3.5 px-4">Brand / Proyek</th>
              <th class="py-3.5 px-4">Pilar & Kategori</th>
              <th class="py-3.5 px-4">Jadwal Rencana</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${items.map(item => {
              const brandName = store.getBrandName(item.brand_id);
              const statusCfg = CONTENT_STATUSES.find(s => s.key === item.status) || CONTENT_STATUSES[0];
              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 max-w-xs">
                    <div class="font-bold text-slate-900 truncate">${item.content_title}</div>
                    ${item.hook ? `<div class="text-[11px] text-slate-500 italic truncate mt-0.5">"${item.hook}"</div>` : ''}
                  </td>
                  <td class="py-3 px-4">
                    <span class="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md text-[10px]">${item.platform}</span>
                  </td>
                  <td class="py-3 px-4 font-medium text-slate-800">
                    <div>${brandName}</div>
                  </td>
                  <td class="py-3 px-4 text-slate-500">
                    <div>${item.content_pillar || '-'}</div>
                    <div class="text-[10px] text-slate-400">${item.content_category || '-'}</div>
                  </td>
                  <td class="py-3 px-4 text-slate-600 font-mono text-[11px]">
                    ${item.planned_date || '-'}
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusCfg.color}">
                      ${item.status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    ${(item.status === 'Idea' || item.status === 'Planned') ? `
                      <button class="text-xs font-bold text-emerald-600 hover:text-emerald-800" onclick="window.quickConvertIdea('${item.content_id}')">
                        ⚡ Tugas
                      </button>
                    ` : ''}
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditContentModal('${item.content_id}')">
                      Edit
                    </button>
                    ${auth.isAdminOrOwner() ? `
                      <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.confirmDeleteContent('${item.content_id}')">
                        Hapus
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function setupEventListeners(container, brands, projects, campaigns) {
  // View Switchers
  document.getElementById("btn-view-kanban")?.addEventListener("click", () => {
    currentViewMode = "kanban";
    renderContent(container);
  });
  document.getElementById("btn-view-list")?.addEventListener("click", () => {
    currentViewMode = "list";
    renderContent(container);
  });

  // Search & Filters
  document.getElementById("content-search-input")?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderContent(container);
  });
  document.getElementById("content-filter-platform")?.addEventListener("change", (e) => {
    selectedPlatform = e.target.value;
    renderContent(container);
  });
  document.getElementById("content-filter-brand")?.addEventListener("change", (e) => {
    selectedBrand = e.target.value;
    renderContent(container);
  });
  document.getElementById("content-filter-status")?.addEventListener("change", (e) => {
    selectedStatus = e.target.value;
    renderContent(container);
  });
  document.getElementById("btn-reset-content-filter")?.addEventListener("click", () => {
    searchQuery = "";
    selectedPlatform = "ALL";
    selectedBrand = "ALL";
    selectedStatus = "ALL";
    renderContent(container);
  });

  // Button Create Content
  document.getElementById("btn-create-content")?.addEventListener("click", () => {
    openContentModal(null, brands, projects, campaigns);
  });

  // Global Handlers
  window.openEditContentModal = (contentId) => {
    const item = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, contentId);
    if (item) openContentModal(item, brands, projects, campaigns);
  };

  window.quickConvertIdea = (contentId) => {
    if (confirm("Ubah konsep ide ini menjadi Tugas Pekerjaan produksi baru secara otomatis?")) {
      try {
        const task = store.convertContentToTask(contentId);
        alert(`Berhasil membuat tugas baru: "${task.task_title}"`);
        renderContent(container);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  window.confirmDeleteContent = (contentId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) {
        window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus data perencanaan konten.", "error");
      } else {
        alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus data perencanaan konten.");
      }
      return;
    }
    if (confirm("Apakah Anda yakin ingin menghapus perencanaan konten ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_PLANNING, contentId);
      if (window.showToast) window.showToast("🗑️ Perencanaan konten berhasil dihapus.", "info");
      renderContent(container);
    }
  };
}

function openContentModal(item = null, brands = [], projects = [], campaigns = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!item;
  const data = item || {
    content_id: "",
    content_title: "",
    brand_id: brands[0]?.brand_id || "",
    project_id: projects[0]?.project_id || "",
    campaign_id: campaigns[0]?.campaign_id || "",
    platform: "TikTok",
    content_pillar: "Education",
    content_category: "Tutorial",
    target_audience: "Gen Z & Millennial",
    content_objective: "Awareness & Engagement",
    content_format: "Short Video (Vertical 9:16)",
    content_idea: "",
    hook: "",
    cta: "",
    planned_date: new Date().toISOString().slice(0, 10),
    status: "Idea",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        <!-- Header -->
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-base">
              ${isEdit ? 'Edit Perencanaan Konten' : 'Buat Perencanaan Konten Baru'}
            </h3>
            <p class="text-xs text-slate-500">Isi formulir perencanaan konten dan formula naskah</p>
          </div>
          <button id="modal-close-btn" class="p-1 rounded-lg text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <!-- Form Body -->
        <form id="content-form" class="p-6 overflow-y-auto space-y-4 text-xs">
          <!-- Judul Konten -->
          <div>
            <label class="block font-bold text-slate-700 mb-1">Judul Konten <span class="text-rose-500">*</span></label>
            <input type="text" id="form-content-title" required value="${data.content_title}" placeholder="Contoh: 3 Kesalahan Pakai Serum di Pagi Hari" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-slate-800 text-xs font-medium">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Platform -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform <span class="text-rose-500">*</span></label>
              <select id="form-platform" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <!-- Brand -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Brand Mitra</label>
              <select id="form-brand" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Tanpa Brand / Akun Pribadi --</option>
                ${brands.map(b => `<option value="${b.brand_id}" ${data.brand_id === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Pilar Konten -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Pilar Konten</label>
              <select id="form-pillar" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${CONTENT_PILLARS.map(p => `<option value="${p}" ${data.content_pillar === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <!-- Format Konten -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Format Konten</label>
              <select id="form-format" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${CONTENT_FORMATS.map(f => `<option value="${f}" ${data.content_format === f ? 'selected' : ''}>${f}</option>`).join('')}
              </select>
            </div>

            <!-- Status -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status</label>
              <select id="form-status" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${CONTENT_STATUSES.map(s => `<option value="${s.key}" ${data.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
              </select>
            </div>
          </div>

          <!-- Formula Hook 3 Detik Pertama -->
          <div>
            <label class="block font-bold text-slate-700 mb-1">Formula Hook (3 Detik Pertama)</label>
            <input type="text" id="form-hook" value="${data.hook || ''}" placeholder="Kalimat pembuka / visual shocking yang menghentikan scroll pemirsa" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-slate-800">
          </div>

          <!-- Konsep Ide & Alur Cerita -->
          <div>
            <label class="block font-bold text-slate-700 mb-1">Konsep Ide & Poin Pembahasan</label>
            <textarea id="form-idea" rows="3" placeholder="Rangkuman ide, poin edukasi, atau masalah yang dipecahkan..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 outline-none text-slate-800">${data.content_idea || ''}</textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Call to Action (CTA) -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Call to Action (CTA)</label>
              <input type="text" id="form-cta" value="${data.cta || ''}" placeholder="Contoh: Cek keranjang kuning / Simpan video ini" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <!-- Tanggal Direncanakan -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Target Tanggal Tayang</label>
              <input type="date" id="form-planned-date" value="${data.planned_date || ''}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <!-- Catatan Produksi -->
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan / Referensi</label>
            <input type="text" id="form-notes" value="${data.notes || ''}" placeholder="Catatan props, lokasi shooting, atau sound trending..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <!-- Footer Buttons -->
          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-delete-content-btn" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Konten</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-cancel-btn" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                ${isEdit ? 'Simpan Perubahan' : 'Buat Perencanaan'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  // Modal Actions
  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-close-btn")?.addEventListener("click", close);
  document.getElementById("modal-cancel-btn")?.addEventListener("click", close);

  document.getElementById("modal-delete-content-btn")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Apakah Anda yakin ingin menghapus perencanaan konten ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_PLANNING, item.content_id);
      if (window.showToast) window.showToast("🗑️ Perencanaan konten berhasil dihapus.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderContent(mainContainer);
    }
  });

  document.getElementById("content-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("form-content-title").value.trim();
    if (!title) {
      alert("Judul konten wajib diisi.");
      return;
    }

    const payload = {
      content_title: title,
      platform: document.getElementById("form-platform").value,
      brand_id: document.getElementById("form-brand").value,
      content_pillar: document.getElementById("form-pillar").value,
      content_format: document.getElementById("form-format").value,
      status: document.getElementById("form-status").value,
      hook: document.getElementById("form-hook").value.trim(),
      content_idea: document.getElementById("form-idea").value.trim(),
      cta: document.getElementById("form-cta").value.trim(),
      planned_date: document.getElementById("form-planned-date").value,
      notes: document.getElementById("form-notes").value.trim()
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_PLANNING, item.content_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_PLANNING, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderContent(mainContainer);
  });
}

return { renderContent: renderContent };
})();

// ==================== VIEW: js\views\calendar.js ====================
const { renderCalendar } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: CALENDAR (MODULE 03)
 * File: js/views/calendar.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
let currentCalendarDate = new Date();
let currentCalendarView = "month"; // 'month' or 'agenda'
let filterPlatform = "ALL";
let filterBrand = "ALL";
function renderCalendar(container) {
  const allEvents = store.getItems(SHEET_NAMES.CONTENT_CALENDAR);
  const brands = store.getItems(SHEET_NAMES.BRANDS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);

  // Filter events
  const filteredEvents = allEvents.filter(event => {
    const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, event.content_id) || {};
    const matchPlatform = filterPlatform === "ALL" || cnt.platform === filterPlatform;
    const matchBrand = filterBrand === "ALL" || cnt.brand_id === filterBrand;
    return matchPlatform && matchBrand;
  });

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const monthName = currentCalendarDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 03</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Kalender Terpadu</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Content & Production Calendar</h1>
          <p class="text-xs text-slate-500 mt-0.5">Jadwal shooting, deadline pengerjaan video, dan tanggal publikasi multi-platform.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <!-- View switcher -->
          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button id="btn-cal-month" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentCalendarView === 'month' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-500'}">
              Bulan
            </button>
            <button id="btn-cal-agenda" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentCalendarView === 'agenda' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-500'}">
              Agenda List
            </button>
          </div>

          <button id="btn-create-schedule" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>+ Buat Jadwal</span>
          </button>
        </div>
      </div>

      <!-- Navigation & Filters Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <!-- Month Navigator -->
        <div class="flex items-center gap-2">
          <button id="cal-prev-month" class="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition">
            ◀ Bulan Lalu
          </button>
          <div class="px-3 py-1.5 font-extrabold text-slate-900 text-sm tracking-tight capitalize">
            ${monthName}
          </div>
          <button id="cal-next-month" class="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition">
            Bulan Depan ▶
          </button>
          <button id="cal-today-btn" class="text-xs font-semibold text-blue-600 hover:text-blue-800 ml-2">
            Hari Ini
          </button>
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-2.5">
          <select id="cal-filter-platform" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${filterPlatform === 'ALL' ? 'selected' : ''}>Semua Platform</option>
            ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${filterPlatform === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>

          <select id="cal-filter-brand" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${filterBrand === 'ALL' ? 'selected' : ''}>Semua Brand</option>
            ${brands.map(b => `<option value="${b.brand_id}" ${filterBrand === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Calendar View Container -->
      ${currentCalendarView === "month" ? renderMonthGrid(year, month, filteredEvents) : renderAgendaView(filteredEvents)}
    </div>
  `;

  setupCalendarListeners(container, contents);
}

function renderMonthGrid(year, month, events) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const todayStr = new Date().toISOString().slice(0, 10);

  let gridCells = [];

  // Padding cells before day 1
  for (let i = 0; i < firstDay; i++) {
    gridCells.push(`<div class="bg-slate-50/50 p-2 min-h-[110px] border border-slate-100 text-slate-300 text-xs"></div>`);
  }

  // Days in month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);
    const dateStr = dayDate.toISOString().slice(0, 10);
    const isToday = dateStr === todayStr;

    // Filter events matching this date (either publication_date or production_date)
    const dayEvents = events.filter(e => e.publication_date === dateStr || e.production_date === dateStr);

    gridCells.push(`
      <div class="bg-white p-2 min-h-[110px] border border-slate-200/70 hover:border-blue-300 transition flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between pb-1">
            <span class="text-xs font-bold ${isToday ? 'w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold' : 'text-slate-700'}">
              ${day}
            </span>
            ${dayEvents.length > 0 ? `<span class="text-[9px] font-bold text-slate-400">${dayEvents.length} pos</span>` : ''}
          </div>

          <!-- Events Pills -->
          <div class="space-y-1.5 mt-1">
            ${dayEvents.map(ev => {
              const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, ev.content_id) || {};
              const isPub = ev.publication_date === dateStr;
              return `
                <div class="text-[10px] p-1.5 rounded-lg border leading-tight cursor-pointer transition ${isPub ? 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100' : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'}" onclick="window.openCalendarModal('${ev.calendar_id}')">
                  <div class="font-extrabold flex items-center justify-between">
                    <span>${isPub ? '🚀 ' + (cnt.platform || 'Tayang') : '🎬 Shooting'}</span>
                    <span class="text-[8px] font-semibold">${isPub ? (ev.publication_time || '19:00') : ''}</span>
                  </div>
                  <div class="truncate font-semibold mt-0.5">${cnt.content_title || 'Untitled'}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="pt-1 opacity-0 group-hover:opacity-100 transition text-right">
          <button class="text-[10px] font-bold text-blue-600 hover:text-blue-800" onclick="window.quickAddScheduleForDate('${dateStr}')">
            + Jadwal
          </button>
        </div>
      </div>
    `);
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <!-- Days of Week Header -->
      <div class="grid grid-cols-7 text-center font-bold text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-200 py-3">
        ${dayNames.map(d => `<div>${d}</div>`).join('')}
      </div>

      <!-- Month Grid -->
      <div class="grid grid-cols-7 divide-x divide-y divide-slate-100">
        ${gridCells.join('')}
      </div>
    </div>
  `;
}

function renderAgendaView(events) {
  const sorted = [...events].sort((a, b) => (a.publication_date > b.publication_date ? 1 : -1));

  if (sorted.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">📅</div>
        <div class="font-bold text-slate-800 text-sm">Tidak ada jadwal konten ditemukan</div>
        <div class="text-xs text-slate-500 mt-1">Gunakan tombol "+ Buat Jadwal" untuk mengatur waktu shooting dan publikasi.</div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
        Daftar Agenda Jadwal Konten Terurut
      </div>
      <div class="divide-y divide-slate-100">
        ${sorted.map(ev => {
          const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, ev.content_id) || {};
          const brandName = store.getBrandName(cnt.brand_id);
          const isOverdue = ev.deadline < new Date().toISOString().slice(0, 10) && ev.schedule_status !== "Published";

          return `
            <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition">
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                  <span class="text-[9px] font-bold text-blue-600 uppercase">${new Date(ev.publication_date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                  <span class="text-sm font-extrabold text-blue-900">${new Date(ev.publication_date).getDate() || '-'}</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-900">${cnt.content_title || 'Untitled'}</span>
                    <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${cnt.platform || 'General'}</span>
                    ${isOverdue ? `<span class="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded">Terlambat</span>` : ''}
                  </div>
                  <div class="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 mt-1">
                    <span>🏢 ${brandName}</span>
                    <span>•</span>
                    <span>🎬 Produksi: ${ev.production_date || '-'}</span>
                    <span>•</span>
                    <span>⏰ Tayang: ${ev.publication_date} (${ev.publication_time || '19:00'})</span>
                    <span>•</span>
                    <span>Status: <strong class="text-slate-700">${ev.schedule_status}</strong></span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center">
                <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openCalendarModal('${ev.calendar_id}')">
                  Edit Jadwal
                </button>
                ${auth.isAdminOrOwner() ? `
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteCalendarEvent('${ev.calendar_id}')">
                    Hapus
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function setupCalendarListeners(container, contents) {
  // Navigators
  document.getElementById("cal-prev-month")?.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar(container);
  });
  document.getElementById("cal-next-month")?.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar(container);
  });
  document.getElementById("cal-today-btn")?.addEventListener("click", () => {
    currentCalendarDate = new Date();
    renderCalendar(container);
  });

  // View Switchers
  document.getElementById("btn-cal-month")?.addEventListener("click", () => {
    currentCalendarView = "month";
    renderCalendar(container);
  });
  document.getElementById("btn-cal-agenda")?.addEventListener("click", () => {
    currentCalendarView = "agenda";
    renderCalendar(container);
  });

  // Filters
  document.getElementById("cal-filter-platform")?.addEventListener("change", (e) => {
    filterPlatform = e.target.value;
    renderCalendar(container);
  });
  document.getElementById("cal-filter-brand")?.addEventListener("change", (e) => {
    filterBrand = e.target.value;
    renderCalendar(container);
  });

  // Create button
  document.getElementById("btn-create-schedule")?.addEventListener("click", () => {
    openScheduleModal(null, contents);
  });

  // Global functions
  window.openCalendarModal = (calendarId) => {
    const ev = store.getItemById(SHEET_NAMES.CONTENT_CALENDAR, calendarId);
    if (ev) openScheduleModal(ev, contents);
  };

  window.quickAddScheduleForDate = (dateStr) => {
    openScheduleModal({ publication_date: dateStr, production_date: dateStr }, contents);
  };

  window.deleteCalendarEvent = (calendarId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) {
        window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus jadwal kalender.", "error");
      } else {
        alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus jadwal kalender.");
      }
      return;
    }
    if (confirm("Hapus jadwal konten ini dari kalender?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_CALENDAR, calendarId);
      if (window.showToast) window.showToast("🗑️ Jadwal konten berhasil dihapus dari kalender.", "info");
      renderCalendar(container);
    }
  };
}

function openScheduleModal(eventData = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!(eventData && eventData.calendar_id);
  const data = eventData || {
    content_id: contents[0]?.content_id || "",
    production_date: new Date().toISOString().slice(0, 10),
    deadline: new Date().toISOString().slice(0, 10),
    publication_date: new Date().toISOString().slice(0, 10),
    publication_time: "19:00",
    schedule_status: "Scheduled",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Jadwal Konten' : 'Atur Jadwal Konten Baru'}
            </h3>
            <p class="text-xs text-slate-500">Sinkronkan tanggal produksi, deadline, dan waktu publikasi</p>
          </div>
          <button id="modal-cal-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="schedule-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Pilih Konten <span class="text-rose-500">*</span></label>
            <select id="form-cal-content" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
              ${contents.map(c => `
                <option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>
                  [${c.platform}] ${c.content_title}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Produksi / Shooting</label>
              <input type="date" id="form-cal-prod-date" value="${data.production_date || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Deadline Final Video</label>
              <input type="date" id="form-cal-deadline" value="${data.deadline || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Publikasi Tayang</label>
              <input type="date" id="form-cal-pub-date" required value="${data.publication_date || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Jam Publikasi</label>
              <input type="time" id="form-cal-pub-time" value="${data.publication_time || '19:00'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Status Jadwal</label>
            <select id="form-cal-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
              <option value="Draft" ${data.schedule_status === 'Draft' ? 'selected' : ''}>Draft</option>
              <option value="Planned" ${data.schedule_status === 'Planned' ? 'selected' : ''}>Planned</option>
              <option value="Scheduled" ${data.schedule_status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
              <option value="Ready" ${data.schedule_status === 'Ready' ? 'selected' : ''}>Ready</option>
              <option value="Published" ${data.schedule_status === 'Published' ? 'selected' : ''}>Published</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Jadwal</label>
            <input type="text" id="form-cal-notes" value="${data.notes || ''}" placeholder="Misal: Prime time malam Jumat / Hari gajian" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-cal-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Jadwal</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-cal-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                Simpan Jadwal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-cal-close")?.addEventListener("click", close);
  document.getElementById("modal-cal-cancel")?.addEventListener("click", close);

  document.getElementById("modal-cal-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus jadwal konten ini dari kalender?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_CALENDAR, eventData.calendar_id);
      if (window.showToast) window.showToast("🗑️ Jadwal konten berhasil dihapus dari kalender.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderCalendar(mainContainer);
    }
  });

  document.getElementById("schedule-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      content_id: document.getElementById("form-cal-content").value,
      production_date: document.getElementById("form-cal-prod-date").value,
      deadline: document.getElementById("form-cal-deadline").value,
      publication_date: document.getElementById("form-cal-pub-date").value,
      publication_time: document.getElementById("form-cal-pub-time").value,
      schedule_status: document.getElementById("form-cal-status").value,
      notes: document.getElementById("form-cal-notes").value.trim()
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_CALENDAR, eventData.calendar_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_CALENDAR, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderCalendar(mainContainer);
  });
}

return { renderCalendar: renderCalendar };
})();

// ==================== VIEW: js\views\tasks.js ====================
const { renderTasks } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: TASK MANAGEMENT (MODULE 04)
 * File: js/views/tasks.js
 * Design: Oceanic Inventory Design System (5-Column Dynamic Kanban Board)
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
let taskViewMode = "kanban"; // 'kanban', 'table', 'daily'
let selectedBrandFilter = "ALL";
function renderTasks(container) {
  const allTasks = store.getItems(SHEET_NAMES.CONTENT_TASKS) || [];
  const allSubtasks = store.getItems(SHEET_NAMES.CONTENT_SUBTASKS) || [];
  const brands = store.getItems(SHEET_NAMES.BRANDS) || [];
  const users = store.getItems(SHEET_NAMES.USERS) || [];

  // Filter tasks based on brand
  const filteredTasks = allTasks.filter(t => {
    if (selectedBrandFilter === "ALL") return true;
    return t.brand_id === selectedBrandFilter || (t.brand_name && t.brand_name.includes(selectedBrandFilter));
  });

  // Calculate dynamic statistics
  const totalTasks = filteredTasks.length;
  const colToDo = filteredTasks.filter(t => !t.status || t.status === "To Do" || t.status === "Idea" || t.status === "Planned");
  const colInProgress = filteredTasks.filter(t => t.status === "In Progress" || t.status === "Shooting");
  const colEditing = filteredTasks.filter(t => t.status === "Editing" || t.status === "Revision");
  const colReview = filteredTasks.filter(t => t.status === "Review");
  const colCompleted = filteredTasks.filter(t => t.status === "Completed" || t.status === "Published");

  const inProgressTasks = colInProgress.length;
  const inReviewTasks = colReview.length;
  const overdueTasks = filteredTasks.filter(t => t.priority === "Urgent" || t.status === "Revision").length;
  const completedTasks = colCompleted.length;

  container.innerHTML = `
    <div class="space-y-6">

      <!-- ================================================================= -->
      <!-- SECTION 1: OVER VIEW STRIP & 5 STAT CARDS                         -->
      <!-- ================================================================= -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-bold text-[#1e3e50] tracking-wide">Over View</h2>
            <span class="text-xs text-[#698c9f] hidden sm:inline">• Database: '${allTasks.length}' Tugas Tersimpan</span>
          </div>
          <div class="flex items-center gap-2">
            ${auth.isAdminOrOwner() ? `
              <button onclick="window.confirmClearAllTasks()" class="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-semibold transition-colors bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-2xs hover:bg-rose-50" type="button" title="Kosongkan seluruh tugas pekerjaan">
                <span class="material-symbols-outlined text-[16px]">delete_sweep</span>
                <span class="hidden sm:inline">Kosongkan Semua Tugas</span>
              </button>
            ` : ''}
            <button onclick="window.triggerCloudSync()" class="flex items-center gap-1.5 text-xs text-[#2c6673] hover:text-[#1e3e50] font-semibold transition-colors shadow-2xs bg-white px-3 py-1.5 rounded-full border border-[#d2e2ec]" type="button">
              <span class="material-symbols-outlined text-[16px]">sync</span>
              <span>Sinkron Data</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
          <!-- Stat 1: Total Tugas -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${totalTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Total Tugas</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#eaf4fa] flex items-center justify-center text-[#2c6673]">
              <span class="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>

          <!-- Stat 2: Sedang Dikerjakan -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${inProgressTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Sedang Dikerjakan</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#e3f4f8] flex items-center justify-center text-[#147a82]">
              <span class="material-symbols-outlined text-[20px]">pending_actions</span>
            </div>
          </div>

          <!-- Stat 3: Dalam Review -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${inReviewTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Dalam Review</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#f4eff8] flex items-center justify-center text-[#6e508a]">
              <span class="material-symbols-outlined text-[20px]">rate_review</span>
            </div>
          </div>

          <!-- Stat 4: Terlambat (Overdue) -->
          <div class="bg-[#fcf3f1] rounded-2xl p-4 border border-[#edd7d2] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#c53030] block">${overdueTasks}</span>
              <span class="text-[11px] text-[#a45347] font-medium">Terlambat (Overdue)</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#fae2dc] flex items-center justify-center text-[#c53030]">
              <span class="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>

          <!-- Stat 5: Selesai (Published) -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all col-span-2 md:col-span-1">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${completedTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Selesai (Published)</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#e6f7f2] flex items-center justify-center text-[#21835e]">
              <span class="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- SECTION 2: SUB-BAR (View Switcher Tabs & Filter Options)          -->
      <!-- ================================================================= -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-[#d2e2ec] shadow-sm">
        <!-- Switcher Buttons -->
        <div class="flex items-center gap-1.5 w-full sm:w-auto">
          <button id="tab-btn-kanban" class="flex items-center gap-2 px-4 py-1.5 rounded-xl ${taskViewMode === 'kanban' ? 'bg-[#1e3e50] text-white shadow-sm' : 'text-[#5b7e92] hover:text-[#1e3e50] hover:bg-[#eaf2f7]'} font-semibold text-xs transition-all" type="button">
            <span class="material-symbols-outlined text-[16px]">view_kanban</span>
            <span>Kanban Board</span>
          </button>
          <button id="tab-btn-table" class="flex items-center gap-2 px-4 py-1.5 rounded-xl ${taskViewMode === 'table' ? 'bg-[#1e3e50] text-white shadow-sm' : 'text-[#5b7e92] hover:text-[#1e3e50] hover:bg-[#eaf2f7]'} font-semibold text-xs transition-all" type="button">
            <span class="material-symbols-outlined text-[16px]">table_rows</span>
            <span>Tabel Detail</span>
          </button>
          <button id="tab-btn-daily" class="flex items-center gap-2 px-4 py-1.5 rounded-xl ${taskViewMode === 'daily' ? 'bg-[#1e3e50] text-white shadow-sm' : 'text-[#5b7e92] hover:text-[#1e3e50] hover:bg-[#eaf2f7]'} font-semibold text-xs transition-all" type="button">
            <span class="material-symbols-outlined text-[16px]">checklist</span>
            <span>Checklist Rutin</span>
          </button>
        </div>

        <!-- Filter Dropdown & New Task Button -->
        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select id="filter-task-brand" class="bg-[#f0f6fa] border border-[#d0e1ec] px-3 py-1.5 rounded-xl text-xs text-[#1e3e50] font-medium focus:outline-none focus:ring-1 focus:ring-[#1e3e50]">
            <option value="ALL">Semua Brand</option>
            ${brands.map(b => `<option value="${b.brand_name}" ${selectedBrandFilter === b.brand_name ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
          </select>

          <button id="btn-open-create-task" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs transition-all shadow-xs" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>+ Buat Tugas</span>
          </button>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- SECTION 3: 5 KANBAN COLUMNS (DYNAMIC)                             -->
      <!-- ================================================================= -->
      <div id="view-kanban-board" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start ${taskViewMode === 'kanban' ? '' : 'hidden'}">
        
        <!-- COLUMN 1: TO DO -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#7292a4]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">To Do</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colToDo.length}</span>
          </div>

          ${colToDo.length > 0 ? colToDo.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas To Do
            </div>
          `}

          <button onclick="window.openCreateTaskModal('To Do')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 2: IN PROGRESS -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#2c6673] animate-pulse"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">In Progress</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colInProgress.length}</span>
          </div>

          ${colInProgress.length > 0 ? colInProgress.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas In Progress
            </div>
          `}

          <button onclick="window.openCreateTaskModal('In Progress')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 3: EDITING & REVISI -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border-2 border-[#1e3e50]/40 min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#1e3e50]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Editing &amp; Revisi</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-[#1e3e50] text-white text-[11px] font-bold">${colEditing.length}</span>
          </div>

          ${colEditing.length > 0 ? colEditing.map(task => renderKanbanCard(task, allSubtasks, brands, users, true)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas Editing &amp; Revisi
            </div>
          `}

          <button onclick="window.openCreateTaskModal('Editing')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 4: REVIEW -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#6e508a]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Review</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colReview.length}</span>
          </div>

          ${colReview.length > 0 ? colReview.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas Review
            </div>
          `}

          <button onclick="window.openCreateTaskModal('Review')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 5: COMPLETED -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#21835e]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Completed</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colCompleted.length}</span>
          </div>

          ${colCompleted.length > 0 ? colCompleted.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas Completed
            </div>
          `}

          <button onclick="window.openCreateTaskModal('Completed')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

      </div>

      <!-- ================================================================= -->
      <!-- VIEW 2: TABEL DETAIL (Alternative View)                           -->
      <!-- ================================================================= -->
      <div id="view-table-detail" class="bg-white rounded-2xl border border-[#d2e2ec] shadow-sm overflow-hidden ${taskViewMode === 'table' ? '' : 'hidden'}">
        <div class="p-4 border-b border-[#eaf2f7] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[#1e3e50]">Daftar Seluruh Pekerjaan Studio</h3>
          <span class="text-xs text-[#5c7786] font-medium">${filteredTasks.length} Tugas Ditemukan</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-[#143242]">
            <thead class="bg-[#f0f6fa] border-b border-[#d2e2ec] font-bold uppercase text-[10.5px] text-[#5c7786]">
              <tr>
                <th class="p-3.5">ID &amp; Judul Tugas</th>
                <th class="p-3.5">Brand Mitra</th>
                <th class="p-3.5">Penanggung Jawab</th>
                <th class="p-3.5">Prioritas</th>
                <th class="p-3.5">Progres</th>
                <th class="p-3.5">Deadline</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#edf3f7]">
              ${filteredTasks.length > 0 ? filteredTasks.map(t => {
                const authorUser = users.find(u => u.user_id === t.assigned_user || u.name === t.assigned_user);
                const brandItem = brands.find(b => b.brand_id === t.brand_id);
                return `
                  <tr class="hover:bg-[#f8fbfe] transition">
                    <td class="p-3.5 font-bold">
                      <span class="font-mono text-[10px] text-[#2c6673] bg-[#eaf2f7] px-1.5 py-0.5 rounded mr-1.5">#${t.task_id}</span>
                      <span>${t.task_title}</span>
                    </td>
                    <td class="p-3.5 text-[#5c7786]">${t.brand_name || brandItem?.brand_name || 'Self-Project'}</td>
                    <td class="p-3.5 font-medium">${authorUser?.name || t.assigned_user || 'Rian Pratama'}</td>
                    <td class="p-3.5">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${t.priority === 'Urgent' ? 'bg-[#fde8e8] text-[#c53030]' : t.priority === 'High' ? 'bg-[#fdf2e9] text-[#c05621]' : 'bg-[#eaf4fa] text-[#2c6673]'}">
                        ${t.priority || 'Normal'}
                      </span>
                    </td>
                    <td class="p-3.5">
                      <div class="flex items-center gap-2">
                        <div class="w-16 bg-[#e6eff5] rounded-full h-1.5 overflow-hidden">
                          <div class="bg-[#2c6673] h-full" style="width: ${t.progress || 0}%;"></div>
                        </div>
                        <span class="text-[11px] font-semibold text-[#1e3e50]">${t.progress || 0}%</span>
                      </div>
                    </td>
                    <td class="p-3.5 text-[#5c7786]">${t.deadline || 'Hari ini'}</td>
                    <td class="p-3.5">
                      <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-[#edf4f8] text-[#1e3e50]">${t.status || 'To Do'}</span>
                    </td>
                    <td class="p-3.5 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button onclick="window.openEditTaskModal('${t.task_id}')" class="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition" title="Edit Tugas">
                          <span class="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button onclick="window.confirmDeleteTask('${t.task_id}')" class="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition" title="Hapus Tugas">
                          <span class="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="8" class="p-8 text-center text-xs text-slate-400">
                    Belum ada tugas pekerjaan yang tersimpan. Klik <strong>+ Buat Tugas</strong> untuk menambahkan pekerjaan baru.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- MODAL: BUAT / EDIT TUGAS (POPUP)                                  -->
      <!-- ================================================================= -->
      <div id="modal-task-manage" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-[#d2e2ec] shadow-2xl space-y-5 my-8">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-[#e3f4f8] text-[#1b6274] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[20px]">assignment</span>
              </div>
              <h3 id="modal-task-title-text" class="text-sm font-extrabold text-[#143242]">Buat Tugas Baru</h3>
            </div>
            <button onclick="document.getElementById('modal-task-manage').classList.add('hidden')" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <form id="form-task-manage" class="space-y-4 text-xs">
            <input type="hidden" id="task-form-id" value="">

            <div>
              <label class="block font-bold text-slate-700 mb-1">Judul Tugas Pekerjaan <span class="text-rose-500">*</span></label>
              <input type="text" id="task-form-title" required placeholder="Contoh: Shooting Video Unboxing Review" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Brand / Klien</label>
                <select id="task-form-brand" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  <option value="">Self-Project</option>
                  ${brands.map(b => `<option value="${b.brand_name}">${b.brand_name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Penanggung Jawab (PIC)</label>
                <select id="task-form-pic" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  ${users.map(u => `<option value="${u.name}">${u.name} (${u.role})</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Prioritas</label>
                <select id="task-form-priority" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Status Kolom</label>
                <select id="task-form-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Editing">Editing &amp; Revisi</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Deadline</label>
                <input type="text" id="task-form-deadline" placeholder="Besok / 20 Nov" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium">
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Catatan / Deskripsi Singkat</label>
              <textarea id="task-form-desc" rows="2" placeholder="Catatan detail pekerjaan..." class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium"></textarea>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button type="button" id="btn-task-delete-in-modal" class="hidden px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition">
                Hapus Tugas Ini
              </button>
              <div class="flex items-center gap-2 ml-auto">
                <button type="button" onclick="document.getElementById('modal-task-manage').classList.add('hidden')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition">
                  Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs shadow-xs transition">
                  Simpan Tugas
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;

  setupTaskListeners(container);
}

function renderKanbanCard(task, allSubtasks, brands, users, isSpotlight = false) {
  const brandName = task.brand_name || (brands.find(b => b.brand_id === task.brand_id)?.brand_name) || "Self-Project";
  const authorUser = users.find(u => u.user_id === task.assigned_user || u.name === task.assigned_user) || {
    name: task.assigned_user || "Rian Pratama",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
  };

  const priorityClass = task.priority === "Urgent" ? "bg-[#fde8e8] text-[#c53030]" :
    task.priority === "High" ? "bg-[#fdf2e9] text-[#c05621]" :
    task.priority === "Low" ? "bg-slate-100 text-slate-600" :
    "bg-[#eaf4fa] text-[#2c6673]";

  const subtasks = allSubtasks.filter(s => s.task_id === task.task_id);
  const subDone = subtasks.filter(s => s.status === "Completed" || s.is_done).length;
  const subTotal = subtasks.length;
  const progress = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : (task.progress || 0);

  return `
    <div class="cursor-pointer group p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 border ${isSpotlight ? 'border-l-4 border-l-[#1e3e50] border-y border-r border-[#cbdfe9] shadow-md' : 'border-[#d4e4ee]'}" onclick="window.openEditTaskModal('${task.task_id}')">
      <div class="flex items-center justify-between">
        <span class="font-mono text-[11px] font-semibold ${isSpotlight ? 'text-white bg-[#1e3e50] font-bold' : 'text-[#1e3e50] bg-[#eaf2f7]'} px-2 py-0.5 rounded-md border border-[#cde0ec]">#${task.task_id}</span>
        
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-full ${priorityClass} font-semibold text-[10px]">${task.priority || 'Normal'}</span>
          <button type="button" onclick="event.stopPropagation(); window.confirmDeleteTask('${task.task_id}')" class="p-1 rounded-md text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition" title="Hapus Tugas Ini">
            <span class="material-symbols-outlined text-[15px]">delete</span>
          </button>
        </div>
      </div>

      <h3 class="font-bold text-sm text-[#1e3e50] group-hover:text-[#2c6673] transition-colors line-clamp-2 leading-snug">
        ${task.task_title || task.title}
      </h3>

      <div class="flex items-center gap-1.5 text-xs text-[#5f8296]">
        <span class="material-symbols-outlined text-[14px]">loyalty</span>
        <span class="truncate ${isSpotlight ? 'font-medium text-[#1e3e50]' : ''}">${brandName}</span>
      </div>

      <div class="flex flex-col gap-1 mt-0.5">
        <div class="flex items-center justify-between text-[11px]">
          <span class="text-[#64889c]">Subtask Progress</span>
          <span class="font-bold text-[#1e3e50]">${subTotal > 0 ? `${subDone}/${subTotal} (${progress}%)` : `${progress}%`}</span>
        </div>
        <div class="w-full bg-[#e6eff5] rounded-full h-1.5 overflow-hidden">
          <div class="bg-[#2c6673] h-full rounded-full" style="width: ${progress}%;"></div>
        </div>
      </div>

      <div class="flex items-center justify-between text-[#5f8296] pt-1.5 border-t border-[#edf4f8]">
        <div class="flex items-center gap-1.5">
          <img class="w-5 h-5 rounded-full object-cover ring-1 ring-[#c0d8e6]" src="${authorUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}">
          <span class="text-[11px] font-medium text-[#1e3e50]">${authorUser.name || 'Studio Member'}</span>
        </div>
        <span class="text-[11px] flex items-center gap-1 ${task.priority === 'Urgent' ? 'text-[#c53030] font-semibold' : 'text-[#698d9f]'}">
          <span class="material-symbols-outlined text-[13px]">schedule</span>
          <span>${task.deadline || 'Hari ini'}</span>
        </span>
      </div>

      <!-- Quick Move Status -->
      <div class="pt-2 border-t border-[#edf4f8] flex items-center justify-between" onclick="event.stopPropagation()">
        <span class="text-[10px] text-slate-400 font-semibold">Pindah Kolom:</span>
        <select onchange="window.changeTaskStatus('${task.task_id}', this.value)" class="text-[10.5px] bg-[#f0f6fa] border border-[#cbdfe9] rounded-lg px-2 py-0.5 font-bold text-[#1e3e50] outline-none">
          <option value="To Do" ${(!task.status || task.status === 'To Do' || task.status === 'Idea' || task.status === 'Planned') ? 'selected' : ''}>To Do</option>
          <option value="In Progress" ${(task.status === 'In Progress' || task.status === 'Shooting') ? 'selected' : ''}>In Progress</option>
          <option value="Editing" ${(task.status === 'Editing' || task.status === 'Revision') ? 'selected' : ''}>Editing & Revisi</option>
          <option value="Review" ${task.status === 'Review' ? 'selected' : ''}>Review</option>
          <option value="Completed" ${(task.status === 'Completed' || task.status === 'Published') ? 'selected' : ''}>Completed</option>
        </select>
      </div>
    </div>
  `;
}

function setupTaskListeners(container) {
  document.getElementById("tab-btn-kanban")?.addEventListener("click", () => {
    taskViewMode = "kanban";
    renderTasks(container);
  });
  document.getElementById("tab-btn-table")?.addEventListener("click", () => {
    taskViewMode = "table";
    renderTasks(container);
  });
  document.getElementById("tab-btn-daily")?.addEventListener("click", () => {
    window.location.hash = "#timetracking";
  });

  document.getElementById("filter-task-brand")?.addEventListener("change", (e) => {
    selectedBrandFilter = e.target.value;
    renderTasks(container);
  });

  document.getElementById("btn-open-create-task")?.addEventListener("click", () => {
    window.openCreateTaskModal();
  });

  // Modal Form Submit
  document.getElementById("form-task-manage")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskId = document.getElementById("task-form-id")?.value;
    const title = document.getElementById("task-form-title")?.value?.trim();
    const brandName = document.getElementById("task-form-brand")?.value;
    const assignedUser = document.getElementById("task-form-pic")?.value;
    const priority = document.getElementById("task-form-priority")?.value;
    const status = document.getElementById("task-form-status")?.value;
    const deadline = document.getElementById("task-form-deadline")?.value?.trim();
    const description = document.getElementById("task-form-desc")?.value?.trim();

    if (!title) return;

    if (taskId) {
      // Edit existing
      store.updateItem(SHEET_NAMES.CONTENT_TASKS, taskId, {
        task_title: title,
        brand_name: brandName,
        assigned_user: assignedUser,
        priority: priority,
        status: status,
        deadline: deadline || "Hari ini",
        description: description
      });
      if (window.showToast) window.showToast("✅ Tugas berhasil diperbarui!", "success");
    } else {
      // Create new
      store.createItem(SHEET_NAMES.CONTENT_TASKS, {
        task_title: title,
        brand_name: brandName,
        assigned_user: assignedUser,
        priority: priority,
        status: status,
        deadline: deadline || "Hari ini",
        description: description,
        progress: status === "Completed" ? 100 : 0
      });
      if (window.showToast) window.showToast("✅ Tugas baru berhasil ditambahkan!", "success");
    }

    document.getElementById("modal-task-manage")?.classList.add("hidden");
    renderTasks(container);
  });

  // Delete in Modal Button
  document.getElementById("btn-task-delete-in-modal")?.addEventListener("click", () => {
    const taskId = document.getElementById("task-form-id")?.value;
    if (taskId) {
      window.confirmDeleteTask(taskId);
      document.getElementById("modal-task-manage")?.classList.add("hidden");
    }
  });

  // Global window functions
  window.openCreateTaskModal = (initialStatus = "To Do") => {
    document.getElementById("task-form-id").value = "";
    document.getElementById("task-form-title").value = "";
    document.getElementById("task-form-status").value = initialStatus;
    document.getElementById("task-form-priority").value = "Normal";
    document.getElementById("task-form-deadline").value = "";
    document.getElementById("task-form-desc").value = "";
    document.getElementById("modal-task-title-text").textContent = "Buat Tugas Baru";
    document.getElementById("btn-task-delete-in-modal")?.classList.add("hidden");
    document.getElementById("modal-task-manage")?.classList.remove("hidden");
  };

  window.openEditTaskModal = (taskId) => {
    const allTasks = store.getItems(SHEET_NAMES.CONTENT_TASKS) || [];
    const task = allTasks.find(t => t.task_id === taskId);
    if (!task) return;

    document.getElementById("task-form-id").value = task.task_id;
    document.getElementById("task-form-title").value = task.task_title || task.title || "";
    document.getElementById("task-form-brand").value = task.brand_name || "";
    document.getElementById("task-form-pic").value = task.assigned_user || "";
    document.getElementById("task-form-status").value = task.status || "To Do";
    document.getElementById("task-form-priority").value = task.priority || "Normal";
    document.getElementById("task-form-deadline").value = task.deadline || "";
    document.getElementById("task-form-desc").value = task.description || "";
    document.getElementById("modal-task-title-text").textContent = `Edit Tugas #${task.task_id}`;
    if (auth.isAdminOrOwner()) {
      document.getElementById("btn-task-delete-in-modal")?.classList.remove("hidden");
    } else {
      document.getElementById("btn-task-delete-in-modal")?.classList.add("hidden");
    }
    document.getElementById("modal-task-manage")?.classList.remove("hidden");
  };

  window.confirmDeleteTask = (taskId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus tugas.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus tugas.");
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus tugas #${taskId}? Tindakan ini akan menghapusnya dari papan kerja dan database.`)) {
      store.deleteItem(SHEET_NAMES.CONTENT_TASKS, taskId);
      if (window.showToast) window.showToast(`🗑️ Tugas #${taskId} berhasil dihapus.`, "info");
      renderTasks(container);
    }
  };

  window.changeTaskStatus = (taskId, newStatus) => {
    const progress = newStatus === "Completed" ? 100 : newStatus === "Review" ? 80 : newStatus === "Editing" ? 60 : newStatus === "In Progress" ? 40 : 0;
    store.updateItem(SHEET_NAMES.CONTENT_TASKS, taskId, {
      status: newStatus,
      progress: progress
    });
    if (window.showToast) window.showToast(`Tugas #${taskId} dipindahkan ke ${newStatus}`, "info");
    renderTasks(container);
  };

  window.confirmClearAllTasks = () => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk mengosongkan tugas.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk mengosongkan tugas.");
      return;
    }
    if (confirm("⚠️ PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SEMUA TUGAS pekerjaan?\n\nPapan tugas akan dikosongkan secara bersih sehingga Anda dapat mulai menginput pekerjaan asli studio Anda.")) {
      store.clearAllTasks();
      if (window.showToast) window.showToast("🧹 Seluruh data tugas pekerjaan berhasil dikosongkan!", "success");
      renderTasks(container);
    }
  };
}

return { renderTasks: renderTasks };
})();

// ==================== VIEW: js\views\production.js ====================
const { renderProduction } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: PRODUCTION & STUDIO
 * Modul 05 (Content Production), Modul 06 (Script & Copywriting), Modul 07 (Editing & Revision)
 * File: js/views/production.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
let activeProductionTab = "scripts"; // 'scripts', 'production', 'editing'
let productionSearch = "";
function renderProduction(container) {
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
  const scripts = store.getItems(SHEET_NAMES.CONTENT_SCRIPTS);
  const productions = store.getItems(SHEET_NAMES.CONTENT_PRODUCTION);
  const revisions = store.getItems(SHEET_NAMES.CONTENT_REVISIONS);

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 05 • 06 • 07</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Studio & Produksi</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Studio, Naskah & Editing</h1>
          <p class="text-xs text-slate-500 mt-0.5">Penulisan naskah hook 3 detik, log shooting peralatan, dan alur persetujuan revisi video.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-create-production-item" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span id="btn-create-item-label">+ Tulis Naskah Baru</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button id="tab-scripts" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeProductionTab === 'scripts' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>📝</span> <span>Naskah & Copywriting (${scripts.length})</span>
        </button>
        <button id="tab-production" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeProductionTab === 'production' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>🎬</span> <span>Shooting & Perlengkapan (${productions.length})</span>
        </button>
        <button id="tab-editing" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeProductionTab === 'editing' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>✂️</span> <span>Editing & Revisi (${revisions.length})</span>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="production-tab-content">
        ${activeProductionTab === "scripts" ? renderScriptsTab(scripts) :
          activeProductionTab === "production" ? renderProductionTab(productions) :
          renderEditingTab(revisions)}
      </div>
    </div>
  `;

  setupProductionListeners(container, contents);
}

function renderScriptsTab(scripts) {
  if (scripts.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">📝</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada naskah tersimpan</div>
        <div class="text-xs text-slate-500 mt-1">Buat naskah video baru dengan formula hook, scene body, dan caption.</div>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      ${scripts.map(s => {
        const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, s.content_id) || {};
        const statusCfg = SCRIPT_STATUSES.find(st => st.key === s.status) || SCRIPT_STATUSES[0];

        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition">
            <!-- Header -->
            <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${s.platform || 'General'}</span>
                  <span class="text-[10px] font-semibold text-slate-400">${s.version || 'v1.0'}</span>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded ${statusCfg.color}">${s.status}</span>
                </div>
                <h3 class="font-extrabold text-sm text-slate-900 mt-1.5">${s.script_title}</h3>
                <div class="text-[11px] text-slate-500 mt-0.5 truncate">Terkait: ${cnt.content_title || '-'}</div>
              </div>
            </div>

            <!-- Hook Formula Box -->
            <div class="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
              <div class="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider mb-1">⚡ Hook (3 Detik Pertama)</div>
              <p class="text-xs text-amber-900 font-semibold italic">"${s.hook}"</p>
            </div>

            <!-- Script Breakdown -->
            <div class="space-y-1">
              <div class="text-[10px] font-bold text-slate-400 uppercase">Isi Naskah (Scene by Scene)</div>
              <div class="bg-slate-50 p-3 rounded-xl text-xs text-slate-800 whitespace-pre-line font-mono leading-relaxed max-h-48 overflow-y-auto border border-slate-100">
                ${s.script_body || 'Belum ada breakdown naskah.'}
              </div>
            </div>

            <!-- Caption & Hashtags -->
            <div class="space-y-1">
              <div class="text-[10px] font-bold text-slate-400 uppercase">Draft Caption & Tagar</div>
              <p class="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">${s.caption || '-'}</p>
              <div class="text-[11px] text-blue-600 font-medium">${s.hashtags || ''}</div>
            </div>

            <!-- CTA -->
            ${s.cta ? `
              <div class="text-[11px] text-slate-600 bg-emerald-50 text-emerald-900 p-2 rounded-lg border border-emerald-100 flex items-center gap-1.5 font-medium">
                <span>🎯 CTA:</span> <span>${s.cta}</span>
              </div>
            ` : ''}

            <!-- Bottom Actions -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.copyScriptToClipboard('${s.script_id}')">
                📋 Salin Naskah & Caption
              </button>

              <div class="space-x-2">
                <button class="text-xs font-bold text-slate-600 hover:text-slate-900" onclick="window.openEditScriptModal('${s.script_id}')">
                  Edit
                </button>
                ${auth.isAdminOrOwner() ? `
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteScript('${s.script_id}')">
                    Hapus
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderProductionTab(productions) {
  if (productions.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">🎬</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada catatan shooting produksi</div>
        <div class="text-xs text-slate-500 mt-1">Catat lokasi shooting, tim yang bertugas, peralatan kamera, dan link Google Drive footage mentah.</div>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      ${productions.map(p => {
        const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, p.content_id) || {};
        const statusCfg = PRODUCTION_STATUSES.find(st => st.key === p.production_status) || PRODUCTION_STATUSES[0];

        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition">
            <div class="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span class="text-[10px] font-bold px-2.5 py-0.5 rounded ${statusCfg.color}">
                  ${p.production_status}
                </span>
                <h3 class="font-extrabold text-sm text-slate-900 mt-1.5">${cnt.content_title || 'Sesi Produksi'}</h3>
                <div class="text-xs text-slate-500 mt-0.5">📅 Tanggal Shooting: <strong>${p.production_date}</strong></div>
              </div>
            </div>

            <!-- Details -->
            <div class="space-y-2 text-xs text-slate-700">
              <div class="flex items-start gap-2">
                <span class="text-slate-400 w-24 shrink-0 font-medium">📍 Lokasi:</span>
                <span class="font-semibold text-slate-800">${p.production_location || '-'}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-slate-400 w-24 shrink-0 font-medium">👥 Tim Crew:</span>
                <span>${p.production_team || '-'}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-slate-400 w-24 shrink-0 font-medium">🎥 Perlengkapan:</span>
                <span>${p.equipment || '-'}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-slate-400 w-24 shrink-0 font-medium">📝 Catatan Take:</span>
                <span class="italic text-slate-600">${p.shooting_notes || '-'}</span>
              </div>
            </div>

            <!-- Footage Link -->
            ${p.raw_footage_link ? `
              <div class="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between text-xs">
                <span class="font-bold text-blue-900 flex items-center gap-1.5">
                  <span>📁</span> <span>Google Drive Raw Footage</span>
                </span>
                <a href="${p.raw_footage_link}" target="_blank" class="text-xs font-bold text-blue-600 hover:text-blue-800">
                  Buka Folder →
                </a>
              </div>
            ` : ''}

            <!-- Footer -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditProductionModal('${p.production_id}')">
                Edit Sesi
              </button>
              ${auth.isAdminOrOwner() ? `
                <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteProduction('${p.production_id}')">
                  Hapus
                </button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderEditingTab(revisions) {
  if (revisions.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">✂️</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada riwayat revisi & editing</div>
        <div class="text-xs text-slate-500 mt-1">Catat feedback revisi dari brand manager atau lead editor dan setujui video final.</div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Konten & Versi</th>
              <th class="py-3.5 px-4">Editor</th>
              <th class="py-3.5 px-4">Tanggal Revisi</th>
              <th class="py-3.5 px-4">Catatan Perbaikan (Feedback)</th>
              <th class="py-3.5 px-4">Status Review</th>
              <th class="py-3.5 px-4">Persetujuan</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${revisions.map(rev => {
              const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, rev.content_id) || {};
              const isApproved = rev.approval_status === "Approved" || rev.approval_status === "Final";

              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 max-w-xs">
                    <div class="font-bold text-slate-900 truncate">${cnt.content_title || 'Untitled'}</div>
                    <span class="font-mono text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-semibold">${rev.file_version || 'v1'}</span>
                  </td>
                  <td class="py-3 px-4 font-semibold text-slate-800">${rev.editor || '-'}</td>
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${rev.revision_date || '-'}</td>
                  <td class="py-3 px-4 max-w-sm text-slate-600 italic">"${rev.revision_notes || '-'}"</td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">${rev.review_status}</span>
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded ${isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
                      ${rev.approval_status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    ${!isApproved ? `
                      <button class="text-xs font-bold text-emerald-600 hover:text-emerald-800" onclick="window.approveRevision('${rev.revision_id}')">
                        ✓ Setujui
                      </button>
                    ` : ''}
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditRevisionModal('${rev.revision_id}')">
                      Edit
                    </button>
                    ${auth.isAdminOrOwner() ? `
                      <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteRevision('${rev.revision_id}')">
                        Hapus
                      </button>
                    ` : ''}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function setupProductionListeners(container, contents) {
  // Tabs
  document.getElementById("tab-scripts")?.addEventListener("click", () => {
    activeProductionTab = "scripts";
    renderProduction(container);
  });
  document.getElementById("tab-production")?.addEventListener("click", () => {
    activeProductionTab = "production";
    renderProduction(container);
  });
  document.getElementById("tab-editing")?.addEventListener("click", () => {
    activeProductionTab = "editing";
    renderProduction(container);
  });

  // Action Button
  const createBtn = document.getElementById("btn-create-production-item");
  const label = document.getElementById("btn-create-item-label");
  if (label) {
    label.innerText = activeProductionTab === "scripts" ? "+ Tulis Naskah Baru" :
                      activeProductionTab === "production" ? "+ Sesi Produksi Baru" :
                      "+ Catat Revisi Video";
  }

  createBtn?.addEventListener("click", () => {
    if (activeProductionTab === "scripts") {
      openScriptModal(null, contents);
    } else if (activeProductionTab === "production") {
      openProductionModal(null, contents);
    } else {
      openRevisionModal(null, contents);
    }
  });

  // Global functions
  window.copyScriptToClipboard = (scriptId) => {
    const s = store.getItemById(SHEET_NAMES.CONTENT_SCRIPTS, scriptId);
    if (!s) return;
    const text = `JUDUL: ${s.script_title}\n\nHOOK:\n${s.hook}\n\nNASKAH:\n${s.script_body}\n\nCAPTION:\n${s.caption}\n\nHASHTAGS:\n${s.hashtags}\n\nCTA:\n${s.cta}`;
    navigator.clipboard.writeText(text).then(() => {
      alert("✅ Seluruh naskah, hook, caption & tagar berhasil disalin ke clipboard!");
    });
  };

  window.openEditScriptModal = (scriptId) => {
    const s = store.getItemById(SHEET_NAMES.CONTENT_SCRIPTS, scriptId);
    if (s) openScriptModal(s, contents);
  };

  window.deleteScript = (scriptId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus skrip naskah.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus skrip naskah.");
      return;
    }
    if (confirm("Hapus naskah ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_SCRIPTS, scriptId);
      if (window.showToast) window.showToast("🗑️ Naskah berhasil dihapus.", "info");
      renderProduction(container);
    }
  };

  window.openEditProductionModal = (prodId) => {
    const p = store.getItemById(SHEET_NAMES.CONTENT_PRODUCTION, prodId);
    if (p) openProductionModal(p, contents);
  };

  window.deleteProduction = (prodId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus sesi produksi.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus sesi produksi.");
      return;
    }
    if (confirm("Hapus catatan sesi shooting ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_PRODUCTION, prodId);
      if (window.showToast) window.showToast("🗑️ Sesi shooting produksi berhasil dihapus.", "info");
      renderProduction(container);
    }
  };

  window.openEditRevisionModal = (revId) => {
    const r = store.getItemById(SHEET_NAMES.CONTENT_REVISIONS, revId);
    if (r) openRevisionModal(r, contents);
  };

  window.approveRevision = (revId) => {
    if (confirm("Setujui versi video ini sebagai Final Approved?")) {
      store.updateItem(SHEET_NAMES.CONTENT_REVISIONS, revId, {
        approval_status: "Approved",
        review_status: "Reviewed"
      });
      renderProduction(container);
    }
  };

  window.deleteRevision = (revId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan revisi.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan revisi.");
      return;
    }
    if (confirm("Hapus catatan revisi ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_REVISIONS, revId);
      if (window.showToast) window.showToast("🗑️ Catatan revisi berhasil dihapus.", "info");
      renderProduction(container);
    }
  };
}

function openScriptModal(script = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!script;
  const data = script || {
    content_id: contents[0]?.content_id || "",
    script_title: "",
    hook: "",
    script_body: "",
    caption: "",
    hashtags: "",
    cta: "",
    platform: "TikTok",
    version: "v1.0",
    status: "Draft",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Naskah Video' : 'Tulis Naskah & Copywriting Baru'}
            </h3>
            <p class="text-xs text-slate-500">Editor formula hook 3 detik, alur scene, dan draft caption</p>
          </div>
          <button id="modal-script-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="script-form" class="p-6 overflow-y-auto space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Judul Naskah <span class="text-rose-500">*</span></label>
            <input type="text" id="form-scp-title" required value="${data.script_title}" placeholder="Contoh: Script Review Serum UV Kamera Test" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Terkait Konten Planning</label>
              <select id="form-scp-content" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${contents.map(c => `<option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>[${c.platform}] ${c.content_title}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform</label>
              <select id="form-scp-platform" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-amber-800 mb-1">⚡ Formula Hook 3 Detik Pertama <span class="text-rose-500">*</span></label>
            <input type="text" id="form-scp-hook" required value="${data.hook || ''}" placeholder="Contoh: Stop pakai serum dengan cara ini kalau gak mau muka makin kusam!" class="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/50 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Breakdown Isi Naskah (Scene by Scene)</label>
            <textarea id="form-scp-body" rows="5" placeholder="[Scene 1 - Visual Hook]: ...\n[Scene 2 - Problem]: ...\n[Scene 3 - Solution]: ...\n[Scene 4 - Proof]: ..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 font-mono text-xs outline-none">${data.script_body || ''}</textarea>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Draft Caption</label>
            <textarea id="form-scp-caption" rows="2" placeholder="Tulis caption pelengkap postingan..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">${data.caption || ''}</textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tagar (Hashtags)</label>
              <input type="text" id="form-scp-hashtags" value="${data.hashtags || ''}" placeholder="#skincareroutine #serumviral" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Call to Action (CTA)</label>
              <input type="text" id="form-scp-cta" value="${data.cta || ''}" placeholder="Cek keranjang kuning sekarang!" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Versi Naskah</label>
              <input type="text" id="form-scp-version" value="${data.version || 'v1.0'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Naskah</label>
              <select id="form-scp-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${SCRIPT_STATUSES.map(s => `<option value="${s.key}" ${data.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-script-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Naskah</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-script-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                Simpan Naskah
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-script-close")?.addEventListener("click", close);
  document.getElementById("modal-script-cancel")?.addEventListener("click", close);

  document.getElementById("modal-script-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus naskah ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_SCRIPTS, script.script_id);
      if (window.showToast) window.showToast("🗑️ Naskah berhasil dihapus.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderProduction(mainContainer);
    }
  });

  document.getElementById("script-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      script_title: document.getElementById("form-scp-title").value.trim(),
      content_id: document.getElementById("form-scp-content").value,
      platform: document.getElementById("form-scp-platform").value,
      hook: document.getElementById("form-scp-hook").value.trim(),
      script_body: document.getElementById("form-scp-body").value.trim(),
      caption: document.getElementById("form-scp-caption").value.trim(),
      hashtags: document.getElementById("form-scp-hashtags").value.trim(),
      cta: document.getElementById("form-scp-cta").value.trim(),
      version: document.getElementById("form-scp-version").value.trim(),
      status: document.getElementById("form-scp-status").value
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_SCRIPTS, script.script_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_SCRIPTS, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderProduction(mainContainer);
  });
}

function openProductionModal(prod = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!prod;
  const data = prod || {
    content_id: contents[0]?.content_id || "",
    production_date: new Date().toISOString().slice(0, 10),
    production_location: "Home Studio",
    production_team: "Lead Creator & Editor",
    equipment: "Sony A7C II, Mic Wireless DJI, Godox Light",
    shooting_notes: "",
    raw_footage_link: "",
    production_status: "Preparation"
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Catatan Produksi' : 'Sesi Produksi & Shooting Baru'}
            </h3>
            <p class="text-xs text-slate-500">Catat lokasi, kru, peralatan, dan folder berkas rekaman</p>
          </div>
          <button id="modal-prod-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="production-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Pilih Konten <span class="text-rose-500">*</span></label>
            <select id="form-prd-content" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
              ${contents.map(c => `<option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>[${c.platform}] ${c.content_title}</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Shooting</label>
              <input type="date" id="form-prd-date" value="${data.production_date || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Lokasi Sesi</label>
              <input type="text" id="form-prd-loc" value="${data.production_location || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Tim / Kru Produksi</label>
            <input type="text" id="form-prd-team" value="${data.production_team || ''}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Peralatan (Kamera, Lighting, Mic)</label>
            <input type="text" id="form-prd-equip" value="${data.equipment || ''}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Tautan Google Drive (Raw Footage)</label>
            <input type="url" id="form-prd-link" value="${data.raw_footage_link || ''}" placeholder="https://drive.google.com/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Produksi</label>
              <select id="form-prd-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${PRODUCTION_STATUSES.map(s => `<option value="${s.key}" ${data.production_status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Catatan Take</label>
              <input type="text" id="form-prd-notes" value="${data.shooting_notes || ''}" placeholder="Misal: Ambil B-roll 60fps" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-prod-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Sesi</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-prod-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                Simpan Sesi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-prod-close")?.addEventListener("click", close);
  document.getElementById("modal-prod-cancel")?.addEventListener("click", close);

  document.getElementById("modal-prod-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus catatan sesi shooting ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_PRODUCTION, prod.production_id);
      if (window.showToast) window.showToast("🗑️ Sesi shooting produksi berhasil dihapus.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderProduction(mainContainer);
    }
  });

  document.getElementById("production-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      content_id: document.getElementById("form-prd-content").value,
      production_date: document.getElementById("form-prd-date").value,
      production_location: document.getElementById("form-prd-loc").value.trim(),
      production_team: document.getElementById("form-prd-team").value.trim(),
      equipment: document.getElementById("form-prd-equip").value.trim(),
      raw_footage_link: document.getElementById("form-prd-link").value.trim(),
      production_status: document.getElementById("form-prd-status").value,
      shooting_notes: document.getElementById("form-prd-notes").value.trim()
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_PRODUCTION, prod.production_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_PRODUCTION, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderProduction(mainContainer);
  });
}

function openRevisionModal(rev = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!rev;
  const data = rev || {
    content_id: contents[0]?.content_id || "",
    editor: "Rian Hidayat",
    revision_date: new Date().toISOString().slice(0, 10),
    revision_notes: "",
    file_version: "v1_draft",
    review_status: "In Review",
    approval_status: "Revision"
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Catatan Revisi' : 'Catat Revisi / Review Video'}
            </h3>
            <p class="text-xs text-slate-500">Dokumentasikan feedback perubahan dan persetujuan final</p>
          </div>
          <button id="modal-rev-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="revision-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Konten Video <span class="text-rose-500">*</span></label>
            <select id="form-rev-content" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
              ${contents.map(c => `<option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>[${c.platform}] ${c.content_title}</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Editor Ditugaskan</label>
              <input type="text" id="form-rev-editor" value="${data.editor || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Versi File</label>
              <input type="text" id="form-rev-version" value="${data.file_version || 'v1_draft'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Revisi / Feedback Perbaikan <span class="text-rose-500">*</span></label>
            <textarea id="form-rev-notes" required rows="3" placeholder="Contoh: Perjelas subtitle pada detik 00:04, potong jeda nafas di scene 2..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">${data.revision_notes || ''}</textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Review</label>
              <select id="form-rev-review-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="In Review" ${data.review_status === 'In Review' ? 'selected' : ''}>In Review</option>
                <option value="Reviewed" ${data.review_status === 'Reviewed' ? 'selected' : ''}>Reviewed</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Persetujuan</label>
              <select id="form-rev-approval" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Revision" ${data.approval_status === 'Revision' ? 'selected' : ''}>Perlu Revisi</option>
                <option value="Approved" ${data.approval_status === 'Approved' ? 'selected' : ''}>Approved (Disetujui)</option>
                <option value="Final" ${data.approval_status === 'Final' ? 'selected' : ''}>Final (Siap Publish)</option>
              </select>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-rev-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Revisi</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-rev-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                Simpan Revisi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-rev-close")?.addEventListener("click", close);
  document.getElementById("modal-rev-cancel")?.addEventListener("click", close);

  document.getElementById("modal-rev-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus catatan revisi ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_REVISIONS, rev.revision_id);
      if (window.showToast) window.showToast("🗑️ Catatan revisi berhasil dihapus.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderProduction(mainContainer);
    }
  });

  document.getElementById("revision-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      content_id: document.getElementById("form-rev-content").value,
      editor: document.getElementById("form-rev-editor").value.trim(),
      file_version: document.getElementById("form-rev-version").value.trim(),
      revision_notes: document.getElementById("form-rev-notes").value.trim(),
      review_status: document.getElementById("form-rev-review-status").value,
      approval_status: document.getElementById("form-rev-approval").value,
      revision_date: new Date().toISOString().slice(0, 10)
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_REVISIONS, rev.revision_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_REVISIONS, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderProduction(mainContainer);
  });
}

return { renderProduction: renderProduction };
})();

// ==================== VIEW: js\views\media.js ====================
const { renderMedia } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: MEDIA & REFERENCES
 * Modul 08 (Media Library) & Modul 18 (Research & References)
 * File: js/views/media.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
let activeMediaTab = "library"; // 'library' or 'references'
let mediaSearch = "";
let selectedMediaCategory = "ALL";
function renderMedia(container) {
  const mediaItems = store.getItems(SHEET_NAMES.MEDIA_LIBRARY);
  const references = store.getItems(SHEET_NAMES.REFERENCES);
  const brands = store.getItems(SHEET_NAMES.BRANDS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);

  // Filter Media
  const filteredMedia = mediaItems.filter(m => {
    const matchSearch = mediaSearch === "" ||
      (m.file_name || "").toLowerCase().includes(mediaSearch.toLowerCase()) ||
      (m.notes || "").toLowerCase().includes(mediaSearch.toLowerCase());
    const matchCat = selectedMediaCategory === "ALL" || m.category === selectedMediaCategory;
    return matchSearch && matchCat;
  });

  // Filter References
  const filteredRefs = references.filter(r => {
    return mediaSearch === "" ||
      (r.reference_title || "").toLowerCase().includes(mediaSearch.toLowerCase()) ||
      (r.content_idea || "").toLowerCase().includes(mediaSearch.toLowerCase()) ||
      (r.notes || "").toLowerCase().includes(mediaSearch.toLowerCase());
  });

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 08 • 18</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Media & Riset</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Media Library & Inspirasi Riset</h1>
          <p class="text-xs text-slate-500 mt-0.5">Penyimpanan aset media digital Google Drive dan bank referensi ide konten viral.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-upload-media" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span id="btn-media-action-label">+ Upload Media Baru</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button id="tab-media-library" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeMediaTab === 'library' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>📁</span> <span>Media Library (${mediaItems.length})</span>
        </button>
        <button id="tab-media-references" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeMediaTab === 'references' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>💡</span> <span>Riset & Inspirasi (${references.length})</span>
        </button>
      </div>

      <!-- Search & Filters Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div class="flex-1 min-w-[240px] relative">
          <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" id="media-search-input" value="${mediaSearch}" placeholder="Cari nama berkas, tagar, catatan referensi..." class="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
        </div>

        ${activeMediaTab === "library" ? `
          <select id="media-filter-category" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${selectedMediaCategory === 'ALL' ? 'selected' : ''}>Semua Kategori Media</option>
            <option value="Raw Footage" ${selectedMediaCategory === 'Raw Footage' ? 'selected' : ''}>Raw Footage</option>
            <option value="Brand Asset" ${selectedMediaCategory === 'Brand Asset' ? 'selected' : ''}>Brand Asset / Guidelines</option>
            <option value="Music & SFX" ${selectedMediaCategory === 'Music & SFX' ? 'selected' : ''}>Music & SFX</option>
            <option value="Final Video" ${selectedMediaCategory === 'Final Video' ? 'selected' : ''}>Final Video</option>
            <option value="General" ${selectedMediaCategory === 'General' ? 'selected' : ''}>General</option>
          </select>
        ` : ''}
      </div>

      <!-- Tab Content Area -->
      <div id="media-tab-content">
        ${activeMediaTab === "library" ? renderMediaGrid(filteredMedia) : renderReferencesGrid(filteredRefs)}
      </div>
    </div>
  `;

  setupMediaListeners(container, brands, contents);
}

function renderMediaGrid(items) {
  if (items.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">📁</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada berkas media tersimpan</div>
        <div class="text-xs text-slate-500 mt-1">Upload foto produk, rekaman video, atau tautkan folder Google Drive Anda.</div>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${items.map(m => {
        const brandName = store.getBrandName(m.brand_id);
        const isImage = (m.file_type || '').match(/(JPG|JPEG|PNG|WEBP|GIF)/i);

        return `
          <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden hover:border-blue-400 hover:shadow-xs transition flex flex-col justify-between group">
            <!-- Thumbnail / Preview Area -->
            <div class="h-36 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              ${(isImage && m.file_url) ? `
                <img src="${m.file_url}" alt="${m.file_name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              ` : `
                <div class="flex flex-col items-center justify-center text-slate-400">
                  <span class="text-3xl mb-1">${getFileIcon(m.file_type)}</span>
                  <span class="text-[10px] font-mono font-bold uppercase">${m.file_type || 'FILE'}</span>
                </div>
              `}

              <!-- Category Badge -->
              <span class="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                ${m.category || 'Asset'}
              </span>
            </div>

            <!-- Details -->
            <div class="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-bold text-xs text-slate-900 line-clamp-1 truncate" title="${m.file_name}">${m.file_name}</h4>
                <div class="text-[10px] text-slate-400 flex items-center justify-between mt-1">
                  <span>🏢 ${brandName}</span>
                  <span>📅 ${m.upload_date || '-'}</span>
                </div>
                ${m.notes ? `<p class="text-[11px] text-slate-500 mt-1 line-clamp-2 italic">"${m.notes}"</p>` : ''}
              </div>

              <!-- Action Links -->
              <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                ${m.file_url ? `
                  <a href="${m.file_url}" target="_blank" class="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <span>Lihat / Buka</span> ↗
                  </a>
                ` : `<span class="text-slate-400 text-[10px]">Tersimpan Lokal</span>`}

                <div class="flex items-center gap-2">
                  <button class="font-bold text-blue-600 hover:text-blue-800 text-xs" onclick="window.openEditMediaModal('${m.media_id}')">
                    Edit
                  </button>
                  ${auth.isAdminOrOwner() ? `
                    <button class="font-bold text-slate-400 hover:text-rose-600 text-xs" onclick="window.deleteMediaItem('${m.media_id}')">
                      Hapus
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderReferencesGrid(refs) {
  if (refs.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">💡</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada catatan riset & inspirasi</div>
        <div class="text-xs text-slate-500 mt-1">Simpan referensi video viral, teknik hook, atau angle konten kompetitor.</div>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${refs.map(r => {
        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${r.platform || 'General'}</span>
                <span class="text-[10px] font-semibold text-slate-400">${r.category || 'Hook Idea'}</span>
              </div>

              ${r.screenshot_link ? `
                <div class="h-32 rounded-xl overflow-hidden bg-slate-100">
                  <img src="${r.screenshot_link}" alt="${r.reference_title}" class="w-full h-full object-cover">
                </div>
              ` : ''}

              <div>
                <h3 class="font-extrabold text-sm text-slate-900">${r.reference_title}</h3>
                ${r.content_idea ? `<p class="text-xs text-slate-600 mt-1">${r.content_idea}</p>` : ''}
              </div>

              ${r.notes ? `
                <div class="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 italic">
                  💡 Catatan: "${r.notes}"
                </div>
              ` : ''}
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              ${r.reference_url ? `
                <a href="${r.reference_url}" target="_blank" class="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <span>Buka Link Referensi</span> ↗
                </a>
              ` : '<span></span>'}

              <div class="space-x-2">
                <button class="text-xs font-bold text-emerald-600 hover:text-emerald-800" onclick="window.convertRefToIdea('${r.reference_id}')" title="Buat ide konten dari referensi ini">
                  ⚡ Jadi Ide
                </button>
                <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditReferenceModal('${r.reference_id}')">
                  Edit
                </button>
                ${auth.isAdminOrOwner() ? `
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteReference('${r.reference_id}')">
                    Hapus
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getFileIcon(ext = "") {
  ext = ext.toUpperCase();
  if (["JPG", "JPEG", "PNG", "WEBP"].includes(ext)) return "🖼️";
  if (["MP4", "MOV", "AVI", "MKV"].includes(ext)) return "🎥";
  if (["MP3", "WAV", "AAC"].includes(ext)) return "🎵";
  if (["PDF", "DOC", "DOCX"].includes(ext)) return "📄";
  return "📦";
}

function setupMediaListeners(container, brands, contents) {
  // Tabs
  document.getElementById("tab-media-library")?.addEventListener("click", () => {
    activeMediaTab = "library";
    renderMedia(container);
  });
  document.getElementById("tab-media-references")?.addEventListener("click", () => {
    activeMediaTab = "references";
    renderMedia(container);
  });

  // Action button label
  const btn = document.getElementById("btn-upload-media");
  const label = document.getElementById("btn-media-action-label");
  if (label) {
    label.innerText = activeMediaTab === "library" ? "+ Upload Media / Berkas" : "+ Tambah Inspirasi Riset";
  }

  btn?.addEventListener("click", () => {
    if (activeMediaTab === "library") {
      openUploadMediaModal(brands, contents);
    } else {
      openReferenceModal(null, contents);
    }
  });

  // Search & Filters
  document.getElementById("media-search-input")?.addEventListener("input", (e) => {
    mediaSearch = e.target.value;
    renderMedia(container);
  });
  document.getElementById("media-filter-category")?.addEventListener("change", (e) => {
    selectedMediaCategory = e.target.value;
    renderMedia(container);
  });

  // Global functions
  window.openEditMediaModal = (mediaId) => {
    const m = store.getItemById(SHEET_NAMES.MEDIA_LIBRARY, mediaId);
    if (m) openUploadMediaModal(brands, contents, m);
  };

  window.openEditReferenceModal = (refId) => {
    const r = store.getItemById(SHEET_NAMES.REFERENCES, refId);
    if (r) openReferenceModal(r, contents);
  };

  window.deleteMediaItem = (mediaId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus berkas media.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus berkas media.");
      return;
    }
    if (confirm("Hapus berkas media ini dari daftar perpustakaan?")) {
      store.deleteItem(SHEET_NAMES.MEDIA_LIBRARY, mediaId);
      if (window.showToast) window.showToast("🗑️ Berkas media berhasil dihapus.", "info");
      renderMedia(container);
    }
  };

  window.deleteReference = (refId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan riset referensi.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan riset referensi.");
      return;
    }
    if (confirm("Hapus catatan referensi inspirasi ini?")) {
      store.deleteItem(SHEET_NAMES.REFERENCES, refId);
      if (window.showToast) window.showToast("🗑️ Inspirasi referensi berhasil dihapus.", "info");
      renderMedia(container);
    }
  };

  window.convertRefToIdea = (refId) => {
    const ref = store.getItemById(SHEET_NAMES.REFERENCES, refId);
    if (!ref) return;

    store.createItem(SHEET_NAMES.CONTENT_PLANNING, {
      content_title: `Ide dari Referensi: ${ref.reference_title}`,
      platform: ref.platform || "TikTok",
      content_pillar: "Inspiration",
      content_format: "Short Video (Vertical 9:16)",
      status: "Idea",
      content_idea: ref.content_idea || "",
      notes: `Referensi: ${ref.reference_url || '-'} | ${ref.notes || ''}`
    });

    alert("✅ Berhasil menambahkan ide konten baru dari referensi ini!");
    window.location.hash = "#content";
  };
}

function openUploadMediaModal(brands = [], contents = [], item = null) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!item;
  const data = item || {
    file_name: "",
    category: "Raw Footage",
    brand_id: "",
    file_url: "",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Informasi Media' : 'Upload Berkas / Catat Media Drive'}
            </h3>
            <p class="text-xs text-slate-500">${isEdit ? 'Perbarui detail nama, kategori, atau tautan berkas' : 'Unggah berkas langsung ke Google Drive atau simpan tautan aset'}</p>
          </div>
          <button id="modal-upload-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="upload-media-form" class="p-6 space-y-4 text-xs">
          ${!isEdit ? `
            <!-- File Picker -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Pilih File dari Perangkat (Opsional)</label>
              <input type="file" id="form-media-file" class="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
              <p class="text-[10px] text-slate-400 mt-1">File akan dienkode Base64 dan disimpan ke Google Drive.</p>
            </div>
          ` : ''}

          <!-- File Name -->
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Berkas <span class="text-rose-500">*</span></label>
            <input type="text" id="form-media-name" required value="${data.file_name}" placeholder="Contoh: B-Roll_Botol_Serum_Slowmo_4K.mp4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Kategori Berkas</label>
              <select id="form-media-cat" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Raw Footage" ${data.category === 'Raw Footage' ? 'selected' : ''}>Raw Footage</option>
                <option value="Brand Asset" ${data.category === 'Brand Asset' ? 'selected' : ''}>Brand Asset / Logo</option>
                <option value="Music & SFX" ${data.category === 'Music & SFX' ? 'selected' : ''}>Music & SFX</option>
                <option value="Final Video" ${data.category === 'Final Video' ? 'selected' : ''}>Final Video</option>
                <option value="General" ${data.category === 'General' ? 'selected' : ''}>General</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Terkait Brand</label>
              <select id="form-media-brand" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Tanpa Brand --</option>
                ${brands.map(b => `<option value="${b.brand_id}" ${data.brand_id === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Tautan Google Drive / Cloud URL</label>
            <input type="url" id="form-media-url" value="${data.file_url || ''}" placeholder="https://drive.google.com/file/d/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
            <input type="text" id="form-media-notes" value="${data.notes || ''}" placeholder="Resolusi 4K, 60fps, pencahayaan studio" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-upload-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Media</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-upload-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" id="btn-submit-upload" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                ${isEdit ? 'Simpan Perubahan' : 'Simpan Berkas'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-upload-close")?.addEventListener("click", close);
  document.getElementById("modal-upload-cancel")?.addEventListener("click", close);

  document.getElementById("modal-upload-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus berkas media ini dari daftar perpustakaan?")) {
      store.deleteItem(SHEET_NAMES.MEDIA_LIBRARY, item.media_id);
      if (window.showToast) window.showToast("🗑️ Berkas media berhasil dihapus.", "info");
      close();
      const main = document.getElementById("main-view-container");
      if (main) renderMedia(main);
    }
  });

  // Auto-fill file name when file is selected
  document.getElementById("form-media-file")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById("form-media-name").value = file.name;
    }
  });

  document.getElementById("upload-media-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("btn-submit-upload");
    submitBtn.disabled = true;
    submitBtn.innerText = isEdit ? "Menyimpan..." : "Mengunggah...";

    const fileInput = document.getElementById("form-media-file");
    const fileName = document.getElementById("form-media-name").value.trim();
    const category = document.getElementById("form-media-cat").value;
    const brandId = document.getElementById("form-media-brand").value;
    const manualUrl = document.getElementById("form-media-url").value.trim();
    const notes = document.getElementById("form-media-notes").value.trim();

    if (isEdit) {
      store.updateItem(SHEET_NAMES.MEDIA_LIBRARY, item.media_id, {
        file_name: fileName,
        file_type: fileName.split(".").pop().toUpperCase(),
        category: category,
        brand_id: brandId,
        file_url: manualUrl,
        notes: notes
      });
      if (window.showToast) window.showToast("✅ Berkas media berhasil diperbarui!", "success");
      close();
      const main = document.getElementById("main-view-container");
      if (main) renderMedia(main);
    } else if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        await api.uploadMedia(base64, fileName, file.type, category, brandId, "", notes);
        if (window.showToast) window.showToast("✅ Berkas media berhasil diunggah!", "success");
        close();
        const main = document.getElementById("main-view-container");
        if (main) renderMedia(main);
      };
      reader.readAsDataURL(file);
    } else {
      // Manual Link Entry
      store.createItem(SHEET_NAMES.MEDIA_LIBRARY, {
        file_name: fileName,
        file_type: fileName.split(".").pop().toUpperCase(),
        category: category,
        brand_id: brandId,
        file_url: manualUrl,
        version: "v1",
        upload_date: new Date().toISOString().slice(0, 10),
        notes: notes
      });
      if (window.showToast) window.showToast("✅ Berkas media berhasil dicatat!", "success");
      close();
      const main = document.getElementById("main-view-container");
      if (main) renderMedia(main);
    }
  });
}

function openReferenceModal(ref = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!ref;
  const data = ref || {
    reference_title: "",
    reference_url: "",
    platform: "TikTok",
    category: "Hook Idea",
    content_idea: "",
    screenshot_link: "",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Catatan Riset' : 'Simpan Inspirasi & Referensi Baru'}
            </h3>
            <p class="text-xs text-slate-500">Catat tautan video viral, teknik hook, atau tangkapan layar</p>
          </div>
          <button id="modal-ref-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="ref-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Judul / Konsep Referensi <span class="text-rose-500">*</span></label>
            <input type="text" id="form-ref-title" required value="${data.reference_title}" placeholder="Contoh: Hook Snap Zoom Transisi Cepat" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform Sumber</label>
              <select id="form-ref-platform" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Kategori Riset</label>
              <input type="text" id="form-ref-cat" value="${data.category || 'Hook Idea'}" placeholder="Visual Hook / Audio Trend" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">URL / Tautan Konten Referensi</label>
            <input type="url" id="form-ref-url" value="${data.reference_url || ''}" placeholder="https://tiktok.com/@creator/video/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Ide Adaptasi Konten</label>
            <textarea id="form-ref-idea" rows="2" placeholder="Bagaimana ide ini bisa kita modifikasi untuk konten kita sendiri..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">${data.content_idea || ''}</textarea>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">URL Tangkapan Layar (Screenshot)</label>
            <input type="url" id="form-ref-shot" value="${data.screenshot_link || ''}" placeholder="https://images.unsplash.com/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
            <input type="text" id="form-ref-notes" value="${data.notes || ''}" placeholder="Sound trending, timing transisi 0.3 detik..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-ref-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Referensi</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-ref-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                Simpan Referensi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-ref-close")?.addEventListener("click", close);
  document.getElementById("modal-ref-cancel")?.addEventListener("click", close);

  document.getElementById("modal-ref-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus catatan referensi inspirasi ini?")) {
      store.deleteItem(SHEET_NAMES.REFERENCES, ref.reference_id);
      if (window.showToast) window.showToast("🗑️ Inspirasi referensi berhasil dihapus.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderMedia(mainContainer);
    }
  });

  document.getElementById("ref-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      reference_title: document.getElementById("form-ref-title").value.trim(),
      platform: document.getElementById("form-ref-platform").value,
      category: document.getElementById("form-ref-cat").value.trim(),
      reference_url: document.getElementById("form-ref-url").value.trim(),
      content_idea: document.getElementById("form-ref-idea").value.trim(),
      screenshot_link: document.getElementById("form-ref-shot").value.trim(),
      notes: document.getElementById("form-ref-notes").value.trim(),
      created_date: new Date().toISOString().slice(0, 10)
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.REFERENCES, ref.reference_id, payload);
    } else {
      store.createItem(SHEET_NAMES.REFERENCES, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderMedia(mainContainer);
  });
}

return { renderMedia: renderMedia };
})();

// ==================== VIEW: js\views\social.js ====================
const { renderSocial } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: SOCIAL MEDIA & ANALYTICS
 * Modul 09 (Social Media Management), Modul 10 (Publishing), Modul 11 (Content Analytics)
 * File: js/views/social.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
let activeSocialTab = "accounts"; // 'accounts', 'publishing', 'analytics'
let socialSearch = "";
function renderSocial(container) {
  const accounts = store.getItems(SHEET_NAMES.SOCIAL_ACCOUNTS);
  const publications = store.getItems(SHEET_NAMES.CONTENT_PUBLICATIONS);
  const analytics = store.getItems(SHEET_NAMES.CONTENT_ANALYTICS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
  const brands = store.getItems(SHEET_NAMES.BRANDS);

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 09 • 10 • 11</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Media Sosial & Analitik</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Social Accounts, Publishing & Analytics</h1>
          <p class="text-xs text-slate-500 mt-0.5">Manajemen multi-akun media sosial, pelacakan live posting, dan matriks performa analitik video.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-create-social-item" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span id="btn-social-action-label">+ Tambah Akun Baru</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button id="tab-social-accounts" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeSocialTab === 'accounts' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>👥</span> <span>Akun Media Sosial (${accounts.length})</span>
        </button>
        <button id="tab-social-publishing" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeSocialTab === 'publishing' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>🚀</span> <span>Riwayat Publikasi (${publications.length})</span>
        </button>
        <button id="tab-social-analytics" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeSocialTab === 'analytics' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>📈</span> <span>Analitik Performa (${analytics.length})</span>
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="social-tab-content">
        ${activeSocialTab === "accounts" ? renderAccountsTab(accounts) :
          activeSocialTab === "publishing" ? renderPublishingTab(publications) :
          renderAnalyticsTab(analytics)}
      </div>
    </div>
  `;

  setupSocialListeners(container, brands, accounts, contents);
}

function renderAccountsTab(accounts) {
  if (accounts.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">👥</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada akun media sosial terdaftar</div>
        <div class="text-xs text-slate-500 mt-1">Tambahkan akun TikTok, Instagram, YouTube, atau platform Anda.</div>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${accounts.map(acc => {
        const brandName = store.getBrandName(acc.brand_id);

        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-lg font-bold">
                    ${getPlatformIcon(acc.platform)}
                  </div>
                  <div>
                    <h3 class="font-extrabold text-sm text-slate-900">${acc.account_name}</h3>
                    <div class="text-xs font-mono font-bold text-blue-600">${acc.username}</div>
                  </div>
                </div>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  ${acc.account_status || 'Active'}
                </span>
              </div>

              <!-- Followers Counter -->
              <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div class="text-[10px] font-bold text-slate-400 uppercase">Followers / Subscribers</div>
                  <div class="text-lg font-extrabold text-slate-900 mt-0.5">
                    ${Number(acc.followers || 0).toLocaleString('id-ID')}
                  </div>
                </div>
                <span class="text-xl">📊</span>
              </div>

              <!-- Niche & Target Audience -->
              <div class="space-y-1.5 text-xs text-slate-600">
                <div><strong class="text-slate-800">Niche:</strong> ${acc.niche || '-'}</div>
                <div><strong class="text-slate-800">Target Audiens:</strong> ${acc.target_audience || '-'}</div>
                <div><strong class="text-slate-800">Brand Mitra:</strong> ${brandName}</div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              ${acc.profile_url ? `
                <a href="${acc.profile_url}" target="_blank" class="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <span>Buka Profil</span> ↗
                </a>
              ` : '<span></span>'}

              <div class="space-x-2">
                <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditAccountModal('${acc.account_id}')">
                  Edit
                </button>
                <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteAccount('${acc.account_id}')">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderPublishingTab(publications) {
  if (publications.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">🚀</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada riwayat publikasi</div>
        <div class="text-xs text-slate-500 mt-1">Catat jadwal publikasi video atau update status konten yang telah tayang.</div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Konten & Platform</th>
              <th class="py-3.5 px-4">Akun Penayang</th>
              <th class="py-3.5 px-4">Waktu Tayang</th>
              <th class="py-3.5 px-4">Preview Caption & Tagar</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4">Tautan Live URL</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${publications.map(pub => {
              const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, pub.content_id) || {};
              const acc = store.getItemById(SHEET_NAMES.SOCIAL_ACCOUNTS, pub.account_id) || {};
              const statusCfg = PUBLICATION_STATUSES.find(s => s.key === pub.publication_status) || PUBLICATION_STATUSES[0];

              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 max-w-xs">
                    <div class="font-bold text-slate-900 truncate">${cnt.content_title || 'Untitled'}</div>
                    <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${pub.platform}</span>
                  </td>
                  <td class="py-3 px-4 font-semibold text-slate-800">
                    <div>${acc.account_name || pub.platform}</div>
                    <div class="text-[10px] text-slate-400 font-mono">${acc.username || ''}</div>
                  </td>
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-600">
                    <div>${pub.publication_date}</div>
                    <div class="text-[10px] text-slate-400">${pub.publication_time || '19:00'}</div>
                  </td>
                  <td class="py-3 px-4 max-w-xs">
                    <div class="truncate text-slate-700">${pub.caption || '-'}</div>
                    <div class="truncate text-[10px] text-blue-600 mt-0.5">${pub.hashtags || ''}</div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded ${statusCfg.color}">
                      ${pub.publication_status}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    ${pub.content_url ? `
                      <a href="${pub.content_url}" target="_blank" class="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                        <span>Buka Postingan</span> ↗
                      </a>
                    ` : `<span class="text-slate-400 text-[11px]">Belum tayang</span>`}
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    ${pub.publication_status !== "Published" ? `
                      <button class="text-xs font-bold text-emerald-600 hover:text-emerald-800" onclick="window.markPublished('${pub.publication_id}')">
                        ✓ Tayang
                      </button>
                    ` : ''}
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditPublishModal('${pub.publication_id}')">
                      Edit
                    </button>
                    <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deletePublication('${pub.publication_id}')">
                      Hapus
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderAnalyticsTab(analytics) {
  if (analytics.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">📈</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada data analitik konten tercatat</div>
        <div class="text-xs text-slate-500 mt-1">Catat snapshot views, likes, shares, dan konversi penjualan dari video yang telah tayang.</div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 flex items-center justify-between">
        <span>Matriks Performa Konten & Engagement Rate</span>
        <span class="text-[11px] font-normal text-slate-500">Formula ER: ((Likes + Comments + Shares + Saves) / Views) × 100%</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Konten</th>
              <th class="py-3.5 px-4">Platform</th>
              <th class="py-3.5 px-4 text-right">Views</th>
              <th class="py-3.5 px-4 text-right">Reach</th>
              <th class="py-3.5 px-4 text-right">Likes</th>
              <th class="py-3.5 px-4 text-right">Comments</th>
              <th class="py-3.5 px-4 text-right">Shares</th>
              <th class="py-3.5 px-4 text-right">Saves</th>
              <th class="py-3.5 px-4 text-right font-extrabold text-blue-600">ER %</th>
              <th class="py-3.5 px-4 text-right">Revenue</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 font-mono text-[11px]">
            ${analytics.map(anl => {
              const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, anl.content_id) || {};
              const er = anl.engagement_rate || store.calculateEngagementRate(anl.views, anl.likes, anl.comments, anl.shares, anl.saves);

              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 font-sans font-bold text-slate-900 max-w-xs truncate">
                    ${cnt.content_title || 'Untitled'}
                  </td>
                  <td class="py-3 px-4 font-sans">
                    <span class="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px]">${anl.platform}</span>
                  </td>
                  <td class="py-3 px-4 text-right font-bold text-slate-900">${Number(anl.views || 0).toLocaleString('id-ID')}</td>
                  <td class="py-3 px-4 text-right text-slate-600">${Number(anl.reach || 0).toLocaleString('id-ID')}</td>
                  <td class="py-3 px-4 text-right text-slate-600">${Number(anl.likes || 0).toLocaleString('id-ID')}</td>
                  <td class="py-3 px-4 text-right text-slate-600">${Number(anl.comments || 0).toLocaleString('id-ID')}</td>
                  <td class="py-3 px-4 text-right text-slate-600">${Number(anl.shares || 0).toLocaleString('id-ID')}</td>
                  <td class="py-3 px-4 text-right text-slate-600">${Number(anl.saves || 0).toLocaleString('id-ID')}</td>
                  <td class="py-3 px-4 text-right font-extrabold text-blue-600 bg-blue-50/40">${er}%</td>
                  <td class="py-3 px-4 text-right text-emerald-700 font-bold">
                    ${anl.revenue ? 'Rp ' + Number(anl.revenue).toLocaleString('id-ID') : '-'}
                  </td>
                  <td class="py-3 px-4 text-right font-sans space-x-2">
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditAnalyticsModal('${anl.analytics_id}')">
                      Edit
                    </button>
                    <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteAnalytics('${anl.analytics_id}')">
                      Hapus
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function getPlatformIcon(p = "") {
  if (p.includes("TikTok")) return "🎵";
  if (p.includes("Instagram")) return "📸";
  if (p.includes("YouTube")) return "▶️";
  if (p.includes("LinkedIn")) return "💼";
  if (p.includes("Twitter") || p.includes("X")) return "🐦";
  return "📱";
}

function setupSocialListeners(container, brands, accounts, contents) {
  // Tabs
  document.getElementById("tab-social-accounts")?.addEventListener("click", () => {
    activeSocialTab = "accounts";
    renderSocial(container);
  });
  document.getElementById("tab-social-publishing")?.addEventListener("click", () => {
    activeSocialTab = "publishing";
    renderSocial(container);
  });
  document.getElementById("tab-social-analytics")?.addEventListener("click", () => {
    activeSocialTab = "analytics";
    renderSocial(container);
  });

  // Action button
  const btn = document.getElementById("btn-create-social-item");
  const label = document.getElementById("btn-social-action-label");
  if (label) {
    label.innerText = activeSocialTab === "accounts" ? "+ Tambah Akun Baru" :
                      activeSocialTab === "publishing" ? "+ Catat Jadwal Publikasi" :
                      "+ Catat Snapshot Analitik";
  }

  btn?.addEventListener("click", () => {
    if (activeSocialTab === "accounts") {
      openAccountModal(null, brands);
    } else if (activeSocialTab === "publishing") {
      openPublishModal(null, contents, accounts);
    } else {
      openAnalyticsModal(null, contents);
    }
  });

  // Global actions
  window.openEditAccountModal = (accId) => {
    const acc = store.getItemById(SHEET_NAMES.SOCIAL_ACCOUNTS, accId);
    if (acc) openAccountModal(acc, brands);
  };

  window.deleteAccount = (accId) => {
    if (confirm("Hapus akun media sosial ini?")) {
      store.deleteItem(SHEET_NAMES.SOCIAL_ACCOUNTS, accId);
      renderSocial(container);
    }
  };

  window.openEditPublishModal = (pubId) => {
    const pub = store.getItemById(SHEET_NAMES.CONTENT_PUBLICATIONS, pubId);
    if (pub) openPublishModal(pub, contents, accounts);
  };

  window.markPublished = (pubId) => {
    const url = prompt("Masukkan Link URL konten yang telah tayang (Instagram Reel / TikTok URL):");
    store.updateItem(SHEET_NAMES.CONTENT_PUBLICATIONS, pubId, {
      publication_status: "Published",
      content_url: url || "",
      updated_at: new Date().toISOString()
    });
    renderSocial(container);
  };

  window.deletePublication = (pubId) => {
    if (confirm("Hapus catatan publikasi ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_PUBLICATIONS, pubId);
      renderSocial(container);
    }
  };

  window.openEditAnalyticsModal = (anlId) => {
    const anl = store.getItemById(SHEET_NAMES.CONTENT_ANALYTICS, anlId);
    if (anl) openAnalyticsModal(anl, contents);
  };

  window.deleteAnalytics = (anlId) => {
    if (confirm("Hapus catatan snapshot analitik ini?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_ANALYTICS, anlId);
      renderSocial(container);
    }
  };
}

function openAccountModal(account = null, brands = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!account;
  const data = account || {
    platform: "TikTok",
    account_name: "",
    username: "@",
    profile_url: "",
    brand_id: "",
    niche: "Lifestyle",
    target_audience: "Gen Z & Millennial",
    followers: 0,
    account_status: "Active",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Akun Media Sosial' : 'Tambah Akun Media Sosial Baru'}
            </h3>
            <p class="text-xs text-slate-500">Kelola akun channel YouTube, TikTok, atau Instagram</p>
          </div>
          <button id="modal-acc-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="account-form" class="p-6 space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform <span class="text-rose-500">*</span></label>
              <select id="form-acc-platform" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Nama Channel / Akun <span class="text-rose-500">*</span></label>
              <input type="text" id="form-acc-name" required value="${data.account_name}" placeholder="Alex Studio Official" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Username / Handle <span class="text-rose-500">*</span></label>
              <input type="text" id="form-acc-user" required value="${data.username}" placeholder="@alexstudio" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Jumlah Followers / Subs</label>
              <input type="number" id="form-acc-followers" value="${data.followers || 0}" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">URL Profil Akun</label>
            <input type="url" id="form-acc-url" value="${data.profile_url || ''}" placeholder="https://tiktok.com/@alexstudio" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Niche Konten</label>
              <input type="text" id="form-acc-niche" value="${data.niche || ''}" placeholder="Tech, Skincare, Lifestyle..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Brand Terkait (Jika ada)</label>
              <select id="form-acc-brand" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Akun Kreator Sendiri --</option>
                ${brands.map(b => `<option value="${b.brand_id}" ${data.brand_id === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button type="button" id="modal-acc-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
              Batal
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
              Simpan Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-acc-close")?.addEventListener("click", close);
  document.getElementById("modal-acc-cancel")?.addEventListener("click", close);

  document.getElementById("account-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      platform: document.getElementById("form-acc-platform").value,
      account_name: document.getElementById("form-acc-name").value.trim(),
      username: document.getElementById("form-acc-user").value.trim(),
      followers: Number(document.getElementById("form-acc-followers").value) || 0,
      profile_url: document.getElementById("form-acc-url").value.trim(),
      niche: document.getElementById("form-acc-niche").value.trim(),
      brand_id: document.getElementById("form-acc-brand").value
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.SOCIAL_ACCOUNTS, account.account_id, payload);
    } else {
      store.createItem(SHEET_NAMES.SOCIAL_ACCOUNTS, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderSocial(mainContainer);
  });
}

function openPublishModal(pub = null, contents = [], accounts = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!pub;
  const data = pub || {
    content_id: contents[0]?.content_id || "",
    account_id: accounts[0]?.account_id || "",
    platform: "TikTok",
    publication_date: new Date().toISOString().slice(0, 10),
    publication_time: "19:00",
    caption: "",
    hashtags: "",
    content_url: "",
    publication_status: "Scheduled"
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Catatan Publikasi' : 'Catat Jadwal Publikasi Konten'}
            </h3>
            <p class="text-xs text-slate-500">Pilih channel penayang, waktu tayang, dan tautan live postingan</p>
          </div>
          <button id="modal-pub-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="pub-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Pilih Konten <span class="text-rose-500">*</span></label>
            <select id="form-pub-content" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
              ${contents.map(c => `<option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>[${c.platform}] ${c.content_title}</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Akun Penayang</label>
              <select id="form-pub-account" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${accounts.map(a => `<option value="${a.account_id}" ${data.account_id === a.account_id ? 'selected' : ''}>${a.account_name} (${a.platform})</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform</label>
              <select id="form-pub-platform" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Publikasi</label>
              <input type="date" id="form-pub-date" value="${data.publication_date || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Jam Tayang</label>
              <input type="time" id="form-pub-time" value="${data.publication_time || '19:00'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Caption yang Digunakan</label>
            <textarea id="form-pub-caption" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">${data.caption || ''}</textarea>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Tagar (Hashtags)</label>
            <input type="text" id="form-pub-hashtags" value="${data.hashtags || ''}" placeholder="#fyp #skincare" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Publikasi</label>
              <select id="form-pub-status" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${PUBLICATION_STATUSES.map(s => `<option value="${s.key}" ${data.publication_status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">URL Live Postingan</label>
              <input type="url" id="form-pub-url" value="${data.content_url || ''}" placeholder="https://instagram.com/reel/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button type="button" id="modal-pub-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
              Batal
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
              Simpan Publikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-pub-close")?.addEventListener("click", close);
  document.getElementById("modal-pub-cancel")?.addEventListener("click", close);

  document.getElementById("pub-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      content_id: document.getElementById("form-pub-content").value,
      account_id: document.getElementById("form-pub-account").value,
      platform: document.getElementById("form-pub-platform").value,
      publication_date: document.getElementById("form-pub-date").value,
      publication_time: document.getElementById("form-pub-time").value,
      caption: document.getElementById("form-pub-caption").value.trim(),
      hashtags: document.getElementById("form-pub-hashtags").value.trim(),
      publication_status: document.getElementById("form-pub-status").value,
      content_url: document.getElementById("form-pub-url").value.trim()
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_PUBLICATIONS, pub.publication_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_PUBLICATIONS, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderSocial(mainContainer);
  });
}

function openAnalyticsModal(anl = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!anl;
  const data = anl || {
    content_id: contents[0]?.content_id || "",
    platform: "TikTok",
    snapshot_date: new Date().toISOString().slice(0, 10),
    views: 0,
    reach: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    revenue: 0,
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Snapshot Analitik' : 'Catat Snapshot Performa Video'}
            </h3>
            <p class="text-xs text-slate-500">Input matriks performa views, engagement, dan sales</p>
          </div>
          <button id="modal-anl-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="anl-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Pilih Konten <span class="text-rose-500">*</span></label>
            <select id="form-anl-content" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
              ${contents.map(c => `<option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>[${c.platform}] ${c.content_title}</option>`).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform</label>
              <select id="form-anl-platform" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Snapshot</label>
              <input type="date" id="form-anl-date" value="${data.snapshot_date || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Total Views</label>
              <input type="number" id="form-anl-views" value="${data.views || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Total Reach</label>
              <input type="number" id="form-anl-reach" value="${data.reach || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Likes</label>
              <input type="number" id="form-anl-likes" value="${data.likes || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Comments</label>
              <input type="number" id="form-anl-comments" value="${data.comments || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Shares</label>
              <input type="number" id="form-anl-shares" value="${data.shares || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Saves</label>
              <input type="number" id="form-anl-saves" value="${data.saves || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Estimasi Penjualan / Revenue (Rp)</label>
            <input type="number" id="form-anl-revenue" value="${data.revenue || 0}" placeholder="Contoh: 1500000" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button type="button" id="modal-anl-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
              Batal
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
              Simpan Analitik
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-anl-close")?.addEventListener("click", close);
  document.getElementById("modal-anl-cancel")?.addEventListener("click", close);

  document.getElementById("anl-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const views = Number(document.getElementById("form-anl-views").value) || 0;
    const likes = Number(document.getElementById("form-anl-likes").value) || 0;
    const comments = Number(document.getElementById("form-anl-comments").value) || 0;
    const shares = Number(document.getElementById("form-anl-shares").value) || 0;
    const saves = Number(document.getElementById("form-anl-saves").value) || 0;

    const er = store.calculateEngagementRate(views, likes, comments, shares, saves);

    const payload = {
      content_id: document.getElementById("form-anl-content").value,
      platform: document.getElementById("form-anl-platform").value,
      snapshot_date: document.getElementById("form-anl-date").value,
      views,
      reach: Number(document.getElementById("form-anl-reach").value) || 0,
      likes,
      comments,
      shares,
      saves,
      engagement_rate: er,
      revenue: Number(document.getElementById("form-anl-revenue").value) || 0
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_ANALYTICS, anl.analytics_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_ANALYTICS, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderSocial(mainContainer);
  });
}

return { renderSocial: renderSocial };
})();

// ==================== VIEW: js\views\business.js ====================
const { renderBusiness } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: BUSINESS MANAGEMENT
 * Modul 12 (Brand & Client Management) & Modul 13 (Project & Campaign Management)
 * File: js/views/business.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
let activeBusinessTab = "brands"; // 'brands', 'clients', 'projects', 'campaigns'
let businessSearch = "";
function renderBusiness(container) {
  const brands = store.getItems(SHEET_NAMES.BRANDS);
  const clients = store.getItems(SHEET_NAMES.CLIENTS);
  const projects = store.getItems(SHEET_NAMES.PROJECTS);
  const campaigns = store.getItems(SHEET_NAMES.CAMPAIGNS);

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 12 • 13</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Bisnis & Kemitraan</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Brands, Clients & Campaigns</h1>
          <p class="text-xs text-slate-500 mt-0.5">Kelola brand rekanan, kontak klien agency, kontrak proyek sponsorship, dan campaign pemasaran.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-create-business-item" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span id="btn-business-action-label">+ Tambah Brand</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button id="tab-biz-brands" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeBusinessTab === 'brands' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          🏢 Brand Mitra (${brands.length})
        </button>
        <button id="tab-biz-clients" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeBusinessTab === 'clients' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          🤝 Klien Agency (${clients.length})
        </button>
        <button id="tab-biz-projects" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeBusinessTab === 'projects' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          💼 Proyek Sponsorship (${projects.length})
        </button>
        <button id="tab-biz-campaigns" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeBusinessTab === 'campaigns' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          🎯 Campaign (${campaigns.length})
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="business-tab-content">
        ${activeBusinessTab === "brands" ? renderBrandsTab(brands) :
          activeBusinessTab === "clients" ? renderClientsTab(clients) :
          activeBusinessTab === "projects" ? renderProjectsTab(projects) :
          renderCampaignsTab(campaigns)}
      </div>
    </div>
  `;

  setupBusinessListeners(container, brands, clients, projects);
}

function renderBrandsTab(brands) {
  if (brands.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada brand terdaftar.</div>`;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${brands.map(b => `
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${b.category || 'General'}</span>
                <h3 class="font-extrabold text-base text-slate-900 mt-1.5">${b.brand_name}</h3>
                <div class="text-xs text-slate-400 font-medium">${b.company_name || '-'}</div>
              </div>
              <span class="text-2xl">🏢</span>
            </div>

            <div class="space-y-1.5 text-xs text-slate-600">
              <div><strong class="text-slate-800">Kontak PIC:</strong> ${b.contact || '-'}</div>
              <div><strong class="text-slate-800">Media Sosial:</strong> ${b.social_media || '-'}</div>
              ${b.notes ? `<div class="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">"${b.notes}"</div>` : ''}
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            ${b.website ? `
              <a href="${b.website}" target="_blank" class="font-bold text-blue-600 hover:text-blue-800">Kunjungi Web ↗</a>
            ` : '<span></span>'}

            <div class="space-x-2">
              <button class="font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditBrandModal('${b.brand_id}')">Edit</button>
              <button class="font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteBrand('${b.brand_id}')">Hapus</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderClientsTab(clients) {
  if (clients.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada klien terdaftar.</div>`;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${clients.map(c => `
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <span class="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">${c.client_type || 'Corporate'}</span>
                <h3 class="font-extrabold text-base text-slate-900 mt-1.5">${c.client_name}</h3>
                <div class="text-xs text-slate-400 font-medium">${c.company || '-'}</div>
              </div>
              <span class="text-2xl">🤝</span>
            </div>

            <div class="space-y-1.5 text-xs text-slate-600">
              <div><strong class="text-slate-800">Email:</strong> ${c.email || '-'}</div>
              <div><strong class="text-slate-800">Telepon / WA:</strong> ${c.phone || '-'}</div>
              <div><strong class="text-slate-800">Alamat:</strong> ${c.address || '-'}</div>
              ${c.notes ? `<div class="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">"${c.notes}"</div>` : ''}
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2 text-xs">
            <button class="font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditClientModal('${c.client_id}')">Edit</button>
            <button class="font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteClient('${c.client_id}')">Hapus</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjectsTab(projects) {
  if (projects.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada proyek terdaftar.</div>`;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${projects.map(p => {
        const brandName = store.getBrandName(p.brand_id);
        const clientName = store.getClientName(p.client_id);

        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">${p.project_status || 'Active'}</span>
                  <h3 class="font-extrabold text-sm text-slate-900 mt-1.5">${p.project_name}</h3>
                </div>
                <span class="text-2xl">💼</span>
              </div>

              <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <div class="text-[10px] font-bold text-slate-400 uppercase">Nilai Kontrak / Budget</div>
                  <div class="text-base font-extrabold text-slate-900 mt-0.5">
                    Rp ${Number(p.budget || 0).toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              <div class="space-y-1.5 text-xs text-slate-600">
                <div><strong class="text-slate-800">Brand:</strong> ${brandName}</div>
                <div><strong class="text-slate-800">Klien Agency:</strong> ${clientName}</div>
                <div><strong class="text-slate-800">Periode:</strong> ${p.start_date} s/d ${p.end_date}</div>
                ${p.notes ? `<div class="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">"${p.notes}"</div>` : ''}
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2 text-xs">
              <button class="font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditProjectModal('${p.project_id}')">Edit</button>
              <button class="font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteProject('${p.project_id}')">Hapus</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderCampaignsTab(campaigns) {
  if (campaigns.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada campaign terdaftar.</div>`;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${campaigns.map(c => {
        const projectName = store.getProjectName(c.project_id);

        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${c.status || 'Active'}</span>
                  <h3 class="font-extrabold text-sm text-slate-900 mt-1.5">${c.campaign_name}</h3>
                </div>
                <span class="text-2xl">🎯</span>
              </div>

              <div class="space-y-1.5 text-xs text-slate-600">
                <div><strong class="text-slate-800">Objective:</strong> ${c.objective || '-'}</div>
                <div><strong class="text-slate-800">Platform:</strong> ${c.platform || '-'}</div>
                <div><strong class="text-slate-800">Target Konten:</strong> ${c.target_content || 0} Video</div>
                <div><strong class="text-slate-800">Budget:</strong> Rp ${Number(c.budget || 0).toLocaleString('id-ID')}</div>
                <div><strong class="text-slate-800">Proyek Terkait:</strong> ${projectName}</div>
              </div>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2 text-xs">
              <button class="font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditCampaignModal('${c.campaign_id}')">Edit</button>
              <button class="font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteCampaign('${c.campaign_id}')">Hapus</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function setupBusinessListeners(container, brands, clients, projects) {
  document.getElementById("tab-biz-brands")?.addEventListener("click", () => {
    activeBusinessTab = "brands";
    renderBusiness(container);
  });
  document.getElementById("tab-biz-clients")?.addEventListener("click", () => {
    activeBusinessTab = "clients";
    renderBusiness(container);
  });
  document.getElementById("tab-biz-projects")?.addEventListener("click", () => {
    activeBusinessTab = "projects";
    renderBusiness(container);
  });
  document.getElementById("tab-biz-campaigns")?.addEventListener("click", () => {
    activeBusinessTab = "campaigns";
    renderBusiness(container);
  });

  const btn = document.getElementById("btn-create-business-item");
  const label = document.getElementById("btn-business-action-label");
  if (label) {
    label.innerText = activeBusinessTab === "brands" ? "+ Tambah Brand Baru" :
                      activeBusinessTab === "clients" ? "+ Tambah Klien Baru" :
                      activeBusinessTab === "projects" ? "+ Buat Proyek Baru" :
                      "+ Buat Campaign Baru";
  }

  btn?.addEventListener("click", () => {
    if (activeBusinessTab === "brands") openBrandModal();
    else if (activeBusinessTab === "clients") openClientModal();
    else if (activeBusinessTab === "projects") openProjectModal(null, brands, clients);
    else openCampaignModal(null, projects);
  });

  // Global actions
  window.openEditBrandModal = (id) => openBrandModal(store.getItemById(SHEET_NAMES.BRANDS, id));
  window.deleteBrand = (id) => {
    if (confirm("Hapus data brand mitra ini?")) {
      store.deleteItem(SHEET_NAMES.BRANDS, id);
      renderBusiness(container);
    }
  };

  window.openEditClientModal = (id) => openClientModal(store.getItemById(SHEET_NAMES.CLIENTS, id));
  window.deleteClient = (id) => {
    if (confirm("Hapus data klien agency ini?")) {
      store.deleteItem(SHEET_NAMES.CLIENTS, id);
      renderBusiness(container);
    }
  };

  window.openEditProjectModal = (id) => openProjectModal(store.getItemById(SHEET_NAMES.PROJECTS, id), brands, clients);
  window.deleteProject = (id) => {
    if (confirm("Hapus data proyek sponsorship ini?")) {
      store.deleteItem(SHEET_NAMES.PROJECTS, id);
      renderBusiness(container);
    }
  };

  window.openEditCampaignModal = (id) => openCampaignModal(store.getItemById(SHEET_NAMES.CAMPAIGNS, id), projects);
  window.deleteCampaign = (id) => {
    if (confirm("Hapus data campaign ini?")) {
      store.deleteItem(SHEET_NAMES.CAMPAIGNS, id);
      renderBusiness(container);
    }
  };
}

function openBrandModal(brand = null) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!brand;
  const data = brand || { brand_name: "", company_name: "", category: "Beauty & Skincare", website: "", social_media: "", contact: "", notes: "" };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Brand Mitra' : 'Tambah Brand Mitra Baru'}</h3>
          <button id="modal-brd-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="brand-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Brand <span class="text-rose-500">*</span></label>
            <input type="text" id="form-brd-name" required value="${data.brand_name}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Perusahaan PT / CV</label>
              <input type="text" id="form-brd-company" value="${data.company_name}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Kategori Industri</label>
              <input type="text" id="form-brd-cat" value="${data.category}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Website</label>
              <input type="url" id="form-brd-web" value="${data.website}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Akun Media Sosial</label>
              <input type="text" id="form-brd-soc" value="${data.social_media}" placeholder="@brand.official" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Kontak PIC Brand</label>
            <input type="text" id="form-brd-contact" value="${data.contact}" placeholder="Nama PIC & No WhatsApp" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan</label>
            <input type="text" id="form-brd-notes" value="${data.notes}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-brd-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Brand</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-brd-close")?.addEventListener("click", close);
  document.getElementById("modal-brd-cancel")?.addEventListener("click", close);

  document.getElementById("brand-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      brand_name: document.getElementById("form-brd-name").value.trim(),
      company_name: document.getElementById("form-brd-company").value.trim(),
      category: document.getElementById("form-brd-cat").value.trim(),
      website: document.getElementById("form-brd-web").value.trim(),
      social_media: document.getElementById("form-brd-soc").value.trim(),
      contact: document.getElementById("form-brd-contact").value.trim(),
      notes: document.getElementById("form-brd-notes").value.trim()
    };
    if (isEdit) store.updateItem(SHEET_NAMES.BRANDS, brand.brand_id, payload);
    else store.createItem(SHEET_NAMES.BRANDS, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderBusiness(main);
  });
}

function openClientModal(client = null) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!client;
  const data = client || { client_name: "", company: "", email: "", phone: "", address: "", client_type: "Corporate Brand", notes: "" };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Klien' : 'Tambah Klien Agency Baru'}</h3>
          <button id="modal-cli-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="client-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Kontak Klien <span class="text-rose-500">*</span></label>
            <input type="text" id="form-cli-name" required value="${data.client_name}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Perusahaan / Agency</label>
              <input type="text" id="form-cli-company" value="${data.company}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tipe Klien</label>
              <select id="form-cli-type" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Corporate Brand" ${data.client_type === 'Corporate Brand' ? 'selected' : ''}>Corporate Brand</option>
                <option value="Agency Partner" ${data.client_type === 'Agency Partner' ? 'selected' : ''}>Agency Partner</option>
                <option value="SME / UMKM" ${data.client_type === 'SME / UMKM' ? 'selected' : ''}>SME / UMKM</option>
                <option value="Individu" ${data.client_type === 'Individu' ? 'selected' : ''}>Individu</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Email Klien</label>
              <input type="email" id="form-cli-email" value="${data.email}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nomor Telepon / WA</label>
              <input type="text" id="form-cli-phone" value="${data.phone}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Alamat Kantor</label>
            <input type="text" id="form-cli-addr" value="${data.address}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-cli-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Klien</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-cli-close")?.addEventListener("click", close);
  document.getElementById("modal-cli-cancel")?.addEventListener("click", close);

  document.getElementById("client-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      client_name: document.getElementById("form-cli-name").value.trim(),
      company: document.getElementById("form-cli-company").value.trim(),
      client_type: document.getElementById("form-cli-type").value,
      email: document.getElementById("form-cli-email").value.trim(),
      phone: document.getElementById("form-cli-phone").value.trim(),
      address: document.getElementById("form-cli-addr").value.trim()
    };
    if (isEdit) store.updateItem(SHEET_NAMES.CLIENTS, client.client_id, payload);
    else store.createItem(SHEET_NAMES.CLIENTS, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderBusiness(main);
  });
}

function openProjectModal(project = null, brands = [], clients = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!project;
  const data = project || { project_name: "", brand_id: brands[0]?.brand_id || "", client_id: clients[0]?.client_id || "", start_date: new Date().toISOString().slice(0, 10), end_date: new Date().toISOString().slice(0, 10), budget: 0, project_status: "In Progress", notes: "" };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Proyek' : 'Buat Proyek Baru'}</h3>
          <button id="modal-prj-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="project-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Proyek Sponsorship <span class="text-rose-500">*</span></label>
            <input type="text" id="form-prj-name" required value="${data.project_name}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Brand Mitra</label>
              <select id="form-prj-brand" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${brands.map(b => `<option value="${b.brand_id}" ${data.brand_id === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Klien Agency</label>
              <select id="form-prj-client" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${clients.map(c => `<option value="${c.client_id}" ${data.client_id === c.client_id ? 'selected' : ''}>${c.client_name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Mulai</label>
              <input type="date" id="form-prj-start" value="${data.start_date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Selesai</label>
              <input type="date" id="form-prj-end" value="${data.end_date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nilai Kontrak / Budget (Rp)</label>
              <input type="number" id="form-prj-budget" value="${data.budget || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Proyek</label>
              <select id="form-prj-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Planning" ${data.project_status === 'Planning' ? 'selected' : ''}>Planning</option>
                <option value="In Progress" ${data.project_status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${data.project_status === 'Completed' ? 'selected' : ''}>Completed</option>
                <option value="On Hold" ${data.project_status === 'On Hold' ? 'selected' : ''}>On Hold</option>
              </select>
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-prj-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Proyek</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-prj-close")?.addEventListener("click", close);
  document.getElementById("modal-prj-cancel")?.addEventListener("click", close);

  document.getElementById("project-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      project_name: document.getElementById("form-prj-name").value.trim(),
      brand_id: document.getElementById("form-prj-brand").value,
      client_id: document.getElementById("form-prj-client").value,
      start_date: document.getElementById("form-prj-start").value,
      end_date: document.getElementById("form-prj-end").value,
      budget: Number(document.getElementById("form-prj-budget").value) || 0,
      project_status: document.getElementById("form-prj-status").value
    };
    if (isEdit) store.updateItem(SHEET_NAMES.PROJECTS, project.project_id, payload);
    else store.createItem(SHEET_NAMES.PROJECTS, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderBusiness(main);
  });
}

function openCampaignModal(campaign = null, projects = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!campaign;
  const data = campaign || { campaign_name: "", project_id: projects[0]?.project_id || "", objective: "Awareness & Sales", platform: "TikTok", target_content: 3, budget: 0, status: "Active" };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Campaign' : 'Buat Campaign Baru'}</h3>
          <button id="modal-cmp-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="campaign-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Campaign <span class="text-rose-500">*</span></label>
            <input type="text" id="form-cmp-name" required value="${data.campaign_name}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Terkait Proyek</label>
            <select id="form-cmp-project" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
              ${projects.map(p => `<option value="${p.project_id}" ${data.project_id === p.project_id ? 'selected' : ''}>${p.project_name}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Objective / Sasaran</label>
              <input type="text" id="form-cmp-obj" value="${data.objective}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform Utama</label>
              <select id="form-cmp-platform" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Target Jumlah Konten</label>
              <input type="number" id="form-cmp-target" value="${data.target_content || 1}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Budget Campaign (Rp)</label>
              <input type="number" id="form-cmp-budget" value="${data.budget || 0}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-cmp-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Campaign</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-cmp-close")?.addEventListener("click", close);
  document.getElementById("modal-cmp-cancel")?.addEventListener("click", close);

  document.getElementById("campaign-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      campaign_name: document.getElementById("form-cmp-name").value.trim(),
      project_id: document.getElementById("form-cmp-project").value,
      objective: document.getElementById("form-cmp-obj").value.trim(),
      platform: document.getElementById("form-cmp-platform").value,
      target_content: Number(document.getElementById("form-cmp-target").value) || 1,
      budget: Number(document.getElementById("form-cmp-budget").value) || 0,
      status: "Active"
    };
    if (isEdit) store.updateItem(SHEET_NAMES.CAMPAIGNS, campaign.campaign_id, payload);
    else store.createItem(SHEET_NAMES.CAMPAIGNS, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderBusiness(main);
  });
}

return { renderBusiness: renderBusiness };
})();

// ==================== VIEW: js\views\finance.js ====================
const { renderFinance } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: FINANCIAL MANAGEMENT
 * Modul 14 (Financial Management: Income, Expenses, Invoices, Payments)
 * File: js/views/finance.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
let activeFinanceTab = "income"; // 'income', 'expenses', 'invoices', 'payments'
function renderFinance(container) {
  const incomes = store.getItems(SHEET_NAMES.INCOME);
  const expenses = store.getItems(SHEET_NAMES.EXPENSES);
  const invoices = store.getItems(SHEET_NAMES.INVOICES);
  const payments = store.getItems(SHEET_NAMES.PAYMENTS);
  const clients = store.getItems(SHEET_NAMES.CLIENTS);
  const projects = store.getItems(SHEET_NAMES.PROJECTS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);

  // Financial Calculations
  let totalIncomePaid = 0;
  let totalIncomePending = 0;
  let totalExpense = 0;

  incomes.forEach(i => {
    const amt = Number(i.amount) || 0;
    if (i.payment_status === "Paid") totalIncomePaid += amt;
    else totalIncomePending += amt;
  });

  expenses.forEach(e => {
    totalExpense += Number(e.amount) || 0;
  });

  const netProfit = totalIncomePaid - totalExpense;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 14</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Keuangan Studio</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Financial & Cashflow Management</h1>
          <p class="text-xs text-slate-500 mt-0.5">Buku kas masuk sponsorship & affiliate, pengeluaran perlengkapan, dan status invoice klien.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-create-fin-item" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span id="btn-fin-action-label">+ Catat Pendapatan</span>
          </button>
        </div>
      </div>

      <!-- Financial Metric Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Pendapatan Diterima -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Kas Masuk (Lunas)</div>
            <span class="text-lg">💵</span>
          </div>
          <div class="text-xl font-extrabold text-emerald-800 mt-1">
            Rp ${totalIncomePaid.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Total pendapatan terealisasi</div>
        </div>

        <!-- Piutang (Pending) -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Piutang Klien (Pending)</div>
            <span class="text-lg">⏳</span>
          </div>
          <div class="text-xl font-extrabold text-amber-800 mt-1">
            Rp ${totalIncomePending.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Menunggu pembayaran sponsor</div>
        </div>

        <!-- Pengeluaran Operasional -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Total Pengeluaran</div>
            <span class="text-lg">📉</span>
          </div>
          <div class="text-xl font-extrabold text-rose-800 mt-1">
            Rp ${totalExpense.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Gear, software, props & crew</div>
        </div>

        <!-- Laba Bersih -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Estimasi Laba Bersih</div>
            <span class="text-lg">💰</span>
          </div>
          <div class="text-xl font-extrabold text-blue-800 mt-1">
            Rp ${netProfit.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Net Profit Margin</div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button id="tab-fin-income" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'income' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          💵 Pendapatan (${incomes.length})
        </button>
        <button id="tab-fin-expenses" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'expenses' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          🧾 Pengeluaran (${expenses.length})
        </button>
        <button id="tab-fin-invoices" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'invoices' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          📑 Invoices (${invoices.length})
        </button>
        <button id="tab-fin-payments" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'payments' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          💳 Bukti Pembayaran (${payments.length})
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="finance-tab-content">
        ${activeFinanceTab === "income" ? renderIncomeTab(incomes) :
          activeFinanceTab === "expenses" ? renderExpensesTab(expenses) :
          activeFinanceTab === "invoices" ? renderInvoicesTab(invoices) :
          renderPaymentsTab(payments)}
      </div>
    </div>
  `;

  setupFinanceListeners(container, clients, projects, contents);
}

function renderIncomeTab(incomes) {
  if (incomes.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada data pendapatan tercatat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Tanggal</th>
              <th class="py-3.5 px-4">Sumber Pendapatan</th>
              <th class="py-3.5 px-4">Klien / Sponsor</th>
              <th class="py-3.5 px-4">Terkait Konten</th>
              <th class="py-3.5 px-4 text-right">Nominal (Rp)</th>
              <th class="py-3.5 px-4">Status Bayar</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${incomes.map(inc => {
              const clientName = store.getClientName(inc.client_id);
              const contentTitle = store.getContentTitle(inc.content_id);
              const isPaid = inc.payment_status === "Paid";

              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${inc.date}</td>
                  <td class="py-3 px-4 font-bold text-slate-900">${inc.income_source}</td>
                  <td class="py-3 px-4 font-medium text-slate-800">${clientName}</td>
                  <td class="py-3 px-4 max-w-xs truncate text-slate-500">${contentTitle}</td>
                  <td class="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                    Rp ${Number(inc.amount || 0).toLocaleString('id-ID')}
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${inc.payment_status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditIncomeModal('${inc.income_id}')">Edit</button>
                    <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteIncome('${inc.income_id}')">Hapus</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderExpensesTab(expenses) {
  if (expenses.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada pengeluaran tercatat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Tanggal</th>
              <th class="py-3.5 px-4">Deskripsi Beban</th>
              <th class="py-3.5 px-4">Kategori</th>
              <th class="py-3.5 px-4">Metode Bayar</th>
              <th class="py-3.5 px-4 text-right">Nominal (Rp)</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${expenses.map(exp => `
              <tr class="hover:bg-slate-50/70 transition">
                <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${exp.date}</td>
                <td class="py-3 px-4 font-bold text-slate-900">${exp.description}</td>
                <td class="py-3 px-4 font-medium text-slate-600">${exp.category}</td>
                <td class="py-3 px-4 text-slate-500">${exp.payment_method || '-'}</td>
                <td class="py-3 px-4 text-right font-mono font-extrabold text-rose-600">
                  Rp ${Number(exp.amount || 0).toLocaleString('id-ID')}
                </td>
                <td class="py-3 px-4 text-right space-x-2">
                  <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditExpenseModal('${exp.expense_id}')">Edit</button>
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteExpense('${exp.expense_id}')">Hapus</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderInvoicesTab(invoices) {
  if (invoices.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada invoice dibuat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">No. Invoice</th>
              <th class="py-3.5 px-4">Klien</th>
              <th class="py-3.5 px-4">Tanggal Faktur</th>
              <th class="py-3.5 px-4">Jatuh Tempo</th>
              <th class="py-3.5 px-4 text-right">Total Tagihan (Rp)</th>
              <th class="py-3.5 px-4">Status Pembayaran</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${invoices.map(inv => {
              const clientName = store.getClientName(inv.client_id);
              const isPaid = inv.payment_status === "Paid";

              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 font-mono font-bold text-blue-600">${inv.invoice_id}</td>
                  <td class="py-3 px-4 font-bold text-slate-900">${clientName}</td>
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${inv.invoice_date}</td>
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${inv.due_date}</td>
                  <td class="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                    Rp ${Number(inv.total || 0).toLocaleString('id-ID')}
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${inv.payment_status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditInvoiceModal('${inv.invoice_id}')">Edit</button>
                    <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteInvoice('${inv.invoice_id}')">Hapus</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderPaymentsTab(payments) {
  if (payments.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada riwayat pembayaran tercatat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">ID Pembayaran</th>
              <th class="py-3.5 px-4">No. Invoice Terkait</th>
              <th class="py-3.5 px-4">Tanggal Pembayaran</th>
              <th class="py-3.5 px-4">Metode Bayar</th>
              <th class="py-3.5 px-4 text-right">Nominal Masuk (Rp)</th>
              <th class="py-3.5 px-4">Catatan</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${payments.map(pay => `
              <tr class="hover:bg-slate-50/70 transition">
                <td class="py-3 px-4 font-mono font-bold text-slate-900">${pay.payment_id}</td>
                <td class="py-3 px-4 font-mono text-blue-600">${pay.invoice_id || '-'}</td>
                <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${pay.date}</td>
                <td class="py-3 px-4 font-medium text-slate-800">${pay.payment_method || '-'}</td>
                <td class="py-3 px-4 text-right font-mono font-extrabold text-emerald-700">
                  Rp ${Number(pay.amount || 0).toLocaleString('id-ID')}
                </td>
                <td class="py-3 px-4 text-slate-500 max-w-xs truncate">${pay.notes || '-'}</td>
                <td class="py-3 px-4 text-right space-x-2">
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deletePayment('${pay.payment_id}')">Hapus</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function setupFinanceListeners(container, clients, projects, contents) {
  document.getElementById("tab-fin-income")?.addEventListener("click", () => {
    activeFinanceTab = "income";
    renderFinance(container);
  });
  document.getElementById("tab-fin-expenses")?.addEventListener("click", () => {
    activeFinanceTab = "expenses";
    renderFinance(container);
  });
  document.getElementById("tab-fin-invoices")?.addEventListener("click", () => {
    activeFinanceTab = "invoices";
    renderFinance(container);
  });
  document.getElementById("tab-fin-payments")?.addEventListener("click", () => {
    activeFinanceTab = "payments";
    renderFinance(container);
  });

  const btn = document.getElementById("btn-create-fin-item");
  const label = document.getElementById("btn-fin-action-label");
  if (label) {
    label.innerText = activeFinanceTab === "income" ? "+ Catat Pendapatan" :
                      activeFinanceTab === "expenses" ? "+ Catat Pengeluaran" :
                      activeFinanceTab === "invoices" ? "+ Buat Invoice Baru" :
                      "+ Catat Pembayaran";
  }

  btn?.addEventListener("click", () => {
    if (activeFinanceTab === "income") openIncomeModal(null, clients, projects, contents);
    else if (activeFinanceTab === "expenses") openExpenseModal(null, projects);
    else if (activeFinanceTab === "invoices") openInvoiceModal(null, clients, projects);
    else openPaymentModal();
  });

  // Global functions
  window.openEditIncomeModal = (id) => openIncomeModal(store.getItemById(SHEET_NAMES.INCOME, id), clients, projects, contents);
  window.deleteIncome = (id) => {
    if (confirm("Hapus catatan transaksi pendapatan ini?")) {
      store.deleteItem(SHEET_NAMES.INCOME, id);
      renderFinance(container);
    }
  };

  window.openEditExpenseModal = (id) => openExpenseModal(store.getItemById(SHEET_NAMES.EXPENSES, id), projects);
  window.deleteExpense = (id) => {
    if (confirm("Hapus catatan pengeluaran ini?")) {
      store.deleteItem(SHEET_NAMES.EXPENSES, id);
      renderFinance(container);
    }
  };

  window.openEditInvoiceModal = (id) => openInvoiceModal(store.getItemById(SHEET_NAMES.INVOICES, id), clients, projects);
  window.deleteInvoice = (id) => {
    if (confirm("Hapus invoice ini?")) {
      store.deleteItem(SHEET_NAMES.INVOICES, id);
      renderFinance(container);
    }
  };

  window.deletePayment = (id) => {
    if (confirm("Hapus catatan pembayaran ini?")) {
      store.deleteItem(SHEET_NAMES.PAYMENTS, id);
      renderFinance(container);
    }
  };
}

function openIncomeModal(income = null, clients = [], projects = [], contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!income;
  const data = income || {
    date: new Date().toISOString().slice(0, 10),
    income_source: "Brand Sponsorship / Endorsement",
    client_id: clients[0]?.client_id || "",
    project_id: projects[0]?.project_id || "",
    content_id: contents[0]?.content_id || "",
    amount: 5000000,
    payment_status: "Paid",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Pendapatan' : 'Catat Pendapatan Baru'}</h3>
          <button id="modal-inc-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="income-form" class="p-6 space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
              <input type="date" id="form-inc-date" value="${data.date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Sumber Pendapatan</label>
              <select id="form-inc-source" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${INCOME_SOURCES.map(s => `<option value="${s}" ${data.income_source === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Klien Pembayar</label>
              <select id="form-inc-client" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Tanpa Klien / Affiliate --</option>
                ${clients.map(c => `<option value="${c.client_id}" ${data.client_id === c.client_id ? 'selected' : ''}>${c.client_name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Terkait Konten</label>
              <select id="form-inc-content" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Umum / Tanpa Konten --</option>
                ${contents.map(c => `<option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>${c.content_title}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-inc-amount" required value="${data.amount}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Pembayaran</label>
              <select id="form-inc-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Paid" ${data.payment_status === 'Paid' ? 'selected' : ''}>Paid (Lunas)</option>
                <option value="Pending" ${data.payment_status === 'Pending' ? 'selected' : ''}>Pending (Menunggu Bayar)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan</label>
            <input type="text" id="form-inc-notes" value="${data.notes}" placeholder="DP 50% / Pelunasan termin 2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-inc-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Pendapatan</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-inc-close")?.addEventListener("click", close);
  document.getElementById("modal-inc-cancel")?.addEventListener("click", close);

  document.getElementById("income-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      date: document.getElementById("form-inc-date").value,
      income_source: document.getElementById("form-inc-source").value,
      client_id: document.getElementById("form-inc-client").value,
      content_id: document.getElementById("form-inc-content").value,
      amount: Number(document.getElementById("form-inc-amount").value) || 0,
      payment_status: document.getElementById("form-inc-status").value,
      notes: document.getElementById("form-inc-notes").value.trim()
    };
    if (isEdit) store.updateItem(SHEET_NAMES.INCOME, income.income_id, payload);
    else store.createItem(SHEET_NAMES.INCOME, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}

function openExpenseModal(expense = null, projects = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!expense;
  const data = expense || {
    date: new Date().toISOString().slice(0, 10),
    category: "Equipment & Gear",
    description: "",
    amount: 250000,
    payment_method: "BCA Transfer",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Pengeluaran' : 'Catat Pengeluaran Baru'}</h3>
          <button id="modal-exp-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="expense-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Deskripsi Pengeluaran <span class="text-rose-500">*</span></label>
            <input type="text" id="form-exp-desc" required value="${data.description}" placeholder="Contoh: Beli memory card SD 128GB" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal</label>
              <input type="date" id="form-exp-date" value="${data.date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Kategori Beban</label>
              <select id="form-exp-cat" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${EXPENSE_CATEGORIES.map(c => `<option value="${c}" ${data.category === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-exp-amount" required value="${data.amount}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Metode Pembayaran</label>
              <input type="text" id="form-exp-method" value="${data.payment_method}" placeholder="BCA / ShopeePay" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-exp-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Pengeluaran</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-exp-close")?.addEventListener("click", close);
  document.getElementById("modal-exp-cancel")?.addEventListener("click", close);

  document.getElementById("expense-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      description: document.getElementById("form-exp-desc").value.trim(),
      date: document.getElementById("form-exp-date").value,
      category: document.getElementById("form-exp-cat").value,
      amount: Number(document.getElementById("form-exp-amount").value) || 0,
      payment_method: document.getElementById("form-exp-method").value.trim()
    };
    if (isEdit) store.updateItem(SHEET_NAMES.EXPENSES, expense.expense_id, payload);
    else store.createItem(SHEET_NAMES.EXPENSES, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}

function openInvoiceModal(invoice = null, clients = [], projects = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!invoice;
  const data = invoice || {
    invoice_id: "INV-" + new Date().getFullYear() + "-" + Math.floor(100 + Math.random() * 900),
    client_id: clients[0]?.client_id || "",
    project_id: projects[0]?.project_id || "",
    invoice_date: new Date().toISOString().slice(0, 10),
    due_date: new Date().toISOString().slice(0, 10),
    total: 10000000,
    payment_status: "Unpaid",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Invoice' : 'Buat Invoice Baru'}</h3>
          <button id="modal-inv-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="invoice-form" class="p-6 space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nomor Invoice <span class="text-rose-500">*</span></label>
              <input type="text" id="form-inv-num" required value="${data.invoice_id}" class="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Klien Tertuju</label>
              <select id="form-inv-client" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${clients.map(c => `<option value="${c.client_id}" ${data.client_id === c.client_id ? 'selected' : ''}>${c.client_name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Terbit</label>
              <input type="date" id="form-inv-date" value="${data.invoice_date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Jatuh Tempo</label>
              <input type="date" id="form-inv-due" value="${data.due_date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Total Tagihan (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-inv-total" required value="${data.total}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Bayar</label>
              <select id="form-inv-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Unpaid" ${data.payment_status === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
                <option value="Partially Paid" ${data.payment_status === 'Partially Paid' ? 'selected' : ''}>Partially Paid</option>
                <option value="Paid" ${data.payment_status === 'Paid' ? 'selected' : ''}>Paid (Lunas)</option>
              </select>
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-inv-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Invoice</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-inv-close")?.addEventListener("click", close);
  document.getElementById("modal-inv-cancel")?.addEventListener("click", close);

  document.getElementById("invoice-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      invoice_id: document.getElementById("form-inv-num").value.trim(),
      client_id: document.getElementById("form-inv-client").value,
      invoice_date: document.getElementById("form-inv-date").value,
      due_date: document.getElementById("form-inv-due").value,
      total: Number(document.getElementById("form-inv-total").value) || 0,
      payment_status: document.getElementById("form-inv-status").value
    };
    if (isEdit) store.updateItem(SHEET_NAMES.INVOICES, invoice.invoice_id, payload);
    else store.createItem(SHEET_NAMES.INVOICES, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}

function openPaymentModal() {
  const invoices = store.getItems(SHEET_NAMES.INVOICES);
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">Catat Pembayaran Masuk</h3>
          <button id="modal-pay-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="payment-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Terkait Invoice</label>
            <select id="form-pay-inv" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none font-mono">
              <option value="">-- Tanpa Invoice Langsung --</option>
              ${invoices.map(inv => `<option value="${inv.invoice_id}">${inv.invoice_id} - Rp ${Number(inv.total).toLocaleString('id-ID')}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Pembayaran</label>
              <input type="date" id="form-pay-date" value="${new Date().toISOString().slice(0, 10)}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-pay-amt" required placeholder="5000000" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Metode Pembayaran</label>
            <input type="text" id="form-pay-method" placeholder="BCA Corporate Transfer" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan</label>
            <input type="text" id="form-pay-notes" placeholder="Pelunasan termin 1" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-pay-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Bukti Pembayaran</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-pay-close")?.addEventListener("click", close);
  document.getElementById("modal-pay-cancel")?.addEventListener("click", close);

  document.getElementById("payment-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const invId = document.getElementById("form-pay-inv").value;
    const amt = Number(document.getElementById("form-pay-amt").value) || 0;

    store.createItem(SHEET_NAMES.PAYMENTS, {
      invoice_id: invId,
      date: document.getElementById("form-pay-date").value,
      amount: amt,
      payment_method: document.getElementById("form-pay-method").value.trim(),
      notes: document.getElementById("form-pay-notes").value.trim()
    });

    // Otomatis update status invoice jika ada
    if (invId) {
      store.updateItem(SHEET_NAMES.INVOICES, invId, { payment_status: "Paid" });
    }

    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}

return { renderFinance: renderFinance };
})();

// ==================== VIEW: js\views\timetracking.js ====================
const { renderTimeTracking } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: TIME TRACKING & ROUTINES
 * Modul 15 (Time Tracking) & Modul 16 (Checklist & Routines)
 * File: js/views/timetracking.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
let timerInterval = null;
function renderTimeTracking(container) {
  const timeEntries = store.getItems(SHEET_NAMES.TIME_TRACKING);
  const tasks = store.getItems(SHEET_NAMES.CONTENT_TASKS);
  const activeTimer = store.getActiveTimer();
  const routineSetting = store.getItemById(SHEET_NAMES.SETTINGS, "daily_routine_items");
  let routines = [];
  try {
    routines = routineSetting ? JSON.parse(routineSetting.value || routineSetting.setting_value) : [];
  } catch (e) {
    routines = [];
  }

  // Calculate total time spent
  let totalMinutes = 0;
  timeEntries.forEach(t => {
    totalMinutes += Number(t.duration) || 0;
  });
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Routines completed count
  const completedRoutines = routines.filter(r => r.done).length;
  const routinePct = routines.length > 0 ? Math.round((completedRoutines / routines.length) * 100) : 0;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 15 • 16</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Produktivitas & Waktu</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Time Tracking & Rutinitas Kreator</h1>
          <p class="text-xs text-slate-500 mt-0.5">Stopwatch pelacakan durasi shooting, editing, dan checklist rutinitas harian konten kreator.</p>
        </div>

        <button id="btn-manual-time-log" class="inline-flex items-center gap-2 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xs transition">
          <span>⏱️</span> <span>+ Catat Durasi Manual</span>
        </button>
      </div>

      <!-- Live Interactive Stopwatch Panel -->
      <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2 text-center md:text-left">
          <div class="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[11px] font-bold text-indigo-200">
            <span class="w-2 h-2 rounded-full ${activeTimer ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}"></span>
            <span>${activeTimer ? 'STOPWATCH SEDANG BERJALAN' : 'STOPWATCH SIAP DIGUNAKAN'}</span>
          </div>
          <h3 class="text-lg font-extrabold text-white">
            ${activeTimer ? activeTimer.activity : 'Mulai Hitung Waktu Pekerjaan'}
          </h3>
          <p class="text-xs text-slate-300 max-w-md">
            ${activeTimer ? `Dimulai pada: ${new Date(activeTimer.startTime).toLocaleTimeString('id-ID')}` : 'Pilih tugas dan klik tombol mulai saat akan shooting, nulis naskah, atau editing video.'}
          </p>
        </div>

        <!-- Stopwatch Display -->
        <div class="flex flex-col items-center gap-3">
          <div id="live-timer-display" class="font-mono text-4xl sm:text-5xl font-extrabold tracking-wider text-amber-400 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 shadow-inner">
            00:00:00
          </div>

          <div class="flex items-center gap-2.5">
            ${!activeTimer ? `
              <button id="btn-start-timer" class="px-6 py-2.5 rounded-xl font-extrabold text-xs bg-emerald-500 hover:bg-emerald-600 text-slate-900 shadow-lg shadow-emerald-500/20 transition flex items-center gap-2">
                <span>▶ Mulai Timer</span>
              </button>
            ` : `
              <button id="btn-stop-timer" class="px-6 py-2.5 rounded-xl font-extrabold text-xs bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 transition flex items-center gap-2">
                <span>⏹ Berhenti & Simpan Log</span>
              </button>
            `}
          </div>
        </div>
      </div>

      <!-- Split Grid: Rutinitas Harian vs Riwayat Log Waktu -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Kolom 1: Checklist Rutinitas Harian Kreator (Module 16) -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="text-lg">✅</span>
              <div>
                <h3 class="font-bold text-sm text-slate-900">Rutinitas Harian Kreator</h3>
                <p class="text-xs text-slate-500">Kebiasaan membangun channel</p>
              </div>
            </div>
            <button id="btn-reset-routines" class="text-xs font-bold text-slate-400 hover:text-slate-700">
              Reset
            </button>
          </div>

          <!-- Routine Progress Bar -->
          <div>
            <div class="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
              <span>Selesai (${completedRoutines}/${routines.length})</span>
              <span class="text-blue-600">${routinePct}%</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div class="bg-blue-600 h-2 rounded-full transition-all" style="width: ${routinePct}%"></div>
            </div>
          </div>

          <!-- Add Routine Item -->
          <form id="add-routine-form" class="flex items-center gap-2">
            <input type="text" id="new-routine-text" required placeholder="Tambah kebiasaan harian..." class="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs outline-none">
            <button type="submit" class="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition">+</button>
          </form>

          <!-- List Items -->
          <div class="space-y-2 text-xs">
            ${routines.map(r => `
              <div class="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 transition flex items-center justify-between gap-2 group">
                <label class="flex items-center gap-2.5 cursor-pointer flex-1">
                  <input type="checkbox" ${r.done ? 'checked' : ''} onchange="window.toggleRoutineItem('${r.id}')" class="rounded text-blue-600 w-4 h-4">
                  <span class="${r.done ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}">${r.text}</span>
                </label>
                ${auth.isAdminOrOwner() ? `
                  <button class="text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition" onclick="window.deleteRoutineItem('${r.id}')">✕</button>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Kolom 2 & 3: Riwayat Log Durasi Waktu Kerja (Module 15) -->
        <div class="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 class="font-bold text-sm text-slate-900">Riwayat Durasi Pekerjaan</h3>
              <p class="text-xs text-slate-500">Total terakumulasi: <strong class="text-slate-900">${totalHours} Jam (${totalMinutes} Menit)</strong></p>
            </div>
            <span class="text-xs font-bold text-slate-400">${timeEntries.length} Sesi Tercatat</span>
          </div>

          ${timeEntries.length === 0 ? `
            <div class="text-center py-12 text-slate-400 text-xs">
              Belum ada pencatatan durasi waktu kerja.
            </div>
          ` : `
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs text-slate-700">
                <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
                  <tr>
                    <th class="py-3 px-4">Tanggal</th>
                    <th class="py-3 px-4">Aktivitas / Pengerjaan</th>
                    <th class="py-3 px-4">Terkait Tugas</th>
                    <th class="py-3 px-4 text-center">Waktu</th>
                    <th class="py-3 px-4 text-right">Durasi</th>
                    <th class="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${timeEntries.map(entry => {
                    const task = store.getItemById(SHEET_NAMES.CONTENT_TASKS, entry.task_id) || {};

                    return `
                      <tr class="hover:bg-slate-50/70 transition">
                        <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${entry.date}</td>
                        <td class="py-3 px-4 font-bold text-slate-900">
                          <div>${entry.activity}</div>
                          ${entry.notes ? `<div class="text-[10px] text-slate-400 font-normal mt-0.5 truncate max-w-xs">${entry.notes}</div>` : ''}
                        </td>
                        <td class="py-3 px-4 text-slate-600 max-w-xs truncate">${task.task_title || '-'}</td>
                        <td class="py-3 px-4 text-center font-mono text-[11px] text-slate-500">${entry.start_time || '-'} s/d ${entry.end_time || '-'}</td>
                        <td class="py-3 px-4 text-right font-mono font-extrabold text-blue-600">
                          ${entry.duration} Mnt
                        </td>
                        <td class="py-3 px-4 text-right">
                          <div class="flex items-center justify-end gap-2">
                            <button class="font-bold text-blue-600 hover:text-blue-800 text-xs" onclick="window.openEditTimeModal('${entry.time_id}')">
                              Edit
                            </button>
                            ${auth.isAdminOrOwner() ? `
                              <button class="font-bold text-slate-400 hover:text-rose-600 text-xs" onclick="window.deleteTimeEntry('${entry.time_id}')">
                                Hapus
                              </button>
                            ` : ''}
                          </div>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  // Live Timer Counter Function
  if (timerInterval) clearInterval(timerInterval);
  if (activeTimer) {
    const updateDisplay = () => {
      const display = document.getElementById("live-timer-display");
      if (!display) return;
      const start = new Date(activeTimer.startTime);
      const now = new Date();
      const diffSec = Math.floor((now - start) / 1000);

      const h = String(Math.floor(diffSec / 3600)).padStart(2, '0');
      const m = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
      const s = String(diffSec % 60).padStart(2, '0');
      display.innerText = `${h}:${m}:${s}`;
    };
    updateDisplay();
    timerInterval = setInterval(updateDisplay, 1000);
  }

  setupTimeListeners(container, tasks, routines);
}

function setupTimeListeners(container, tasks, routines) {
  // Start Timer
  document.getElementById("btn-start-timer")?.addEventListener("click", () => {
    const act = prompt("Masukkan nama aktivitas yang akan dikerjakan:", "Shooting Video TikTok Skincare");
    if (act) {
      store.startTimer("", act);
      renderTimeTracking(container);
    }
  });

  // Stop Timer
  document.getElementById("btn-stop-timer")?.addEventListener("click", () => {
    const notes = prompt("Catatan pekerjaan (opsional):", "Take video selesai");
    const saved = store.stopTimer(notes);
    alert(`⏱️ Berhasil mencatat durasi ${saved.duration} menit ke dalam time log!`);
    renderTimeTracking(container);
  });

  // Manual Time Log
  document.getElementById("btn-manual-time-log")?.addEventListener("click", () => {
    openManualTimeModal(tasks);
  });

  // Add routine
  document.getElementById("add-routine-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("new-routine-text");
    const text = input.value.trim();
    if (!text) return;

    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "daily_routine_items");
    let list = [];
    try { list = JSON.parse(setting.value || setting.setting_value); } catch (e) {}
    list.push({ id: "RTN-" + Date.now(), text, done: false });
    store.updateItem(SHEET_NAMES.SETTINGS, "daily_routine_items", { value: JSON.stringify(list) });
    renderTimeTracking(container);
  });

  // Reset routines
  document.getElementById("btn-reset-routines")?.addEventListener("click", () => {
    if (confirm("Reset seluruh status centang rutinitas harian untuk hari baru?")) {
      const setting = store.getItemById(SHEET_NAMES.SETTINGS, "daily_routine_items");
      let list = [];
      try { list = JSON.parse(setting.value || setting.setting_value); } catch (e) {}
      list = list.map(item => ({ ...item, done: false }));
      store.updateItem(SHEET_NAMES.SETTINGS, "daily_routine_items", { value: JSON.stringify(list) });
      renderTimeTracking(container);
    }
  });

  // Global functions
  window.openEditTimeModal = (timeId) => {
    const entry = store.getItemById(SHEET_NAMES.TIME_TRACKING, timeId);
    if (entry) openManualTimeModal(tasks, entry);
  };

  window.toggleRoutineItem = (id) => {
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "daily_routine_items");
    let list = [];
    try { list = JSON.parse(setting.value || setting.setting_value); } catch (e) {}
    list = list.map(item => item.id === id ? { ...item, done: !item.done } : item);
    store.updateItem(SHEET_NAMES.SETTINGS, "daily_routine_items", { value: JSON.stringify(list) });
    renderTimeTracking(container);
  };

  window.deleteRoutineItem = (id) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus rutinitas.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus rutinitas.");
      return;
    }
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "daily_routine_items");
    let list = [];
    try { list = JSON.parse(setting.value || setting.setting_value); } catch (e) {}
    list = list.filter(item => item.id !== id);
    store.updateItem(SHEET_NAMES.SETTINGS, "daily_routine_items", { value: JSON.stringify(list) });
    renderTimeTracking(container);
  };

  window.deleteTimeEntry = (id) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan durasi kerja.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan durasi kerja.");
      return;
    }
    if (confirm("Hapus baris catatan waktu kerja ini?")) {
      store.deleteItem(SHEET_NAMES.TIME_TRACKING, id);
      if (window.showToast) window.showToast("🗑️ Catatan durasi berhasil dihapus.", "info");
      renderTimeTracking(container);
    }
  };
}

function openManualTimeModal(tasks = [], item = null) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!item;
  const data = item || {
    activity: "",
    task_id: "",
    date: new Date().toISOString().slice(0, 10),
    duration: 60,
    start_time: "09:00",
    end_time: "10:00",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Catatan Durasi Kerja' : 'Catat Durasi Kerja Manual'}
            </h3>
            <p class="text-xs text-slate-500">${isEdit ? 'Perbarui rincian durasi atau tugas terkait' : 'Dokumentasikan durasi jam kerja secara manual'}</p>
          </div>
          <button id="modal-time-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="time-log-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Aktivitas <span class="text-rose-500">*</span></label>
            <input type="text" id="form-time-act" required value="${data.activity || ''}" placeholder="Shooting scene texture serum" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Terkait Tugas</label>
            <select id="form-time-task" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
              <option value="">-- Umum / Tanpa Tugas --</option>
              ${tasks.map(t => `<option value="${t.task_id}" ${data.task_id === t.task_id ? 'selected' : ''}>${t.task_title}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal</label>
              <input type="date" id="form-time-date" value="${data.date || new Date().toISOString().slice(0, 10)}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Durasi Total (Menit) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-time-dur" required value="${data.duration || 60}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Jam Mulai</label>
              <input type="time" id="form-time-start" value="${data.start_time || '09:00'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Jam Selesai</label>
              <input type="time" id="form-time-end" value="${data.end_time || '10:00'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
            <input type="text" id="form-time-notes" value="${data.notes || ''}" placeholder="Shooting di studio lantai 2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-time-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Log</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-time-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">${isEdit ? 'Simpan Perubahan' : 'Simpan Log Waktu'}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-time-close")?.addEventListener("click", close);
  document.getElementById("modal-time-cancel")?.addEventListener("click", close);

  document.getElementById("modal-time-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus baris catatan waktu kerja ini?")) {
      store.deleteItem(SHEET_NAMES.TIME_TRACKING, item.time_id);
      if (window.showToast) window.showToast("🗑️ Catatan durasi berhasil dihapus.", "info");
      close();
      const main = document.getElementById("main-view-container");
      if (main) renderTimeTracking(main);
    }
  });

  document.getElementById("time-log-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      task_id: document.getElementById("form-time-task").value,
      activity: document.getElementById("form-time-act").value.trim(),
      date: document.getElementById("form-time-date").value,
      duration: Number(document.getElementById("form-time-dur").value) || 0,
      start_time: document.getElementById("form-time-start").value,
      end_time: document.getElementById("form-time-end").value,
      notes: document.getElementById("form-time-notes").value.trim()
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.TIME_TRACKING, item.time_id, payload);
      if (window.showToast) window.showToast("✅ Catatan durasi berhasil diperbarui!", "success");
    } else {
      store.createItem(SHEET_NAMES.TIME_TRACKING, payload);
      if (window.showToast) window.showToast("✅ Catatan durasi baru berhasil disimpan!", "success");
    }

    close();
    const main = document.getElementById("main-view-container");
    if (main) renderTimeTracking(main);
  });
}

return { renderTimeTracking: renderTimeTracking };
})();

// ==================== VIEW: js\views\targets.js ====================
const { renderTargets } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: TARGETS & PRODUCTIVITY
 * Modul 17 (Target & Productivity)
 * File: js/views/targets.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
function renderTargets(container) {
  const targets = store.getItems(SHEET_NAMES.TARGETS);

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 17</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Sasaran & KPI</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Targets & Productivity Tracker</h1>
          <p class="text-xs text-slate-500 mt-0.5">Penetapan target kuota video, sasaran views, pertumbuhan followers, dan realisasi omzet studio.</p>
        </div>

        <button id="btn-create-target" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
          <span>+ Pasang Target Baru</span>
        </button>
      </div>

      <!-- Target Cards Grid -->
      ${targets.length === 0 ? `
        <div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">
          Belum ada target KPI yang dibuat. Klik "+ Pasang Target Baru" untuk mulai.
        </div>
      ` : `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          ${targets.map(tgt => {
            const targetVal = Number(tgt.target_value) || 1;
            const actualVal = Number(tgt.actual_value) || 0;
            const pct = Number(((actualVal / targetVal) * 100).toFixed(1));

            let statusColor = "bg-blue-100 text-blue-800";
            let barColor = "bg-blue-600";
            if (pct >= 100) {
              statusColor = "bg-emerald-100 text-emerald-800";
              barColor = "bg-emerald-500";
            } else if (pct < 50) {
              statusColor = "bg-rose-100 text-rose-800";
              barColor = "bg-rose-500";
            } else if (pct < 80) {
              statusColor = "bg-amber-100 text-amber-800";
              barColor = "bg-amber-500";
            }

            const isCurrency = tgt.target_type === "Revenue";

            return `
              <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
                <div class="space-y-3">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">${tgt.period || 'Bulanan'}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor}">${tgt.status || 'On Track'}</span>
                  </div>

                  <div>
                    <h3 class="font-extrabold text-sm text-slate-900 leading-snug">${tgt.target_name}</h3>
                    <div class="text-[11px] text-blue-600 font-semibold mt-0.5">${tgt.target_type}</div>
                  </div>

                  <!-- Achievement Numbers -->
                  <div class="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-2">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-400">Realisasi:</span>
                      <span class="font-extrabold text-slate-900 font-mono">
                        ${isCurrency ? 'Rp ' + actualVal.toLocaleString('id-ID') : actualVal.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-400">Target Sasaran:</span>
                      <span class="font-bold text-slate-600 font-mono">
                        ${isCurrency ? 'Rp ' + targetVal.toLocaleString('id-ID') : targetVal.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <!-- Progress Bar -->
                    <div class="pt-1">
                      <div class="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                        <div class="${barColor} h-2 rounded-full transition-all" style="width: ${Math.min(100, pct)}%"></div>
                      </div>
                      <div class="text-right text-[10px] font-extrabold text-slate-700 mt-1">${pct}% Tercapai</div>
                    </div>
                  </div>

                  ${tgt.notes ? `<p class="text-[11px] text-slate-500 italic">"${tgt.notes}"</p>` : ''}
                </div>

                <!-- Footer Actions -->
                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button class="font-bold text-emerald-600 hover:text-emerald-800" onclick="window.quickUpdateActualTarget('${tgt.target_id}', ${actualVal})">
                    + Update Angka
                  </button>

                  <div class="space-x-2">
                    <button class="font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditTargetModal('${tgt.target_id}')">Edit</button>
                    <button class="font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteTarget('${tgt.target_id}')">Hapus</button>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;

  setupTargetListeners(container);
}

function setupTargetListeners(container) {
  document.getElementById("btn-create-target")?.addEventListener("click", () => {
    openTargetModal();
  });

  window.quickUpdateActualTarget = (targetId, currentVal) => {
    const nextVal = prompt(`Masukkan angka pencapaian aktual baru:`, currentVal);
    if (nextVal !== null) {
      const num = Number(nextVal) || 0;
      const target = store.getItemById(SHEET_NAMES.TARGETS, targetId);
      const tgtVal = Number(target.target_value) || 1;
      const pct = Number(((num / tgtVal) * 100).toFixed(1));
      let status = "On Track";
      if (pct >= 100) status = "Achieved";
      else if (pct < 80) status = "Behind Target";

      store.updateItem(SHEET_NAMES.TARGETS, targetId, {
        actual_value: num,
        achievement_pct: pct,
        status: status
      });
      renderTargets(container);
    }
  };

  window.openEditTargetModal = (targetId) => {
    const tgt = store.getItemById(SHEET_NAMES.TARGETS, targetId);
    if (tgt) openTargetModal(tgt);
  };

  window.deleteTarget = (targetId) => {
    if (confirm("Hapus target sasaran ini?")) {
      store.deleteItem(SHEET_NAMES.TARGETS, targetId);
      renderTargets(container);
    }
  };
}

function openTargetModal(target = null) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!target;
  const data = target || {
    target_name: "",
    target_type: "Content Production",
    period: "November 2026",
    target_value: 20,
    actual_value: 0,
    status: "On Track",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Target Sasaran' : 'Pasang Target Baru'}</h3>
          <button id="modal-tgt-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="target-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Sasaran / Target <span class="text-rose-500">*</span></label>
            <input type="text" id="form-tgt-name" required value="${data.target_name}" placeholder="Contoh: Produksi 30 Video Pendek TikTok & Reels" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tipe Sasaran</label>
              <select id="form-tgt-type" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${TARGET_TYPES.map(t => `<option value="${t}" ${data.target_type === t ? 'selected' : ''}>${t}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Periode Waktu</label>
              <input type="text" id="form-tgt-period" value="${data.period}" placeholder="November 2026 / Q4 2026" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Target Sasaran <span class="text-rose-500">*</span></label>
              <input type="number" id="form-tgt-target" required value="${data.target_value}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Pencapaian Aktual Saat Ini</label>
              <input type="number" id="form-tgt-actual" value="${data.actual_value}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
            <input type="text" id="form-tgt-notes" value="${data.notes || ''}" placeholder="Catatan strategi mencapai target..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-tgt-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Target</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-tgt-close")?.addEventListener("click", close);
  document.getElementById("modal-tgt-cancel")?.addEventListener("click", close);

  document.getElementById("target-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const tgtVal = Number(document.getElementById("form-tgt-target").value) || 1;
    const actVal = Number(document.getElementById("form-tgt-actual").value) || 0;
    const pct = Number(((actVal / tgtVal) * 100).toFixed(1));

    let status = "On Track";
    if (pct >= 100) status = "Achieved";
    else if (pct < 80) status = "Behind Target";

    const payload = {
      target_name: document.getElementById("form-tgt-name").value.trim(),
      target_type: document.getElementById("form-tgt-type").value,
      period: document.getElementById("form-tgt-period").value.trim(),
      target_value: tgtVal,
      actual_value: actVal,
      achievement_pct: pct,
      status: status,
      notes: document.getElementById("form-tgt-notes").value.trim()
    };

    if (isEdit) store.updateItem(SHEET_NAMES.TARGETS, target.target_id, payload);
    else store.createItem(SHEET_NAMES.TARGETS, payload);

    close();
    const main = document.getElementById("main-view-container");
    if (main) renderTargets(main);
  });
}

return { renderTargets: renderTargets };
})();

// ==================== VIEW: js\views\reports.js ====================
const { renderReports } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: REPORTS & EXPORTS
 * Modul 19 (Reports & Analytics Export)
 * File: js/views/reports.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
let selectedReportType = "financial"; // 'financial', 'content', 'tasks', 'publications', 'analytics', 'timetracking'
let reportStartDate = "";
let reportEndDate = "";
let reportFilterBrand = "ALL";
let reportFilterPlatform = "ALL";
function renderReports(container) {
  const brands = store.getItems(SHEET_NAMES.BRANDS);

  // Generate data based on report type
  const reportData = getActiveReportData();

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 19</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Pusat Laporan & Ekspor</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Executive Studio Reports</h1>
          <p class="text-xs text-slate-500 mt-0.5">Generate laporan resmi produktivitas, jadwal publikasi, analitik performa, dan buku kas studio.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-export-excel" class="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <span>📊</span> <span>Ekspor Excel (.xlsx)</span>
          </button>
          <button id="btn-print-report" class="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <span>🖨️</span> <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      <!-- Filters & Report Type Selector -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <!-- Report Type Dropdown -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-700">Tipe Laporan:</span>
          <select id="report-type-select" class="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none">
            <option value="financial" ${selectedReportType === 'financial' ? 'selected' : ''}>💰 Laporan Keuangan (P&L Kas)</option>
            <option value="content" ${selectedReportType === 'content' ? 'selected' : ''}>🎬 Laporan Perencanaan Konten</option>
            <option value="tasks" ${selectedReportType === 'tasks' ? 'selected' : ''}>📋 Laporan Tugas & Subtask</option>
            <option value="publications" ${selectedReportType === 'publications' ? 'selected' : ''}>🚀 Laporan Riwayat Publikasi</option>
            <option value="analytics" ${selectedReportType === 'analytics' ? 'selected' : ''}>📈 Laporan Analitik & Jangkauan</option>
            <option value="timetracking" ${selectedReportType === 'timetracking' ? 'selected' : ''}>⏱️ Laporan Durasi Waktu Kerja</option>
          </select>
        </div>

        <!-- Filter Controls -->
        <div class="flex flex-wrap items-center gap-2.5 text-xs">
          <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span class="text-slate-400 font-medium">Dari:</span>
            <input type="date" id="report-start-date" value="${reportStartDate}" class="bg-transparent outline-none">
            <span class="text-slate-400 font-medium ml-1">S/d:</span>
            <input type="date" id="report-end-date" value="${reportEndDate}" class="bg-transparent outline-none">
          </div>

          <select id="report-filter-brand" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${reportFilterBrand === 'ALL' ? 'selected' : ''}>Semua Brand</option>
            ${brands.map(b => `<option value="${b.brand_id}" ${reportFilterBrand === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
          </select>

          <select id="report-filter-platform" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${reportFilterPlatform === 'ALL' ? 'selected' : ''}>Semua Platform</option>
            ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${reportFilterPlatform === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Printable Report Sheet Container -->
      <div id="printable-report-area" class="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
        <!-- Official Document Letterhead -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-slate-900 gap-4">
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">LAPORAN RESMI EKSEKUTIF KREATOR</div>
            <h2 class="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">${reportData.title}</h2>
            <div class="text-xs text-slate-500 mt-0.5">Periode: ${reportStartDate || 'Awal'} s/d ${reportEndDate || 'Sekarang'} • Dicetak: ${new Date().toLocaleDateString('id-ID')}</div>
          </div>
          <div class="text-right">
            <div class="font-extrabold text-sm text-slate-900">CREATOR STUDIO OS</div>
            <div class="text-[11px] text-slate-400">Database: Google Sheets Terpadu</div>
          </div>
        </div>

        <!-- Metric Highlight Banner -->
        ${reportData.summaryCards ? `
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            ${reportData.summaryCards.map(c => `
              <div>
                <div class="text-[10px] font-bold text-slate-400 uppercase">${c.label}</div>
                <div class="text-base font-extrabold text-slate-900 mt-0.5">${c.value}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Report Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                ${reportData.headers.map(h => `<th class="py-3 px-4 ${h.align || 'text-left'}">${h.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${reportData.rows.length === 0 ? `
                <tr><td colspan="${reportData.headers.length}" class="py-8 text-center text-slate-400">Tidak ada data untuk filter yang dipilih.</td></tr>
              ` : reportData.rows.map(row => `
                <tr class="hover:bg-slate-50/50">
                  ${row.map((cell, idx) => {
                    const align = reportData.headers[idx]?.align || 'text-left';
                    return `<td class="py-3 px-4 ${align}">${cell}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  setupReportsListeners(container, reportData);
}

function getActiveReportData() {
  if (selectedReportType === "financial") {
    const incomes = store.getItems(SHEET_NAMES.INCOME);
    const expenses = store.getItems(SHEET_NAMES.EXPENSES);

    let totInc = 0;
    let totExp = 0;
    incomes.forEach(i => totInc += (Number(i.amount) || 0));
    expenses.forEach(e => totExp += (Number(e.amount) || 0));

    const rows = [
      ...incomes.map(i => [
        i.date,
        "Kas Masuk",
        i.income_source,
        store.getClientName(i.client_id),
        "Rp " + Number(i.amount).toLocaleString('id-ID'),
        i.payment_status
      ]),
      ...expenses.map(e => [
        e.date,
        "Beban Keluar",
        e.description,
        e.category,
        "Rp " + Number(e.amount).toLocaleString('id-ID'),
        e.payment_method
      ])
    ];

    return {
      title: "Laporan Keuangan & Arus Kas Studio (P&L)",
      summaryCards: [
        { label: "Total Kas Masuk", value: "Rp " + totInc.toLocaleString('id-ID') },
        { label: "Total Pengeluaran", value: "Rp " + totExp.toLocaleString('id-ID') },
        { label: "Laba Bersih", value: "Rp " + (totInc - totExp).toLocaleString('id-ID') },
        { label: "Total Transaksi", value: rows.length + " Baris" }
      ],
      headers: [
        { label: "Tanggal" },
        { label: "Tipe Arus" },
        { label: "Uraian / Deskripsi" },
        { label: "Kategori / Klien" },
        { label: "Nominal", align: "text-right font-mono font-bold" },
        { label: "Status / Metode" }
      ],
      rows
    };
  }

  if (selectedReportType === "content") {
    const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
    return {
      title: "Laporan Perencanaan & Pipeline Konten",
      summaryCards: [
        { label: "Total Konten", value: contents.length },
        { label: "Dalam Produksi", value: contents.filter(c => c.status === "In Production").length },
        { label: "Siap Tayang", value: contents.filter(c => c.status === "Ready").length },
        { label: "Sudah Tayang", value: contents.filter(c => c.status === "Published").length }
      ],
      headers: [
        { label: "Judul Konten" },
        { label: "Platform" },
        { label: "Brand" },
        { label: "Pilar" },
        { label: "Target Tayang" },
        { label: "Status" }
      ],
      rows: contents.map(c => [
        c.content_title,
        c.platform,
        store.getBrandName(c.brand_id),
        c.content_pillar || '-',
        c.planned_date || '-',
        c.status
      ])
    };
  }

  if (selectedReportType === "tasks") {
    const tasks = store.getItems(SHEET_NAMES.CONTENT_TASKS);
    return {
      title: "Laporan Tugas & Produktivitas Kerja",
      summaryCards: [
        { label: "Total Tugas", value: tasks.length },
        { label: "Selesai", value: tasks.filter(t => t.status === "Completed").length },
        { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length },
        { label: "Pending", value: tasks.filter(t => t.status === "To Do").length }
      ],
      headers: [
        { label: "Nama Tugas" },
        { label: "PIC Ditugaskan" },
        { label: "Prioritas" },
        { label: "Deadline" },
        { label: "Progres", align: "text-right" },
        { label: "Status" }
      ],
      rows: tasks.map(t => [
        t.task_title,
        store.getUserName(t.assigned_user),
        t.priority,
        t.deadline,
        (t.progress || 0) + "%",
        t.status
      ])
    };
  }

  // Default: Analitik
  const analytics = store.getItems(SHEET_NAMES.CONTENT_ANALYTICS);
  return {
    title: "Laporan Analitik & Jangkauan Video",
    summaryCards: [
      { label: "Total Views", value: analytics.reduce((acc, a) => acc + (Number(a.views) || 0), 0).toLocaleString('id-ID') },
      { label: "Total Likes", value: analytics.reduce((acc, a) => acc + (Number(a.likes) || 0), 0).toLocaleString('id-ID') },
      { label: "Total Shares", value: analytics.reduce((acc, a) => acc + (Number(a.shares) || 0), 0).toLocaleString('id-ID') },
      { label: "Total Snapshot", value: analytics.length }
    ],
    headers: [
      { label: "Konten" },
      { label: "Platform" },
      { label: "Tanggal" },
      { label: "Views", align: "text-right font-mono" },
      { label: "Likes", align: "text-right font-mono" },
      { label: "ER %", align: "text-right font-mono font-bold" }
    ],
    rows: analytics.map(a => [
      store.getContentTitle(a.content_id),
      a.platform,
      a.snapshot_date,
      Number(a.views || 0).toLocaleString('id-ID'),
      Number(a.likes || 0).toLocaleString('id-ID'),
      (a.engagement_rate || 0) + "%"
    ])
  };
}

function setupReportsListeners(container, reportData) {
  document.getElementById("report-type-select")?.addEventListener("change", (e) => {
    selectedReportType = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-start-date")?.addEventListener("change", (e) => {
    reportStartDate = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-end-date")?.addEventListener("change", (e) => {
    reportEndDate = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-filter-brand")?.addEventListener("change", (e) => {
    reportFilterBrand = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-filter-platform")?.addEventListener("change", (e) => {
    reportFilterPlatform = e.target.value;
    renderReports(container);
  });

  // Export to Excel using SheetJS
  document.getElementById("btn-export-excel")?.addEventListener("click", () => {
    if (!window.XLSX) {
      alert("Library SheetJS sedang dimuat, silakan coba sesaat lagi.");
      return;
    }

    const wsData = [
      [reportData.title],
      ["Periode: " + (reportStartDate || 'Awal') + " s/d " + (reportEndDate || 'Sekarang')],
      [],
      reportData.headers.map(h => h.label),
      ...reportData.rows
    ];

    const ws = window.XLSX.utils.aoa_to_sheet(wsData);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Laporan_Kreator");

    const fileName = `Laporan_${selectedReportType}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    window.XLSX.writeFile(wb, fileName);
  });

  // Print Report
  document.getElementById("btn-print-report")?.addEventListener("click", () => {
    window.print();
  });
}

return { renderReports: renderReports };
})();

// ==================== VIEW: js\views\notifications.js ====================
const { renderNotifications } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: NOTIFICATIONS
 * Modul 20 (Notifications & Activity Alerts)
 * File: js/views/notifications.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
function renderNotifications(container) {
  const notifications = store.getItems(SHEET_NAMES.NOTIFICATIONS);
  const unreadCount = notifications.filter(n => n.read_status === "Unread").length;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 20</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Pusat Notifikasi</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Notifikasi & Pengingat Aktivitas</h1>
          <p class="text-xs text-slate-500 mt-0.5">Pengingat deadline shooting, jadwal publikasi video, jatuh tempo invoice, dan review revisi.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-mark-all-read" class="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition">
            ✓ Tandai Semua Terbaca
          </button>
        </div>
      </div>

      <!-- Notifications List Container -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-800">Daftar Notifikasi (${notifications.length})</span>
          ${unreadCount > 0 ? `
            <span class="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">
              ${unreadCount} Belum Dibaca
            </span>
          ` : `<span class="text-[11px] text-emerald-600 font-semibold">Semua telah dibaca</span>`}
        </div>

        ${notifications.length === 0 ? `
          <div class="p-12 text-center text-xs text-slate-400">
            🎉 Tidak ada notifikasi tertunda!
          </div>
        ` : `
          <div class="divide-y divide-slate-100">
            ${notifications.map(n => {
              const isUnread = n.read_status === "Unread";
              const typeIcon = getTypeIcon(n.type);

              return `
                <div class="p-4 flex items-start justify-between gap-4 transition ${isUnread ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'}">
                  <div class="flex items-start gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                      ${typeIcon}
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-extrabold text-xs text-slate-900">${n.title}</span>
                        <span class="text-[9px] font-bold px-2 py-0.2 rounded-md ${getTypeBadgeColor(n.type)}">${n.type}</span>
                        ${isUnread ? `<span class="w-2 h-2 rounded-full bg-blue-600"></span>` : ''}
                      </div>
                      <p class="text-xs text-slate-600 mt-1 leading-relaxed">${n.message}</p>
                      <div class="text-[10px] text-slate-400 mt-1.5 flex items-center gap-2">
                        <span>📅 ${n.date}</span>
                        ${n.link ? `<span>•</span> <a href="${n.link}" class="font-bold text-blue-600 hover:text-blue-800">Buka Menu Terkait →</a>` : ''}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    ${isUnread ? `
                      <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.markNotifRead('${n.notification_id}')">
                        Tandai Dibaca
                      </button>
                    ` : ''}
                    <button class="text-xs font-bold text-slate-300 hover:text-rose-600" onclick="window.deleteNotification('${n.notification_id}')">
                      ✕
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  document.getElementById("btn-mark-all-read")?.addEventListener("click", () => {
    notifications.forEach(n => {
      store.updateItem(SHEET_NAMES.NOTIFICATIONS, n.notification_id, { read_status: "Read" });
    });
    renderNotifications(container);
  });

  window.markNotifRead = (id) => {
    store.updateItem(SHEET_NAMES.NOTIFICATIONS, id, { read_status: "Read" });
    renderNotifications(container);
  };

  window.deleteNotification = (id) => {
    store.deleteItem(SHEET_NAMES.NOTIFICATIONS, id);
    renderNotifications(container);
  };
}

function getTypeIcon(type = "") {
  if (type.includes("Deadline")) return "⏳";
  if (type.includes("Publication") || type.includes("Publikasi")) return "🚀";
  if (type.includes("Payment") || type.includes("Pembayaran")) return "💰";
  if (type.includes("Revisi")) return "✂️";
  return "🔔";
}

function getTypeBadgeColor(type = "") {
  if (type.includes("Deadline")) return "bg-rose-100 text-rose-800";
  if (type.includes("Publication") || type.includes("Publikasi")) return "bg-blue-100 text-blue-800";
  if (type.includes("Payment") || type.includes("Pembayaran")) return "bg-emerald-100 text-emerald-800";
  return "bg-slate-100 text-slate-700";
}

return { renderNotifications: renderNotifications };
})();

// ==================== VIEW: js\views\settings.js ====================
const { setActiveSettingsTab, renderSettings } = (function() {
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: SETTINGS (MODULE 21)
 * File: js/views/settings.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
let activeSettingsTab = "cloud"; // 'cloud', 'profile', 'data'
let editingUserId = null; // null for add new user, userId string for editing
function setActiveSettingsTab(tab) {
  if (["cloud", "profile", "data"].includes(tab)) {
    activeSettingsTab = tab;
  }
}
function renderSettings(container) {
  const users = store.getItems(SHEET_NAMES.USERS) || [];
  const currentUser = auth.getCurrentUser() || users[0] || {
    user_id: "USR-001",
    name: "Rian Pratama",
    username: "rian",
    email: "rian.lead@creatorhub.id",
    role: "Owner",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    permissions: ["all"]
  };

  const gasUrl = store.getSetting ? store.getSetting("gas_api_url") : "";
  const secretToken = store.getSetting ? store.getSetting("secret_token", "PLANNER_SECRET_TOKEN_2026") : "PLANNER_SECRET_TOKEN_2026";
  const driveFolder = store.getSetting ? store.getSetting("drive_root_folder_id") : "";

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#d2e2ec] shadow-sm">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-[#2c6673] bg-[#e3f4f8] px-2.5 py-1 rounded-md">Modul 21</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-[#5c7786]">Pengaturan &amp; Sistem</span>
          </div>
          <h1 class="text-2xl font-extrabold text-[#143242] mt-1 tracking-tight">Application Settings &amp; Cloud Sync</h1>
          <p class="text-xs text-[#5c7786] mt-0.5">Konfigurasi REST API Google Apps Script, profil tim, manajemen hak akses (RBAC), dan backup database.</p>
        </div>

        <button onclick="window.triggerCloudSync()" class="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1e3e50] hover:bg-[#2c6673] text-white text-xs font-semibold shadow-sm transition">
          <span class="material-symbols-outlined text-[16px]">sync</span>
          <span>Tarik Data Sheets Sekarang</span>
        </button>
      </div>

      <!-- Settings Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-[#cbdfe9] pb-2 overflow-x-auto">
        <button id="tab-set-cloud" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeSettingsTab === 'cloud' ? 'bg-[#1e3e50] text-white shadow-xs' : 'bg-white text-[#5c7786] border border-[#d2e2ec] hover:bg-[#eaf2f7]'}">
          🌐 Integrasi Cloud (Supabase &amp; Sheets)
        </button>
        <button id="tab-set-profile" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeSettingsTab === 'profile' ? 'bg-[#1e3e50] text-white shadow-xs' : 'bg-white text-[#5c7786] border border-[#d2e2ec] hover:bg-[#eaf2f7]'}">
          👤 Profil Pengguna &amp; Hak Akses Tim (${users.length})
        </button>
        <button id="tab-set-data" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeSettingsTab === 'data' ? 'bg-[#1e3e50] text-white shadow-xs' : 'bg-white text-[#5c7786] border border-[#d2e2ec] hover:bg-[#eaf2f7]'}">
          💾 Manajemen Data &amp; Backup JSON
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="settings-tab-content">
        ${activeSettingsTab === "cloud" ? renderCloudTab(gasUrl, secretToken, driveFolder) :
          activeSettingsTab === "profile" ? renderProfileTab(currentUser, users) :
          renderDataTab()}
      </div>

      <!-- Modal Tambah / Edit Pengguna & Hak Akses -->
      <div id="modal-user-manage" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#d2e2ec] shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in duration-200">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#e3f4f8] text-[#1b6274] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[22px]">manage_accounts</span>
              </div>
              <div>
                <h3 id="modal-user-title" class="text-base font-extrabold text-[#143242]">Tambah Pengguna Baru</h3>
                <p class="text-xs text-[#5c7786]">Tentukan identitas dan hak akses modul untuk pengguna ini.</p>
              </div>
            </div>
            <button id="btn-close-user-modal" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <form id="form-manage-user" class="space-y-5 text-xs">
            <input type="hidden" id="manage-user-id" value="">

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Nama Lengkap <span class="text-rose-500">*</span></label>
                <input type="text" id="manage-user-name" required placeholder="Contoh: Andi Pratama" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Username Login <span class="text-rose-500">*</span></label>
                <input type="text" id="manage-user-username" required placeholder="andi" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Email</label>
                <input type="email" id="manage-user-email" placeholder="andi@creatorhub.id" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Password Login <span class="text-rose-500">*</span></label>
                <input type="password" id="manage-user-password" placeholder="123" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
                <p class="text-[10px] text-slate-400 mt-1">Kosongkan saat edit jika tidak ingin mengubah password.</p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Peran (Role)</label>
                <select id="manage-user-role" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-semibold">
                  <option value="Admin">Admin</option>
                  <option value="Video Editor">Video Editor</option>
                  <option value="Member / Creator">Member / Creator</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">URL Avatar (Opsional)</label>
                <input type="url" id="manage-user-avatar" placeholder="https://images.unsplash.com/..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
              </div>
            </div>

            <!-- Permission Checklist (RBAC) -->
            <div class="pt-2 border-t border-slate-100">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h4 class="font-extrabold text-sm text-[#143242]">Pengaturan Izin Hak Akses Modul (RBAC)</h4>
                  <p class="text-[11px] text-[#5c7786]">Centang modul yang diizinkan untuk diakses oleh pengguna ini.</p>
                </div>
                <div class="flex items-center gap-2">
                  <button type="button" id="btn-select-all-perms" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#1e3e50] text-[11px] font-bold transition">Pilih Semua</button>
                  <button type="button" id="btn-clear-all-perms" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-rose-600 text-[11px] font-bold transition">Hapus Semua</button>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/50">
                ${AVAILABLE_PERMISSIONS.map(p => `
                  <label class="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-slate-200 hover:border-[#1e3e50] transition cursor-pointer">
                    <input type="checkbox" name="module-perm" value="${p.key}" class="w-4 h-4 rounded text-[#1e3e50] border-slate-300 focus:ring-0">
                    <span class="material-symbols-outlined text-[16px] text-[#2c6673]">${p.icon}</span>
                    <span class="text-[11.5px] font-medium text-slate-800 leading-tight">${p.label}</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button type="button" id="btn-cancel-manage-user" class="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition">
                Batal
              </button>
              <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold shadow-md transition">
                Simpan Pengguna &amp; Izin Akses
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  setupSettingsListeners(container);
}

function renderCloudTab(gasUrl, secretToken, driveFolder) {
  const isGasConfigured = api.isConfigured();
  const supabaseUrl = localStorage.getItem("supabase_url") || (APP_CONFIG && APP_CONFIG.DEFAULT_SUPABASE_URL) || "";
  const supabaseKey = localStorage.getItem("supabase_anon_key") || (APP_CONFIG && APP_CONFIG.DEFAULT_SUPABASE_ANON_KEY) || "";
  const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

  return `
    <div class="space-y-8">
      
      <!-- ================================================================= -->
      <!-- SECTION 1: SUPABASE REALTIME CLOUD (Rekomendasi Utama Netlify)    -->
      <!-- ================================================================= -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-[#d2e2ec] shadow-sm space-y-5">
          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#e6f7f2] text-[#21835e] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[24px]">database</span>
              </div>
              <div>
                <h3 class="font-extrabold text-base text-[#143242]">Koneksi Supabase (Database PostgreSQL Real-time)</h3>
                <p class="text-xs text-[#5c7786]">Database cloud utama untuk multi-user, auto-save instan, dan hosting Netlify</p>
              </div>
            </div>
            <span class="text-xs font-extrabold px-3 py-1 rounded-full ${isSupabaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
              ${isSupabaseConfigured ? '🟢 Supabase Aktif' : '🟡 Mode Standalone'}
            </span>
          </div>

          <form id="form-supabase-config" class="space-y-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">
                Supabase Project URL <span class="text-rose-500">*</span>
              </label>
              <input type="url" id="cfg-supabase-url" required value="${supabaseUrl}" placeholder="https://your-project-id.supabase.co" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-[#1e3e50]">
              <p class="text-[11px] text-slate-400 mt-1">Dapatkan dari menu <em>Project Settings &gt; API</em> di dashboard Supabase Anda.</p>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">
                Supabase Project API Key (anon / public) <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="cfg-supabase-key" required value="${supabaseKey}" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-[#1e3e50]">
              <p class="text-[11px] text-slate-400 mt-1">Kunci API publik (anon key) aman digunakan di frontend website.</p>
            </div>

            <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button type="button" id="btn-test-supabase" class="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-2">
                <span>📡</span> <span>Tes Koneksi Supabase</span>
              </button>

              <div class="flex items-center gap-2">
                <button type="button" id="btn-fetch-supabase" class="px-4 py-2.5 rounded-xl bg-[#e3f4f8] hover:bg-[#d0ebf3] text-[#1b6274] font-bold text-xs transition flex items-center gap-1.5">
                  <span>🔄</span> <span>Tarik Seluruh Data Supabase</span>
                </button>
                <button type="submit" class="px-5 py-2.5 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs shadow-xs transition">
                  Simpan Konfigurasi Supabase
                </button>
              </div>
            </div>
          </form>

          <div id="supabase-status-box" class="hidden p-3.5 rounded-xl text-xs font-semibold"></div>

          <!-- Fitur Bagikan Link Auto-Connect ke Tim / HP Lain -->
          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f8fbfa] p-4 rounded-2xl border border-[#d6ede4]">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[18px]">share</span>
              </div>
              <div>
                <h4 class="font-extrabold text-xs text-[#143242]">Buka di HP / Bagikan ke Perangkat Tim Lain</h4>
                <p class="text-[11px] text-[#5c7786]">Salin link auto-connect agar perangkat lain langsung tersambung tanpa perlu ketik ulang URL &amp; Key.</p>
              </div>
            </div>
            <button type="button" id="btn-copy-team-link" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs whitespace-nowrap">
              <span class="material-symbols-outlined text-[16px]">link</span>
              <span>Salin Link Auto-Connect</span>
            </button>
          </div>
        </div>

        <!-- Panduan Supabase 3 Menit & Tips Multi-Perangkat -->
        <div class="bg-white p-6 rounded-3xl border border-[#d2e2ec] shadow-sm space-y-4">
          <h3 class="font-extrabold text-sm text-[#143242] flex items-center gap-2">
            <span>⚡</span> <span>Panduan Setup Supabase</span>
          </h3>
          <ol class="space-y-3 text-xs text-slate-600 list-decimal pl-4 leading-relaxed">
            <li>
              Buat project gratis di <a href="https://supabase.com" target="_blank" class="text-blue-600 underline font-bold">supabase.com</a> (pilih region <em>Singapore</em>).
            </li>
            <li>
              Buka menu <strong>SQL Editor</strong> di Supabase, jalankan skrip dari file <code>supabase/schema.sql</code>.
            </li>
            <li>
              Salin <strong>Project URL</strong> dan <strong>anon key</strong> dari menu <em>Project Settings &gt; API</em> ke kolom di samping.
            </li>
            <li>
              Klik <strong>Simpan</strong>. Aplikasi kini 100% online real-time untuk seluruh tim studio Anda!
            </li>
          </ol>

          <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-relaxed space-y-1">
            <div class="font-bold flex items-center gap-1">
              <span>💡</span> <span>Agar Seluruh Perangkat Otomatis Tersambung:</span>
            </div>
            <p><strong>Cara 1:</strong> Klik tombol <em>"Salin Link Auto-Connect"</em> di samping dan buka link tersebut di HP atau kirim ke WhatsApp tim Anda.</p>
            <p><strong>Cara 2 (Permanen):</strong> Masukkan Project URL &amp; Anon Key ke file <code>js/config.js</code>, rebuild bundle, dan deploy ke Netlify. Siapa pun yang membuka website akan langsung 100% tersambung otomatis!</p>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- SECTION 2: GOOGLE SHEETS & DRIVE (Sekunder / Backup Opsional)     -->
      <!-- ================================================================= -->
      <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#d2e2ec] shadow-sm space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 class="font-extrabold text-sm text-[#143242]">Integrasi Google Sheets &amp; Drive (Opsional / Backup Cadangan)</h3>
            <p class="text-xs text-slate-500">Gunakan jika Anda tetap ingin mengekspor atau membuat salinan cadangan ke Google Spreadsheet</p>
          </div>
          <span class="text-xs font-extrabold px-3 py-1 rounded-full ${isGasConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">
            ${isGasConfigured ? '🟢 Sheets Terkonfigurasi' : '⚪ Opsional'}
          </span>
        </div>

        <form id="cloud-config-form" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Google Apps Script Web App URL</label>
              <input type="url" id="cfg-gas-url" value="${gasUrl}" placeholder="https://script.google.com/macros/s/.../exec" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-[#1e3e50]">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Secret Token Keamanan</label>
              <input type="text" id="cfg-secret-token" value="${secretToken}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-[#1e3e50]">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Google Drive Root Folder ID</label>
              <input type="text" id="cfg-drive-folder" value="${driveFolder}" placeholder="1a2b3c4d5e6f7g8h9i..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-[#1e3e50]">
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <button type="button" id="btn-test-connection" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition">
              📡 Tes Ping Sheets
            </button>
            <div class="flex items-center gap-2">
              <button type="button" id="btn-sync-all-now" class="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition">
                🔄 Tarik Data Google Sheets
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs transition">
                Simpan Konfigurasi Sheets
              </button>
            </div>
          </div>
        </form>

        <div id="connection-status-box" class="hidden p-3.5 rounded-xl text-xs font-semibold"></div>
      </div>

    </div>
  `;
}

function renderProfileTab(currentUser, users) {
  const isOwner = auth.isOwner();
  const presetAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  ];

  return `
    <div class="space-y-8">
      
      <!-- ================================================================= -->
      <!-- SECTION 1: EDIT PROFIL SAYA (User Dapat Mengganti Profilnya)       -->
      <!-- ================================================================= -->
      <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#d2e2ec] shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div class="flex items-center gap-4">
            <div class="relative group">
              <img id="preview-avatar-img" src="${currentUser.avatar || presetAvatars[0]}" alt="${currentUser.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#1e3e50] shadow-md">
              <span class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#38b2ac] border-2 border-white"></span>
            </div>
            <div>
              <h3 class="font-extrabold text-lg text-[#143242] leading-tight">${currentUser.name}</h3>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${currentUser.role === 'Owner' ? 'bg-[#1e3e50] text-white' : 'bg-[#e3f4f8] text-[#1b6274]'}">
                  ${currentUser.role}
                </span>
                <span class="text-xs text-slate-400">•</span>
                <span class="text-xs font-mono text-[#5c7786]">@${currentUser.username || 'user'}</span>
              </div>
            </div>
          </div>

          <div class="text-xs text-slate-500 font-medium">
            <span>Sesi Aktif: <strong>${currentUser.email || '-'}</strong></span>
          </div>
        </div>

        <!-- Form Edit Profil Sendiri -->
        <form id="form-edit-my-profile" class="space-y-5 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nama Lengkap <span class="text-rose-500">*</span></label>
              <input type="text" id="prof-name" required value="${currentUser.name || ''}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Username Login <span class="text-rose-500">*</span></label>
              <input type="text" id="prof-username" required value="${currentUser.username || ''}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Email</label>
              <input type="email" id="prof-email" value="${currentUser.email || ''}" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Password Baru (Opsional)</label>
              <input type="password" id="prof-password" placeholder="Biarkan kosong jika tidak ingin ganti password" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">URL Foto Profil (Avatar)</label>
              <input type="url" id="prof-avatar" value="${currentUser.avatar || ''}" placeholder="https://..." class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
            </div>
          </div>

          <!-- Pilihan Avatar Cepat -->
          <div>
            <label class="block font-bold text-slate-700 mb-2">Atau Pilih Avatar Preset Cepat:</label>
            <div class="flex items-center gap-3 overflow-x-auto pb-1">
              ${presetAvatars.map(av => `
                <img src="${av}" alt="Preset" class="btn-select-preset-avatar w-10 h-10 rounded-xl object-cover border-2 border-transparent hover:border-[#1e3e50] cursor-pointer transition shadow-2xs" data-src="${av}">
              `).join('')}
              <label class="w-10 h-10 rounded-xl border-2 border-dashed border-slate-300 hover:border-[#1e3e50] flex items-center justify-center cursor-pointer text-slate-400 hover:text-[#1e3e50] transition shrink-0" title="Upload Foto dari Komputer">
                <span class="material-symbols-outlined text-[20px]">upload_file</span>
                <input type="file" id="prof-upload-file" accept="image/*" class="hidden">
              </label>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Bio / Peran Studio</label>
            <input type="text" id="prof-bio" value="${currentUser.bio || ''}" placeholder="Lead Content Operations, Editor, dll." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50]">
          </div>

          <div class="pt-2 flex items-center justify-between">
            <span id="profile-save-status" class="text-xs font-semibold text-emerald-600 hidden">✅ Profil berhasil disimpan!</span>
            <button type="submit" class="px-6 py-2.5 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs shadow-md transition ml-auto flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px]">save</span>
              <span>Simpan Perubahan Profil</span>
            </button>
          </div>
        </form>
      </div>

      <!-- ================================================================= -->
      <!-- SECTION 2: OWNER MANAJEMEN TIM & HAK AKSES (RBAC)                  -->
      <!-- ================================================================= -->
      <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#d2e2ec] shadow-sm space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="font-extrabold text-base text-[#143242]">Manajemen Pengguna &amp; Pengaturan Hak Akses (RBAC)</h3>
              <span class="text-xs font-extrabold px-2.5 py-0.5 rounded-full ${isOwner ? 'bg-[#e3f4f8] text-[#1b6274]' : 'bg-slate-100 text-slate-600'}">
                ${isOwner ? '👑 Mode Kontrol Owner' : 'Lihat Akses Tim'}
              </span>
            </div>
            <p class="text-xs text-[#5c7786] mt-0.5">Owner dapat menambah admin, editor, atau anggota baru serta mengatur izin modul yang boleh diakses.</p>
          </div>

          ${isOwner ? `
            <button type="button" id="btn-open-add-user" class="px-4 py-2.5 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 shrink-0">
              <span class="material-symbols-outlined text-[18px]">person_add</span>
              <span>+ Tambah Admin / User</span>
            </button>
          ` : ''}
        </div>

        <!-- Tabel Pengguna & Hak Akses -->
        <div class="border border-[#d2e2ec] rounded-2xl overflow-hidden shadow-2xs">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="bg-[#f0f6fa] border-b border-[#d2e2ec] text-[#2c6673] font-bold uppercase tracking-wider text-[10.5px]">
                <tr>
                  <th class="py-3 px-4">Pengguna</th>
                  <th class="py-3 px-4">Username &amp; Email</th>
                  <th class="py-3 px-4">Peran (Role)</th>
                  <th class="py-3 px-4">Hak Akses Modul</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e3edf3] text-slate-700">
                ${users.map(u => {
                  const isUserOwner = u.role === "Owner" || (u.role && u.role.includes("Owner"));
                  const isCurrent = currentUser.user_id === u.user_id;
                  const perms = u.permissions || (isUserOwner ? ["all"] : []);
                  const isAll = perms.includes("all");
                  const permCount = isAll ? AVAILABLE_PERMISSIONS.length : perms.length;

                  return `
                    <tr class="hover:bg-[#f8fbfe] transition-colors">
                      <td class="py-3 px-4 flex items-center gap-3">
                        <img src="${u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}" alt="${u.name}" class="w-8 h-8 rounded-full object-cover border border-slate-200">
                        <div>
                          <div class="font-bold text-[#143242] flex items-center gap-1.5">
                            <span>${u.name}</span>
                            ${isCurrent ? '<span class="text-[9px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">Anda</span>' : ''}
                          </div>
                          <span class="text-[10px] text-slate-400">${u.bio || 'Anggota Tim'}</span>
                        </div>
                      </td>
                      <td class="py-3 px-4">
                        <div class="font-mono text-[11px] font-bold text-[#1e3e50]">@${u.username || 'user'}</div>
                        <div class="text-[10.5px] text-slate-500">${u.email || '-'}</div>
                      </td>
                      <td class="py-3 px-4">
                        <span class="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${
                          isUserOwner ? 'bg-[#1e3e50] text-white' :
                          u.role === 'Admin' ? 'bg-[#e3f4f8] text-[#1b6274]' :
                          u.role === 'Video Editor' ? 'bg-[#f4eff8] text-[#6e508a]' :
                          'bg-[#e6f7f2] text-[#21835e]'
                        }">
                          ${u.role}
                        </span>
                      </td>
                      <td class="py-3 px-4">
                        <span class="inline-flex items-center gap-1 text-[11px] font-bold ${isAll ? 'text-emerald-700' : 'text-[#2c6673]'}">
                          <span class="material-symbols-outlined text-[15px]">${isAll ? 'verified_user' : 'security'}</span>
                          <span>${isAll ? 'Semua Modul (13)' : `${permCount} dari 13 Modul`}</span>
                        </span>
                      </td>
                      <td class="py-3 px-4">
                        <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Aktif</span>
                        </span>
                      </td>
                      <td class="py-3 px-4 text-right">
                        ${isOwner ? `
                          <div class="inline-flex items-center gap-1">
                            <button type="button" class="btn-edit-user-perms p-1.5 rounded-lg hover:bg-slate-100 text-[#1e3e50] transition" data-id="${u.user_id}" title="Atur Hak Akses">
                              <span class="material-symbols-outlined text-[17px]">tune</span>
                            </button>
                            ${!isUserOwner && !isCurrent ? `
                              <button type="button" class="btn-delete-user p-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition" data-id="${u.user_id}" data-name="${u.name}" title="Hapus Pengguna">
                                <span class="material-symbols-outlined text-[17px]">delete</span>
                              </button>
                            ` : ''}
                          </div>
                        ` : `
                          <span class="text-[11px] text-slate-400 italic">Read-only</span>
                        `}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- SECTION 3: SESI LOGIN & KONTROL LOGOUT                             -->
      <!-- ================================================================= -->
      <div class="bg-white p-6 sm:p-7 rounded-3xl border border-[#d2e2ec] shadow-sm space-y-4">
        <div class="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div class="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">lock_person</span>
          </div>
          <div>
            <h3 class="font-extrabold text-base text-[#143242]">Sesi Akun &amp; Keamanan</h3>
            <p class="text-xs text-[#5c7786]">Kelola sesi login aktif Anda pada perangkat ini.</p>
          </div>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <img src="${currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}" alt="Avatar" class="w-12 h-12 rounded-full object-cover ring-2 ring-slate-300 shrink-0">
            <div>
              <p class="font-bold text-sm text-[#143242]">${currentUser.name || 'User'}</p>
              <p class="text-xs text-[#5c7786]">${currentUser.email || 'Email belum diatur'} • Role: <strong class="text-[#1b6274]">${currentUser.role || 'Member'}</strong></p>
              <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 mt-0.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Sesi Aktif di Perangkat Ini</span>
              </span>
            </div>
          </div>

          <button type="button" onclick="window.handleAppLogout()" class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 shrink-0">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            <span>Keluar / Logout dari Akun Ini</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

function renderDataTab() {
  return `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Clean Slate: Kosongkan Data Pekerjaan Demo -->
      <div class="bg-white p-6 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl">🧹</span>
          <div>
            <h3 class="font-extrabold text-sm text-[#8c5310]">Kosongkan Data Pekerjaan Demo (Clean Slate)</h3>
            <p class="text-xs text-slate-500">Mulai dari nol: bersihkan seluruh tugas, ide, naskah, dan kalender demo</p>
          </div>
        </div>

        <p class="text-xs text-slate-600 leading-relaxed">
          Tindakan ini akan mengosongkan seluruh data operasional kerja (Papan Tugas Kanban, Subtask, Ide Konten, Naskah Script, Shooting Log, Revisi Video, Kalender, dan Stopwatch). 
          <strong>Akun Pengguna Tim, Profil, Brand, dan Pengaturan Sistem Anda akan tetap aman.</strong>
        </p>

        <button id="btn-clear-work-data" class="py-2.5 px-4 rounded-xl bg-[#c05621] hover:bg-[#9c4217] text-white font-bold text-xs transition shadow-xs flex items-center gap-2">
          <span class="material-symbols-outlined text-[16px]">delete_sweep</span>
          <span>Kosongkan Semua Data Pekerjaan Demo</span>
        </button>
      </div>

      <!-- JSON Backup & Restore -->
      <div class="bg-white p-6 rounded-2xl border border-[#d2e2ec] shadow-sm space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-2xl">💾</span>
          <div>
            <h3 class="font-extrabold text-sm text-[#143242]">Backup &amp; Restore Database (JSON)</h3>
            <p class="text-xs text-slate-500">Unduh salinan penuh seluruh 25 sheets atau pulihkan dari file backup</p>
          </div>
        </div>

        <div class="space-y-3 pt-2">
          <button id="btn-download-json-backup" class="w-full py-2.5 px-4 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs">
            <span>⬇️</span> <span>Unduh Full Backup Database (.json)</span>
          </button>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <label class="block font-bold text-xs text-slate-700">Pulihkan dari File Backup JSON</label>
            <input type="file" id="input-restore-json" accept=".json" class="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#e3f4f8] file:text-[#1b6274] hover:file:bg-[#d0ebf3]">
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-white p-6 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-sm space-y-4 md:col-span-2">
        <div class="flex items-center gap-2">
          <span class="text-2xl">⚠️</span>
          <div>
            <h3 class="font-extrabold text-sm text-rose-900">Danger Zone: Reset Database ke Default</h3>
            <p class="text-xs text-rose-600">Kembalikan seluruh database ke data awal standar pabrik</p>
          </div>
        </div>

        <p class="text-xs text-slate-600 leading-relaxed">
          Tindakan ini akan mengosongkan perubahan lokal di browser Anda dan mengembalikan seluruh 25 sheet ke dataset contoh pabrik.
        </p>

        <button id="btn-reset-database" class="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition shadow-xs">
          Reset Database ke Default
        </button>
      </div>
    </div>
  `;
}

function setupSettingsListeners(container) {
  // Tabs Switcher
  document.getElementById("tab-set-cloud")?.addEventListener("click", () => {
    activeSettingsTab = "cloud";
    renderSettings(container);
  });
  document.getElementById("tab-set-profile")?.addEventListener("click", () => {
    activeSettingsTab = "profile";
    renderSettings(container);
  });
  document.getElementById("tab-set-data")?.addEventListener("click", () => {
    activeSettingsTab = "data";
    renderSettings(container);
  });

  // Profile Preset Avatars Click
  container.querySelectorAll(".btn-select-preset-avatar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const src = e.currentTarget.getAttribute("data-src");
      const urlInput = document.getElementById("prof-avatar");
      const imgPreview = document.getElementById("preview-avatar-img");
      if (urlInput) urlInput.value = src;
      if (imgPreview) imgPreview.src = src;
    });
  });

  // Upload Local Avatar File to Data URL
  document.getElementById("prof-upload-file")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        const dataUrl = re.target.result;
        const urlInput = document.getElementById("prof-avatar");
        const imgPreview = document.getElementById("preview-avatar-img");
        if (urlInput) urlInput.value = dataUrl;
        if (imgPreview) imgPreview.src = dataUrl;
      };
      reader.readAsDataURL(file);
    }
  });

  // Form Edit Profil Saya Submit
  document.getElementById("form-edit-my-profile")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("prof-name")?.value?.trim();
    const username = document.getElementById("prof-username")?.value?.trim();
    const email = document.getElementById("prof-email")?.value?.trim();
    const password = document.getElementById("prof-password")?.value?.trim();
    const avatar = document.getElementById("prof-avatar")?.value?.trim();
    const bio = document.getElementById("prof-bio")?.value?.trim();

    const updatePayload = { name, username, email, avatar, bio };
    if (password) updatePayload.password = password;

    const res = auth.updateProfile(updatePayload);
    if (res.success) {
      if (window.showToast) {
        window.showToast("✅ Profil pengguna Anda berhasil diperbarui!", "success");
      }
      // Update DOM header and sidebar immediately
      if (window.app && window.app.updateSidebarUserProfile) {
        window.app.updateSidebarUserProfile();
      }
      renderSettings(container);
    } else {
      if (window.showToast) {
        window.showToast(`❌ Gagal memperbarui profil: ${res.message}`, "error");
      }
    }
  });

  // Open Modal Tambah Pengguna Baru
  document.getElementById("btn-open-add-user")?.addEventListener("click", () => {
    editingUserId = null;
    const modal = document.getElementById("modal-user-manage");
    const title = document.getElementById("modal-user-title");
    const idField = document.getElementById("manage-user-id");
    const form = document.getElementById("form-manage-user");

    if (title) title.textContent = "Tambah Admin / Pengguna Baru";
    if (idField) idField.value = "";
    if (form) form.reset();

    // Default select permissions for role "Admin"
    selectRolePermissions("Admin");

    if (modal) modal.classList.remove("hidden");
  });

  // Role select change in modal -> update default permissions
  document.getElementById("manage-user-role")?.addEventListener("change", (e) => {
    if (!editingUserId) {
      selectRolePermissions(e.target.value);
    }
  });

  // Select All / Clear All Permissions Buttons in modal
  document.getElementById("btn-select-all-perms")?.addEventListener("click", () => {
    container.querySelectorAll("input[name='module-perm']").forEach(cb => cb.checked = true);
  });
  document.getElementById("btn-clear-all-perms")?.addEventListener("click", () => {
    container.querySelectorAll("input[name='module-perm']").forEach(cb => cb.checked = false);
  });

  // Edit User Permissions Button in Table
  container.querySelectorAll(".btn-edit-user-perms").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const userId = e.currentTarget.getAttribute("data-id");
      const user = store.getItemById(SHEET_NAMES.USERS, userId);
      if (!user) return;

      editingUserId = userId;
      const modal = document.getElementById("modal-user-manage");
      const title = document.getElementById("modal-user-title");
      const idField = document.getElementById("manage-user-id");

      if (title) title.textContent = `Atur Hak Akses: ${user.name}`;
      if (idField) idField.value = user.user_id;

      document.getElementById("manage-user-name").value = user.name || "";
      document.getElementById("manage-user-username").value = user.username || "";
      document.getElementById("manage-user-email").value = user.email || "";
      document.getElementById("manage-user-password").value = "";
      document.getElementById("manage-user-role").value = user.role || "Member / Creator";
      document.getElementById("manage-user-avatar").value = user.avatar || "";

      // Set permissions checkboxes
      const perms = user.permissions || (user.role === "Owner" ? ["all"] : []);
      const isAll = perms.includes("all");

      container.querySelectorAll("input[name='module-perm']").forEach(cb => {
        cb.checked = isAll || perms.includes(cb.value);
      });

      if (modal) modal.classList.remove("hidden");
    });
  });

  // Delete User Button in Table
  container.querySelectorAll(".btn-delete-user").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const userId = e.currentTarget.getAttribute("data-id");
      const userName = e.currentTarget.getAttribute("data-name");

      if (confirm(`Apakah Anda yakin ingin menghapus pengguna '${userName}'? Tindakan ini tidak dapat dibatalkan.`)) {
        const res = auth.deleteUser(userId);
        if (res.success) {
          if (window.showToast) {
            window.showToast(`✅ Pengguna '${userName}' berhasil dihapus.`, "success");
          }
          renderSettings(container);
        } else {
          if (window.showToast) {
            window.showToast(`❌ ${res.message}`, "error");
          }
        }
      }
    });
  });

  // Close User Modal
  const closeModal = () => {
    const modal = document.getElementById("modal-user-manage");
    if (modal) modal.classList.add("hidden");
    editingUserId = null;
  };
  document.getElementById("btn-close-user-modal")?.addEventListener("click", closeModal);
  document.getElementById("btn-cancel-manage-user")?.addEventListener("click", closeModal);

  // Submit Add / Edit User Form
  document.getElementById("form-manage-user")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const userId = document.getElementById("manage-user-id")?.value;
    const name = document.getElementById("manage-user-name")?.value?.trim();
    const username = document.getElementById("manage-user-username")?.value?.trim();
    const email = document.getElementById("manage-user-email")?.value?.trim();
    const password = document.getElementById("manage-user-password")?.value?.trim();
    const role = document.getElementById("manage-user-role")?.value;
    const avatar = document.getElementById("manage-user-avatar")?.value?.trim();

    // Collect selected module permissions
    const selectedPerms = [];
    container.querySelectorAll("input[name='module-perm']:checked").forEach(cb => {
      selectedPerms.push(cb.value);
    });

    if (role === "Owner" || selectedPerms.length === AVAILABLE_PERMISSIONS.length) {
      selectedPerms.unshift("all");
    }

    if (userId) {
      // Update existing user
      const updateData = { name, username, email, role, permissions: selectedPerms };
      if (password) updateData.password = password;
      if (avatar) updateData.avatar = avatar;

      const res = auth.updateUser(userId, updateData);
      if (res.success) {
        if (window.showToast) {
          window.showToast(`✅ Hak akses pengguna '${name}' berhasil diperbarui!`, "success");
        }
        closeModal();
        renderSettings(container);
      } else {
        if (window.showToast) {
          window.showToast(`❌ ${res.message}`, "error");
        }
      }
    } else {
      // Add new user
      const newUserPayload = {
        name,
        username,
        email,
        password: password || "123",
        role,
        avatar: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        permissions: selectedPerms
      };

      const res = auth.addUser(newUserPayload);
      if (res.success) {
        if (window.showToast) {
          window.showToast(`✅ Pengguna baru '${name}' (@${username}) berhasil ditambahkan!`, "success");
        }
        closeModal();
        renderSettings(container);
      } else {
        if (window.showToast) {
          window.showToast(`❌ ${res.message}`, "error");
        }
      }
    }
  });

  function selectRolePermissions(role) {
    const defaults = ROLE_DEFAULT_PERMISSIONS[role] || ["dashboard", "tasks"];
    const isAll = defaults.includes("all");
    container.querySelectorAll("input[name='module-perm']").forEach(cb => {
      cb.checked = isAll || defaults.includes(cb.value);
    });
  }

  // ==========================================
  // SUPABASE CLOUD CONFIG LISTENERS
  // ==========================================
  document.getElementById("form-supabase-config")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = document.getElementById("cfg-supabase-url")?.value?.trim() || "";
    const key = document.getElementById("cfg-supabase-key")?.value?.trim() || "";
    const box = document.getElementById("supabase-status-box");

    if (window.supabaseClient) {
      window.supabaseClient.setCredentials(url, key);
    } else {
      localStorage.setItem("supabase_url", url);
      localStorage.setItem("supabase_anon_key", key);
    }

    if (box) {
      box.classList.remove("hidden");
      box.className = "p-3.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200";
      box.innerHTML = "✅ <strong>Kredensial Supabase Disimpan!</strong> Aplikasi akan otomatis tersambung ke database PostgreSQL cloud.";
    }

    if (window.showToast) {
      window.showToast("✅ Konfigurasi Supabase berhasil disimpan!", "success");
    }

    // Attempt to start realtime subscription
    if (window.supabaseClient && window.supabaseClient.isConfigured()) {
      window.supabaseClient.setupRealtime(store, () => {
        if (window.app && window.app.handleRoute) window.app.handleRoute();
      });
    }

    if (window.app && window.app.updateSyncBadge) {
      window.app.updateSyncBadge();
    }
  });

  // Test Supabase Connection
  document.getElementById("btn-test-supabase")?.addEventListener("click", async () => {
    const url = document.getElementById("cfg-supabase-url")?.value?.trim() || "";
    const key = document.getElementById("cfg-supabase-key")?.value?.trim() || "";
    const box = document.getElementById("supabase-status-box");

    if (!url || !key) {
      if (box) {
        box.classList.remove("hidden");
        box.className = "p-3.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200";
        box.innerHTML = "⚠️ Harap isi <strong>Supabase Project URL</strong> dan <strong>Anon Key</strong> terlebih dahulu.";
      }
      return;
    }

    if (box) {
      box.classList.remove("hidden");
      box.className = "p-3.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 animate-pulse";
      box.innerHTML = "⏳ Sedang menguji konektivitas ke database PostgreSQL Supabase...";
    }

    if (window.supabaseClient) {
      const res = await window.supabaseClient.ping(url, key);
      if (res.success) {
        if (box) {
          box.classList.remove("hidden");
          box.className = "p-3.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200";
          box.innerHTML = `🟢 <strong>Koneksi Sukses!</strong> Terhubung ke Supabase PostgreSQL. Auto-save &amp; Realtime aktif!`;
        }
        if (window.showToast) window.showToast("🟢 Terhubung ke Supabase PostgreSQL!", "success");
      } else {
        if (box) {
          box.classList.remove("hidden");
          box.className = "p-3.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200";
          box.innerHTML = `🔴 <strong>Koneksi Supabase Gagal:</strong> ${res.message}`;
        }
        if (window.showToast) window.showToast(`🔴 Koneksi gagal: ${res.message}`, "error");
      }
    }
  });

  // Fetch all Supabase Data
  document.getElementById("btn-fetch-supabase")?.addEventListener("click", async () => {
    if (!window.supabaseClient || !window.supabaseClient.isConfigured()) {
      alert("⚠️ Harap simpan konfigurasi Supabase terlebih dahulu.");
      return;
    }

    if (window.showToast) window.showToast("⏳ Sedang memuat seluruh data dari database Supabase...", "info");
    const res = await window.supabaseClient.fetchAll(store);
    if (res.success) {
      if (window.showToast) window.showToast(`✅ ${res.totalTables} tabel Supabase berhasil dimuat ke aplikasi!`, "success");
      renderSettings(container);
    } else {
      if (window.showToast) window.showToast(`❌ Gagal memuat data: ${res.message}`, "error");
    }
  });

  // Salin Link Auto-Connect untuk Tim / Perangkat Lain
  document.getElementById("btn-copy-team-link")?.addEventListener("click", () => {
    const url = document.getElementById("cfg-supabase-url")?.value?.trim() || localStorage.getItem("supabase_url") || (APP_CONFIG && APP_CONFIG.DEFAULT_SUPABASE_URL) || "";
    const key = document.getElementById("cfg-supabase-key")?.value?.trim() || localStorage.getItem("supabase_anon_key") || (APP_CONFIG && APP_CONFIG.DEFAULT_SUPABASE_ANON_KEY) || "";

    if (!url || !key) {
      if (window.showToast) window.showToast("⚠️ Harap simpan atau isi Supabase Project URL & Anon Key terlebih dahulu!", "error");
      return;
    }

    try {
      const payload = JSON.stringify({ url, key });
      const token = btoa(unescape(encodeURIComponent(payload)));
      const origin = window.location.origin;
      const path = window.location.pathname;
      const shareableUrl = `${origin}${path}?sb_connect=${token}#dashboard`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareableUrl).then(() => {
          if (window.showToast) {
            window.showToast("📋 Link Auto-Connect tersalin ke Clipboard! Kirim link ini ke HP atau perangkat tim.", "success");
          }
        }).catch(() => {
          prompt("Salin link auto-connect berikut dan buka di perangkat Anda:", shareableUrl);
        });
      } else {
        prompt("Salin link auto-connect berikut dan buka di perangkat Anda:", shareableUrl);
      }
    } catch (e) {
      console.error("Gagal membuat link:", e);
    }
  });

  // Cloud Config Form Submit (Google Sheets)
  document.getElementById("cloud-config-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = document.getElementById("cfg-gas-url")?.value?.trim() || "";
    const token = document.getElementById("cfg-secret-token")?.value?.trim() || "PLANNER_SECRET_TOKEN_2026";
    const folder = document.getElementById("cfg-drive-folder")?.value?.trim() || "";

    store.setSetting("gas_api_url", url, "URL Web App Google Apps Script");
    store.setSetting("secret_token", token, "Token Autentikasi API REST Apps Script");
    store.setSetting("drive_root_folder_id", folder, "ID Folder Google Drive untuk Penyimpanan Berkas Konten");

    const box = document.getElementById("connection-status-box");
    if (box) {
      box.classList.remove("hidden");
      box.className = "p-3.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200";
      box.innerHTML = "✅ <strong>Pengaturan Disimpan!</strong> Konfigurasi Google Apps Script &amp; Drive telah diperbarui di browser.";
    }

    if (window.showToast) {
      window.showToast("✅ Pengaturan Google Apps Script &amp; Drive berhasil disimpan!", "success");
    }
  });

  // Test Ping
  document.getElementById("btn-test-connection")?.addEventListener("click", async () => {
    const box = document.getElementById("connection-status-box");
    const testUrl = document.getElementById("cfg-gas-url")?.value?.trim() || "";
    const testToken = document.getElementById("cfg-secret-token")?.value?.trim() || "PLANNER_SECRET_TOKEN_2026";
    const testFolder = document.getElementById("cfg-drive-folder")?.value?.trim() || "";

    if (!testUrl) {
      if (box) {
        box.classList.remove("hidden");
        box.className = "p-3.5 rounded-xl text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200";
        box.innerHTML = "⚠️ Harap isi <strong>Google Apps Script Web App URL</strong> terlebih dahulu sebelum melakukan tes ping.";
      }
      document.getElementById("cfg-gas-url")?.focus();
      return;
    }

    store.setSetting("gas_api_url", testUrl, "URL Web App Google Apps Script");
    store.setSetting("secret_token", testToken, "Token Autentikasi API REST Apps Script");
    store.setSetting("drive_root_folder_id", testFolder, "ID Folder Google Drive untuk Penyimpanan Berkas Konten");

    if (box) {
      box.classList.remove("hidden");
      box.className = "p-3.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 animate-pulse";
      box.innerHTML = "⏳ Sedang menguji konektivitas ke Google Apps Script REST API...";
    }

    const res = await api.ping(testUrl);
    if (res.success) {
      if (box) {
        box.classList.remove("hidden");
        box.className = "p-3.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200";
        box.innerHTML = `🟢 <strong>Koneksi Sukses!</strong> Terhubung ke spreadsheet <em>"${res.spreadsheet_name || 'Google Sheets'}"</em> (25 Sheets Terverifikasi).`;
      }
      if (window.showToast) window.showToast("🟢 REST API Google Apps Script Terhubung!", "success");
    } else {
      if (box) {
        box.classList.remove("hidden");
        box.className = "p-3.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200";
        box.innerHTML = `🔴 <strong>Koneksi Gagal:</strong> ${res.message}`;
      }
      if (window.showToast) window.showToast(`🔴 Koneksi gagal: ${res.message}`, "error");
    }
  });

  // Sync All Data Now
  document.getElementById("btn-sync-all-now")?.addEventListener("click", () => {
    if (window.triggerCloudSync) window.triggerCloudSync();
  });

  // JSON Download Backup
  document.getElementById("btn-download-json-backup")?.addEventListener("click", () => {
    const backupData = store.exportStateJSON();
    const blob = new Blob([backupData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CREATOR_PLANNER_FULL_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (window.showToast) window.showToast("✅ Berkas Full Backup Database JSON berhasil diunduh!", "success");
  });

  // JSON Restore
  document.getElementById("input-restore-json")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (re) => {
      try {
        const json = JSON.parse(re.target.result);
        const res = store.importStateJSON(json);
        if (res.success) {
          alert("✅ Database berhasil dipulihkan dari file backup!");
          window.location.reload();
        } else {
          alert(`❌ Gagal restore: ${res.message}`);
        }
      } catch (err) {
        alert(`❌ File JSON tidak valid: ${err.message}`);
      }
    };
    reader.readAsText(file);
  });

  // Clean Slate: Kosongkan Data Pekerjaan Demo
  document.getElementById("btn-clear-work-data")?.addEventListener("click", () => {
    if (confirm("⚠️ PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SEMUA data pekerjaan demo?\n\nPapan tugas, ide konten, naskah script, kalender, dan waktu kerja akan dikosongkan secara bersih sehingga Anda dapat mulai mengisi pekerjaan nyata tim Anda.\n\nAkun pengguna tim, profil, brand mitra, dan pengaturan sistem Anda akan tetap aman.")) {
      store.clearWorkData();
      if (window.showToast) {
        window.showToast("🧹 Seluruh data pekerjaan demo berhasil dikosongkan!", "success");
      }
      renderSettings(container);
    }
  });

  // Reset Database
  document.getElementById("btn-reset-database")?.addEventListener("click", () => {
    if (confirm("⚠️ PERINGATAN: Apakah Anda yakin ingin mereset seluruh database ke standar awal? Semua perubahan data lokal akan dikembalikan ke starter kit resmi.")) {
      store.resetToDefault();
      alert("✅ Database telah direset ke data awal pabrik.");
      window.location.reload();
    }
  });
}

return { setActiveSettingsTab: setActiveSettingsTab, renderSettings: renderSettings };
})();


// 7. APPLICATION CONTROLLER & ROUTER
/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - MAIN APPLICATION BOOTSTRAP
 * File: js/app.js
 * =========================================================================================
 */
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// View Renderers
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// [import stripped]
// Global Toast System
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("global-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "global-toast-container";
    toastContainer.className = "fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold transition-all transform duration-300 translate-y-2 opacity-0 ${
    type === "success" ? "bg-emerald-600 text-white shadow-emerald-500/20" :
    type === "error" ? "bg-rose-600 text-white shadow-rose-500/20" :
    "bg-slate-900 text-white shadow-slate-900/20"
  }`;
  toast.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
window.showToast = showToast;

class App {
  constructor() {
    this.currentRoute = "dashboard";
    this.init();
  }

  init() {
    // 1. Setup Click Interceptor for all hash links (guarantees click responsiveness)
    this.setupNavigationInterceptor();

    // 2. Setup Authentication & Login Screen
    this.setupAuth();

    // 3. Setup Hash Router
    window.addEventListener("hashchange", () => this.handleRoute());
    if (!window.location.hash) {
      window.location.hash = "#dashboard";
    }

    // 4. Setup Global UI Elements
    this.setupGlobalUI();
    this.setupQuickSearch();
    this.setupQuickAdd();
    this.updateSyncBadge();

    // 4b. Setup Supabase Realtime & Auto-Hydrate if configured
    if (supabaseClient.isConfigured()) {
      supabaseClient.setupRealtime(store, () => {
        this.updateSyncBadge();
        const valid = auth.validateCurrentSession(store);
        if (!valid.valid) {
          this.showLoginScreen();
          showToast(valid.reason || "⛔ Akses Ditolak: Akun Anda telah dinonaktifkan atau dihapus oleh Owner.", "error");
          return;
        }
        this.handleRoute();
      });

      // Fungsi Penyelarasan Sinkronisasi Otomatis Antar Perangkat
      const syncCloudData = () => {
        return supabaseClient.fetchAll(store).then((res) => {
          if (res.success) {
            console.log(`Auto-hydrate berhasil: ${res.totalTables} tabel Supabase dimuat.`);
            this.updateSyncBadge();
            const valid = auth.validateCurrentSession(store);
            if (!valid.valid) {
              this.showLoginScreen();
              showToast(valid.reason || "⛔ Akses Ditolak: Akun Anda telah dinonaktifkan atau dihapus oleh Owner.", "error");
              return;
            }
            this.updateSidebarUserProfile();
            this.handleRoute();
          }
        });
      };

      // Tarik data saat aplikasi pertama kali dimuat
      syncCloudData();

      // Auto-Sync Polling setiap 10 detik: Menjamin seluruh HP & komputer otomatis sinkron tanpa perlu refresh manual
      setInterval(() => {
        if (document.visibilityState === "visible") {
          syncCloudData();
        }
      }, 10000);

      // Sinkronkan otomatis saat aplikasi dibuka kembali di HP (unlock screen) atau pindah tab browser
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          syncCloudData();
        }
      });

      window.addEventListener("focus", () => {
        syncCloudData();
      });
    }

    // 5. Initial State Check
    if (auth.isLoggedIn()) {
      const valid = auth.validateCurrentSession(store);
      if (valid.valid) {
        this.showAppShell();
        this.updateSidebarUserProfile();
        this.handleRoute();
      } else {
        this.showLoginScreen();
        showToast(valid.reason || "⛔ Akun Anda tidak ditemukan atau akses telah dicabut oleh Owner.", "error");
      }
    } else {
      this.showLoginScreen();
    }

    // 6. Subscribe Store Updates
    store.subscribe(() => {
      this.updateSyncBadge();
    });

    console.log("ALL IN ONE CONTENT CREATOR PLANNER Initialized successfully.");
  }

  showLoginScreen() {
    const loginScreen = document.getElementById("login-screen");
    const appShell = document.getElementById("app-shell");
    if (loginScreen) {
      loginScreen.classList.remove("hidden");
      loginScreen.classList.add("flex");
    }
    if (appShell) {
      appShell.classList.add("hidden");
      appShell.classList.remove("flex");
    }
  }

  showAppShell() {
    const loginScreen = document.getElementById("login-screen");
    const appShell = document.getElementById("app-shell");
    if (loginScreen) {
      loginScreen.classList.add("hidden");
      loginScreen.classList.remove("flex");
    }
    if (appShell) {
      appShell.classList.remove("hidden");
      appShell.classList.add("flex");
    }
  }

  setupAuth() {
    // Login Form Submit Handler
    const form = document.getElementById("dashboard-login-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const uField = document.getElementById("login-username");
        const pField = document.getElementById("login-password");
        const uErr = document.getElementById("login-username-err");
        const pErr = document.getElementById("login-password-err");
        const mainErr = document.getElementById("login-error-msg");

        if (uErr) uErr.classList.add("hidden");
        if (pErr) pErr.classList.add("hidden");
        if (mainErr) mainErr.textContent = "";

        const username = uField?.value?.trim() || "";
        const password = pField?.value?.trim() || "";

        let hasError = false;
        if (!username) {
          if (uErr) uErr.classList.remove("hidden");
          hasError = true;
        }
        if (!password) {
          if (pErr) pErr.classList.remove("hidden");
          hasError = true;
        }
        if (hasError) return;

        const res = auth.login(username, password);
        if (res.success) {
          this.showAppShell();
          this.updateSidebarUserProfile();
          this.handleRoute();
          showToast(`👋 Selamat datang kembali, ${res.user.name} (${res.user.role})!`, "success");
        } else {
          if (mainErr) mainErr.textContent = res.message || "Wrong Password!!";
        }
      });
    }

    // Toggle Password Visibility
    const btnTogglePass = document.getElementById("btn-toggle-login-pass");
    if (btnTogglePass) {
      btnTogglePass.addEventListener("click", () => {
        const pField = document.getElementById("login-password");
        if (pField) {
          const isPass = pField.type === "password";
          pField.type = isPass ? "text" : "password";
          const icon = btnTogglePass.querySelector(".material-symbols-outlined");
          if (icon) icon.textContent = isPass ? "visibility_off" : "visibility";
        }
      });
    }

    // Global Logout Function
    window.handleAppLogout = () => {
      auth.logout();
      const uField = document.getElementById("login-username");
      const pField = document.getElementById("login-password");
      if (uField) uField.value = "";
      if (pField) pField.value = "";
      this.showLoginScreen();
      showToast("ℹ️ Anda telah keluar dari akun.", "info");
    };
  }

  updateSidebarUserProfile() {
    const user = auth.getCurrentUser();
    if (!user) return;

    const avatar = user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150";
    const name = user.name || "User";
    const email = user.email || "";
    const role = user.role || "Member";
    const firstName = name.split(" ")[0];

    // 1. Desktop Sidebar User Profile
    const avatarEl = document.getElementById("sidebar-user-avatar");
    const nameEl = document.getElementById("sidebar-user-name");
    const emailEl = document.getElementById("sidebar-user-email");
    const roleEl = document.getElementById("sidebar-user-role");

    if (avatarEl) avatarEl.src = avatar;
    if (nameEl) nameEl.textContent = name;
    if (emailEl) emailEl.textContent = email;
    if (roleEl) roleEl.textContent = role;

    // 2. Top Header User Profile & Dropdown (Desktop & Mobile)
    const greetingEl = document.getElementById("header-greeting-user");
    const headerAvatarEl = document.getElementById("header-user-avatar");
    const headerNameEl = document.getElementById("header-user-name");
    const headerRoleEl = document.getElementById("header-user-role");
    const headerDropName = document.getElementById("header-dropdown-name");
    const headerDropRole = document.getElementById("header-dropdown-role");

    if (greetingEl) greetingEl.textContent = `Welcome ${firstName} !`;
    if (headerAvatarEl) headerAvatarEl.src = avatar;
    if (headerNameEl) headerNameEl.textContent = name;
    if (headerRoleEl) headerRoleEl.textContent = role;
    if (headerDropName) headerDropName.textContent = name;
    if (headerDropRole) headerDropRole.textContent = role;

    // 3. Mobile Slide-Over Drawer User Profile
    const mobileAvatarEl = document.getElementById("mobile-user-avatar");
    const mobileNameEl = document.getElementById("mobile-user-name");
    const mobileEmailEl = document.getElementById("mobile-user-email");
    const mobileRoleEl = document.getElementById("mobile-user-role");

    if (mobileAvatarEl) mobileAvatarEl.src = avatar;
    if (mobileNameEl) mobileNameEl.textContent = name;
    if (mobileEmailEl) mobileEmailEl.textContent = email;
    if (mobileRoleEl) mobileRoleEl.textContent = role;
  }

  navigate(route) {
    const cleanRoute = (route || "dashboard").replace("#", "").trim();
    if (window.location.hash !== `#${cleanRoute}`) {
      window.location.hash = `#${cleanRoute}`;
    } else {
      this.handleRoute();
    }
  }

  setupNavigationInterceptor() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      const targetRoute = href.replace("#", "").trim();
      if (!targetRoute) return;

      // Close mobile drawer if open
      const drawer = document.getElementById("mobile-drawer");
      if (drawer && !drawer.classList.contains("hidden")) {
        drawer.classList.add("hidden");
      }

      // If already on the same route, hashchange won't fire. Trigger manually!
      const current = (window.location.hash || "").replace("#", "") || "dashboard";
      if (current === targetRoute) {
        e.preventDefault();
        this.handleRoute();
      }
    });
  }

  handleRoute() {
    if (!auth.isLoggedIn()) {
      this.showLoginScreen();
      return;
    }

    // Validasi apakah akun pengguna masih ada dan aktif di database
    const sessionCheck = auth.validateCurrentSession(store);
    if (!sessionCheck.valid) {
      this.showLoginScreen();
      showToast(sessionCheck.reason || "⛔ Akses Ditolak: Akun Anda telah dinonaktifkan atau dihapus oleh Owner.", "error");
      return;
    }

    this.showAppShell();
    this.updateSidebarUserProfile();

    const rawHash = window.location.hash.replace("#", "") || "dashboard";
    let hash = rawHash;

    // Aliases
    if (hash === "ideas") hash = "content";
    if (hash === "goals") hash = "targets";
    if (hash === "assets") hash = "media";
    if (hash === "ecommerce") hash = "business";

    // RBAC Permission Check
    if (!auth.hasPermission(hash)) {
      showToast(`⛔ Akses Terbatas: Peran '${auth.getCurrentUser()?.role}' tidak memiliki izin untuk membuka modul ini.`, "error");
      if (hash !== "dashboard") {
        window.location.hash = "#dashboard";
        return;
      }
    }

    this.currentRoute = hash;

    const container = document.getElementById("main-view-container");
    if (!container) return;

    // Scroll viewport to top
    const mainViewport = document.querySelector("main");
    if (mainViewport) mainViewport.scrollTop = 0;

    // Update active nav styling & permission lock indicators
    this.updateActiveNav(hash);

    // Close mobile drawer on route change
    const mobileDrawer = document.getElementById("mobile-drawer");
    if (mobileDrawer) mobileDrawer.classList.add("hidden");

    // Render corresponding view
    switch (hash) {
      case "dashboard":
        renderDashboard(container);
        break;
      case "content":
        renderContent(container);
        break;
      case "calendar":
        renderCalendar(container);
        break;
      case "tasks":
        renderTasks(container);
        break;
      case "production":
        renderProduction(container);
        break;
      case "media":
        renderMedia(container);
        break;
      case "social":
        renderSocial(container);
        break;
      case "business":
        renderBusiness(container);
        break;
      case "finance":
        renderFinance(container);
        break;
      case "timetracking":
        renderTimeTracking(container);
        break;
      case "targets":
        renderTargets(container);
        break;
      case "reports":
        renderReports(container);
        break;
      case "notifications":
        renderNotifications(container);
        break;
      case "settings":
        renderSettings(container);
        break;
      default:
        renderDashboard(container);
    }
  }

  updateActiveNav(route) {
    // Desktop Nav Items
    document.querySelectorAll("[data-nav]").forEach(link => {
      const target = link.getAttribute("data-nav");
      const hasPerm = auth.hasPermission(target);

      if (!hasPerm) {
        link.className = "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-[#678292] opacity-40 hover:opacity-60 transition-all cursor-not-allowed";
        link.setAttribute("title", "Akses modul ini dibatasi oleh Owner");
        return;
      }

      link.removeAttribute("title");
      if (target === route) {
        link.className = "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold bg-[#eaf2f7] text-[#1e3e50] shadow-sm transition-all";
        const icon = link.querySelector(".material-symbols-outlined");
        if (icon) icon.className = "material-symbols-outlined text-[19px] text-[#1e3e50]";
      } else {
        link.className = "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-[#9dc0d4] hover:bg-[#274d63] hover:text-white transition-all";
        const icon = link.querySelector(".material-symbols-outlined");
        if (icon) icon.className = "material-symbols-outlined text-[19px]";
      }
    });

    // Mobile Bottom Nav Items
    document.querySelectorAll("[data-bottom-nav]").forEach(link => {
      const target = link.getAttribute("data-bottom-nav");
      if (target === route) {
        link.className = "flex flex-col items-center text-[10px] font-bold text-[#1e3e50] transition";
      } else {
        link.className = "flex flex-col items-center text-[10px] font-medium text-[#799cb0] hover:text-[#1e3e50] transition";
      }
    });
  }

  updateSyncBadge() {
    const badge = document.getElementById("cloud-sync-status-badge");
    const sidebarSync = document.getElementById("sidebar-sync-indicator");

    const isSupabase = supabaseClient.isConfigured();
    const isSheets = api.isConfigured();
    const queue = store.getQueue();

    if (badge) {
      if (isSupabase) {
        badge.innerHTML = `
          <button id="btn-global-sync" onclick="window.triggerCloudSync()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#e6f4ea] border border-[#a8dab5] text-[#137333] hover:bg-[#ceead6] transition-all shadow-xs" title="Supabase PostgreSQL Terhubung (Real-time Auto-Save Aktif). Klik untuk refresh data.">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="hidden sm:inline">Supabase Realtime</span>
          </button>
        `;
      } else if (!isSheets) {
        badge.innerHTML = `
          <button id="btn-global-sync" onclick="window.triggerCloudSync()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#cadbe6] text-[#1b3b4d] hover:bg-[#d9ebf9] transition-all shadow-xs" title="Database Cloud belum terhubung. Klik untuk konfigurasi Supabase / Sheets.">
            <span class="w-2 h-2 rounded-full bg-amber-400"></span>
            <span class="hidden sm:inline">Offline Mode</span>
          </button>
        `;
      } else if (queue.length > 0) {
        badge.innerHTML = `
          <button id="btn-global-sync" onclick="window.triggerCloudSync()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#fdede7] border border-[#f5cdbf] text-[#8b3b22] hover:bg-[#fae1d7] transition-all shadow-xs" title="Ada ${queue.length} perubahan lokal tertunda. Klik untuk sinkronkan.">
            <span class="w-2 h-2 rounded-full bg-[#b34927] animate-pulse"></span>
            <span>Sync (${queue.length})</span>
          </button>
        `;
      } else {
        badge.innerHTML = `
          <button id="btn-global-sync" onclick="window.triggerCloudSync()" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#cadbe6] text-[#1b3b4d] hover:bg-[#d9ebf9] transition-all shadow-xs" title="Google Sheets Terhubung. Klik untuk tarik data terbaru.">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="hidden sm:inline">Sheets Synced</span>
          </button>
        `;
      }
    }

    if (sidebarSync) {
      if (isSupabase) {
        sidebarSync.innerHTML = `
          <span class="flex items-center gap-1.5 text-[#38b2ac]">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38b2ac] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#38b2ac]"></span>
            </span>
            <span>Supabase Realtime</span>
          </span>
          <span class="font-semibold text-emerald-400">Live DB</span>
        `;
      } else if (isSheets) {
        sidebarSync.innerHTML = `
          <span class="flex items-center gap-1.5 text-[#7ca0b5]">
            <span class="relative flex h-2 w-2">
              <span class="relative inline-flex rounded-full h-2 w-2 bg-[#38b2ac]"></span>
            </span>
            <span>Apps Script v2.4</span>
          </span>
          <span class="font-semibold text-white">Connected</span>
        `;
      } else {
        sidebarSync.innerHTML = `
          <span class="flex items-center gap-1.5 text-[#7ca0b5]">
            <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            <span>Local Storage</span>
          </span>
          <span class="font-semibold text-amber-300">Offline</span>
        `;
      }
    }
  }

  setupGlobalUI() {
    // Mobile Drawer Toggle
    const openBtn = document.getElementById("btn-open-mobile-drawer");
    const closeBtn = document.getElementById("btn-close-mobile-drawer");
    const drawer = document.getElementById("mobile-drawer");

    openBtn?.addEventListener("click", () => drawer?.classList.remove("hidden"));
    closeBtn?.addEventListener("click", () => drawer?.classList.add("hidden"));

    // Header User Profile Menu Toggle & Dropdown Dismissal
    const headerUserMenuBtn = document.getElementById("btn-header-user-menu");
    const headerUserDropdown = document.getElementById("header-user-dropdown");

    headerUserMenuBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      headerUserDropdown?.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (headerUserDropdown && !headerUserDropdown.contains(e.target) && !headerUserMenuBtn?.contains(e.target)) {
        headerUserDropdown.classList.add("hidden");
      }
    });

    // Theme Toggle Mock Pill
    const themeBtn = document.getElementById("theme-toggle-btn");
    themeBtn?.addEventListener("click", () => {
      showToast("💡 Fitur beralih ke Mode Gelap (Dark Mode) segera hadir pada update berikutnya!", "info");
    });
  }

  setupQuickSearch() {
    const modal = document.getElementById("global-search-modal");
    const input = document.getElementById("global-search-input");
    const resultsContainer = document.getElementById("global-search-results");
    const closeBtn = document.getElementById("global-search-close");
    const headerInput = document.getElementById("global-search-input-header");
    const headerTrigger = document.getElementById("global-search-trigger");

    const openSearch = () => {
      modal?.classList.remove("hidden");
      input?.focus();
      input.value = "";
      if (resultsContainer) resultsContainer.innerHTML = `<div class="p-4 text-xs text-slate-400 text-center">Ketik kata kunci untuk mencari di seluruh 25 sheet database...</div>`;
    };

    const closeSearch = () => {
      modal?.classList.add("hidden");
    };

    headerInput?.addEventListener("click", openSearch);
    headerTrigger?.addEventListener("click", openSearch);
    closeBtn?.addEventListener("click", closeSearch);

    // Keyboard shortcut CTRL+K / CMD+K / ESC
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") {
        closeSearch();
      }
    });

    input?.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = `<div class="p-4 text-xs text-slate-400 text-center">Ketik kata kunci pencarian...</div>`;
        return;
      }

      const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
      const tasks = store.getItems(SHEET_NAMES.CONTENT_TASKS);
      const scripts = store.getItems(SHEET_NAMES.CONTENT_SCRIPTS);
      const brands = store.getItems(SHEET_NAMES.BRANDS);

      const matchedContents = contents.filter(c => (c.content_title || "").toLowerCase().includes(q)).slice(0, 4);
      const matchedTasks = tasks.filter(t => (t.task_name || "").toLowerCase().includes(q)).slice(0, 4);
      const matchedBrands = brands.filter(b => (b.brand_name || "").toLowerCase().includes(q)).slice(0, 4);

      if (matchedContents.length === 0 && matchedTasks.length === 0 && matchedBrands.length === 0) {
        resultsContainer.innerHTML = `<div class="p-5 text-xs text-slate-500 text-center">Tidak ada hasil ditemukan untuk <strong>"${q}"</strong></div>`;
        return;
      }

      resultsContainer.innerHTML = `
        <div class="p-2 space-y-1 text-xs">
          ${matchedContents.map(c => `
            <a href="#content" onclick="document.getElementById('global-search-modal').classList.add('hidden')" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-[#2c6673]">lightbulb</span>
                <span class="font-bold text-slate-900">${c.content_title}</span>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">${c.platform || 'Multi'}</span>
            </a>
          `).join('')}
          ${matchedTasks.map(t => `
            <a href="#tasks" onclick="document.getElementById('global-search-modal').classList.add('hidden')" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-[#2c6673]">check_circle</span>
                <span class="font-bold text-slate-900">${t.task_name}</span>
              </div>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700">${t.status}</span>
            </a>
          `).join('')}
          ${matchedBrands.map(b => `
            <a href="#business" onclick="document.getElementById('global-search-modal').classList.add('hidden')" class="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-[16px] text-[#2c6673]">business</span>
                <span class="font-bold text-slate-900">${b.brand_name}</span>
              </div>
              <span class="text-[10px] text-slate-400">${b.category}</span>
            </a>
          `).join('')}
        </div>
      `;
    });
  }

  setupQuickAdd() {
    const btn = document.getElementById("btn-quick-add-dropdown");
    const menu = document.getElementById("quick-add-menu");

    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      menu?.classList.toggle("hidden");
    });

    document.addEventListener("click", () => {
      menu?.classList.add("hidden");
    });

    document.querySelectorAll("[data-quick-action]").forEach(actionBtn => {
      actionBtn.addEventListener("click", () => {
        const act = actionBtn.getAttribute("data-quick-action");
        menu?.classList.add("hidden");

        if (act === "content") window.location.hash = "#content";
        else if (act === "task") window.location.hash = "#tasks";
        else if (act === "script") window.location.hash = "#production";
        else if (act === "finance") window.location.hash = "#finance";
        else if (act === "timer") window.location.hash = "#timetracking";
      });
    });
  }
}

// Global Exports
window.app = new App();
window.store = store;
window.api = api;
window.auth = auth;
window.supabaseClient = supabaseClient;
window.navigateTo = (route) => window.app.navigate(route);

window.triggerCloudSync = async function() {
  const syncBtn = document.getElementById("btn-global-sync");
  const isSupabase = supabaseClient.isConfigured();
  const isSheets = api.isConfigured();

  if (!isSupabase && !isSheets) {
    if (window.showToast) {
      window.showToast("ℹ️ Mengarahkan ke Pengaturan Cloud Database...", "info");
    }
    setActiveSettingsTab("cloud");
    window.app.navigate("settings");
    setTimeout(() => {
      document.getElementById("cfg-supabase-url")?.focus();
    }, 200);
    return;
  }

  const origContent = syncBtn ? syncBtn.innerHTML : "";
  if (syncBtn) {
    syncBtn.disabled = true;
    syncBtn.innerHTML = `
      <svg class="animate-spin -ml-0.5 mr-1 h-3.5 w-3.5 text-emerald-600 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Menyinkronkan...</span>
    `;
  }

  // JIKA SUPABASE AKTIF: Sync data dari Supabase PostgreSQL
  if (isSupabase) {
    if (window.showToast) {
      window.showToast("⏳ Memuat data terbaru dari database Supabase PostgreSQL...", "info");
    }
    try {
      const res = await supabaseClient.fetchAll(store);
      if (res.success) {
        if (window.showToast) {
          window.showToast(`✅ Berhasil! Data dari Supabase PostgreSQL telah dimuat (${res.totalTables} tabel).`, "success");
        }
        window.app.handleRoute();
      } else {
        if (window.showToast) {
          window.showToast(`❌ Gagal mengambil data Supabase: ${res.message}`, "error");
        }
      }
    } catch (err) {
      if (window.showToast) {
        window.showToast(`❌ Terjadi kesalahan Supabase: ${err.message}`, "error");
      }
    } finally {
      if (syncBtn) {
        syncBtn.disabled = false;
        syncBtn.innerHTML = origContent;
      }
      window.app.updateSyncBadge();
    }
    return;
  }

  // JIKA GOOGLE APPS SCRIPT AKTIF:
  if (window.showToast) {
    window.showToast("⏳ Sedang menyinkronkan data dengan Google Sheets...", "info");
  }

  try {
    // 1. Flush offline queue if any
    const queue = store.getQueue();
    if (queue.length > 0) {
      await api.flushQueue();
    }

    // 2. Fetch all latest sheets data
    const res = await api.fetchAll();
    if (res.success) {
      if (window.showToast) {
        window.showToast(`✅ Sinkronisasi Berhasil! ${res.totalSheets} sheets Google Sheets telah dimuat.`, "success");
      }
      window.app.handleRoute(); // Refresh current view
    } else {
      if (window.showToast) {
        window.showToast(`❌ Sinkronisasi gagal: ${res.message}`, "error");
      }
    }
  } catch (err) {
    if (window.showToast) {
      window.showToast(`❌ Terjadi kesalahan: ${err.message}`, "error");
    }
  } finally {
    if (syncBtn) {
      syncBtn.disabled = false;
      syncBtn.innerHTML = origContent;
    }
    window.app.updateSyncBadge();
  }
};


})(window, document);