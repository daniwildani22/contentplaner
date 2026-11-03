/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - CONFIGURATION & CONSTANTS
 * File: js/config.js
 * =========================================================================================
 */

export const APP_CONFIG = {
  APP_NAME: "ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER",
  VERSION: "1.0.0",
  DEFAULT_CURRENCY: "IDR",
  CURRENCY_SYMBOL: "Rp",
  DEFAULT_API_TOKEN: "PLANNER_SECRET_TOKEN_2026",
  // Kredensial Cloud Database Supabase (Opsional: jika diisi di sini, seluruh perangkat yang membuka link Netlify langsung otomatis terhubung tanpa perlu input ulang)
  DEFAULT_SUPABASE_URL: "https://exxcnjldgnyawstokqmv.supabase.co",
  DEFAULT_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4eGNuamxkZ255YXdzdG9rcW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM3MDQ1NzYsImV4cCI6MjEwOTI4MDU3Nn0.hO7mpKxWO5jAhUKk6BEiVzUvw8SVaMYcbt3dCj65fGk",
  STORAGE_KEYS: {
    STATE: "agy_creator_planner_state_v1",
    SETTINGS: "agy_creator_planner_settings_v1",
    AUTH: "agy_creator_planner_auth_v1",
    OFFLINE_QUEUE: "agy_creator_planner_offline_queue_v1",
    TIMER: "agy_creator_planner_active_timer_v1"
  }
};

/**
 * 25 Sheets Database Schema (PRD Section 7.1)
 */
export const SHEET_NAMES = {
  USERS: "Users",
  BRANDS: "Brands",
  CLIENTS: "Clients",
  PROJECTS: "Projects",
  CAMPAIGNS: "Campaigns",
  SOCIAL_ACCOUNTS: "Social_Accounts",
  CONTENT_PLANNING: "Content_Planning",
  CONTENT_TASKS: "Content_Tasks",
  CONTENT_SUBTASKS: "Content_Subtasks",
  CONTENT_CALENDAR: "Content_Calendar",
  CONTENT_SCRIPTS: "Content_Scripts",
  CONTENT_PRODUCTION: "Content_Production",
  CONTENT_REVISIONS: "Content_Revisions",
  CONTENT_PUBLICATIONS: "Content_Publications",
  CONTENT_ANALYTICS: "Content_Analytics",
  MEDIA_LIBRARY: "Media_Library",
  REFERENCES: "References",
  TIME_TRACKING: "Time_Tracking",
  INCOME: "Income",
  EXPENSES: "Expenses",
  INVOICES: "Invoices",
  PAYMENTS: "Payments",
  TARGETS: "Targets",
  NOTIFICATIONS: "Notifications",
  SETTINGS: "Settings"
};

/**
 * Status Konten (PRD Module 02)
 */
