/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - GOOGLE APPS SCRIPT REST API
 * File: Code.gs
 * Fungsi: Menangani seluruh operasi CRUD, query database 25 sheets, upload media ke Google Drive,
 *         sinkronisasi batch offline-ke-online, dan integrasi frontend.
 * =========================================================================================
 */

// Token Keamanan Default (bisa diubah di Sheet Settings)
const DEFAULT_SECRET_TOKEN = "PLANNER_SECRET_TOKEN_2026";

/**
 * Endpoint GET: Membaca data dari 25 Sheets Google Database
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ping";
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "ping") {
      return jsonResponse({
        status: "success",
        message: "Google Apps Script REST API 'ALL IN ONE CONTENT CREATOR PLANNER' Aktif & Siap Digunakan!",
        spreadsheetName: ss.getName(),
        spreadsheetId: ss.getId(),
        timestamp: new Date().toISOString()
      });
    }

    if (action === "readAll") {
      const sheets = ss.getSheets();
      const allData = {};

      sheets.forEach(sheet => {
        const sheetName = sheet.getName();
        allData[sheetName] = readSheetAsObjects(sheet);
      });

      return jsonResponse({
        status: "success",
        data: allData,
        timestamp: new Date().toISOString()
      });
    }

    if (action === "readSheet") {
      const sheetName = e.parameter.sheet;
      if (!sheetName) throw new Error("Parameter 'sheet' wajib diisi.");

      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet '" + sheetName + "' tidak ditemukan di spreadsheet.");

      const rows = readSheetAsObjects(sheet);
      return jsonResponse({
        status: "success",
        sheet: sheetName,
        total: rows.length,
        data: rows
      });
    }

    throw new Error("Action GET tidak dikenali: " + action);
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.message || error.toString()
    });
  }
}

/**
 * Endpoint POST: Menangani Create, Update, Delete, Upload Media ke Google Drive, dan Batch Sync
 */
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      throw new Error("Payload request POST kosong.");
    }

    const action = payload.action;
    const sheetName = payload.sheet;
    const token = payload.token || "";

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configuredToken = getConfiguredSecretToken(ss);
    if (configuredToken && token && token !== configuredToken) {
      return jsonResponse({
        status: "error",
        message: "Akses Ditolak: Secret Token keamanan tidak cocok."
      });
    }

    // 1. CREATE
    if (action === "create") {
      if (!sheetName) throw new Error("Parameter 'sheet' wajib diisi untuk create.");
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet '" + sheetName + "' tidak ditemukan.");

      const item = payload.item || {};
      const createdItem = insertRowObject(sheet, item);
      return jsonResponse({
        status: "success",
        action: "create",
        sheet: sheetName,
        item: createdItem
      });
    }

    // 2. UPDATE
    if (action === "update") {
      if (!sheetName) throw new Error("Parameter 'sheet' wajib diisi untuk update.");
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet '" + sheetName + "' tidak ditemukan.");

      const item = payload.item || {};
      const id = payload.id || getEntityPrimaryId(item);
      if (!id) throw new Error("ID / Primary Key tidak ditemukan pada item untuk update.");

      const updatedItem = updateRowObject(sheet, id, item);
      return jsonResponse({
        status: "success",
        action: "update",
        sheet: sheetName,
        item: updatedItem
      });
    }

    // 3. DELETE
    if (action === "delete") {
      if (!sheetName) throw new Error("Parameter 'sheet' wajib diisi untuk delete.");
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) throw new Error("Sheet '" + sheetName + "' tidak ditemukan.");

      const id = payload.id;
      if (!id) throw new Error("ID wajib disertakan untuk delete.");

      deleteRowObject(sheet, id);
      return jsonResponse({
        status: "success",
        action: "delete",
        sheet: sheetName,
        id: id
      });
    }

    // 4. UPLOAD MEDIA TO GOOGLE DRIVE
    if (action === "uploadFile") {
      const base64Data = payload.base64Data;
      const fileName = payload.fileName || ("Media_" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd-HHmmss"));
      const mimeType = payload.mimeType || "application/octet-stream";
      const folderId = payload.folderId || getDriveFolderId(ss);
      const category = payload.category || "General";
      const brandId = payload.brandId || "";
      const contentId = payload.contentId || "";
      const notes = payload.notes || "";

      if (!base64Data) throw new Error("Data base64 file wajib disertakan.");

      const mediaRecord = saveFileToDrive(base64Data, fileName, mimeType, folderId, category, brandId, contentId, notes, ss);
      return jsonResponse({
        status: "success",
        action: "uploadFile",
        media: mediaRecord
      });
    }

    // 5. BATCH SYNC
    if (action === "batchSync") {
      const operations = payload.operations || [];
      const results = [];

      operations.forEach((op, idx) => {
        try {
          const targetSheet = ss.getSheetByName(op.sheet);
          if (!targetSheet) throw new Error("Sheet '" + op.sheet + "' tidak ditemukan.");

          if (op.action === "create") {
            const res = insertRowObject(targetSheet, op.item);
            results.push({ index: idx, status: "success", action: "create", item: res });
          } else if (op.action === "update") {
            const id = op.id || getEntityPrimaryId(op.item);
            const res = updateRowObject(targetSheet, id, op.item);
            results.push({ index: idx, status: "success", action: "update", item: res });
          } else if (op.action === "delete") {
            deleteRowObject(targetSheet, op.id);
            results.push({ index: idx, status: "success", action: "delete", id: op.id });
          }
        } catch (opErr) {
          results.push({ index: idx, status: "error", message: opErr.message });
        }
      });

      return jsonResponse({
        status: "success",
        action: "batchSync",
        total: operations.length,
        results: results
      });
    }

    throw new Error("Action POST tidak dikenali: " + action);
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.message || error.toString()
    });
  }
}

