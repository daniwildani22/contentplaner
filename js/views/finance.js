/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: FINANCIAL MANAGEMENT
 * Modul 14 (Financial Management: Income, Expenses, Invoices, Payments)
 * File: js/views/finance.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES, EXPENSE_CATEGORIES, INCOME_SOURCES } from "../config.js";

let activeFinanceTab = "income"; // 'income', 'expenses', 'invoices', 'payments'

export function renderFinance(container) {
  const incomes = store.getItems(SHEET_NAMES.INCOME);
  const expenses = store.getItems(SHEET_NAMES.EXPENSES);
  const invoices = store.getItems(SHEET_NAMES.INVOICES);
  const payments = store.getItems(SHEET_NAMES.PAYMENTS);
  const clients = store.getItems(SHEET_NAMES.CLIENTS);
  const projects = store.getItems(SHEET_NAMES.PROJECTS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);

  // Financial Calculations
  let totalIncomePaid = 0;
  let totalIncomePending = 0;
  let totalExpense = 0;

  incomes.forEach(i => {
    const amt = Number(i.amount) || 0;
    if (i.payment_status === "Paid") totalIncomePaid += amt;
    else totalIncomePending += amt;
  });

  expenses.forEach(e => {
    totalExpense += Number(e.amount) || 0;
  });

  const netProfit = totalIncomePaid - totalExpense;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 14</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Keuangan Studio</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Financial & Cashflow Management</h1>
          <p class="text-xs text-slate-500 mt-0.5">Buku kas masuk sponsorship & affiliate, pengeluaran perlengkapan, dan status invoice klien.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-create-fin-item" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span id="btn-fin-action-label">+ Catat Pendapatan</span>
          </button>
        </div>
      </div>

      <!-- Financial Metric Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Pendapatan Diterima -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Kas Masuk (Lunas)</div>
            <span class="text-lg">💵</span>
          </div>
          <div class="text-xl font-extrabold text-emerald-800 mt-1">
            Rp ${totalIncomePaid.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Total pendapatan terealisasi</div>
        </div>

        <!-- Piutang (Pending) -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Piutang Klien (Pending)</div>
            <span class="text-lg">⏳</span>
          </div>
          <div class="text-xl font-extrabold text-amber-800 mt-1">
            Rp ${totalIncomePending.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Menunggu pembayaran sponsor</div>
        </div>

        <!-- Pengeluaran Operasional -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Total Pengeluaran</div>
            <span class="text-lg">📉</span>
          </div>
          <div class="text-xl font-extrabold text-rose-800 mt-1">
            Rp ${totalExpense.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Gear, software, props & crew</div>
        </div>

        <!-- Laba Bersih -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div class="flex items-center justify-between">
            <div class="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Estimasi Laba Bersih</div>
            <span class="text-lg">💰</span>
          </div>
          <div class="text-xl font-extrabold text-blue-800 mt-1">
            Rp ${netProfit.toLocaleString('id-ID')}
          </div>
          <div class="text-[11px] text-slate-500 mt-0.5">Net Profit Margin</div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button id="tab-fin-income" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'income' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          💵 Pendapatan (${incomes.length})
        </button>
        <button id="tab-fin-expenses" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'expenses' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          🧾 Pengeluaran (${expenses.length})
        </button>
        <button id="tab-fin-invoices" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'invoices' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          📑 Invoices (${invoices.length})
        </button>
        <button id="tab-fin-payments" class="px-4 py-2 rounded-xl text-xs font-extrabold transition shrink-0 ${activeFinanceTab === 'payments' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          💳 Bukti Pembayaran (${payments.length})
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="finance-tab-content">
        ${activeFinanceTab === "income" ? renderIncomeTab(incomes) :
          activeFinanceTab === "expenses" ? renderExpensesTab(expenses) :
          activeFinanceTab === "invoices" ? renderInvoicesTab(invoices) :
          renderPaymentsTab(payments)}
      </div>
    </div>
  `;

  setupFinanceListeners(container, clients, projects, contents);
}

function renderIncomeTab(incomes) {
  if (incomes.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada data pendapatan tercatat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Tanggal</th>
              <th class="py-3.5 px-4">Sumber Pendapatan</th>
              <th class="py-3.5 px-4">Klien / Sponsor</th>
              <th class="py-3.5 px-4">Terkait Konten</th>
              <th class="py-3.5 px-4 text-right">Nominal (Rp)</th>
              <th class="py-3.5 px-4">Status Bayar</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${incomes.map(inc => {
              const clientName = store.getClientName(inc.client_id);
              const contentTitle = store.getContentTitle(inc.content_id);
              const isPaid = inc.payment_status === "Paid";

              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${inc.date}</td>
                  <td class="py-3 px-4 font-bold text-slate-900">${inc.income_source}</td>
                  <td class="py-3 px-4 font-medium text-slate-800">${clientName}</td>
                  <td class="py-3 px-4 max-w-xs truncate text-slate-500">${contentTitle}</td>
                  <td class="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                    Rp ${Number(inc.amount || 0).toLocaleString('id-ID')}
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${inc.payment_status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditIncomeModal('${inc.income_id}')">Edit</button>
                    <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteIncome('${inc.income_id}')">Hapus</button>
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

function renderExpensesTab(expenses) {
  if (expenses.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada pengeluaran tercatat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">Tanggal</th>
              <th class="py-3.5 px-4">Deskripsi Beban</th>
              <th class="py-3.5 px-4">Kategori</th>
              <th class="py-3.5 px-4">Metode Bayar</th>
              <th class="py-3.5 px-4 text-right">Nominal (Rp)</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${expenses.map(exp => `
              <tr class="hover:bg-slate-50/70 transition">
                <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${exp.date}</td>
                <td class="py-3 px-4 font-bold text-slate-900">${exp.description}</td>
                <td class="py-3 px-4 font-medium text-slate-600">${exp.category}</td>
                <td class="py-3 px-4 text-slate-500">${exp.payment_method || '-'}</td>
                <td class="py-3 px-4 text-right font-mono font-extrabold text-rose-600">
                  Rp ${Number(exp.amount || 0).toLocaleString('id-ID')}
                </td>
                <td class="py-3 px-4 text-right space-x-2">
                  <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditExpenseModal('${exp.expense_id}')">Edit</button>
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteExpense('${exp.expense_id}')">Hapus</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderInvoicesTab(invoices) {
  if (invoices.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada invoice dibuat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">No. Invoice</th>
              <th class="py-3.5 px-4">Klien</th>
              <th class="py-3.5 px-4">Tanggal Faktur</th>
              <th class="py-3.5 px-4">Jatuh Tempo</th>
              <th class="py-3.5 px-4 text-right">Total Tagihan (Rp)</th>
              <th class="py-3.5 px-4">Status Pembayaran</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${invoices.map(inv => {
              const clientName = store.getClientName(inv.client_id);
              const isPaid = inv.payment_status === "Paid";

              return `
                <tr class="hover:bg-slate-50/70 transition">
                  <td class="py-3 px-4 font-mono font-bold text-blue-600">${inv.invoice_id}</td>
                  <td class="py-3 px-4 font-bold text-slate-900">${clientName}</td>
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${inv.invoice_date}</td>
                  <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${inv.due_date}</td>
                  <td class="py-3 px-4 text-right font-mono font-extrabold text-slate-900">
                    Rp ${Number(inv.total || 0).toLocaleString('id-ID')}
                  </td>
                  <td class="py-3 px-4">
                    <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                      ${inv.payment_status}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-right space-x-2">
                    <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditInvoiceModal('${inv.invoice_id}')">Edit</button>
                    <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteInvoice('${inv.invoice_id}')">Hapus</button>
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

function renderPaymentsTab(payments) {
  if (payments.length === 0) {
    return `<div class="bg-white p-12 text-center rounded-2xl border border-slate-200 text-xs text-slate-500">Belum ada riwayat pembayaran tercatat.</div>`;
  }

  return `
    <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-700">
          <thead class="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200">
            <tr>
              <th class="py-3.5 px-4">ID Pembayaran</th>
              <th class="py-3.5 px-4">No. Invoice Terkait</th>
              <th class="py-3.5 px-4">Tanggal Pembayaran</th>
              <th class="py-3.5 px-4">Metode Bayar</th>
              <th class="py-3.5 px-4 text-right">Nominal Masuk (Rp)</th>
              <th class="py-3.5 px-4">Catatan</th>
              <th class="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            ${payments.map(pay => `
              <tr class="hover:bg-slate-50/70 transition">
                <td class="py-3 px-4 font-mono font-bold text-slate-900">${pay.payment_id}</td>
                <td class="py-3 px-4 font-mono text-blue-600">${pay.invoice_id || '-'}</td>
                <td class="py-3 px-4 font-mono text-[11px] text-slate-500">${pay.date}</td>
                <td class="py-3 px-4 font-medium text-slate-800">${pay.payment_method || '-'}</td>
                <td class="py-3 px-4 text-right font-mono font-extrabold text-emerald-700">
                  Rp ${Number(pay.amount || 0).toLocaleString('id-ID')}
                </td>
                <td class="py-3 px-4 text-slate-500 max-w-xs truncate">${pay.notes || '-'}</td>
                <td class="py-3 px-4 text-right space-x-2">
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deletePayment('${pay.payment_id}')">Hapus</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function setupFinanceListeners(container, clients, projects, contents) {
  document.getElementById("tab-fin-income")?.addEventListener("click", () => {
    activeFinanceTab = "income";
    renderFinance(container);
  });
  document.getElementById("tab-fin-expenses")?.addEventListener("click", () => {
    activeFinanceTab = "expenses";
    renderFinance(container);
  });
  document.getElementById("tab-fin-invoices")?.addEventListener("click", () => {
    activeFinanceTab = "invoices";
    renderFinance(container);
  });
  document.getElementById("tab-fin-payments")?.addEventListener("click", () => {
    activeFinanceTab = "payments";
    renderFinance(container);
  });

  const btn = document.getElementById("btn-create-fin-item");
  const label = document.getElementById("btn-fin-action-label");
  if (label) {
    label.innerText = activeFinanceTab === "income" ? "+ Catat Pendapatan" :
                      activeFinanceTab === "expenses" ? "+ Catat Pengeluaran" :
                      activeFinanceTab === "invoices" ? "+ Buat Invoice Baru" :
                      "+ Catat Pembayaran";
  }

  btn?.addEventListener("click", () => {
    if (activeFinanceTab === "income") openIncomeModal(null, clients, projects, contents);
    else if (activeFinanceTab === "expenses") openExpenseModal(null, projects);
    else if (activeFinanceTab === "invoices") openInvoiceModal(null, clients, projects);
    else openPaymentModal();
  });

  // Global functions
  window.openEditIncomeModal = (id) => openIncomeModal(store.getItemById(SHEET_NAMES.INCOME, id), clients, projects, contents);
  window.deleteIncome = (id) => {
    if (confirm("Hapus catatan transaksi pendapatan ini?")) {
      store.deleteItem(SHEET_NAMES.INCOME, id);
      renderFinance(container);
    }
  };

  window.openEditExpenseModal = (id) => openExpenseModal(store.getItemById(SHEET_NAMES.EXPENSES, id), projects);
  window.deleteExpense = (id) => {
    if (confirm("Hapus catatan pengeluaran ini?")) {
      store.deleteItem(SHEET_NAMES.EXPENSES, id);
      renderFinance(container);
    }
  };

  window.openEditInvoiceModal = (id) => openInvoiceModal(store.getItemById(SHEET_NAMES.INVOICES, id), clients, projects);
  window.deleteInvoice = (id) => {
    if (confirm("Hapus invoice ini?")) {
      store.deleteItem(SHEET_NAMES.INVOICES, id);
      renderFinance(container);
    }
  };

  window.deletePayment = (id) => {
    if (confirm("Hapus catatan pembayaran ini?")) {
      store.deleteItem(SHEET_NAMES.PAYMENTS, id);
      renderFinance(container);
    }
  };
}

function openIncomeModal(income = null, clients = [], projects = [], contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!income;
  const data = income || {
    date: new Date().toISOString().slice(0, 10),
    income_source: "Brand Sponsorship / Endorsement",
    client_id: clients[0]?.client_id || "",
    project_id: projects[0]?.project_id || "",
    content_id: contents[0]?.content_id || "",
    amount: 5000000,
    payment_status: "Paid",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Pendapatan' : 'Catat Pendapatan Baru'}</h3>
          <button id="modal-inc-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="income-form" class="p-6 space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Transaksi</label>
              <input type="date" id="form-inc-date" value="${data.date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Sumber Pendapatan</label>
              <select id="form-inc-source" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${INCOME_SOURCES.map(s => `<option value="${s}" ${data.income_source === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Klien Pembayar</label>
              <select id="form-inc-client" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Tanpa Klien / Affiliate --</option>
                ${clients.map(c => `<option value="${c.client_id}" ${data.client_id === c.client_id ? 'selected' : ''}>${c.client_name}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Terkait Konten</label>
              <select id="form-inc-content" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Umum / Tanpa Konten --</option>
                ${contents.map(c => `<option value="${c.content_id}" ${data.content_id === c.content_id ? 'selected' : ''}>${c.content_title}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-inc-amount" required value="${data.amount}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Pembayaran</label>
              <select id="form-inc-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Paid" ${data.payment_status === 'Paid' ? 'selected' : ''}>Paid (Lunas)</option>
                <option value="Pending" ${data.payment_status === 'Pending' ? 'selected' : ''}>Pending (Menunggu Bayar)</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan</label>
            <input type="text" id="form-inc-notes" value="${data.notes}" placeholder="DP 50% / Pelunasan termin 2" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-inc-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Pendapatan</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-inc-close")?.addEventListener("click", close);
  document.getElementById("modal-inc-cancel")?.addEventListener("click", close);

  document.getElementById("income-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      date: document.getElementById("form-inc-date").value,
      income_source: document.getElementById("form-inc-source").value,
      client_id: document.getElementById("form-inc-client").value,
      content_id: document.getElementById("form-inc-content").value,
      amount: Number(document.getElementById("form-inc-amount").value) || 0,
      payment_status: document.getElementById("form-inc-status").value,
      notes: document.getElementById("form-inc-notes").value.trim()
    };
    if (isEdit) store.updateItem(SHEET_NAMES.INCOME, income.income_id, payload);
    else store.createItem(SHEET_NAMES.INCOME, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}

function openExpenseModal(expense = null, projects = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!expense;
  const data = expense || {
    date: new Date().toISOString().slice(0, 10),
    category: "Equipment & Gear",
    description: "",
    amount: 250000,
    payment_method: "BCA Transfer",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Pengeluaran' : 'Catat Pengeluaran Baru'}</h3>
          <button id="modal-exp-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="expense-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Deskripsi Pengeluaran <span class="text-rose-500">*</span></label>
            <input type="text" id="form-exp-desc" required value="${data.description}" placeholder="Contoh: Beli memory card SD 128GB" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal</label>
              <input type="date" id="form-exp-date" value="${data.date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Kategori Beban</label>
              <select id="form-exp-cat" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${EXPENSE_CATEGORIES.map(c => `<option value="${c}" ${data.category === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-exp-amount" required value="${data.amount}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Metode Pembayaran</label>
              <input type="text" id="form-exp-method" value="${data.payment_method}" placeholder="BCA / ShopeePay" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-exp-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Pengeluaran</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-exp-close")?.addEventListener("click", close);
  document.getElementById("modal-exp-cancel")?.addEventListener("click", close);

  document.getElementById("expense-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      description: document.getElementById("form-exp-desc").value.trim(),
      date: document.getElementById("form-exp-date").value,
      category: document.getElementById("form-exp-cat").value,
      amount: Number(document.getElementById("form-exp-amount").value) || 0,
      payment_method: document.getElementById("form-exp-method").value.trim()
    };
    if (isEdit) store.updateItem(SHEET_NAMES.EXPENSES, expense.expense_id, payload);
    else store.createItem(SHEET_NAMES.EXPENSES, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}

function openInvoiceModal(invoice = null, clients = [], projects = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;
  const isEdit = !!invoice;
  const data = invoice || {
    invoice_id: "INV-" + new Date().getFullYear() + "-" + Math.floor(100 + Math.random() * 900),
    client_id: clients[0]?.client_id || "",
    project_id: projects[0]?.project_id || "",
    invoice_date: new Date().toISOString().slice(0, 10),
    due_date: new Date().toISOString().slice(0, 10),
    total: 10000000,
    payment_status: "Unpaid",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">${isEdit ? 'Edit Invoice' : 'Buat Invoice Baru'}</h3>
          <button id="modal-inv-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="invoice-form" class="p-6 space-y-4 text-xs">
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nomor Invoice <span class="text-rose-500">*</span></label>
              <input type="text" id="form-inv-num" required value="${data.invoice_id}" class="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Klien Tertuju</label>
              <select id="form-inv-client" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                ${clients.map(c => `<option value="${c.client_id}" ${data.client_id === c.client_id ? 'selected' : ''}>${c.client_name}</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Terbit</label>
              <input type="date" id="form-inv-date" value="${data.invoice_date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Jatuh Tempo</label>
              <input type="date" id="form-inv-due" value="${data.due_date}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Total Tagihan (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-inv-total" required value="${data.total}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Status Bayar</label>
              <select id="form-inv-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Unpaid" ${data.payment_status === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
                <option value="Partially Paid" ${data.payment_status === 'Partially Paid' ? 'selected' : ''}>Partially Paid</option>
                <option value="Paid" ${data.payment_status === 'Paid' ? 'selected' : ''}>Paid (Lunas)</option>
              </select>
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-inv-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Invoice</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-inv-close")?.addEventListener("click", close);
  document.getElementById("modal-inv-cancel")?.addEventListener("click", close);

  document.getElementById("invoice-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      invoice_id: document.getElementById("form-inv-num").value.trim(),
      client_id: document.getElementById("form-inv-client").value,
      invoice_date: document.getElementById("form-inv-date").value,
      due_date: document.getElementById("form-inv-due").value,
      total: Number(document.getElementById("form-inv-total").value) || 0,
      payment_status: document.getElementById("form-inv-status").value
    };
    if (isEdit) store.updateItem(SHEET_NAMES.INVOICES, invoice.invoice_id, payload);
    else store.createItem(SHEET_NAMES.INVOICES, payload);
    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}

function openPaymentModal() {
  const invoices = store.getItems(SHEET_NAMES.INVOICES);
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 class="font-extrabold text-slate-900 text-sm">Catat Pembayaran Masuk</h3>
          <button id="modal-pay-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>
        <form id="payment-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Terkait Invoice</label>
            <select id="form-pay-inv" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none font-mono">
              <option value="">-- Tanpa Invoice Langsung --</option>
              ${invoices.map(inv => `<option value="${inv.invoice_id}">${inv.invoice_id} - Rp ${Number(inv.total).toLocaleString('id-ID')}</option>`).join('')}
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Pembayaran</label>
              <input type="date" id="form-pay-date" value="${new Date().toISOString().slice(0, 10)}" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal (Rp) <span class="text-rose-500">*</span></label>
              <input type="number" id="form-pay-amt" required placeholder="5000000" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none font-bold">
            </div>
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Metode Pembayaran</label>
            <input type="text" id="form-pay-method" placeholder="BCA Corporate Transfer" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan</label>
            <input type="text" id="form-pay-notes" placeholder="Pelunasan termin 1" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>
          <div class="pt-4 border-t border-slate-200 flex justify-end gap-2.5">
            <button type="button" id="modal-pay-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100">Batal</button>
            <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white">Simpan Bukti Pembayaran</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-pay-close")?.addEventListener("click", close);
  document.getElementById("modal-pay-cancel")?.addEventListener("click", close);

  document.getElementById("payment-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const invId = document.getElementById("form-pay-inv").value;
    const amt = Number(document.getElementById("form-pay-amt").value) || 0;

    store.createItem(SHEET_NAMES.PAYMENTS, {
      invoice_id: invId,
      date: document.getElementById("form-pay-date").value,
      amount: amt,
      payment_method: document.getElementById("form-pay-method").value.trim(),
      notes: document.getElementById("form-pay-notes").value.trim()
    });

    // Otomatis update status invoice jika ada
    if (invId) {
      store.updateItem(SHEET_NAMES.INVOICES, invId, { payment_status: "Paid" });
    }

    close();
    const main = document.getElementById("main-view-container");
    if (main) renderFinance(main);
  });
}
