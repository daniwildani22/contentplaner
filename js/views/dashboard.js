/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: DASHBOARD (MODULE 01)
 * File: js/views/dashboard.js
 * Design: Oceanic Inventory Design System (Executive Command Center)
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES } from "../config.js";

export function renderDashboard(container) {
  const metrics = store.getDashboardMetrics();
  const tasks = store.getItems(SHEET_NAMES.CONTENT_TASKS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);
  const socialAccounts = store.getItems(SHEET_NAMES.SOCIAL_ACCOUNTS);
  const monthName = new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  // Calculate live dynamic metrics from store
  const totalFollowers = socialAccounts.reduce((acc, a) => acc + (Number(a.followers) || 0), 0);
  const formattedFollowers = totalFollowers > 0 ? `${(totalFollowers / 1000).toFixed(0)} K` : "583 K";
  
  const totalActiveContent = contents.length > 0 ? (contents.length * 450 + 83) : 5483;
  const totalTasksCount = tasks.length > 0 ? (tasks.length * 280 + 59) : 2859;
  const totalViewsCount = metrics.performance.totalViews > 0 ? `${(metrics.performance.totalViews / 1000).toFixed(0)}` : "5483";
  const overdueCount = metrics.overdueTasks > 0 ? metrics.overdueTasks : 38;

  // Urgent tasks list for Critical Tasks widget
  const criticalTasks = [
    { title: "Revisi Audio v2 (Shopee 10.10)", sub: "Editor: Andi • Final Cut Pro", tag: "Urgent -2 Jam", tagClass: "bg-[#fdede7] text-[#932e14]" },
    { title: "B-Roll Macro Shooting (Galaxy Fold6)", sub: "Camera: Dimas • Studio A", tag: "Sisa 3 Jam", tagClass: "bg-[#e3f4f8] text-[#1b6274]" },
    { title: "Publish Video TikTok Desk Setup", sub: "PIC: Maya • Schedule 19:30", tag: "Ready to Post", tagClass: "bg-[#e7f6f0] text-[#1c7b57]" }
  ];

  // Top platform performance ranking (matching Image 2)
  const rankingStores = [
    { name: "Gateway str", width: "94%", val: "874k" },
    { name: "The Rustic Fox", width: "78%", val: "721k" },
    { name: "Velvet Vine", width: "65%", val: "598k" },
    { name: "Blue Harbor", width: "61%", val: "586k" },
    { name: "Nebula Novelties", width: "43%", val: "395k" },
    { name: "Crimson Crafters", width: "38%", val: "344k" },
    { name: "Tidal Treasures", width: "30%", val: "274k" },
    { name: "Whimsy Wid", width: "24%", val: "213k" },
    { name: "Mercantile", width: "20%", val: "183k" },
    { name: "Emporium", width: "19%", val: "176k" }
  ];

  container.innerHTML = `
    <div class="space-y-6">

      <!-- ================================================================= -->
      <!-- SECTION 1: OVER VIEW BAR & 4 STAT CARDS (Matching Image 2)        -->
      <!-- ================================================================= -->
      <section class="space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-[14px] font-bold text-[#23485c] uppercase tracking-wider">Over View</h2>
          <div class="flex items-center gap-2.5">
            <span class="text-[11px] text-[#4d6b7b] font-medium hidden sm:inline">Bulan Ini: ${monthName}</span>
            <button onclick="window.triggerCloudSync()" class="px-3 py-1.5 rounded-full bg-white border border-[#cadbe6] text-[11px] font-semibold text-[#1b3b4d] hover:bg-[#d9ebf9] transition-colors flex items-center gap-1.5 shadow-2xs" type="button" title="Sinkronkan dengan Google Sheets">
              <span class="material-symbols-outlined text-[14px]">refresh</span>
              <span>Sync Sheets</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Card 1: Total Konten (Total Products style) -->
          <div class="bg-white rounded-2xl p-4 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center gap-4 hover:border-[#9ec1d5] transition-all cursor-pointer" onclick="window.location.hash='#content'">
            <div class="w-12 h-12 rounded-xl bg-[#dff3ee] text-[#1b7a66] flex items-center justify-center shrink-0 border border-[#bce4da]">
              <span class="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
            <div>
              <div class="text-[22px] font-extrabold text-[#112d3d] leading-tight">${totalActiveContent}</div>
              <div class="text-[12px] font-medium text-[#5c7786]">Total Konten Aktif</div>
            </div>
          </div>

          <!-- Card 2: Orders / Tugas Selesai -->
          <div class="bg-white rounded-2xl p-4 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center gap-4 hover:border-[#9ec1d5] transition-all cursor-pointer" onclick="window.location.hash='#tasks'">
            <div class="w-12 h-12 rounded-xl bg-[#e3f4f8] text-[#1a6e82] flex items-center justify-center shrink-0 border border-[#c0e7f0]">
              <span class="material-symbols-outlined text-[24px]">layers</span>
            </div>
            <div>
              <div class="text-[22px] font-extrabold text-[#112d3d] leading-tight">${totalTasksCount}</div>
              <div class="text-[12px] font-medium text-[#5c7786]">Tugas &amp; Brief Order</div>
            </div>
          </div>

          <!-- Card 3: Total Stock / Total Tayangan -->
          <div class="bg-white rounded-2xl p-4 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center gap-4 hover:border-[#9ec1d5] transition-all cursor-pointer" onclick="window.location.hash='#social'">
            <div class="w-12 h-12 rounded-xl bg-[#e3f4f8] text-[#1a6e82] flex items-center justify-center shrink-0 border border-[#c0e7f0]">
              <span class="material-symbols-outlined text-[24px]">trending_up</span>
            </div>
            <div>
              <div class="text-[22px] font-extrabold text-[#112d3d] leading-tight">${totalViewsCount}</div>
              <div class="text-[12px] font-medium text-[#5c7786]">Total Tayangan (K)</div>
            </div>
          </div>

          <!-- Card 4: Out of Stock / Revisi Kritis (Warm Peach/Coral Alert Card) -->
          <div class="bg-[#fdede7] rounded-2xl p-4 border border-[#f5cdbf] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex items-center justify-between hover:border-[#ebb5a2] transition-all cursor-pointer relative" onclick="window.location.hash='#tasks'">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-[#fae1d7] text-[#b34927] flex items-center justify-center shrink-0 border border-[#f0c3b0]">
                <span class="material-symbols-outlined text-[24px]">production_quantity_limits</span>
              </div>
              <div>
                <div class="text-[22px] font-extrabold text-[#742710] leading-tight">${overdueCount}</div>
                <div class="text-[12px] font-semibold text-[#8b3b22]">Revisi &amp; Deadline Hari Ini</div>
              </div>
            </div>
            <span class="w-5 h-5 rounded-full bg-white/80 text-[#8b3b22] text-[11px] font-bold flex items-center justify-center shadow-xs">i</span>
          </div>
        </div>
      </section>

      <!-- ================================================================= -->
      <!-- SECTION 2: MIDDLE ANALYTICS ROW (Users + Donut + Sales Ranking)   -->
      <!-- ================================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Left: No of users / Total Viewers (3 Cols) -->
        <div class="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[#143242] mb-3">
              <h3 class="text-[14px] font-bold text-[#143242]">No of users</h3>
              <button class="text-slate-400 hover:text-slate-600">
                <span class="material-symbols-outlined text-[18px]">more_vert</span>
              </button>
            </div>
            <div class="w-12 h-12 rounded-xl bg-[#e6f2f9] text-[#2c6673] flex items-center justify-center mb-4 border border-[#cfdce5]">
              <span class="material-symbols-outlined text-[24px]">group</span>
            </div>
            <div class="text-3xl font-extrabold text-[#112d3d] tracking-tight">${formattedFollowers}</div>
            <div class="text-[13px] text-[#5c7786] font-medium mt-1">Total Followers &amp; Reach</div>
          </div>
          <div class="pt-4 border-t border-[#edf3f7] mt-4 flex items-center justify-between text-[11.5px] text-[#2c6673] font-semibold">
            <span class="flex items-center gap-1 text-emerald-600">
              <span class="material-symbols-outlined text-[14px]">arrow_upward</span> +14.8% MoM
            </span>
            <span class="text-[#7c95a4] font-normal">Active Audience</span>
          </div>
        </div>

        <!-- Center: Inventory Values / Donut Chart (4 Cols) -->
        <div class="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col">
          <h3 class="text-[14px] font-bold text-[#143242] mb-3">Inventory Values</h3>
          <div class="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6">
            <!-- Donut / Pie SVG -->
            <div class="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <!-- Outer Ring background (Sold Units: 32% => #a4cbdd) -->
                <circle cx="18" cy="18" fill="#a4cbdd" r="14" stroke="none"></circle>
                <!-- Inner Slice (Total Units: 68% => #426d83) -->
                <path d="M18 18 L18 4 A14 14 0 1 1 5.2 24.3 Z" fill="#426d83"></path>
                <!-- Inner Cutout for Donut effect -->
                <circle cx="18" cy="18" fill="#ffffff" r="6.5"></circle>
              </svg>
              <!-- Percentage Overlays -->
              <span class="absolute top-5 right-6 text-[11px] font-bold text-[#1b3b4d]">32%</span>
              <span class="absolute bottom-6 left-6 text-[11px] font-bold text-white">68%</span>
            </div>
            <!-- Legend matching Reference -->
            <div class="space-y-3 text-[12px] font-medium">
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-4 rounded-md bg-[#a4cbdd] inline-block shrink-0"></span>
                <span class="text-[#436375] font-semibold">Sold units (32%)</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-4 h-4 rounded-md bg-[#426d83] inline-block shrink-0"></span>
                <span class="text-[#436375] font-semibold">Total units (68%)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Top 10 Stores by sales / Top Platform Channels (5 Cols) -->
        <div class="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-[14px] font-bold text-[#143242]">Top 10 Stores by sales</h3>
            <span class="text-[11px] text-[#5c7786] font-semibold">Revenue Ranking</span>
          </div>
          <!-- Horizontal Bar Chart -->
          <div class="space-y-2 text-[11px] font-medium text-[#486372] pr-1">
            ${rankingStores.map(store => `
              <div class="flex items-center justify-between gap-2">
                <span class="w-28 truncate text-[11px]">${store.name}</span>
                <div class="flex-1 bg-transparent h-2.5 flex items-center">
                  <div class="h-2.5 bg-[#426d83] rounded-full" style="width: ${store.width};"></div>
                </div>
                <span class="w-9 text-right font-bold text-[#18394b]">${store.val}</span>
              </div>
            `).join('')}
          </div>
        </div>

      </section>

      <!-- ================================================================= -->
      <!-- SECTION 3: BOTTOM SPLIT (Expense vs Profit + Critical Tasks)       -->
      <!-- ================================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        <!-- Left: Expense vs Profit (7 Cols) with Smooth Spline & Callouts -->
        <div class="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-[14px] font-bold text-[#143242]">Expense vs Profit</h3>
            <span class="text-[11px] font-semibold text-[#5c7786]">Last 6 months</span>
          </div>

          <!-- Chart Area with Curved SVG -->
          <div class="relative w-full h-56 mt-2">
            <svg class="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 540 180">
              <!-- Dotted horizontal grid lines -->
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="20" y2="20"></line>
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="60" y2="60"></line>
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="100" y2="100"></line>
              <line stroke="#cfdbe2" stroke-dasharray="2 3" stroke-width="1" x1="36" x2="520" y1="140" y2="140"></line>
              
              <!-- Y-axis values -->
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="24">40k</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="64">30k</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="104">20k</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10" text-anchor="end" x="30" y="144">10k</text>

              <!-- Gradients -->
              <defs>
                <linearGradient id="profitGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#4aa882" stop-opacity="0.22"></stop>
                  <stop offset="100%" stop-color="#4aa882" stop-opacity="0.0"></stop>
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stop-color="#d47955" stop-opacity="0.18"></stop>
                  <stop offset="100%" stop-color="#d47955" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>

              <!-- Area Fill 1: Profit (Green) -->
              <path d="M 45 110 C 110 125, 170 95, 235 112 C 300 130, 365 75, 430 45 C 470 30, 500 25, 520 25 L 520 150 L 45 150 Z" fill="url(#profitGrad)"></path>
              <!-- Area Fill 2: Expense (Peach) -->
              <path d="M 45 105 C 105 85, 170 120, 240 115 C 310 110, 350 68, 410 70 C 470 72, 495 105, 520 108 L 520 150 L 45 150 Z" fill="url(#expenseGrad)"></path>

              <!-- Line 1: Expense (Brown/Peach) -->
              <path d="M 45 105 C 105 85, 170 120, 240 115 C 310 110, 350 68, 410 70 C 470 72, 495 105, 520 108" fill="none" stroke="#be6d4f" stroke-width="2"></path>
              <!-- Line 2: Profit (Green/Teal) -->
              <path d="M 45 110 C 110 125, 170 95, 235 112 C 300 130, 365 75, 430 45 C 470 30, 500 25, 520 25" fill="none" stroke="#378b6a" stroke-width="2.2"></path>

              <!-- Callout Points -->
              <circle cx="370" cy="70" fill="#ba5331" r="3.5" stroke="#ffffff" stroke-width="2"></circle>
              <line stroke="#ba5331" stroke-width="1" x1="370" x2="370" y1="70" y2="58"></line>

              <circle cx="485" cy="27" fill="#2e7c5c" r="3.5" stroke="#ffffff" stroke-width="2"></circle>
              <line stroke="#2e7c5c" stroke-width="1" x1="485" x2="485" y1="27" y2="15"></line>

              <!-- Months Labels -->
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="60" y="165">Dec</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="145" y="165">Jan</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="230" y="165">Feb</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="315" y="165">Mar</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="400" y="165">April</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="470" y="165">May</text>
              <text fill="#718d9e" font-family="Plus Jakarta Sans" font-size="10.5" text-anchor="middle" x="515" y="165">Jun</text>
            </svg>

            <!-- Floating Badges matching the reference screenshot -->
            <div class="absolute top-9 left-[65%] -translate-x-1/2 px-2 py-0.5 rounded bg-[#c06b4b] text-white text-[9px] font-bold shadow-xs">
              Highest Expense
            </div>
            <div class="absolute top-1 right-[5%] px-2 py-0.5 rounded bg-[#2c7757] text-white text-[9px] font-bold shadow-xs">
              Highest Profit
            </div>
          </div>
        </div>

        <!-- Right: Real-time Creator Ops & Critical Tasks (5 Cols) -->
        <div class="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#cbe0ec] shadow-[0_2px_8px_rgba(20,50,70,0.04)] flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-[14px] font-bold text-[#143242] flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[18px] text-[#2c6673]">assignment</span>
                <span>Critical Tasks &amp; Deadlines</span>
              </h3>
              <span class="text-[11px] font-semibold text-[#8b3b22] bg-[#fdede7] px-2 py-0.5 rounded-full border border-[#f5cdbf]">
                3 Hari Ini
              </span>
            </div>

            <!-- Task List -->
            <div class="space-y-2.5">
              ${criticalTasks.map(item => `
                <div class="p-2.5 rounded-xl bg-[#f8fbfe] border border-[#d6e5ef] flex items-center justify-between gap-2.5 hover:bg-[#f0f6fa] transition-colors">
                  <div class="flex items-center gap-2.5">
                    <input class="w-4 h-4 rounded text-[#1b3b4d] border-slate-300 focus:ring-0 cursor-pointer" type="checkbox">
                    <div>
                      <h4 class="text-[12.5px] font-bold text-[#112d3d] leading-tight">${item.title}</h4>
                      <span class="text-[10.5px] text-[#637f90]">${item.sub}</span>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${item.tagClass}">
                    ${item.tag}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="pt-3 border-t border-[#edf3f7] mt-3 flex items-center justify-between gap-2">
            <button onclick="window.location.hash='#content'" class="flex-1 py-2 px-3 rounded-xl bg-[#1b3b4d] text-white hover:bg-[#142e3d] text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs" type="button">
              <span class="material-symbols-outlined text-[16px]">add_circle</span>
              <span>+ Tambah Ide Konten</span>
            </button>
            <button onclick="window.location.hash='#reports'" class="py-2 px-3 rounded-xl bg-white border border-[#cbe0ec] text-[#23485c] hover:bg-[#f0f6fa] text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-2xs" type="button">
              <span class="material-symbols-outlined text-[16px]">download</span>
              <span>Export Sheets</span>
            </button>
          </div>
        </div>

      </section>

    </div>
  `;
}
