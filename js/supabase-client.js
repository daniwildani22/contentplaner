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

  async fetchAll(storeInstance) {
    if (!this.isConfigured() || !storeInstance) return { success: false, message: "Supabase belum dikonfigurasi." };

    try {
      let totalFetched = 0;
      const promises = Object.entries(TABLE_MAP).map(async ([sheetName, tableName]) => {
        try {
          const { data, error } = await this.client.from(tableName).select("*");
          if (!error && data && data.length > 0) {
            storeInstance.replaceSheetData(sheetName, data);
            totalFetched++;
          }
        } catch (e) {
          console.warn(`Gagal memuat tabel ${tableName}:`, e);
        }
      });

      await Promise.all(promises);
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
        await this.client.from(tableName).upsert(item);
      } else if (action === "update") {
        const targetId = id || item[pk];
        await this.client.from(tableName).update(item).eq(pk, targetId);
      } else if (action === "delete") {
        const targetId = id || item[pk];
        await this.client.from(tableName).delete().eq(pk, targetId);
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

          // Cari sheetName yang sesuai
          const sheetEntry = Object.entries(TABLE_MAP).find(([, tbl]) => tbl === tableName);
          if (!sheetEntry || !storeInstance) return;

          const [sheetName] = sheetEntry;
          const pk = PK_MAP[tableName] || "id";

          if (eventType === "INSERT") {
            const list = storeInstance.getItems(sheetName);
            if (!list.some(i => i[pk] === payload.new[pk])) {
              storeInstance.state[sheetName].unshift(payload.new);
              storeInstance.persist();
            }
          } else if (eventType === "UPDATE") {
            const list = storeInstance.getItems(sheetName);
            const idx = list.findIndex(i => i[pk] === payload.new[pk]);
            if (idx !== -1) {
              storeInstance.state[sheetName][idx] = { ...list[idx], ...payload.new };
              storeInstance.persist();
            }
          } else if (eventType === "DELETE") {
            const list = storeInstance.getItems(sheetName);
            storeInstance.state[sheetName] = list.filter(i => i[pk] !== payload.old[pk]);
            storeInstance.persist();
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
