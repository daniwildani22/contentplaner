/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - API CLIENT FOR GOOGLE APPS SCRIPT
 * File: js/api.js
 * Fungsi: Mengelola komunikasi REST API ke backend Google Apps Script Web App,
 *         sinkronisasi cloud dua arah, upload berkas ke Google Drive, dan offline queue.
 * =========================================================================================
 */

import { store } from "./store.js";
import { SHEET_NAMES } from "./config.js";

class ApiClient {
  constructor() {
    this.isOnline = navigator.onLine;
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.flushQueue();
    });
    window.addEventListener("offline", () => {
      this.isOnline = false;
    });
  }

  getGasUrl() {
    const val = store.getSetting ? store.getSetting("gas_api_url") : "";
    if (val) return val.trim();
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "gas_api_url");
    if (setting) {
      return (setting.value || setting.setting_value || "").trim();
    }
    return "";
  }

  getSecretToken() {
    const val = store.getSetting ? store.getSetting("secret_token") : "";
    if (val) return val.trim();
    const setting = store.getItemById(SHEET_NAMES.SETTINGS, "secret_token");
    if (setting) {
      return (setting.value || setting.setting_value || "PLANNER_SECRET_TOKEN_2026").trim();
    }
    return "PLANNER_SECRET_TOKEN_2026";
  }

  isConfigured() {
    const url = this.getGasUrl();
    return url.length > 0 && url.startsWith("https://script.google.com");
  }

  /**
   * Menguji koneksi REST API ke Google Apps Script
   */
  async ping(customUrl = null) {
    const url = (customUrl || this.getGasUrl()).trim();
    if (!url) {
      return { success: false, message: "URL Google Apps Script belum diisi di Pengaturan." };
    }

    try {
      const sep = url.includes("?") ? "&" : "?";
      const response = await fetch(`${url}${sep}action=ping`, {
        method: "GET",
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const resJson = await response.json();
      if (resJson.status === "success") {
        return { success: true, data: resJson };
      } else {
        return { success: false, message: resJson.message || "Gagal melakukan ping ke API." };
      }
    } catch (err) {
      return { success: false, message: `Koneksi gagal: ${err.message}` };
    }
  }

  /**
   * Mengambil seluruh data 25 sheet dari Google Sheets
   */
  async fetchAll(customUrl = null) {
    const url = (customUrl || this.getGasUrl()).trim();
    if (!url) return { success: false, message: "URL API belum diset. Buka menu Pengaturan untuk memasukkan URL Web App." };

    try {
      const sep = url.includes("?") ? "&" : "?";
      const response = await fetch(`${url}${sep}action=readAll`, {
        method: "GET",
        headers: { Accept: "application/json" }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const resJson = await response.json();
      if (resJson.status === "success" && resJson.data) {
        store.mergeRemoteData(resJson.data);
        return { success: true, totalSheets: Object.keys(resJson.data).length };
      } else {
        return { success: false, message: resJson.message || "Gagal membaca data dari Google Sheets." };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  /**
   * Mengirim data pembuatan baris baru ke backend
   */
  async syncCreate(sheetName, item) {
    if (!this.isConfigured() || !this.isOnline) return { localOnly: true };

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "create",
        sheet: sheetName,
        item: item,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      return await response.json();
    } catch (err) {
      console.warn("Gagal syncCreate ke Google Sheets, disimpan di queue:", err);
      return { localOnly: true, error: err.message };
    }
  }

  /**
   * Mengirim pembaruan baris ke backend
   */
  async syncUpdate(sheetName, id, item) {
    if (!this.isConfigured() || !this.isOnline) return { localOnly: true };

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "update",
        sheet: sheetName,
        id: id,
        item: item,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      return await response.json();
    } catch (err) {
      console.warn("Gagal syncUpdate ke Google Sheets, disimpan di queue:", err);
      return { localOnly: true, error: err.message };
    }
  }

  /**
   * Mengirim penghapusan baris ke backend
   */
  async syncDelete(sheetName, id) {
    if (!this.isConfigured() || !this.isOnline) return { localOnly: true };

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "delete",
        sheet: sheetName,
        id: id,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      return await response.json();
    } catch (err) {
      console.warn("Gagal syncDelete ke Google Sheets, disimpan di queue:", err);
      return { localOnly: true, error: err.message };
    }
  }

  /**
   * Upload Berkas Base64 ke Google Drive & Catat di Sheet Media_Library
   */
  async uploadMedia(base64Data, fileName, mimeType, category = "General", brandId = "", contentId = "", notes = "") {
    if (!this.isConfigured()) {
      // Offline fallback: simpan sebagai local dummy record di Media_Library
      const localMedia = {
        media_id: "MED-LOCAL-" + Date.now(),
        file_name: fileName,
        file_type: fileName.split(".").pop().toUpperCase(),
        category: category,
        brand_id: brandId,
        content_id: contentId,
        drive_file_id: "local_cache",
        file_url: base64Data.startsWith("data:") ? base64Data : "",
        version: "v1",
        upload_date: new Date().toISOString().slice(0, 10),
        notes: notes || "Tersimpan secara lokal (Google Drive belum terhubung)"
      };
      store.createItem(SHEET_NAMES.MEDIA_LIBRARY, localMedia);
      return { success: true, localOnly: true, media: localMedia };
    }

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "uploadFile",
        base64Data: base64Data,
        fileName: fileName,
        mimeType: mimeType,
        category: category,
        brandId: brandId,
        contentId: contentId,
        notes: notes,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      const resJson = await response.json();
      if (resJson.status === "success" && resJson.media) {
        store.createItem(SHEET_NAMES.MEDIA_LIBRARY, resJson.media);
        return { success: true, media: resJson.media };
      } else {
        throw new Error(resJson.message || "Gagal mengunggah berkas ke Google Drive.");
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  /**
   * Sinkronisasi antrean offline ke Google Sheets
   */
  async flushQueue() {
    const queue = store.getQueue();
    if (!queue || queue.length === 0) {
      return { success: true, count: 0, message: "Tidak ada data antrean." };
    }
    if (!this.isConfigured()) {
      return { success: false, message: "Google Apps Script belum dikonfigurasi." };
    }
    if (!this.isOnline) {
      return { success: false, message: "Perangkat sedang offline." };
    }

    try {
      const url = this.getGasUrl();
      const payload = {
        action: "batchSync",
        operations: queue,
        token: this.getSecretToken()
      };

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" }
      });

      const resJson = await response.json();
      if (resJson.status === "success") {
        const count = queue.length;
        store.clearQueue();
        console.log(`Berhasil sinkronisasi ${count} operasi antrean offline ke Google Sheets.`);
        return { success: true, count };
      } else {
        throw new Error(resJson.message || "Gagal sinkronisasi batch.");
      }
    } catch (err) {
      console.warn("Gagal flushQueue ke server:", err);
      return { success: false, message: err.message };
    }
  }
}

export const api = new ApiClient();
