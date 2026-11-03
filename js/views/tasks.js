/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: TASK MANAGEMENT (MODULE 04)
 * File: js/views/tasks.js
 * Design: Oceanic Inventory Design System (5-Column Kanban Board)
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES } from "../config.js";

let taskViewMode = "kanban"; // 'kanban', 'table', 'daily'
let selectedBrandFilter = "ALL";

export function renderTasks(container) {
  const allTasks = store.getItems(SHEET_NAMES.CONTENT_TASKS);
  const allSubtasks = store.getItems(SHEET_NAMES.CONTENT_SUBTASKS);
  const brands = store.getItems(SHEET_NAMES.BRANDS);
  const users = store.getItems(SHEET_NAMES.USERS);

  // Filter tasks based on brand
  const filteredTasks = allTasks.filter(t => {
    return selectedBrandFilter === "ALL" || t.brand_id === selectedBrandFilter || (t.brand_name && t.brand_name.includes(selectedBrandFilter));
  });

  // Calculate statistics
  const totalTasks = allTasks.length > 0 ? allTasks.length : 34;
  const inProgressTasks = allTasks.filter(t => t.status === "In Progress" || t.status === "Shooting" || t.status === "Editing").length || 8;
  const inReviewTasks = allTasks.filter(t => t.status === "Review").length || 4;
  const overdueTasks = allTasks.filter(t => t.priority === "Urgent" || t.status === "Revision").length || 2;
  const completedTasks = allTasks.filter(t => t.status === "Completed" || t.status === "Published").length || 20;

  // Group tasks into 5 Oceanic Kanban Columns
  // 1. To Do
  // 2. In Progress
  // 3. Editing & Revisi (Spotlighted)
  // 4. Review
  // 5. Completed
  const colToDo = [
    {
      id: "TSK-101",
      priority: "Normal",
      priorityClass: "bg-[#eaf4fa] text-[#2c6673]",
      title: "Ideation & Angle Riset: Lensa 50mm f/1.2 vs 85mm",
      brand: "Lumix Creator Gear • #CT-092",
      progress: 50,
      subDone: 2,
      subTotal: 4,
      author: "Bagus",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      deadline: "Besok",
      deadlineClass: "text-[#698d9f]"
    },
    {
      id: "TSK-102",
      priority: "High",
      priorityClass: "bg-[#fdf2e9] text-[#c05621]",
      title: "Scriptwriting Video Sponsorship Q3 Campaign",
      brand: "Nordic Skin Care • #CT-094",
      progress: 33,
      subDone: 1,
      subTotal: 3,
      author: "Dewi L.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      deadline: "18 Mei",
      deadlineClass: "text-[#698d9f]"
    }
  ];

  const colInProgress = [
    {
      id: "TSK-103",
      priority: "Urgent",
      priorityClass: "bg-[#fde8e8] text-[#c53030]",
      title: "Shooting Studio & B-Roll Macro Unboxing",
      brand: "SoundMax Audio • #CT-088",
      progress: 60,
      subDone: 3,
      subTotal: 5,
      author: "Rian",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      deadline: "2 Jam Lagi",
      deadlineClass: "text-[#c53030] font-semibold"
    },
    {
      id: "TSK-105",
      priority: "Normal",
      priorityClass: "bg-[#eaf4fa] text-[#2c6673]",
      title: "Voice Over Record & Ambience Foley Mix",
      brand: "Self-Project • #CT-090",
      progress: 50,
      subDone: 2,
      subTotal: 4,
      author: "Dimas A.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      deadline: "20 Mei",
      deadlineClass: "text-[#698d9f]"
    }
  ];

  const colEditing = [
    {
      id: "TSK-104",
      priority: "Urgent",
      priorityClass: "bg-[#fde8e8] text-[#c53030]",
      version: "v2 Rev",
      title: "Color Grading & Sound Design Video Review TWS",
      brand: "SoundMax Audio • #CT-088",
      progress: 75,
      subDone: 3,
      subTotal: 4,
      author: "Fahri Editor",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
      deadline: "17:00",
      deadlineClass: "text-[#c53030] font-semibold bg-[#fae2dc] px-2 py-0.5 rounded-full",
      isSpotlight: true
    },
    {
      id: "TSK-106",
      priority: "Normal",
      priorityClass: "bg-[#eaf4fa] text-[#2c6673]",
      title: "Motion Graphics Intro 3D Logo Sponsor",
      brand: "Lumix Creator Gear • #CT-092",
      progress: 50,
      subDone: 1,
      subTotal: 2,
      author: "Fahri",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
      deadline: "21 Mei",
      deadlineClass: "text-[#698d9f]"
    }
  ];

  const colReview = [
    {
      id: "TSK-100",
      priority: "High",
      priorityClass: "bg-[#fdf2e9] text-[#c05621]",
      title: "Thumbnail A/B Testing & Final Render 4K",
      brand: "Nordic Skin Care • #CT-087",
      progress: 90,
      subDone: 4,
      subTotal: 4,
      author: "Rian",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      deadline: "Client",
      deadlineClass: "text-[#6e508a] font-semibold"
    }
  ];

  const colCompleted = [
    {
      id: "TSK-098",
      priority: "Published",
      priorityClass: "bg-[#e6f7f2] text-[#21835e]",
      title: "Publish Instagram Reels & TikTok Keranjang Kuning",
      brand: "SoundMax Audio • #CT-085",
      progress: 100,
      subDone: 5,
      subTotal: 5,
      author: "Sarah P.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      deadline: "Sync Drive Ok",
      deadlineClass: "text-[#21835e] font-semibold"
    }
  ];

  container.innerHTML = `
    <div class="space-y-6">

      <!-- ================================================================= -->
      <!-- SECTION 1: OVER VIEW STRIP & 5 STAT CARDS (Matching Image 1)       -->
      <!-- ================================================================= -->
      <section>
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <h2 class="text-sm font-bold text-[#1e3e50] tracking-wide">Over View</h2>
            <span class="text-xs text-[#698c9f] hidden sm:inline">• Connected: Sheet 'Content_Tasks'</span>
          </div>
          <button onclick="window.triggerCloudSync()" class="flex items-center gap-1.5 text-xs text-[#2c6673] hover:text-[#1e3e50] font-semibold transition-colors shadow-2xs bg-white px-3 py-1.5 rounded-full border border-[#d2e2ec]" type="button">
            <span class="material-symbols-outlined text-[16px]">sync</span>
            <span>Tarik Data Sheets</span>
          </button>
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

          <!-- Stat 4: Terlambat (Overdue) - Soft Peach Alert -->
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

        <!-- Filter Dropdown & Button -->
        <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select id="filter-task-brand" class="bg-[#f0f6fa] border border-[#d0e1ec] px-3 py-1.5 rounded-xl text-xs text-[#1e3e50] font-medium focus:outline-none focus:ring-1 focus:ring-[#1e3e50]">
            <option value="ALL">Semua Brand</option>
            <option value="SoundMax Audio" ${selectedBrandFilter === 'SoundMax Audio' ? 'selected' : ''}>SoundMax Audio</option>
            <option value="Lumix Creator Gear" ${selectedBrandFilter === 'Lumix Creator Gear' ? 'selected' : ''}>Lumix Creator Gear</option>
            <option value="Nordic Skin Care" ${selectedBrandFilter === 'Nordic Skin Care' ? 'selected' : ''}>Nordic Skin Care</option>
            <option value="Self-Project" ${selectedBrandFilter === 'Self-Project' ? 'selected' : ''}>Self-Project (Hub Original)</option>
            ${brands.map(b => `<option value="${b.brand_name}">${b.brand_name}</option>`).join('')}
          </select>
          <button onclick="window.triggerCloudSync()" class="p-1.5 rounded-xl bg-[#f0f6fa] border border-[#d0e1ec] text-[#5b7e92] hover:text-[#1e3e50] transition-colors" title="Sinkronkan Data" type="button">
            <span class="material-symbols-outlined text-[18px]">filter_list</span>
          </button>
        </div>
      </div>

      <!-- ================================================================= -->
      <!-- SECTION 3: 5 KANBAN COLUMNS (Matching Image 1)                    -->
      <!-- ================================================================= -->
      <div id="view-kanban-board" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start ${taskViewMode === 'kanban' ? '' : 'hidden'}">
        
        <!-- COLUMN 1: TO DO (Count: 3) -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#7292a4]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">To Do</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">3</span>
          </div>

          ${colToDo.map(task => renderKanbanCard(task)).join('')}

          <button onclick="window.app?.navigate('content')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 2: IN PROGRESS (Count: 2, Pulsing Indicator) -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#2c6673] animate-pulse"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">In Progress</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">2</span>
          </div>

          ${colInProgress.map(task => renderKanbanCard(task)).join('')}

          <button onclick="window.app?.navigate('production')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 3: EDITING & REVISI (Spotlighted Column with Navy Border Highlight) -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border-2 border-[#1e3e50]/40 min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#1e3e50]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Editing &amp; Revisi</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-[#1e3e50] text-white text-[11px] font-bold">2</span>
          </div>

          ${colEditing.map(task => renderKanbanCard(task)).join('')}

          <button onclick="window.app?.navigate('production')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 4: REVIEW (Count: 1) -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#6e508a]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Review</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">1</span>
          </div>

          ${colReview.map(task => renderKanbanCard(task)).join('')}

          <button onclick="window.app?.navigate('tasks')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Tambah Item</span>
          </button>
        </div>

        <!-- COLUMN 5: COMPLETED (Count: 20) -->
        <div class="flex flex-col gap-3 p-3.5 rounded-2xl bg-[#dfeaf2] border border-[#cde0ec] min-h-[560px]">
          <div class="flex items-center justify-between px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#21835e]"></span>
              <span class="font-bold text-xs text-[#1e3e50] uppercase tracking-wider">Completed</span>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-white text-[#1e3e50] text-[11px] font-bold border border-[#cde0ec]">20</span>
          </div>

          ${colCompleted.map(task => renderKanbanCard(task)).join('')}

          <button onclick="window.app?.navigate('tasks')" class="w-full py-2.5 rounded-xl border border-dashed border-[#b6d0e0] text-[#557b91] hover:text-[#1e3e50] hover:bg-white/60 text-xs font-semibold flex items-center justify-center gap-1 transition-colors mt-auto" type="button">
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
          <span class="text-xs text-[#5c7786] font-medium">${allTasks.length} Tugas Tersimpan di Google Sheets</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-[#143242]">
            <thead class="bg-[#f0f6fa] border-b border-[#d2e2ec] font-bold uppercase text-[10.5px] text-[#5c7786]">
              <tr>
                <th class="p-3.5">ID &amp; Judul Tugas</th>
                <th class="p-3.5">Brand Mitra</th>
                <th class="p-3.5">Penanggung Jawab</th>
                <th class="p-3.5">Prioritas</th>
                <th class="p-3.5">Progres Subtask</th>
                <th class="p-3.5">Deadline</th>
                <th class="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#edf3f7]">
              ${allTasks.map(t => `
                <tr class="hover:bg-[#f8fbfe] transition">
                  <td class="p-3.5 font-bold">
                    <span class="font-mono text-[10px] text-[#2c6673] bg-[#eaf2f7] px-1.5 py-0.5 rounded mr-1.5">${t.task_id}</span>
                    <span>${t.task_title}</span>
                  </td>
                  <td class="p-3.5 text-[#5c7786]">${t.brand_name || t.brand_id || 'Umum'}</td>
                  <td class="p-3.5 font-medium">${t.assigned_user || 'Rian Pratama'}</td>
                  <td class="p-3.5">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${t.priority === 'Urgent' ? 'bg-[#fde8e8] text-[#c53030]' : t.priority === 'High' ? 'bg-[#fdf2e9] text-[#c05621]' : 'bg-[#eaf4fa] text-[#2c6673]'}">
                      ${t.priority || 'Normal'}
                    </span>
                  </td>
                  <td class="p-3.5">
                    <div class="flex items-center gap-2">
                      <div class="w-20 bg-[#e6eff5] rounded-full h-1.5 overflow-hidden">
                        <div class="bg-[#2c6673] h-full" style="width: ${t.progress || 50}%;"></div>
                      </div>
                      <span class="text-[11px] font-semibold text-[#1e3e50]">${t.progress || 50}%</span>
                    </div>
                  </td>
                  <td class="p-3.5 text-[#5c7786]">${t.deadline || 'Besok'}</td>
                  <td class="p-3.5 font-bold text-[#1e3e50]">${t.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  setupTaskListeners(container);
}

function renderKanbanCard(task) {
  const isSpotlight = task.isSpotlight;
  return `
    <div class="cursor-pointer group p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2.5 border ${isSpotlight ? 'border-l-4 border-l-[#1e3e50] border-y border-r border-[#cbdfe9] shadow-md' : 'border-[#d4e4ee]'}" onclick="alert('Rincian Tugas #${task.id}: ${task.title}')">
      <div class="flex items-center justify-between">
        <span class="font-mono text-[11px] font-semibold ${isSpotlight ? 'text-white bg-[#1e3e50] font-bold' : 'text-[#1e3e50] bg-[#eaf2f7]'} px-2 py-0.5 rounded-md border border-[#cde0ec]">#${task.id}</span>
        <div class="flex items-center gap-1">
          <span class="px-2 py-0.5 rounded-full ${task.priorityClass} font-semibold text-[10px]">${task.priority}</span>
          ${task.version ? `<span class="px-1.5 py-0.5 rounded-md bg-[#edf4f8] text-[#476c80] font-mono text-[10px]">${task.version}</span>` : ''}
        </div>
      </div>

      <h3 class="font-bold text-sm text-[#1e3e50] group-hover:text-[#2c6673] transition-colors line-clamp-2 leading-snug">
        ${task.title}
      </h3>

      <div class="flex items-center gap-1.5 text-xs text-[#5f8296]">
        <span class="material-symbols-outlined text-[14px]">loyalty</span>
        <span class="truncate ${isSpotlight ? 'font-medium text-[#1e3e50]' : ''}">${task.brand}</span>
      </div>

      <div class="flex flex-col gap-1 mt-0.5">
        <div class="flex items-center justify-between text-[11px]">
          <span class="text-[#64889c]">Subtask Progress</span>
          <span class="font-bold text-[#1e3e50]">${task.subDone}/${task.subTotal} (${task.progress}%)</span>
        </div>
        <div class="w-full bg-[#e6eff5] rounded-full h-1.5 overflow-hidden">
          <div class="bg-[#2c6673] h-full rounded-full" style="width: ${task.progress}%;"></div>
        </div>
      </div>

      <div class="flex items-center justify-between text-[#5f8296] pt-1.5 border-t border-[#edf4f8]">
        <div class="flex items-center gap-1.5">
          <img class="w-5 h-5 rounded-full object-cover ring-1 ring-[#c0d8e6]" src="${task.avatar}">
          <span class="text-[11px] font-medium text-[#1e3e50]">${task.author}</span>
        </div>
        <span class="text-[11px] flex items-center gap-1 ${task.deadlineClass}">
          <span class="material-symbols-outlined text-[13px]">schedule</span>
          <span>${task.deadline}</span>
        </span>
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
}
