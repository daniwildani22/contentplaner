/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: CONTENT PLANNING (MODULE 02)
 * File: js/views/content.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { auth } from "../auth.js";
import {
  SHEET_NAMES,
  CONTENT_STATUSES,
  SOCIAL_PLATFORMS,
  CONTENT_PILLARS,
  CONTENT_FORMATS
} from "../config.js";

let currentViewMode = "kanban"; // 'kanban' or 'list'
let searchQuery = "";
let selectedPlatform = "ALL";
let selectedBrand = "ALL";
let selectedStatus = "ALL";

export function renderContent(container) {
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
