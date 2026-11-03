/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: BUSINESS MANAGEMENT
 * Modul 12 (Brand & Client Management) & Modul 13 (Project & Campaign Management)
 * File: js/views/business.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES, SOCIAL_PLATFORMS } from "../config.js";

let activeBusinessTab = "brands"; // 'brands', 'clients', 'projects', 'campaigns'
let businessSearch = "";

export function renderBusiness(container) {
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
