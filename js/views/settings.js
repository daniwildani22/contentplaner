/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: SETTINGS (MODULE 21)
 * File: js/views/settings.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { api } from "../api.js";
import { auth, AVAILABLE_PERMISSIONS, ROLE_DEFAULT_PERMISSIONS } from "../auth.js";
import { SHEET_NAMES } from "../config.js";

let activeSettingsTab = "cloud"; // 'cloud', 'profile', 'data'
let editingUserId = null; // null for add new user, userId string for editing

export function setActiveSettingsTab(tab) {
  if (["cloud", "profile", "data"].includes(tab)) {
    activeSettingsTab = tab;
  }
}

export function renderSettings(container) {
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
