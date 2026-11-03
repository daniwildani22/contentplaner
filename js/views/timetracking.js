/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: TIME TRACKING & ROUTINES
 * Modul 15 (Time Tracking) & Modul 16 (Checklist & Routines)
 * File: js/views/timetracking.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES } from "../config.js";

let timerInterval = null;

export function renderTimeTracking(container) {
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
                <button class="text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition" onclick="window.deleteRoutineItem('${r.id}')">✕</button>
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
                          <button class="font-bold text-slate-400 hover:text-rose-600 text-xs" onclick="window.deleteTimeEntry('${entry.time_id}')">
                            Hapus
                          </button>
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
  window.toggleRoutineItem = (id) => {
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "daily_routine_items");
    let list = [];
    try { list = JSON.parse(setting.value || setting.setting_value); } catch (e) {}
    list = list.map(item => item.id === id ? { ...item, done: !item.done } : item);
    store.updateItem(SHEET_NAMES.SETTINGS, "daily_routine_items", { value: JSON.stringify(list) });
    renderTimeTracking(container);
  };

  window.deleteRoutineItem = (id) => {
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "daily_routine_items");
    let list = [];
    try { list = JSON.parse(setting.value || setting.setting_value); } catch (e) {}
    list = list.filter(item => item.id !== id);
    store.updateItem(SHEET_NAMES.SETTINGS, "daily_routine_items", { value: JSON.stringify(list) });
    renderTimeTracking(container);
  };

  window.deleteTimeEntry = (id) => {
    if (confirm("Hapus baris catatan waktu kerja ini?")) {
      store.deleteItem(SHEET_NAMES.TIME_TRACKING, id);
      renderTimeTracking(container);
    }
  };
}

function openManualTimeModal(tasks = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">Catat Durasi Kerja Manual</h3>
          <button id="modal-time-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="time-log-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Aktivitas <span class="text-rose-500">*</span></label>
            <input type="text" id="form-time-act" required placeholder="Shooting scene texture serum" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Terkait Tugas</label>
            <select id="form-time-task" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
              <option value="">-- Umum / Tanpa Tugas --</option>
              ${tasks.map(t => `<option value="${t.task_id}">${t.task_title}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal</label>
              <input type="date" id="form-time-date" value="${new Date().toISOString().slice(0, 10)}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Durasi Total (Menit) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-time-dur" required value="60" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Jam Mulai</label>
              <input type="time" id="form-time-start" value="09:00" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Jam Selesai</label>
              <input type="time" id="form-time-end" value="10:00" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
            <input type="text" id="form-time-notes" placeholder="Shooting di studio lantai 2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-time-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Log Waktu</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-time-close")?.addEventListener("click", close);
  document.getElementById("modal-time-cancel")?.addEventListener("click", close);

  document.getElementById("time-log-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    store.createItem(SHEET_NAMES.TIME_TRACKING, {
      task_id: document.getElementById("form-time-task").value,
      activity: document.getElementById("form-time-act").value.trim(),
      date: document.getElementById("form-time-date").value,
      duration: Number(document.getElementById("form-time-dur").value) || 0,
      start_time: document.getElementById("form-time-start").value,
      end_time: document.getElementById("form-time-end").value,
      notes: document.getElementById("form-time-notes").value.trim()
    });
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderTimeTracking(main);
  });
}
