/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: SOCIAL MEDIA & ANALYTICS
 * Modul 09 (Social Media Management), Modul 10 (Publishing), Modul 11 (Content Analytics)
 * File: js/views/social.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES, PUBLICATION_STATUSES, SOCIAL_PLATFORMS } from "../config.js";

let activeSocialTab = "accounts"; // 'accounts', 'publishing', 'analytics'
let socialSearch = "";

export function renderSocial(container) {
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
