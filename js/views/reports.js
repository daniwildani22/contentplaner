/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: REPORTS & EXPORTS
 * Modul 19 (Reports & Analytics Export)
 * File: js/views/reports.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES, SOCIAL_PLATFORMS } from "../config.js";

let selectedReportType = "financial"; // 'financial', 'content', 'tasks', 'publications', 'analytics', 'timetracking'
let reportStartDate = "";
let reportEndDate = "";
let reportFilterBrand = "ALL";
let reportFilterPlatform = "ALL";

export function renderReports(container) {
  const brands = store.getItems(SHEET_NAMES.BRANDS);

  // Generate data based on report type
  const reportData = getActiveReportData();

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 19</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Pusat Laporan & Ekspor</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Executive Studio Reports</h1>
          <p class="text-xs text-slate-500 mt-0.5">Generate laporan resmi produktivitas, jadwal publikasi, analitik performa, dan buku kas studio.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-export-excel" class="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <span>📊</span> <span>Ekspor Excel (.xlsx)</span>
          </button>
          <button id="btn-print-report" class="inline-flex items-center gap-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <span>🖨️</span> <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      <!-- Filters & Report Type Selector -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <!-- Report Type Dropdown -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-700">Tipe Laporan:</span>
          <select id="report-type-select" class="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none">
            <option value="financial" ${selectedReportType === 'financial' ? 'selected' : ''}>💰 Laporan Keuangan (P&L Kas)</option>
            <option value="content" ${selectedReportType === 'content' ? 'selected' : ''}>🎬 Laporan Perencanaan Konten</option>
            <option value="tasks" ${selectedReportType === 'tasks' ? 'selected' : ''}>📋 Laporan Tugas & Subtask</option>
            <option value="publications" ${selectedReportType === 'publications' ? 'selected' : ''}>🚀 Laporan Riwayat Publikasi</option>
            <option value="analytics" ${selectedReportType === 'analytics' ? 'selected' : ''}>📈 Laporan Analitik & Jangkauan</option>
            <option value="timetracking" ${selectedReportType === 'timetracking' ? 'selected' : ''}>⏱️ Laporan Durasi Waktu Kerja</option>
          </select>
        </div>

        <!-- Filter Controls -->
        <div class="flex flex-wrap items-center gap-2.5 text-xs">
          <div class="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <span class="text-slate-400 font-medium">Dari:</span>
            <input type="date" id="report-start-date" value="${reportStartDate}" class="bg-transparent outline-none">
            <span class="text-slate-400 font-medium ml-1">S/d:</span>
            <input type="date" id="report-end-date" value="${reportEndDate}" class="bg-transparent outline-none">
          </div>

          <select id="report-filter-brand" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${reportFilterBrand === 'ALL' ? 'selected' : ''}>Semua Brand</option>
            ${brands.map(b => `<option value="${b.brand_id}" ${reportFilterBrand === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
          </select>

          <select id="report-filter-platform" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${reportFilterPlatform === 'ALL' ? 'selected' : ''}>Semua Platform</option>
            ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${reportFilterPlatform === p ? 'selected' : ''}>${p}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Printable Report Sheet Container -->
      <div id="printable-report-area" class="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
        <!-- Official Document Letterhead -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-slate-900 gap-4">
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase tracking-widest">LAPORAN RESMI EKSEKUTIF KREATOR</div>
            <h2 class="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">${reportData.title}</h2>
            <div class="text-xs text-slate-500 mt-0.5">Periode: ${reportStartDate || 'Awal'} s/d ${reportEndDate || 'Sekarang'} • Dicetak: ${new Date().toLocaleDateString('id-ID')}</div>
          </div>
          <div class="text-right">
            <div class="font-extrabold text-sm text-slate-900">CREATOR STUDIO OS</div>
            <div class="text-[11px] text-slate-400">Database: Google Sheets Terpadu</div>
          </div>
        </div>

        <!-- Metric Highlight Banner -->
        ${reportData.summaryCards ? `
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            ${reportData.summaryCards.map(c => `
              <div>
                <div class="text-[10px] font-bold text-slate-400 uppercase">${c.label}</div>
                <div class="text-base font-extrabold text-slate-900 mt-0.5">${c.value}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- Report Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                ${reportData.headers.map(h => `<th class="py-3 px-4 ${h.align || 'text-left'}">${h.label}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${reportData.rows.length === 0 ? `
                <tr><td colspan="${reportData.headers.length}" class="py-8 text-center text-slate-400">Tidak ada data untuk filter yang dipilih.</td></tr>
              ` : reportData.rows.map(row => `
                <tr class="hover:bg-slate-50/50">
                  ${row.map((cell, idx) => {
                    const align = reportData.headers[idx]?.align || 'text-left';
                    return `<td class="py-3 px-4 ${align}">${cell}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  setupReportsListeners(container, reportData);
}

function getActiveReportData() {
  if (selectedReportType === "financial") {
    const incomes = store.getItems(SHEET_NAMES.INCOME);
    const expenses = store.getItems(SHEET_NAMES.EXPENSES);

    let totInc = 0;
    let totExp = 0;
    incomes.forEach(i => totInc += (Number(i.amount) || 0));
    expenses.forEach(e => totExp += (Number(e.amount) || 0));

    const rows = [
      ...incomes.map(i => [
        i.date,
        "Kas Masuk",
        i.income_source,
        store.getClientName(i.client_id),
        "Rp " + Number(i.amount).toLocaleString('id-ID'),
        i.payment_status
      ]),
      ...expenses.map(e => [
        e.date,
        "Beban Keluar",
        e.description,
        e.category,
        "Rp " + Number(e.amount).toLocaleString('id-ID'),
        e.payment_method
      ])
    ];

    return {
      title: "Laporan Keuangan & Arus Kas Studio (P&L)",
      summaryCards: [
        { label: "Total Kas Masuk", value: "Rp " + totInc.toLocaleString('id-ID') },
        { label: "Total Pengeluaran", value: "Rp " + totExp.toLocaleString('id-ID') },
        { label: "Laba Bersih", value: "Rp " + (totInc - totExp).toLocaleString('id-ID') },
        { label: "Total Transaksi", value: rows.length + " Baris" }
      ],
      headers: [
        { label: "Tanggal" },
        { label: "Tipe Arus" },
        { label: "Uraian / Deskripsi" },
        { label: "Kategori / Klien" },
        { label: "Nominal", align: "text-right font-mono font-bold" },
        { label: "Status / Metode" }
      ],
      rows
    };
  }

  if (selectedReportType === "content") {
    const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
    return {
      title: "Laporan Perencanaan & Pipeline Konten",
      summaryCards: [
        { label: "Total Konten", value: contents.length },
        { label: "Dalam Produksi", value: contents.filter(c => c.status === "In Production").length },
        { label: "Siap Tayang", value: contents.filter(c => c.status === "Ready").length },
        { label: "Sudah Tayang", value: contents.filter(c => c.status === "Published").length }
      ],
      headers: [
        { label: "Judul Konten" },
        { label: "Platform" },
        { label: "Brand" },
        { label: "Pilar" },
        { label: "Target Tayang" },
        { label: "Status" }
      ],
      rows: contents.map(c => [
        c.content_title,
        c.platform,
        store.getBrandName(c.brand_id),
        c.content_pillar || '-',
        c.planned_date || '-',
        c.status
      ])
    };
  }

  if (selectedReportType === "tasks") {
    const tasks = store.getItems(SHEET_NAMES.CONTENT_TASKS);
    return {
      title: "Laporan Tugas & Produktivitas Kerja",
      summaryCards: [
        { label: "Total Tugas", value: tasks.length },
        { label: "Selesai", value: tasks.filter(t => t.status === "Completed").length },
        { label: "In Progress", value: tasks.filter(t => t.status === "In Progress").length },
        { label: "Pending", value: tasks.filter(t => t.status === "To Do").length }
      ],
      headers: [
        { label: "Nama Tugas" },
        { label: "PIC Ditugaskan" },
        { label: "Prioritas" },
        { label: "Deadline" },
        { label: "Progres", align: "text-right" },
        { label: "Status" }
      ],
      rows: tasks.map(t => [
        t.task_title,
        store.getUserName(t.assigned_user),
        t.priority,
        t.deadline,
        (t.progress || 0) + "%",
        t.status
      ])
    };
  }

  // Default: Analitik
  const analytics = store.getItems(SHEET_NAMES.CONTENT_ANALYTICS);
  return {
    title: "Laporan Analitik & Jangkauan Video",
    summaryCards: [
      { label: "Total Views", value: analytics.reduce((acc, a) => acc + (Number(a.views) || 0), 0).toLocaleString('id-ID') },
      { label: "Total Likes", value: analytics.reduce((acc, a) => acc + (Number(a.likes) || 0), 0).toLocaleString('id-ID') },
      { label: "Total Shares", value: analytics.reduce((acc, a) => acc + (Number(a.shares) || 0), 0).toLocaleString('id-ID') },
      { label: "Total Snapshot", value: analytics.length }
    ],
    headers: [
      { label: "Konten" },
      { label: "Platform" },
      { label: "Tanggal" },
      { label: "Views", align: "text-right font-mono" },
      { label: "Likes", align: "text-right font-mono" },
      { label: "ER %", align: "text-right font-mono font-bold" }
    ],
    rows: analytics.map(a => [
      store.getContentTitle(a.content_id),
      a.platform,
      a.snapshot_date,
      Number(a.views || 0).toLocaleString('id-ID'),
      Number(a.likes || 0).toLocaleString('id-ID'),
      (a.engagement_rate || 0) + "%"
    ])
  };
}

function setupReportsListeners(container, reportData) {
  document.getElementById("report-type-select")?.addEventListener("change", (e) => {
    selectedReportType = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-start-date")?.addEventListener("change", (e) => {
    reportStartDate = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-end-date")?.addEventListener("change", (e) => {
    reportEndDate = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-filter-brand")?.addEventListener("change", (e) => {
    reportFilterBrand = e.target.value;
    renderReports(container);
  });
  document.getElementById("report-filter-platform")?.addEventListener("change", (e) => {
    reportFilterPlatform = e.target.value;
    renderReports(container);
  });

  // Export to Excel using SheetJS
  document.getElementById("btn-export-excel")?.addEventListener("click", () => {
    if (!window.XLSX) {
      alert("Library SheetJS sedang dimuat, silakan coba sesaat lagi.");
      return;
    }

    const wsData = [
      [reportData.title],
      ["Periode: " + (reportStartDate || 'Awal') + " s/d " + (reportEndDate || 'Sekarang')],
      [],
      reportData.headers.map(h => h.label),
      ...reportData.rows
    ];

    const ws = window.XLSX.utils.aoa_to_sheet(wsData);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Laporan_Kreator");

    const fileName = `Laporan_${selectedReportType}_${new Date().toISOString().slice(0, 10)}.xlsx`;
    window.XLSX.writeFile(wb, fileName);
  });

  // Print Report
  document.getElementById("btn-print-report")?.addEventListener("click", () => {
    window.print();
  });
}
