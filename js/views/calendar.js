/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: CALENDAR (MODULE 03)
 * File: js/views/calendar.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { auth } from "../auth.js";
import { SHEET_NAMES, SOCIAL_PLATFORMS } from "../config.js";

let currentCalendarDate = new Date();
let currentCalendarView = "month"; // 'month' or 'agenda'
let filterPlatform = "ALL";
let filterBrand = "ALL";

export function renderCalendar(container) {
  const allEvents = store.getItems(SHEET_NAMES.CONTENT_CALENDAR);
  const brands = store.getItems(SHEET_NAMES.BRANDS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);

  // Filter events
  const filteredEvents = allEvents.filter(event => {
    const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, event.content_id) || {};
    const matchPlatform = filterPlatform === "ALL" || cnt.platform === filterPlatform;
    const matchBrand = filterBrand === "ALL" || cnt.brand_id === filterBrand;
    return matchPlatform && matchBrand;
  });

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const monthName = currentCalendarDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 03</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Kalender Terpadu</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Content & Production Calendar</h1>
          <p class="text-xs text-slate-500 mt-0.5">Jadwal shooting, deadline pengerjaan video, dan tanggal publikasi multi-platform.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <!-- View switcher -->
          <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button id="btn-cal-month" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentCalendarView === 'month' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-500'}">
              Bulan
            </button>
            <button id="btn-cal-agenda" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${currentCalendarView === 'agenda' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-500'}">
              Agenda List
            </button>
          </div>

          <button id="btn-create-schedule" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>+ Buat Jadwal</span>
          </button>
        </div>
      </div>

      <!-- Navigation & Filters Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <!-- Month Navigator -->
        <div class="flex items-center gap-2">
          <button id="cal-prev-month" class="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition">
            ◀ Bulan Lalu
          </button>
          <div class="px-3 py-1.5 font-extrabold text-slate-900 text-sm tracking-tight capitalize">
            ${monthName}
          </div>
          <button id="cal-next-month" class="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition">
            Bulan Depan ▶
          </button>
          <button id="cal-today-btn" class="text-xs font-semibold text-blue-600 hover:text-blue-800 ml-2">
            Hari Ini
          </button>
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-2.5">
          <select id="cal-filter-platform" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${filterPlatform === 'ALL' ? 'selected' : ''}>Semua Platform</option>
            ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${filterPlatform === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>

          <select id="cal-filter-brand" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${filterBrand === 'ALL' ? 'selected' : ''}>Semua Brand</option>
            ${brands.map(b => `<option value="${b.brand_id}" ${filterBrand === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Calendar View Container -->
      ${currentCalendarView === "month" ? renderMonthGrid(year, month, filteredEvents) : renderAgendaView(filteredEvents)}
    </div>
  `;

  setupCalendarListeners(container, contents);
}

function renderMonthGrid(year, month, events) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const todayStr = new Date().toISOString().slice(0, 10);

  let gridCells = [];

  // Padding cells before day 1
  for (let i = 0; i < firstDay; i++) {
    gridCells.push(`<div class="bg-slate-50/50 p-2 min-h-[110px] border border-slate-100 text-slate-300 text-xs"></div>`);
  }

  // Days in month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);
    const dateStr = dayDate.toISOString().slice(0, 10);
    const isToday = dateStr === todayStr;

    // Filter events matching this date (either publication_date or production_date)
    const dayEvents = events.filter(e => e.publication_date === dateStr || e.production_date === dateStr);

    gridCells.push(`
      <div class="bg-white p-2 min-h-[110px] border border-slate-200/70 hover:border-blue-300 transition flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between pb-1">
            <span class="text-xs font-bold ${isToday ? 'w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-extrabold' : 'text-slate-700'}">
              ${day}
            </span>
            ${dayEvents.length > 0 ? `<span class="text-[9px] font-bold text-slate-400">${dayEvents.length} pos</span>` : ''}
          </div>

          <!-- Events Pills -->
          <div class="space-y-1.5 mt-1">
            ${dayEvents.map(ev => {
              const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, ev.content_id) || {};
              const isPub = ev.publication_date === dateStr;
              return `
                <div class="text-[10px] p-1.5 rounded-lg border leading-tight cursor-pointer transition ${isPub ? 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100' : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'}" onclick="window.openCalendarModal('${ev.calendar_id}')">
                  <div class="font-extrabold flex items-center justify-between">
                    <span>${isPub ? '🚀 ' + (cnt.platform || 'Tayang') : '🎬 Shooting'}</span>
                    <span class="text-[8px] font-semibold">${isPub ? (ev.publication_time || '19:00') : ''}</span>
                  </div>
                  <div class="truncate font-semibold mt-0.5">${cnt.content_title || 'Untitled'}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="pt-1 opacity-0 group-hover:opacity-100 transition text-right">
          <button class="text-[10px] font-bold text-blue-600 hover:text-blue-800" onclick="window.quickAddScheduleForDate('${dateStr}')">
            + Jadwal
          </button>
        </div>
      </div>
    `);
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <!-- Days of Week Header -->
      <div class="grid grid-cols-7 text-center font-bold text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50 border-b border-slate-200 py-3">
        ${dayNames.map(d => `<div>${d}</div>`).join('')}
      </div>

      <!-- Month Grid -->
      <div class="grid grid-cols-7 divide-x divide-y divide-slate-100">
        ${gridCells.join('')}
      </div>
    </div>
  `;
}

function renderAgendaView(events) {
  const sorted = [...events].sort((a, b) => (a.publication_date > b.publication_date ? 1 : -1));

  if (sorted.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">📅</div>
        <div class="font-bold text-slate-800 text-sm">Tidak ada jadwal konten ditemukan</div>
        <div class="text-xs text-slate-500 mt-1">Gunakan tombol "+ Buat Jadwal" untuk mengatur waktu shooting dan publikasi.</div>
      </div>
    `;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
        Daftar Agenda Jadwal Konten Terurut
      </div>
      <div class="divide-y divide-slate-100">
        ${sorted.map(ev => {
          const cnt = store.getItemById(SHEET_NAMES.CONTENT_PLANNING, ev.content_id) || {};
          const brandName = store.getBrandName(cnt.brand_id);
          const isOverdue = ev.deadline < new Date().toISOString().slice(0, 10) && ev.schedule_status !== "Published";

          return `
            <div class="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition">
              <div class="flex items-start gap-3">
                <div class="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex flex-col items-center justify-center shrink-0">
                  <span class="text-[9px] font-bold text-blue-600 uppercase">${new Date(ev.publication_date).toLocaleDateString('id-ID', { month: 'short' })}</span>
                  <span class="text-sm font-extrabold text-blue-900">${new Date(ev.publication_date).getDate() || '-'}</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-900">${cnt.content_title || 'Untitled'}</span>
                    <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${cnt.platform || 'General'}</span>
                    ${isOverdue ? `<span class="text-[10px] font-bold bg-rose-500 text-white px-1.5 py-0.5 rounded">Terlambat</span>` : ''}
                  </div>
                  <div class="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 mt-1">
                    <span>🏢 ${brandName}</span>
                    <span>•</span>
                    <span>🎬 Produksi: ${ev.production_date || '-'}</span>
                    <span>•</span>
                    <span>⏰ Tayang: ${ev.publication_date} (${ev.publication_time || '19:00'})</span>
                    <span>•</span>
                    <span>Status: <strong class="text-slate-700">${ev.schedule_status}</strong></span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2 self-end sm:self-center">
                <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openCalendarModal('${ev.calendar_id}')">
                  Edit Jadwal
                </button>
                ${auth.isAdminOrOwner() ? `
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteCalendarEvent('${ev.calendar_id}')">
                    Hapus
                  </button>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function setupCalendarListeners(container, contents) {
  // Navigators
  document.getElementById("cal-prev-month")?.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar(container);
  });
  document.getElementById("cal-next-month")?.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar(container);
  });
  document.getElementById("cal-today-btn")?.addEventListener("click", () => {
    currentCalendarDate = new Date();
    renderCalendar(container);
  });

  // View Switchers
  document.getElementById("btn-cal-month")?.addEventListener("click", () => {
    currentCalendarView = "month";
    renderCalendar(container);
  });
  document.getElementById("btn-cal-agenda")?.addEventListener("click", () => {
    currentCalendarView = "agenda";
    renderCalendar(container);
  });

  // Filters
  document.getElementById("cal-filter-platform")?.addEventListener("change", (e) => {
    filterPlatform = e.target.value;
    renderCalendar(container);
  });
  document.getElementById("cal-filter-brand")?.addEventListener("change", (e) => {
    filterBrand = e.target.value;
    renderCalendar(container);
  });

  // Create button
  document.getElementById("btn-create-schedule")?.addEventListener("click", () => {
    openScheduleModal(null, contents);
  });

  // Global functions
  window.openCalendarModal = (calendarId) => {
    const ev = store.getItemById(SHEET_NAMES.CONTENT_CALENDAR, calendarId);
    if (ev) openScheduleModal(ev, contents);
  };

  window.quickAddScheduleForDate = (dateStr) => {
    openScheduleModal({ publication_date: dateStr, production_date: dateStr }, contents);
  };

  window.deleteCalendarEvent = (calendarId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) {
        window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus jadwal kalender.", "error");
      } else {
        alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus jadwal kalender.");
      }
      return;
    }
    if (confirm("Hapus jadwal konten ini dari kalender?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_CALENDAR, calendarId);
      if (window.showToast) window.showToast("🗑️ Jadwal konten berhasil dihapus dari kalender.", "info");
      renderCalendar(container);
    }
  };
}

function openScheduleModal(eventData = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!(eventData && eventData.calendar_id);
  const data = eventData || {
    content_id: contents[0]?.content_id || "",
    production_date: new Date().toISOString().slice(0, 10),
    deadline: new Date().toISOString().slice(0, 10),
    publication_date: new Date().toISOString().slice(0, 10),
    publication_time: "19:00",
    schedule_status: "Scheduled",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Jadwal Konten' : 'Atur Jadwal Konten Baru'}
            </h3>
            <p class="text-xs text-slate-500">Sinkronkan tanggal produksi, deadline, dan waktu publikasi</p>
          </div>
          <button id="modal-cal-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="schedule-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Pilih Konten <span class="text-rose-500">*</span></label>
            <select id="form-cal-content" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
              ${contents.map(c => `
                <option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>
                  [${c.platform}] ${c.content_title}
                </option>
              `).join('')}
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Produksi / Shooting</label>
              <input type="date" id="form-cal-prod-date" value="${data.production_date || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Deadline Final Video</label>
              <input type="date" id="form-cal-deadline" value="${data.deadline || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Publikasi Tayang</label>
              <input type="date" id="form-cal-pub-date" required value="${data.publication_date || ''}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Jam Publikasi</label>
              <input type="time" id="form-cal-pub-time" value="${data.publication_time || '19:00'}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Status Jadwal</label>
            <select id="form-cal-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
              <option value="Draft" ${data.schedule_status === 'Draft' ? 'selected' : ''}>Draft</option>
              <option value="Planned" ${data.schedule_status === 'Planned' ? 'selected' : ''}>Planned</option>
              <option value="Scheduled" ${data.schedule_status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
              <option value="Ready" ${data.schedule_status === 'Ready' ? 'selected' : ''}>Ready</option>
              <option value="Published" ${data.schedule_status === 'Published' ? 'selected' : ''}>Published</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Jadwal</label>
            <input type="text" id="form-cal-notes" value="${data.notes || ''}" placeholder="Misal: Prime time malam Jumat / Hari gajian" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-cal-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Jadwal</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-cal-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                Simpan Jadwal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-cal-close")?.addEventListener("click", close);
  document.getElementById("modal-cal-cancel")?.addEventListener("click", close);

  document.getElementById("modal-cal-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus jadwal konten ini dari kalender?")) {
      store.deleteItem(SHEET_NAMES.CONTENT_CALENDAR, eventData.calendar_id);
      if (window.showToast) window.showToast("🗑️ Jadwal konten berhasil dihapus dari kalender.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderCalendar(mainContainer);
    }
  });

  document.getElementById("schedule-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      content_id: document.getElementById("form-cal-content").value,
      production_date: document.getElementById("form-cal-prod-date").value,
      deadline: document.getElementById("form-cal-deadline").value,
      publication_date: document.getElementById("form-cal-pub-date").value,
      publication_time: document.getElementById("form-cal-pub-time").value,
      schedule_status: document.getElementById("form-cal-status").value,
      notes: document.getElementById("form-cal-notes").value.trim()
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.CONTENT_CALENDAR, eventData.calendar_id, payload);
    } else {
      store.createItem(SHEET_NAMES.CONTENT_CALENDAR, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderCalendar(mainContainer);
  });
}
