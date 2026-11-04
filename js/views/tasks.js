/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: TASK MANAGEMENT (MODULE 04)
 * File: js/views/tasks.js
 * Design: Oceanic Inventory Design System (5-Column Dynamic Kanban Board)
 * =========================================================================================
 */

import { store } from "../store.js";
import { auth } from "../auth.js";
import { SHEET_NAMES } from "../config.js";

let taskViewMode = "kanban"; // 'kanban', 'table', 'daily'
let selectedBrandFilter = "ALL";

export function renderTasks(container) {
  const allTasks = store.getItems(SHEET_NAMES.CONTENT_TASKS) || [];
  const allSubtasks = store.getItems(SHEET_NAMES.CONTENT_SUBTASKS) || [];
  const brands = store.getItems(SHEET_NAMES.BRANDS) || [];
  const users = store.getItems(SHEET_NAMES.USERS) || [];

  // Filter tasks based on brand
  const filteredTasks = allTasks.filter(t => {
    if (selectedBrandFilter === "ALL") return true;
    return t.brand_id === selectedBrandFilter || (t.brand_name && t.brand_name.includes(selectedBrandFilter));
  });

  // Calculate dynamic statistics
  const totalTasks = filteredTasks.length;
  const colToDo = filteredTasks.filter(t => !t.status || t.status === "To Do" || t.status === "Idea" || t.status === "Planned");
  const colInProgress = filteredTasks.filter(t => t.status === "In Progress" || t.status === "Shooting");
  const colEditing = filteredTasks.filter(t => t.status === "Editing" || t.status === "Revision");
  const colReview = filteredTasks.filter(t => t.status === "Review");
  const colCompleted = filteredTasks.filter(t => t.status === "Completed" || t.status === "Published");

  const inProgressTasks = colInProgress.length;
  const inReviewTasks = colReview.length;
  const overdueTasks = filteredTasks.filter(t => t.priority === "Urgent" || t.status === "Revision").length;
  const completedTasks = colCompleted.length;

  container.innerHTML = `
    <div class="space-y-6">

      <!-- ================================================================= -->
      <!-- SECTION 1: OVER VIEW STRIP & 5 STAT CARDS                         -->
      <!-- ================================================================= -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-bold text-[#1e3e50] tracking-wide">Over View</h2>
            <span class="text-xs text-[#698c9f] hidden sm:inline">• Database: '${allTasks.length}' Tugas Tersimpan</span>
          </div>
          <div class="flex items-center gap-2">
            ${auth.isAdminOrOwner() ? `
              <button onclick="window.confirmClearAllTasks()" class="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-semibold transition-colors bg-white px-3 py-1.5 rounded-full border border-rose-200 shadow-2xs hover:bg-rose-50" type="button" title="Kosongkan seluruh tugas pekerjaan">
                <span class="material-symbols-outlined text-[16px]">delete_sweep</span>
                <span class="hidden sm:inline">Kosongkan Semua Tugas</span>
              </button>
            ` : ''}
            <button onclick="window.triggerCloudSync()" class="flex items-center gap-1.5 text-xs text-[#2c6673] hover:text-[#1e3e50] font-semibold transition-colors shadow-2xs bg-white px-3 py-1.5 rounded-full border border-[#d2e2ec]" type="button">
              <span class="material-symbols-outlined text-[16px]">sync</span>
              <span>Sinkron Data</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-3.5 sm:gap-4">
          <!-- Stat 1: Total Tugas -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${totalTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Total Tugas</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#eaf4fa] flex items-center justify-center text-[#2c6673]">
              <span class="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>

          <!-- Stat 2: Sedang Dikerjakan -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${inProgressTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Sedang Dikerjakan</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#e3f4f8] flex items-center justify-center text-[#147a82]">
              <span class="material-symbols-outlined text-[20px]">pending_actions</span>
            </div>
          </div>

          <!-- Stat 3: Dalam Review -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${inReviewTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Dalam Review</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#f4eff8] flex items-center justify-center text-[#6e508a]">
              <span class="material-symbols-outlined text-[20px]">rate_review</span>
            </div>
          </div>

          <!-- Stat 4: Terlambat (Overdue) -->
          <div class="bg-[#fcf3f1] rounded-2xl p-4 border border-[#edd7d2] shadow-sm flex items-center justify-between hover:shadow-md transition-all">
            <div>
              <span class="text-xl font-bold text-[#c53030] block">${overdueTasks}</span>
              <span class="text-[11px] text-[#a45347] font-medium">Terlambat (Overdue)</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#fae2dc] flex items-center justify-center text-[#c53030]">
              <span class="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>

          <!-- Stat 5: Selesai (Published) -->
          <div class="bg-white rounded-2xl p-4 border border-[#d2e2ec] shadow-sm flex items-center justify-between hover:shadow-md transition-all col-span-2 md:col-span-1">
            <div>
              <span class="text-xl font-bold text-[#1e3e50] block">${completedTasks}</span>
              <span class="text-[11px] text-[#6e90a2] font-medium">Selesai (Published)</span>
            </div>
            <div class="w-10 h-10 rounded-xl bg-[#e6f7f2] flex items-center justify-center text-[#21835e]">
              <span class="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- SECTION 2: SUB-BAR (View Switcher Tabs & Filter Options)          -->
      <!-- ================================================================= -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-[#d2e2ec] shadow-sm">
        <!-- Switcher Buttons -->
        <div class="flex items-center gap-1.5 w-full sm:w-auto">
          <button id="tab-btn-kanban" class="flex items-center gap-2 px-4 py-1.5 rounded-xl ${taskViewMode === 'kanban' ? 'bg-[#1e3e50] text-white shadow-sm' : 'text-[#5b7e92] hover:text-[#1e3e50] hover:bg-[#eaf2f7]'} font-semibold text-xs transition-all" type="button">
            <span class="material-symbols-outlined text-[16px]">view_kanban</span>
            <span>Kanban Board</span>
          </button>
          <button id="tab-btn-table" class="flex items-center gap-2 px-4 py-1.5 rounded-xl ${taskViewMode === 'table' ? 'bg-[#1e3e50] text-white shadow-sm' : 'text-[#5b7e92] hover:text-[#1e3e50] hover:bg-[#eaf2f7]'} font-semibold text-xs transition-all" type="button">
            <span class="material-symbols-outlined text-[16px]">table_rows</span>
            <span>Tabel Detail</span>
          </button>
          <button id="tab-btn-daily" class="flex items-center gap-2 px-4 py-1.5 rounded-xl ${taskViewMode === 'daily' ? 'bg-[#1e3e50] text-white shadow-sm' : 'text-[#5b7e92] hover:text-[#1e3e50] hover:bg-[#eaf2f7]'} font-semibold text-xs transition-all" type="button">
            <span class="material-symbols-outlined text-[16px]">checklist</span>
            <span>Checklist Rutin</span>
          </button>
        </div>

        <!-- Filter Dropdown & New Task Button -->
        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select id="filter-task-brand" class="bg-[#f0f6fa] border border-[#d0e1ec] px-3 py-1.5 rounded-xl text-xs text-[#1e3e50] font-medium focus:outline-none focus:ring-1 focus:ring-[#1e3e50]">
            <option value="ALL">Semua Brand</option>
            ${brands.map(b => `<option value="${b.brand_name}" ${selectedBrandFilter === b.brand_name ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
          </select>

          <button id="btn-open-create-task" class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs transition-all shadow-xs" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>+ Buat Tugas</span>
          </button>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- SECTION 3: 5 KANBAN COLUMNS (DYNAMIC)                             -->
      <!-- ================================================================= -->
      <div id="view-kanban-board" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start ${taskViewMode === 'kanban' ? '' : 'hidden'}">
        
        <!-- COLUMN 1: TO DO -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#7292a4]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">To Do</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colToDo.length}</span>
          </div>

          ${colToDo.length > 0 ? colToDo.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas To Do
            </div>
          `}

          <button onclick="window.openCreateTaskModal('To Do')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 2: IN PROGRESS -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#2c6673] animate-pulse"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">In Progress</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colInProgress.length}</span>
          </div>

          ${colInProgress.length > 0 ? colInProgress.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas In Progress
            </div>
          `}

          <button onclick="window.openCreateTaskModal('In Progress')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 3: EDITING & REVISI -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border-2 border-[#1e3e50]/40 min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#1e3e50]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Editing &amp; Revisi</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-[#1e3e50] text-white text-[11px] font-bold">${colEditing.length}</span>
          </div>

          ${colEditing.length > 0 ? colEditing.map(task => renderKanbanCard(task, allSubtasks, brands, users, true)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas Editing &amp; Revisi
            </div>
          `}

          <button onclick="window.openCreateTaskModal('Editing')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 4: REVIEW -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#6e508a]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Review</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colReview.length}</span>
          </div>

          ${colReview.length > 0 ? colReview.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas Review
            </div>
          `}

          <button onclick="window.openCreateTaskModal('Review')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 5: COMPLETED -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#21835e]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Completed</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">${colCompleted.length}</span>
          </div>

          ${colCompleted.length > 0 ? colCompleted.map(task => renderKanbanCard(task, allSubtasks, brands, users)).join('') : `
            <div class="p-6 rounded-xl border border-dashed border-[#b6d0e0] text-center text-xs text-[#557b91] bg-white/40 my-auto">
              Tidak ada tugas Completed
            </div>
          `}

          <button onclick="window.openCreateTaskModal('Completed')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

      </div>

      <!-- ================================================================= -->
      <!-- VIEW 2: TABEL DETAIL (Alternative View)                           -->
      <!-- ================================================================= -->
      <div id="view-table-detail" class="bg-white rounded-2xl border border-[#d2e2ec] shadow-sm overflow-hidden ${taskViewMode === 'table' ? '' : 'hidden'}">
        <div class="p-4 border-b border-[#eaf2f7] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[#1e3e50]">Daftar Seluruh Pekerjaan Studio</h3>
          <span class="text-xs text-[#5c7786] font-medium">${filteredTasks.length} Tugas Ditemukan</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-[#143242]">
            <thead class="bg-[#f0f6fa] border-b border-[#d2e2ec] font-bold uppercase text-[10.5px] text-[#5c7786]">
              <tr>
                <th class="p-3.5">ID &amp; Judul Tugas</th>
                <th class="p-3.5">Brand Mitra</th>
                <th class="p-3.5">Penanggung Jawab</th>
                <th class="p-3.5">Prioritas</th>
                <th class="p-3.5">Progres</th>
                <th class="p-3.5">Deadline</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#edf3f7]">
              ${filteredTasks.length > 0 ? filteredTasks.map(t => {
                const authorUser = users.find(u => u.user_id === t.assigned_user || u.name === t.assigned_user);
                const brandItem = brands.find(b => b.brand_id === t.brand_id);
                const displayDeadline = t.deadline ? (String(t.deadline).includes("T") ? String(t.deadline).split("T")[0] : t.deadline) : "Hari ini";
                return `
                  <tr class="hover:bg-[#f8fbfe] transition">
                    <td class="p-3.5 font-bold">
                      <span class="font-mono text-[10px] text-[#2c6673] bg-[#eaf2f7] px-1.5 py-0.5 rounded mr-1.5">#${t.task_id}</span>
                      <span>${t.task_title || t.task_name || t.title || 'Tugas Pekerjaan'}</span>
                    </td>
                    <td class="p-3.5 text-[#5c7786]">${t.brand_name || brandItem?.brand_name || 'Self-Project'}</td>
                    <td class="p-3.5 font-medium">${authorUser?.name || t.assigned_user || 'Rian Pratama'}</td>
                    <td class="p-3.5">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${t.priority === 'Urgent' ? 'bg-[#fde8e8] text-[#c53030]' : t.priority === 'High' ? 'bg-[#fdf2e9] text-[#c05621]' : 'bg-[#eaf4fa] text-[#2c6673]'}">
                        ${t.priority || 'Normal'}
                      </span>
                    </td>
                    <td class="p-3.5">
                      <div class="flex items-center gap-2">
                        <div class="w-16 bg-[#e6eff5] rounded-full h-1.5 overflow-hidden">
                          <div class="bg-[#2c6673] h-full" style="width: ${t.progress || 0}%;"></div>
                        </div>
                        <span class="text-[11px] font-semibold text-[#1e3e50]">${t.progress || 0}%</span>
                      </div>
                    </td>
                    <td class="p-3.5 text-[#5c7786]">${displayDeadline}</td>
                    <td class="p-3.5">
                      <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-[#edf4f8] text-[#1e3e50]">${t.status || 'To Do'}</span>
                    </td>
                    <td class="p-3.5 text-center">
                      <div class="flex items-center justify-center gap-1.5">
                        <button onclick="window.openEditTaskModal('${t.task_id}')" class="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition" title="Edit Tugas">
                          <span class="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        ${auth.isAdminOrOwner() ? `
                          <button onclick="window.confirmDeleteTask('${t.task_id}')" class="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition" title="Hapus Tugas">
                            <span class="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('') : `
                <tr>
                  <td colspan="8" class="p-8 text-center text-xs text-slate-400">
                    Belum ada tugas pekerjaan yang tersimpan. Klik <strong>+ Buat Tugas</strong> untuk menambahkan pekerjaan baru.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- MODAL: BUAT / EDIT TUGAS (POPUP)                                  -->
      <!-- ================================================================= -->
      <div id="modal-task-manage" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-[#d2e2ec] shadow-2xl space-y-5 my-8">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-[#e3f4f8] text-[#1b6274] flex items-center justify-center font-bold">
                <span class="material-symbols-outlined text-[20px]">assignment</span>
              </div>
              <h3 id="modal-task-title-text" class="text-sm font-extrabold text-[#143242]">Buat Tugas Baru</h3>
            </div>
            <button onclick="document.getElementById('modal-task-manage').classList.add('hidden')" class="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <form id="form-task-manage" class="space-y-4 text-xs">
            <input type="hidden" id="task-form-id" value="">

            <div>
              <label class="block font-bold text-slate-700 mb-1">Judul Tugas Pekerjaan <span class="text-rose-500">*</span></label>
              <input type="text" id="task-form-title" required placeholder="Contoh: Shooting Video Unboxing Review" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Brand / Klien</label>
                <select id="task-form-brand" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  <option value="">Self-Project</option>
                  ${brands.map(b => `<option value="${b.brand_id}">${b.brand_name}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Penanggung Jawab (PIC)</label>
                <select id="task-form-pic" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  <option value="">-- Belum Ditugaskan --</option>
                  ${users.map(u => `<option value="${u.user_id}">${u.name} (${u.role})</option>`).join('')}
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block font-bold text-slate-700 mb-1">Prioritas</label>
                <select id="task-form-priority" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Status Kolom</label>
                <select id="task-form-status" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] bg-white font-medium">
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Editing">Editing &amp; Revisi</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label class="block font-bold text-slate-700 mb-1">Deadline</label>
                <input type="date" id="task-form-deadline" class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium text-xs">
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Catatan / Deskripsi Singkat</label>
              <textarea id="task-form-desc" rows="2" placeholder="Catatan detail pekerjaan..." class="w-full px-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#1e3e50] font-medium"></textarea>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button type="button" id="btn-task-delete-in-modal" class="hidden px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition">
                Hapus Tugas Ini
              </button>
              <div class="flex items-center gap-2 ml-auto">
                <button type="button" onclick="document.getElementById('modal-task-manage').classList.add('hidden')" class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition">
                  Batal
                </button>
                <button type="submit" class="px-5 py-2 rounded-xl bg-[#1e3e50] hover:bg-[#2c6673] text-white font-bold text-xs shadow-xs transition">
                  Simpan Tugas
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  `;

  setupTaskListeners(container);
}

function renderKanbanCard(task, allSubtasks, brands, users, isSpotlight = false) {
  const brandName = task.brand_name || (brands.find(b => b.brand_id === task.brand_id)?.brand_name) || "Self-Project";
  const authorUser = users.find(u => u.user_id === task.assigned_user || u.name === task.assigned_user) || {
    name: task.assigned_user || "Rian Pratama",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
  };

  const priorityClass = task.priority === "Urgent" ? "bg-[#fde8e8] text-[#c53030]" :
    task.priority === "High" ? "bg-[#fdf2e9] text-[#c05621]" :
    task.priority === "Low" ? "bg-slate-100 text-slate-600" :
    "bg-[#eaf4fa] text-[#2c6673]";

  const subtasks = allSubtasks.filter(s => s.task_id === task.task_id);
  const subDone = subtasks.filter(s => s.status === "Completed" || s.is_done).length;
  const subTotal = subtasks.length;
  const progress = subTotal > 0 ? Math.round((subDone / subTotal) * 100) : (task.progress || 0);
  const displayDeadline = task.deadline ? (String(task.deadline).includes("T") ? String(task.deadline).split("T")[0] : task.deadline) : "Hari ini";

  return `
    <div class="cursor-pointer group p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 border ${isSpotlight ? 'border-l-4 border-l-[#1e3e50] border-y border-r border-[#cbdfe9] shadow-md' : 'border-[#d4e4ee]'}" onclick="window.openEditTaskModal('${task.task_id}')">
      <div class="flex items-center justify-between">
        <span class="font-mono text-[11px] font-semibold ${isSpotlight ? 'text-white bg-[#1e3e50] font-bold' : 'text-[#1e3e50] bg-[#eaf2f7]'} px-2 py-0.5 rounded-md border border-[#cde0ec]">#${task.task_id}</span>
        
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded-full ${priorityClass} font-semibold text-[10px]">${task.priority || 'Normal'}</span>
          ${auth.isAdminOrOwner() ? `
            <button type="button" onclick="event.stopPropagation(); window.confirmDeleteTask('${task.task_id}')" class="p-1 rounded-md text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition" title="Hapus Tugas Ini">
              <span class="material-symbols-outlined text-[15px]">delete</span>
            </button>
          ` : ''}
        </div>
      </div>

      <h3 class="font-bold text-sm text-[#1e3e50] group-hover:text-[#2c6673] transition-colors line-clamp-2 leading-snug">
        ${task.task_title || task.task_name || task.title || 'Tugas Pekerjaan'}
      </h3>

      <div class="flex items-center gap-1.5 text-xs text-[#5f8296]">
        <span class="material-symbols-outlined text-[14px]">loyalty</span>
        <span class="truncate ${isSpotlight ? 'font-medium text-[#1e3e50]' : ''}">${brandName}</span>
      </div>

      <div class="flex flex-col gap-1 mt-0.5">
        <div class="flex items-center justify-between text-[11px]">
          <span class="text-[#64889c]">Subtask Progress</span>
          <span class="font-bold text-[#1e3e50]">${subTotal > 0 ? `${subDone}/${subTotal} (${progress}%)` : `${progress}%`}</span>
        </div>
        <div class="w-full bg-[#e6eff5] rounded-full h-1.5 overflow-hidden">
          <div class="bg-[#2c6673] h-full rounded-full" style="width: ${progress}%;"></div>
        </div>
      </div>

      <div class="flex items-center justify-between text-[#5f8296] pt-1.5 border-t border-[#edf4f8]">
        <div class="flex items-center gap-1.5">
          <img class="w-5 h-5 rounded-full object-cover ring-1 ring-[#c0d8e6]" src="${authorUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}">
          <span class="text-[11px] font-medium text-[#1e3e50]">${authorUser.name || 'Studio Member'}</span>
        </div>
        <span class="text-[11px] flex items-center gap-1 ${task.priority === 'Urgent' ? 'text-[#c53030] font-semibold' : 'text-[#698d9f]'}">
          <span class="material-symbols-outlined text-[13px]">schedule</span>
          <span>${displayDeadline}</span>
        </span>
      </div>

      <!-- Quick Move Status -->
      <div class="pt-2 border-t border-[#edf4f8] flex items-center justify-between" onclick="event.stopPropagation()">
        <span class="text-[10px] text-slate-400 font-semibold">Pindah Kolom:</span>
        <select onchange="window.changeTaskStatus('${task.task_id}', this.value)" class="text-[10.5px] bg-[#f0f6fa] border border-[#cbdfe9] rounded-lg px-2 py-0.5 font-bold text-[#1e3e50] outline-none">
          <option value="To Do" ${(!task.status || task.status === 'To Do' || task.status === 'Idea' || task.status === 'Planned') ? 'selected' : ''}>To Do</option>
          <option value="In Progress" ${(task.status === 'In Progress' || task.status === 'Shooting') ? 'selected' : ''}>In Progress</option>
          <option value="Editing" ${(task.status === 'Editing' || task.status === 'Revision') ? 'selected' : ''}>Editing & Revisi</option>
          <option value="Review" ${task.status === 'Review' ? 'selected' : ''}>Review</option>
          <option value="Completed" ${(task.status === 'Completed' || task.status === 'Published') ? 'selected' : ''}>Completed</option>
        </select>
      </div>
    </div>
  `;
}

function setupTaskListeners(container) {
  document.getElementById("tab-btn-kanban")?.addEventListener("click", () => {
    taskViewMode = "kanban";
    renderTasks(container);
  });
  document.getElementById("tab-btn-table")?.addEventListener("click", () => {
    taskViewMode = "table";
    renderTasks(container);
  });
  document.getElementById("tab-btn-daily")?.addEventListener("click", () => {
    window.location.hash = "#timetracking";
  });

  document.getElementById("filter-task-brand")?.addEventListener("change", (e) => {
    selectedBrandFilter = e.target.value;
    renderTasks(container);
  });

  document.getElementById("btn-open-create-task")?.addEventListener("click", () => {
    window.openCreateTaskModal();
  });

  // Modal Form Submit
  document.getElementById("form-task-manage")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskId = document.getElementById("task-form-id")?.value;
    const title = document.getElementById("task-form-title")?.value?.trim();
    const brandId = document.getElementById("task-form-brand")?.value || null;
    const assignedUser = document.getElementById("task-form-pic")?.value || null;
    const priority = document.getElementById("task-form-priority")?.value || "Normal";
    const status = document.getElementById("task-form-status")?.value || "To Do";
    const deadlineVal = document.getElementById("task-form-deadline")?.value?.trim() || new Date().toISOString().slice(0, 10);
    const description = document.getElementById("task-form-desc")?.value?.trim() || "";

    if (!title) return;

    const allBrands = store.getItems(SHEET_NAMES.BRANDS) || [];
    const matchedBrand = allBrands.find(b => b.brand_id === brandId || b.brand_name === brandId);
    const brandName = matchedBrand ? matchedBrand.brand_name : "Self-Project";
    const finalBrandId = matchedBrand ? matchedBrand.brand_id : (brandId && String(brandId).startsWith("BRD-") ? brandId : null);

    const taskPayload = {
      task_title: title,
      task_name: title,
      brand_id: finalBrandId,
      brand_name: brandName,
      assigned_user: assignedUser || null,
      priority: priority,
      status: status,
      deadline: deadlineVal,
      description: description,
      notes: description
    };

    if (taskId) {
      // Edit existing
      store.updateItem(SHEET_NAMES.CONTENT_TASKS, taskId, taskPayload);
      if (window.showToast) window.showToast("✅ Tugas berhasil diperbarui!", "success");
    } else {
      // Create new
      taskPayload.progress = status === "Completed" ? 100 : 0;
      store.createItem(SHEET_NAMES.CONTENT_TASKS, taskPayload);
      if (window.showToast) window.showToast("✅ Tugas baru berhasil ditambahkan!", "success");
    }

    document.getElementById("modal-task-manage")?.classList.add("hidden");
    renderTasks(container);
  });

  // Delete in Modal Button
  document.getElementById("btn-task-delete-in-modal")?.addEventListener("click", () => {
    const taskId = document.getElementById("task-form-id")?.value;
    if (taskId) {
      window.confirmDeleteTask(taskId);
      document.getElementById("modal-task-manage")?.classList.add("hidden");
    }
  });

  // Global window functions
  window.openCreateTaskModal = (initialStatus = "To Do") => {
    const todayStr = new Date().toISOString().slice(0, 10);
    const idEl = document.getElementById("task-form-id");
    const titleEl = document.getElementById("task-form-title");
    const brandEl = document.getElementById("task-form-brand");
    const picEl = document.getElementById("task-form-pic");
    const statusEl = document.getElementById("task-form-status");
    const priorityEl = document.getElementById("task-form-priority");
    const deadlineEl = document.getElementById("task-form-deadline");
    const descEl = document.getElementById("task-form-desc");

    if (idEl) idEl.value = "";
    if (titleEl) titleEl.value = "";
    if (brandEl) brandEl.value = "";
    if (picEl) {
      const curUser = auth.getCurrentUser();
      picEl.value = curUser ? curUser.user_id : "";
    }
    if (statusEl) statusEl.value = initialStatus;
    if (priorityEl) priorityEl.value = "Normal";
    if (deadlineEl) deadlineEl.value = todayStr;
    if (descEl) descEl.value = "";

    const titleText = document.getElementById("modal-task-title-text");
    if (titleText) titleText.textContent = "Buat Tugas Baru";
    document.getElementById("btn-task-delete-in-modal")?.classList.add("hidden");
    document.getElementById("modal-task-manage")?.classList.remove("hidden");
  };

  window.openEditTaskModal = (taskId) => {
    const allTasks = store.getItems(SHEET_NAMES.CONTENT_TASKS) || [];
    const task = allTasks.find(t => t.task_id === taskId);
    if (!task) return;

    const idEl = document.getElementById("task-form-id");
    const titleEl = document.getElementById("task-form-title");
    const brandEl = document.getElementById("task-form-brand");
    const picEl = document.getElementById("task-form-pic");
    const statusEl = document.getElementById("task-form-status");
    const priorityEl = document.getElementById("task-form-priority");
    const deadlineEl = document.getElementById("task-form-deadline");
    const descEl = document.getElementById("task-form-desc");

    if (idEl) idEl.value = task.task_id;
    if (titleEl) titleEl.value = task.task_title || task.task_name || task.title || "";
    if (brandEl) brandEl.value = task.brand_id || "";
    if (picEl) {
      const allUsers = store.getItems(SHEET_NAMES.USERS) || [];
      const matchedU = allUsers.find(u => u.user_id === task.assigned_user || u.name === task.assigned_user);
      picEl.value = matchedU ? matchedU.user_id : (task.assigned_user || "");
    }
    if (statusEl) statusEl.value = task.status || "To Do";
    if (priorityEl) priorityEl.value = task.priority || "Normal";
    if (deadlineEl) {
      let dVal = task.deadline || "";
      if (dVal && dVal.length >= 10 && dVal.includes("-")) {
        dVal = dVal.slice(0, 10);
      }
      deadlineEl.value = dVal;
    }
    if (descEl) descEl.value = task.description || task.notes || "";

    const titleText = document.getElementById("modal-task-title-text");
    if (titleText) titleText.textContent = `Edit Tugas #${task.task_id}`;

    if (auth.isAdminOrOwner()) {
      document.getElementById("btn-task-delete-in-modal")?.classList.remove("hidden");
    } else {
      document.getElementById("btn-task-delete-in-modal")?.classList.add("hidden");
    }
    document.getElementById("modal-task-manage")?.classList.remove("hidden");
  };

  window.confirmDeleteTask = (taskId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus tugas.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus tugas.");
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus tugas #${taskId}? Tindakan ini akan menghapusnya dari papan kerja dan database.`)) {
      store.deleteItem(SHEET_NAMES.CONTENT_TASKS, taskId);
      if (window.showToast) window.showToast(`🗑️ Tugas #${taskId} berhasil dihapus.`, "info");
      renderTasks(container);
    }
  };

  window.changeTaskStatus = (taskId, newStatus) => {
    const progress = newStatus === "Completed" ? 100 : newStatus === "Review" ? 80 : newStatus === "Editing" ? 60 : newStatus === "In Progress" ? 40 : 0;
    store.updateItem(SHEET_NAMES.CONTENT_TASKS, taskId, {
      status: newStatus,
      progress: progress
    });
    if (window.showToast) window.showToast(`Tugas #${taskId} dipindahkan ke ${newStatus}`, "info");
    renderTasks(container);
  };

  window.confirmClearAllTasks = () => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk mengosongkan tugas.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk mengosongkan tugas.");
      return;
    }
    if (confirm("⚠️ PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SEMUA TUGAS pekerjaan?\n\nPapan tugas akan dikosongkan secara bersih sehingga Anda dapat mulai menginput pekerjaan asli studio Anda.")) {
      store.clearAllTasks();
      if (window.showToast) window.showToast("🧹 Seluruh data tugas pekerjaan berhasil dikosongkan!", "success");
      renderTasks(container);
    }
  };
}
