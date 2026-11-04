/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - AUTH & ACCESS CONTROL (RBAC)
 * File: js/auth.js
 * =========================================================================================
 */

import { APP_CONFIG, SHEET_NAMES } from "./config.js";
import { store } from "./store.js";

export const AVAILABLE_PERMISSIONS = [
  { key: "dashboard", label: "Executive Dashboard", icon: "space_dashboard" },
  { key: "content", label: "Ide & Content Pipeline", icon: "lightbulb" },
  { key: "calendar", label: "Kalender Konten Terpadu", icon: "calendar_month" },
  { key: "tasks", label: "Tugas & Kanban Board", icon: "view_kanban" },
  { key: "production", label: "Script & Copywriting Studio", icon: "edit_note" },
  { key: "media", label: "Media Library & Google Drive", icon: "folder_shared" },
  { key: "reports", label: "Database Sheets & Ekspor", icon: "table_chart" },
  { key: "business", label: "Bisnis, Klien & Brand", icon: "business_center" },
  { key: "finance", label: "Kas, Beban & Invoice (Keuangan)", icon: "payments" },
  { key: "timetracking", label: "Stopwatch & Rutinitas", icon: "timer" },
  { key: "targets", label: "Sasaran KPI & Target", icon: "insights" },
  { key: "notifications", label: "Pusat Notifikasi", icon: "notifications" },
  { key: "settings", label: "Pengaturan Sistem & API", icon: "settings" }
];