/**
 * Helper: Mengonversi baris sheet menjadi array of objects berdasarkan header
 */
function readSheetAsObjects(sheet) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (lastRow <= 1 || lastCol < 1) return [];

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  return data.map((row, rowIndex) => {
    const obj = { _rowIndex: rowIndex + 2 };
    headers.forEach((header, colIndex) => {
      let val = row[colIndex];
      if (val instanceof Date) {
        val = val.toISOString();
      }
      obj[header] = val;
    });
    return obj;
  });
}

/**
 * Helper: Menyisipkan baris baru ke dalam sheet sesuai header
 */
function insertRowObject(sheet, item) {
  const lastCol = sheet.getLastColumn();
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const pkField = headers[0]; // Kolom pertama selalu primary key

  // Generate ID otomatis jika kosong
  if ((!item[pkField] || item[pkField] === "") && pkField !== "key") {
    const prefix = getSheetPrefix(sheet.getName());
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    item[pkField] = prefix + "-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd") + "-" + randSuffix;
  }

  // Auto timestamps
  if (headers.includes("created_at") && !item.created_at) {
    item.created_at = new Date().toISOString();
  }
  if (headers.includes("updated_at")) {
    item.updated_at = new Date().toISOString();
  }

  const rowValues = headers.map(header => {
    let val = item[header];
    if (val === undefined || val === null) return "";
    if (typeof val === "object") return JSON.stringify(val);
    return val;
  });

  sheet.appendRow(rowValues);
  item._rowIndex = sheet.getLastRow();
  return item;
}

/**
 * Helper: Memperbarui baris berdasarkan Primary Key
 */
function updateRowObject(sheet, id, item) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow <= 1) throw new Error("Sheet kosong.");

  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const data = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  const pkIndex = 0; // Kolom 0 adalah Primary Key di seluruh 25 sheets

  let targetRowIndex = -1;
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][pkIndex]).trim() === String(id).trim()) {
      targetRowIndex = i + 2;
      break;
    }
  }

  if (targetRowIndex === -1) {
    throw new Error("Data dengan ID '" + id + "' tidak ditemukan di sheet " + sheet.getName());
  }

  if (headers.includes("updated_at")) {
    item.updated_at = new Date().toISOString();
  }

  headers.forEach((header, colIndex) => {
    if (item[header] !== undefined) {
      let val = item[header];
      if (typeof val === "object" && val !== null) val = JSON.stringify(val);
      sheet.getRange(targetRowIndex, colIndex + 1).setValue(val);
    }
  });

  item._rowIndex = targetRowIndex;
  return item;
}

/**
 * Helper: Menghapus baris berdasarkan Primary Key
 */