export const CONTENT_STATUSES = [
  { key: "Idea", label: "Idea", color: "bg-slate-100 text-slate-700 border-slate-300", dot: "bg-slate-400" },
  { key: "Planned", label: "Planned", color: "bg-sky-100 text-sky-800 border-sky-300", dot: "bg-sky-500" },
  { key: "In Production", label: "In Production", color: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500" },
  { key: "Ready", label: "Ready", color: "bg-purple-100 text-purple-800 border-purple-300", dot: "bg-purple-500" },
  { key: "Published", label: "Published", color: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" },
  { key: "Archived", label: "Archived", color: "bg-zinc-100 text-zinc-600 border-zinc-300", dot: "bg-zinc-400" }
];

/**
 * Status Pekerjaan / Tasks (PRD Module 04)
 */
export const TASK_STATUSES = [
  { key: "To Do", label: "To Do", color: "bg-slate-100 text-slate-700 border-slate-300", dot: "bg-slate-400" },
  { key: "In Progress", label: "In Progress", color: "bg-blue-100 text-blue-800 border-blue-300", dot: "bg-blue-500" },
  { key: "Review", label: "Review", color: "bg-amber-100 text-amber-800 border-amber-300", dot: "bg-amber-500" },
  { key: "Revision", label: "Revision", color: "bg-rose-100 text-rose-800 border-rose-300", dot: "bg-rose-500" },
  { key: "Completed", label: "Completed", color: "bg-emerald-100 text-emerald-800 border-emerald-300", dot: "bg-emerald-500" },
  { key: "Cancelled", label: "Cancelled", color: "bg-zinc-100 text-zinc-600 border-zinc-300", dot: "bg-zinc-400" }
];

/**
 * Prioritas Tugas (PRD Module 04)
 */
export const TASK_PRIORITIES = [
  { key: "Urgent", label: "Urgent", color: "bg-rose-50 text-rose-700 border-rose-300 font-bold", badge: "bg-rose-500 text-white" },
  { key: "High", label: "High", color: "bg-amber-50 text-amber-700 border-amber-300 font-semibold", badge: "bg-amber-500 text-white" },
  { key: "Normal", label: "Normal", color: "bg-blue-50 text-blue-700 border-blue-200", badge: "bg-blue-500 text-white" },
  { key: "Low", label: "Low", color: "bg-slate-50 text-slate-700 border-slate-200", badge: "bg-slate-400 text-white" }
];

/**
 * Status Produksi (PRD Module 05)
 */
export const PRODUCTION_STATUSES = [
  { key: "Not Started", label: "Belum Mulai", color: "bg-slate-100 text-slate-700" },
  { key: "Preparation", label: "Persiapan", color: "bg-amber-100 text-amber-800" },
  { key: "Shooting", label: "Shooting Berjalan", color: "bg-indigo-100 text-indigo-800" },
  { key: "Completed", label: "Selesai Shooting", color: "bg-emerald-100 text-emerald-800" }
];

/**
 * Status Naskah / Script (PRD Module 06)
 */
export const SCRIPT_STATUSES = [
  { key: "Draft", label: "Draft", color: "bg-slate-100 text-slate-700" },
  { key: "In Review", label: "In Review", color: "bg-amber-100 text-amber-800" },
  { key: "Final", label: "Final Disetujui", color: "bg-emerald-100 text-emerald-800" }
];

/**
 * Status Revisi / Editing (PRD Module 07)
 */
export const REVISION_STATUSES = [
  { key: "Editing", label: "Editing", color: "bg-blue-100 text-blue-800" },
  { key: "Review", label: "Review Tim / Brand", color: "bg-amber-100 text-amber-800" },
  { key: "Revision", label: "Revisi Diperlukan", color: "bg-rose-100 text-rose-800" },
  { key: "Approved", label: "Approved", color: "bg-teal-100 text-teal-800" },
  { key: "Final", label: "Final Siap Publish", color: "bg-emerald-100 text-emerald-800" }
];

/**
 * Status Publikasi (PRD Module 10)
 */
export const PUBLICATION_STATUSES = [
  { key: "Draft", label: "Draft", color: "bg-slate-100 text-slate-700" },
  { key: "Scheduled", label: "Dijadwalkan", color: "bg-blue-100 text-blue-800" },
  { key: "Ready", label: "Siap Tayang", color: "bg-purple-100 text-purple-800" },
  { key: "Published", label: "Published (Tayang)", color: "bg-emerald-100 text-emerald-800" },
  { key: "Failed", label: "Gagal Tayang", color: "bg-rose-100 text-rose-800" },
  { key: "Cancelled", label: "Dibatalkan", color: "bg-zinc-100 text-zinc-600" }
];

/**
 * Target Types (PRD Module 17)
 */
export const TARGET_TYPES = [
  "Content Production",
  "Content Publication",
  "Views",
  "Engagement",
  "Followers",
  "Revenue",
  "Task Completion"
];

/**
 * Platform Media Sosial
 */
export const SOCIAL_PLATFORMS = [
  "TikTok",
  "Instagram Reels",
  "Instagram Feed/Carousel",
  "YouTube Long",
  "YouTube Shorts",
  "Facebook",
  "LinkedIn",
  "Twitter/X",
  "Blog/Website"
];

/**
 * Content Pillars
 */
export const CONTENT_PILLARS = [
  "Education",
  "Entertainment",
  "Inspiration",
  "Promotion",
  "Review & Before-After",
  "Behind The Scenes",
  "Tips & Tutorial",
  "Storytelling"
];

/**
 * Format Konten
 */
export const CONTENT_FORMATS = [
  "Short Video (Vertical 9:16)",
  "Long Video (Horizontal 16:9)",
  "Single Image Post",
  "Carousel Slide (10 Slides)",
  "Live Streaming",
  "Text Thread / Article"
];

/**
 * Kategori Pengeluaran
 */
export const EXPENSE_CATEGORIES = [
  "Equipment & Gear",
  "Software & Subscriptions",
  "Talent & Production Team",
  "Props & Wardrobe",
  "Transportation & Location",
  "Advertising & Promotion",
  "Office & Admin",
  "Others"
];

/**
 * Sumber Pendapatan
 */
export const INCOME_SOURCES = [
  "Brand Sponsorship / Endorsement",
  "Affiliate Commission",
  "AdSense / Platform Revenue",
  "Client Video Production",
  "Consulting / Mentoring",
  "Digital Products / Merch"
];
