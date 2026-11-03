/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - MAIN APPLICATION BOOTSTRAP
 * File: js/app.js
 * =========================================================================================
 */

import { store } from "./store.js";
import { api } from "./api.js";
import { auth } from "./auth.js";
import { supabaseClient } from "./supabase-client.js";
import { SHEET_NAMES } from "./config.js";

// View Renderers
import { renderDashboard } from "./views/dashboard.js";
import { renderContent } from "./views/content.js";
import { renderCalendar } from "./views/calendar.js";
import { renderTasks } from "./views/tasks.js";
import { renderProduction } from "./views/production.js";
import { renderMedia } from "./views/media.js";
import { renderSocial } from "./views/social.js";
import { renderBusiness } from "./views/business.js";
import { renderFinance } from "./views/finance.js";
import { renderTimeTracking } from "./views/timetracking.js";
import { renderTargets } from "./views/targets.js";
import { renderReports } from "./views/reports.js";
import { renderNotifications } from "./views/notifications.js";
import { renderSettings, setActiveSettingsTab } from "./views/settings.js";

// Global Toast System
export function showToast(message, type = "info") {
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
        this.handleRoute();
      });

      // Tarik seluruh data terbaru dari database Supabase PostgreSQL secara otomatis
      supabaseClient.fetchAll(store).then((res) => {
        if (res.success && res.totalTables > 0) {
          console.log(`Auto-hydrate berhasil: ${res.totalTables} tabel Supabase dimuat.`);
          this.updateSyncBadge();
          this.handleRoute();
        }
      });
    }

    // 5. Initial State Check
    if (auth.isLoggedIn()) {
      this.showAppShell();
      this.updateSidebarUserProfile();
      this.handleRoute();
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

    const avatarEl = document.getElementById("sidebar-user-avatar");
    const nameEl = document.getElementById("sidebar-user-name");
    const emailEl = document.getElementById("sidebar-user-email");
    const roleEl = document.getElementById("sidebar-user-role");
    const greetingEl = document.getElementById("header-greeting-user");

    if (avatarEl && user.avatar) avatarEl.src = user.avatar;
    if (nameEl) nameEl.textContent = user.name || "User";
    if (emailEl) emailEl.textContent = user.email || "";
    if (roleEl) roleEl.textContent = user.role || "Member";
    if (greetingEl) {
      const firstName = (user.name || "Rian").split(" ")[0];
      greetingEl.textContent = `Welcome ${firstName} !`;
    }
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
