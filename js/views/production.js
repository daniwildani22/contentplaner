/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: PRODUCTION & STUDIO
 * Modul 05 (Content Production), Modul 06 (Script & Copywriting), Modul 07 (Editing & Revision)
 * File: js/views/production.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { auth } from "../auth.js";
import {
  SHEET_NAMES,
  PRODUCTION_STATUSES,
  SCRIPT_STATUSES,
  REVISION_STATUSES,
  SOCIAL_PLATFORMS
} from "../config.js";

let activeProductionTab = "scripts"; // 'scripts', 'production', 'editing'
let productionSearch = "";

export function renderProduction(container) {
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
