/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: NOTIFICATIONS
 * Modul 20 (Notifications & Activity Alerts)
 * File: js/views/notifications.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { SHEET_NAMES } from "../config.js";

export function renderNotifications(container) {
  const notifications = store.getItems(SHEET_NAMES.NOTIFICATIONS);
  const unreadCount = notifications.filter(n => n.read_status === "Unread").length;

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 20</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Pusat Notifikasi</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Notifikasi & Pengingat Aktivitas</h1>
          <p class="text-xs text-slate-500 mt-0.5">Pengingat deadline shooting, jadwal publikasi video, jatuh tempo invoice, dan review revisi.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-mark-all-read" class="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition">
            ✓ Tandai Semua Terbaca
          </button>
        </div>
      </div>

      <!-- Notifications List Container -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span class="text-xs font-bold text-slate-800">Daftar Notifikasi (${notifications.length})</span>
          ${unreadCount > 0 ? `
            <span class="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">
              ${unreadCount} Belum Dibaca
            </span>
          ` : `<span class="text-[11px] text-emerald-600 font-semibold">Semua telah dibaca</span>`}
        </div>

        ${notifications.length === 0 ? `
          <div class="p-12 text-center text-xs text-slate-400">
            🎉 Tidak ada notifikasi tertunda!
          </div>
        ` : `
          <div class="divide-y divide-slate-100">
            ${notifications.map(n => {
              const isUnread = n.read_status === "Unread";
              const typeIcon = getTypeIcon(n.type);

              return `
                <div class="p-4 flex items-start justify-between gap-4 transition ${isUnread ? 'bg-blue-50/40 hover:bg-blue-50/70' : 'hover:bg-slate-50'}">
                  <div class="flex items-start gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                      ${typeIcon}
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-extrabold text-xs text-slate-900">${n.title}</span>
                        <span class="text-[9px] font-bold px-2 py-0.2 rounded-md ${getTypeBadgeColor(n.type)}">${n.type}</span>
                        ${isUnread ? `<span class="w-2 h-2 rounded-full bg-blue-600"></span>` : ''}
                      </div>
                      <p class="text-xs text-slate-600 mt-1 leading-relaxed">${n.message}</p>
                      <div class="text-[10px] text-slate-400 mt-1.5 flex items-center gap-2">
                        <span>📅 ${n.date}</span>
                        ${n.link ? `<span>•</span> <a href="${n.link}" class="font-bold text-blue-600 hover:text-blue-800">Buka Menu Terkait →</a>` : ''}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    ${isUnread ? `
                      <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.markNotifRead('${n.notification_id}')">
                        Tandai Dibaca
                      </button>
                    ` : ''}
                    <button class="text-xs font-bold text-slate-300 hover:text-rose-600" onclick="window.deleteNotification('${n.notification_id}')">
                      ✕
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  document.getElementById("btn-mark-all-read")?.addEventListener("click", () => {
    notifications.forEach(n => {
      store.updateItem(SHEET_NAMES.NOTIFICATIONS, n.notification_id, { read_status: "Read" });
    });
    renderNotifications(container);
  });

  window.markNotifRead = (id) => {
    store.updateItem(SHEET_NAMES.NOTIFICATIONS, id, { read_status: "Read" });
    renderNotifications(container);
  };

  window.deleteNotification = (id) => {
    store.deleteItem(SHEET_NAMES.NOTIFICATIONS, id);
    renderNotifications(container);
  };
}

function getTypeIcon(type = "") {
  if (type.includes("Deadline")) return "⏳";
  if (type.includes("Publication") || type.includes("Publikasi")) return "🚀";
  if (type.includes("Payment") || type.includes("Pembayaran")) return "💰";
  if (type.includes("Revisi")) return "✂️";
  return "🔔";
}

function getTypeBadgeColor(type = "") {
  if (type.includes("Deadline")) return "bg-rose-100 text-rose-800";
  if (type.includes("Publication") || type.includes("Publikasi")) return "bg-blue-100 text-blue-800";
  if (type.includes("Payment") || type.includes("Pembayaran")) return "bg-emerald-100 text-emerald-800";
  return "bg-slate-100 text-slate-700";
}