export const ROLE_DEFAULT_PERMISSIONS = {
  "Owner": ["all"],
  "Admin": ["dashboard", "content", "calendar", "tasks", "production", "media", "reports", "business", "timetracking", "targets", "notifications", "settings"],
  "Member / Creator": ["dashboard", "content", "calendar", "tasks", "production", "media", "timetracking", "notifications"],
  "Video Editor": ["dashboard", "tasks", "production", "media", "timetracking", "notifications"]
};

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    try {
      const savedAuth = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH);
      if (savedAuth) {
        this.currentUser = JSON.parse(savedAuth);
      } else {
        this.currentUser = null;
      }
    } catch (e) {
      this.currentUser = null;
    }
  }

  persist() {
    try {
      if (this.currentUser) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH, JSON.stringify(this.currentUser));
      } else {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH);
      }
    } catch (e) {
      console.error("Gagal menyimpan sesi login:", e);
    }
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  getUser() {
    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  validateCurrentSession(storeInstance = null) {
    if (!this.currentUser) return { valid: false, reason: "Tidak ada sesi aktif." };

    // PERLINDUNGAN UTAMA: Akun Owner tidak boleh pernah dicabut sesinya secara otomatis
    if (this.isOwner()) {
      return { valid: true, user: this.currentUser };
    }

    const storeToUse = storeInstance || (typeof store !== "undefined" ? store : null);
    if (!storeToUse) return { valid: true, user: this.currentUser };

    const users = storeToUse.getItems(SHEET_NAMES.USERS) || [];
    // Jika data pengguna belum termuat sama sekali, tunggu hidrasi
    if (users.length === 0) return { valid: true, user: this.currentUser };

    const currentId = String(this.currentUser.user_id || "");
    const currentUsername = (this.currentUser.username || "").toLowerCase().trim();

    const found = users.find(u => {
      const uId = String(u.user_id || "");
      const uName = (u.username || "").toLowerCase().trim();
      return uId === currentId || (currentUsername && uName === currentUsername);
    });

    if (!found) {
      console.warn(`[Auth] Pengguna ${this.currentUser.name} (${this.currentUser.user_id}) tidak ditemukan di database. Sesi dicabut.`);
      this.logout();
      return { valid: false, reason: "Akun Anda telah dihapus oleh Owner. Akses ke sistem ini telah dicabut." };
    }

    if (found.status && found.status !== "Active") {
      console.warn(`[Auth] Pengguna ${this.currentUser.name} berstatus '${found.status}'. Sesi dicabut.`);
      this.logout();
      return { valid: false, reason: "Akun Anda telah dinonaktifkan oleh Owner." };
    }

    // Perbarui hak akses & role secara dinamis jika diubah oleh Owner
    this.currentUser = { ...this.currentUser, ...found };
    this.persist();
    return { valid: true, user: this.currentUser };
  }

  isOwner() {
    if (!this.currentUser) return false;
    const role = (this.currentUser.role || "").toLowerCase();
    return role === "owner" || role.includes("owner");
  }

  isAdminOrOwner() {
    if (!this.currentUser) return false;
    const role = (this.currentUser.role || "").toLowerCase();
    return role.includes("owner") || role.includes("admin");
  }

  hasPermission(moduleKey) {
    if (!this.currentUser) return false;
    if (this.isOwner()) return true;
    // Modul profil & pengaturan akun selalu dapat diakses oleh semua anggota agar dapat mengupload foto profil dan memperbarui profil mereka sendiri
    if (moduleKey === "settings" || moduleKey === "profile") return true;
    const perms = this.currentUser.permissions || [];
    if (perms.includes("all")) return true;
    return perms.includes(moduleKey);
  }

  login(username, password) {
    const uClean = (username || "").trim().toLowerCase();
    const pClean = (password || "").trim();

    if (!uClean) {
      return { success: false, message: "Username tidak boleh kosong!" };
    }
    if (!pClean) {
      return { success: false, message: "Password tidak boleh kosong!" };
    }

    const users = store.getItems(SHEET_NAMES.USERS) || [];

    // Cari user berdasarkan username atau email
    const matched = users.find(u => {
      const uName = (u.username || u.name || "").toLowerCase().trim();
      const uEmail = (u.email || "").toLowerCase().trim();
      const uPass = (u.password || "123").trim();
      return (uName === uClean || uEmail === uClean) && (uPass === pClean);
    });

    if (matched) {
      this.currentUser = { ...matched };
      this.persist();
      store.updateItem(SHEET_NAMES.USERS, matched.user_id, { last_login: new Date().toISOString() });
      return { success: true, user: this.currentUser };
    }

    // Fallback jika login dengan admin / admin123
    if (uClean === "admin" && (pClean === "admin123" || pClean === "123")) {
      const ownerUser = users[0] || {
        user_id: "USR-001",
        name: "Rian Pratama",
        username: "rian",
        role: "Owner",
        email: "rian.lead@creatorhub.id",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        permissions: ["all"]
      };
      this.currentUser = ownerUser;
      this.persist();
      return { success: true, user: this.currentUser };
    }

    return { success: false, message: "Wrong Password!! Username atau kata sandi tidak cocok." };
  }

  logout() {
    this.currentUser = null;
    this.persist();
  }

  updateProfile(profileData) {
    if (!this.currentUser) {
      return { success: false, message: "Tidak ada sesi pengguna aktif." };
    }

    const userId = this.currentUser.user_id;
    const updated = {
      ...this.currentUser,
      ...profileData,
      updated_at: new Date().toISOString()
    };

    store.updateItem(SHEET_NAMES.USERS, userId, updated);
    this.currentUser = updated;
    this.persist();
    return { success: true, user: updated };
  }

  addUser(userData) {
    if (!this.isOwner() && !this.isAdminOrOwner()) {
      return { success: false, message: "Hanya Owner atau Admin yang dapat menambahkan pengguna baru." };
    }

    const users = store.getItems(SHEET_NAMES.USERS) || [];
    const uClean = (userData.username || "").toLowerCase().trim();
    if (users.some(u => (u.username || "").toLowerCase().trim() === uClean)) {
      return { success: false, message: `Username '${userData.username}' sudah digunakan.` };
    }

    const prefix = "USR";
    let maxNum = 0;
    users.forEach(u => {
      const match = String(u.user_id || "").match(/USR-(\d+)/);
      if (match) {
        const n = parseInt(match[1], 10);
        if (n > maxNum) maxNum = n;
      }
    });
    const nextNum = maxNum + 1;
    const newId = `${prefix}-${String(nextNum).padStart(3, "0")}`;

    const newUser = {
      user_id: newId,
      name: userData.name || "Anggota Baru",
      username: uClean || `user${nextNum}`,
      password: userData.password || "123",
      email: userData.email || "",
      role: userData.role || "Member / Creator",
      avatar: userData.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      status: "Active",
      permissions: userData.permissions || ROLE_DEFAULT_PERMISSIONS[userData.role] || ["dashboard", "tasks"],
      bio: userData.bio || "",
      created_at: new Date().toISOString()
    };

    store.createItem(SHEET_NAMES.USERS, newUser);
    return { success: true, user: newUser };
  }

  updateUser(userId, updatedFields) {
    if (!this.isOwner() && !this.isAdminOrOwner()) {
      return { success: false, message: "Hanya Owner yang dapat mengubah data & hak akses pengguna." };
    }

    const updated = store.updateItem(SHEET_NAMES.USERS, userId, {
      ...updatedFields,
      updated_at: new Date().toISOString()
    });

    if (this.currentUser && this.currentUser.user_id === userId) {
      this.currentUser = { ...this.currentUser, ...updated };
      this.persist();
    }

    return { success: true, user: updated };
  }

  deleteUser(userId) {
    if (!this.isOwner()) {
      return { success: false, message: "Hanya Owner yang memiliki wewenang menghapus akun pengguna." };
    }

    const targetUser = store.getItemById(SHEET_NAMES.USERS, userId);
    if (targetUser && (targetUser.role === "Owner" || (targetUser.role && targetUser.role.includes("Owner")))) {
      return { success: false, message: "Akun Owner utama tidak dapat dihapus!" };
    }

    if (this.currentUser && this.currentUser.user_id === userId) {
      return { success: false, message: "Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif!" };
    }

    store.deleteItem(SHEET_NAMES.USERS, userId);
    return { success: true };
  }
}

export const auth = new AuthManager();
