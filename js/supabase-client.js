/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - SUPABASE CLIENT & REALTIME SYNC
 * File: js/supabase-client.js
 * =========================================================================================
 */

import { APP_CONFIG, SHEET_NAMES } from "./config.js";

// Mapping nama Sheet ke nama tabel PostgreSQL Supabase
export const TABLE_MAP = {
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

export const PK_MAP = {
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

export const supabaseClient = new SupabaseManager();
window.supabaseClient = supabaseClient;