function deleteRowObject(sheet, id) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  if (lastRow <= 1) throw new Error("Sheet kosong.");

  const data = sheet.getRange(2, 1, lastRow - 1, 1).getValues();

  for (let i = 0; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(id).trim()) {
      sheet.deleteRow(i + 2);
      return true;
    }
  }

  throw new Error("Data dengan ID '" + id + "' tidak ditemukan untuk dihapus.");
}

/**
 * Helper: Menyimpan file Base64 ke Google Drive dan mencatat metadata di sheet Media_Library
 */
function saveFileToDrive(base64Data, fileName, mimeType, folderId, category, brandId, contentId, notes, ss) {
  let targetFolder;
  if (folderId) {
    try {
      targetFolder = DriveApp.getFolderById(folderId);
    } catch (e) {
      targetFolder = DriveApp.getRootFolder();
    }
  } else {
    targetFolder = DriveApp.getRootFolder();
  }

  const cleanBase64 = base64Data.replace(/^data:([A-Za-z-+\/]+);base64,/, "");
  const decodedBytes = Utilities.base64Decode(cleanBase64);
  const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);

  const file = targetFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const mediaItem = {
    media_id: "MED-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd-HHmmss"),
    file_name: fileName,
    file_type: fileName.split('.').pop().toUpperCase(),
    category: category,
    brand_id: brandId,
    content_id: contentId,
    drive_file_id: file.getId(),
    file_url: file.getUrl(),
    version: "v1",
    upload_date: Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd"),
    notes: notes
  };

  const mediaSheet = ss.getSheetByName("Media_Library");
  if (mediaSheet) {
    insertRowObject(mediaSheet, mediaItem);
  }

  return mediaItem;
}

/**
 * Helper: Mendapatkan Primary ID dari suatu entitas
 */
function getEntityPrimaryId(item) {
  if (!item) return "";
  return item.id || item.user_id || item.brand_id || item.client_id || item.project_id ||
         item.campaign_id || item.account_id || item.content_id || item.task_id ||
         item.subtask_id || item.calendar_id || item.script_id || item.production_id ||
         item.revision_id || item.publication_id || item.analytics_id || item.media_id ||
         item.reference_id || item.time_id || item.income_id || item.expense_id ||
         item.invoice_id || item.payment_id || item.target_id || item.notification_id || item.key;
}

/**
 * Helper: Ambil token rahasia dari Sheet Settings
 */
function getConfiguredSecretToken(ss) {
  try {
    const settingsSheet = ss.getSheetByName("Settings");
    if (!settingsSheet) return DEFAULT_SECRET_TOKEN;
    const data = settingsSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === "secret_token") {
        return data[i][1] || DEFAULT_SECRET_TOKEN;
      }
    }
  } catch (e) {}
  return DEFAULT_SECRET_TOKEN;
}

/**
 * Helper: Ambil Folder ID Google Drive dari Settings
 */
function getDriveFolderId(ss) {
  try {
    const settingsSheet = ss.getSheetByName("Settings");
    if (!settingsSheet) return "";
    const data = settingsSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === "drive_root_folder_id") {
        return data[i][1] || "";
      }
    }
  } catch (e) {}
  return "";
}

/**
 * Helper: Prefix ID per Sheet (25 Sheets Terdaftar)
 */
function getSheetPrefix(sheetName) {
  const map = {
    Users: "USR",
    Brands: "BRD",
    Clients: "CLI",
    Projects: "PRJ",
    Campaigns: "CMP",
    Social_Accounts: "ACC",
    Content_Planning: "CNT",
    Content_Tasks: "TSK",
    Content_Subtasks: "SUB",
    Content_Calendar: "CAL",
    Content_Scripts: "SCP",
    Content_Production: "PRD",
    Content_Revisions: "REV",
    Content_Publications: "PUB",
    Content_Analytics: "ANL",
    Media_Library: "MED",
    References: "REF",
    Time_Tracking: "TIM",
    Income: "INC",
    Expenses: "EXP",
    Invoices: "INV",
    Payments: "PAY",
    Targets: "TGT",
    Notifications: "NOT",
    Settings: "SET"
  };
  return map[sheetName] || "REC";
}

/**
 * Helper: Format output JSON dengan CORS Header terbuka
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
