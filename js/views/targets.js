/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: TARGETS & PRODUCTIVITY
 * Modul 17 (Target & Productivity)
 * File: js/views/targets.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES, TARGET_TYPES } from "../config.js";

export function renderTargets(container) {
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
