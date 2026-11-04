/**
 * =========================================================================================
 * ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - VIEW: MEDIA & REFERENCES
 * Modul 08 (Media Library) & Modul 18 (Research & References)
 * File: js/views/media.js
 * =========================================================================================
 */

import { store } from "../store.js";
import { auth } from "../auth.js";
import { api } from "../api.js";
import { SHEET_NAMES, SOCIAL_PLATFORMS } from "../config.js";

let activeMediaTab = "library"; // 'library' or 'references'
let mediaSearch = "";
let selectedMediaCategory = "ALL";

export function renderMedia(container) {
  const mediaItems = store.getItems(SHEET_NAMES.MEDIA_LIBRARY);
  const references = store.getItems(SHEET_NAMES.REFERENCES);
  const brands = store.getItems(SHEET_NAMES.BRANDS);
  const contents = store.getItems(SHEET_NAMES.CONTENT_PLANNING);

  // Filter Media
  const filteredMedia = mediaItems.filter(m => {
    const matchSearch = mediaSearch === "" ||
      (m.file_name || "").toLowerCase().includes(mediaSearch.toLowerCase()) ||
      (m.notes || "").toLowerCase().includes(mediaSearch.toLowerCase());
    const matchCat = selectedMediaCategory === "ALL" || m.category === selectedMediaCategory;
    return matchSearch && matchCat;
  });

  // Filter References
  const filteredRefs = references.filter(r => {
    return mediaSearch === "" ||
      (r.reference_title || "").toLowerCase().includes(mediaSearch.toLowerCase()) ||
      (r.content_idea || "").toLowerCase().includes(mediaSearch.toLowerCase()) ||
      (r.notes || "").toLowerCase().includes(mediaSearch.toLowerCase());
  });

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Top Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Modul 08 • 18</span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs font-bold text-slate-600">Media & Riset</span>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight">Media Library & Inspirasi Riset</h1>
          <p class="text-xs text-slate-500 mt-0.5">Penyimpanan aset media digital Google Drive dan bank referensi ide konten viral.</p>
        </div>

        <div class="flex items-center gap-2.5">
          <button id="btn-upload-media" class="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span id="btn-media-action-label">+ Upload Media Baru</span>
          </button>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div class="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button id="tab-media-library" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeMediaTab === 'library' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>📁</span> <span>Media Library (${mediaItems.length})</span>
        </button>
        <button id="tab-media-references" class="px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${activeMediaTab === 'references' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}">
          <span>💡</span> <span>Riset & Inspirasi (${references.length})</span>
        </button>
      </div>

      <!-- Search & Filters Toolbar -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div class="flex-1 min-w-[240px] relative">
          <svg class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" id="media-search-input" value="${mediaSearch}" placeholder="Cari nama berkas, tagar, catatan referensi..." class="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
        </div>

        ${activeMediaTab === "library" ? `
          <select id="media-filter-category" class="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 outline-none">
            <option value="ALL" ${selectedMediaCategory === 'ALL' ? 'selected' : ''}>Semua Kategori Media</option>
            <option value="Raw Footage" ${selectedMediaCategory === 'Raw Footage' ? 'selected' : ''}>Raw Footage</option>
            <option value="Brand Asset" ${selectedMediaCategory === 'Brand Asset' ? 'selected' : ''}>Brand Asset / Guidelines</option>
            <option value="Music & SFX" ${selectedMediaCategory === 'Music & SFX' ? 'selected' : ''}>Music & SFX</option>
            <option value="Final Video" ${selectedMediaCategory === 'Final Video' ? 'selected' : ''}>Final Video</option>
            <option value="General" ${selectedMediaCategory === 'General' ? 'selected' : ''}>General</option>
          </select>
        ` : ''}
      </div>

      <!-- Tab Content Area -->
      <div id="media-tab-content">
        ${activeMediaTab === "library" ? renderMediaGrid(filteredMedia) : renderReferencesGrid(filteredRefs)}
      </div>
    </div>
  `;

  setupMediaListeners(container, brands, contents);
}

function renderMediaGrid(items) {
  if (items.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">📁</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada berkas media tersimpan</div>
        <div class="text-xs text-slate-500 mt-1">Upload foto produk, rekaman video, atau tautkan folder Google Drive Anda.</div>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${items.map(m => {
        const brandName = store.getBrandName(m.brand_id);
        const isImage = (m.file_type || '').match(/(JPG|JPEG|PNG|WEBP|GIF)/i);

        return `
          <div class="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden hover:border-blue-400 hover:shadow-xs transition flex flex-col justify-between group">
            <!-- Thumbnail / Preview Area -->
            <div class="h-36 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              ${(isImage && m.file_url) ? `
                <img src="${m.file_url}" alt="${m.file_name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
              ` : `
                <div class="flex flex-col items-center justify-center text-slate-400">
                  <span class="text-3xl mb-1">${getFileIcon(m.file_type)}</span>
                  <span class="text-[10px] font-mono font-bold uppercase">${m.file_type || 'FILE'}</span>
                </div>
              `}

              <!-- Category Badge -->
              <span class="absolute top-2 left-2 bg-slate-900/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                ${m.category || 'Asset'}
              </span>
            </div>

            <!-- Details -->
            <div class="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="font-bold text-xs text-slate-900 line-clamp-1 truncate" title="${m.file_name}">${m.file_name}</h4>
                <div class="text-[10px] text-slate-400 flex items-center justify-between mt-1">
                  <span>🏢 ${brandName}</span>
                  <span>📅 ${m.upload_date || '-'}</span>
                </div>
                ${m.notes ? `<p class="text-[11px] text-slate-500 mt-1 line-clamp-2 italic">"${m.notes}"</p>` : ''}
              </div>

              <!-- Action Links -->
              <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                ${m.file_url ? `
                  <a href="${m.file_url}" target="_blank" class="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <span>Lihat / Buka</span> ↗
                  </a>
                ` : `<span class="text-slate-400 text-[10px]">Tersimpan Lokal</span>`}

                <div class="flex items-center gap-2">
                  <button class="font-bold text-blue-600 hover:text-blue-800 text-xs" onclick="window.openEditMediaModal('${m.media_id}')">
                    Edit
                  </button>
                  ${auth.isAdminOrOwner() ? `
                    <button class="font-bold text-slate-400 hover:text-rose-600 text-xs" onclick="window.deleteMediaItem('${m.media_id}')">
                      Hapus
                    </button>
                  ` : ''}
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderReferencesGrid(refs) {
  if (refs.length === 0) {
    return `
      <div class="bg-white p-12 text-center rounded-2xl border border-slate-200">
        <div class="text-3xl mb-2">💡</div>
        <div class="font-bold text-slate-800 text-sm">Belum ada catatan riset & inspirasi</div>
        <div class="text-xs text-slate-500 mt-1">Simpan referensi video viral, teknik hook, atau angle konten kompetitor.</div>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${refs.map(r => {
        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 hover:border-blue-400 transition flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">${r.platform || 'General'}</span>
                <span class="text-[10px] font-semibold text-slate-400">${r.category || 'Hook Idea'}</span>
              </div>

              ${r.screenshot_link ? `
                <div class="h-32 rounded-xl overflow-hidden bg-slate-100">
                  <img src="${r.screenshot_link}" alt="${r.reference_title}" class="w-full h-full object-cover">
                </div>
              ` : ''}

              <div>
                <h3 class="font-extrabold text-sm text-slate-900">${r.reference_title}</h3>
                ${r.content_idea ? `<p class="text-xs text-slate-600 mt-1">${r.content_idea}</p>` : ''}
              </div>

              ${r.notes ? `
                <div class="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 italic">
                  💡 Catatan: "${r.notes}"
                </div>
              ` : ''}
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
              ${r.reference_url ? `
                <a href="${r.reference_url}" target="_blank" class="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <span>Buka Link Referensi</span> ↗
                </a>
              ` : '<span></span>'}

              <div class="space-x-2">
                <button class="text-xs font-bold text-emerald-600 hover:text-emerald-800" onclick="window.convertRefToIdea('${r.reference_id}')" title="Buat ide konten dari referensi ini">
                  ⚡ Jadi Ide
                </button>
                <button class="text-xs font-bold text-blue-600 hover:text-blue-800" onclick="window.openEditReferenceModal('${r.reference_id}')">
                  Edit
                </button>
                ${auth.isAdminOrOwner() ? `
                  <button class="text-xs font-bold text-slate-400 hover:text-rose-600" onclick="window.deleteReference('${r.reference_id}')">
                    Hapus
                  </button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getFileIcon(ext = "") {
  ext = ext.toUpperCase();
  if (["JPG", "JPEG", "PNG", "WEBP"].includes(ext)) return "🖼️";
  if (["MP4", "MOV", "AVI", "MKV"].includes(ext)) return "🎥";
  if (["MP3", "WAV", "AAC"].includes(ext)) return "🎵";
  if (["PDF", "DOC", "DOCX"].includes(ext)) return "📄";
  return "📦";
}

function setupMediaListeners(container, brands, contents) {
  // Tabs
  document.getElementById("tab-media-library")?.addEventListener("click", () => {
    activeMediaTab = "library";
    renderMedia(container);
  });
  document.getElementById("tab-media-references")?.addEventListener("click", () => {
    activeMediaTab = "references";
    renderMedia(container);
  });

  // Action button label
  const btn = document.getElementById("btn-upload-media");
  const label = document.getElementById("btn-media-action-label");
  if (label) {
    label.innerText = activeMediaTab === "library" ? "+ Upload Media / Berkas" : "+ Tambah Inspirasi Riset";
  }

  btn?.addEventListener("click", () => {
    if (activeMediaTab === "library") {
      openUploadMediaModal(brands, contents);
    } else {
      openReferenceModal(null, contents);
    }
  });

  // Search & Filters
  document.getElementById("media-search-input")?.addEventListener("input", (e) => {
    mediaSearch = e.target.value;
    renderMedia(container);
  });
  document.getElementById("media-filter-category")?.addEventListener("change", (e) => {
    selectedMediaCategory = e.target.value;
    renderMedia(container);
  });

  // Global functions
  window.openEditMediaModal = (mediaId) => {
    const m = store.getItemById(SHEET_NAMES.MEDIA_LIBRARY, mediaId);
    if (m) openUploadMediaModal(brands, contents, m);
  };

  window.openEditReferenceModal = (refId) => {
    const r = store.getItemById(SHEET_NAMES.REFERENCES, refId);
    if (r) openReferenceModal(r, contents);
  };

  window.deleteMediaItem = (mediaId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus berkas media.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus berkas media.");
      return;
    }
    if (confirm("Hapus berkas media ini dari daftar perpustakaan?")) {
      store.deleteItem(SHEET_NAMES.MEDIA_LIBRARY, mediaId);
      if (window.showToast) window.showToast("🗑️ Berkas media berhasil dihapus.", "info");
      renderMedia(container);
    }
  };

  window.deleteReference = (refId) => {
    if (!auth.isAdminOrOwner()) {
      if (window.showToast) window.showToast("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan riset referensi.", "error");
      else alert("⛔ Akses Terbatas: Hanya Owner dan Admin yang memiliki izin untuk menghapus catatan riset referensi.");
      return;
    }
    if (confirm("Hapus catatan referensi inspirasi ini?")) {
      store.deleteItem(SHEET_NAMES.REFERENCES, refId);
      if (window.showToast) window.showToast("🗑️ Inspirasi referensi berhasil dihapus.", "info");
      renderMedia(container);
    }
  };

  window.convertRefToIdea = (refId) => {
    const ref = store.getItemById(SHEET_NAMES.REFERENCES, refId);
    if (!ref) return;

    store.createItem(SHEET_NAMES.CONTENT_PLANNING, {
      content_title: `Ide dari Referensi: ${ref.reference_title}`,
      platform: ref.platform || "TikTok",
      content_pillar: "Inspiration",
      content_format: "Short Video (Vertical 9:16)",
      status: "Idea",
      content_idea: ref.content_idea || "",
      notes: `Referensi: ${ref.reference_url || '-'} | ${ref.notes || ''}`
    });

    alert("✅ Berhasil menambahkan ide konten baru dari referensi ini!");
    window.location.hash = "#content";
  };
}

function openUploadMediaModal(brands = [], contents = [], item = null) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!item;
  const data = item || {
    file_name: "",
    category: "Raw Footage",
    brand_id: "",
    file_url: "",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Informasi Media' : 'Upload Berkas / Catat Media Drive'}
            </h3>
            <p class="text-xs text-slate-500">${isEdit ? 'Perbarui detail nama, kategori, atau tautan berkas' : 'Unggah berkas langsung ke Google Drive atau simpan tautan aset'}</p>
          </div>
          <button id="modal-upload-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="upload-media-form" class="p-6 space-y-4 text-xs">
          ${!isEdit ? `
            <!-- File Picker -->
            <div>
              <label class="block font-bold text-slate-700 mb-1">Pilih File dari Perangkat (Opsional)</label>
              <input type="file" id="form-media-file" class="w-full p-2 border border-slate-200 rounded-xl text-xs bg-slate-50">
              <p class="text-[10px] text-slate-400 mt-1">File akan dienkode Base64 dan disimpan ke Google Drive.</p>
            </div>
          ` : ''}

          <!-- File Name -->
          <div>
            <label class="block font-bold text-slate-700 mb-1">Nama Berkas <span class="text-rose-500">*</span></label>
            <input type="text" id="form-media-name" required value="${data.file_name}" placeholder="Contoh: B-Roll_Botol_Serum_Slowmo_4K.mp4" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Kategori Berkas</label>
              <select id="form-media-cat" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="Raw Footage" ${data.category === 'Raw Footage' ? 'selected' : ''}>Raw Footage</option>
                <option value="Brand Asset" ${data.category === 'Brand Asset' ? 'selected' : ''}>Brand Asset / Logo</option>
                <option value="Music & SFX" ${data.category === 'Music & SFX' ? 'selected' : ''}>Music & SFX</option>
                <option value="Final Video" ${data.category === 'Final Video' ? 'selected' : ''}>Final Video</option>
                <option value="General" ${data.category === 'General' ? 'selected' : ''}>General</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Terkait Brand</label>
              <select id="form-media-brand" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                <option value="">-- Tanpa Brand --</option>
                ${brands.map(b => `<option value="${b.brand_id}" ${data.brand_id === b.brand_id ? 'selected' : ''}>${b.brand_name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Tautan Google Drive / Cloud URL</label>
            <input type="url" id="form-media-url" value="${data.file_url || ''}" placeholder="https://drive.google.com/file/d/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
            <input type="text" id="form-media-notes" value="${data.notes || ''}" placeholder="Resolusi 4K, 60fps, pencahayaan studio" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-upload-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Media</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-upload-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" id="btn-submit-upload" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                ${isEdit ? 'Simpan Perubahan' : 'Simpan Berkas'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-upload-close")?.addEventListener("click", close);
  document.getElementById("modal-upload-cancel")?.addEventListener("click", close);

  document.getElementById("modal-upload-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus berkas media ini dari daftar perpustakaan?")) {
      store.deleteItem(SHEET_NAMES.MEDIA_LIBRARY, item.media_id);
      if (window.showToast) window.showToast("🗑️ Berkas media berhasil dihapus.", "info");
      close();
      const main = document.getElementById("main-view-container");
      if (main) renderMedia(main);
    }
  });

  // Auto-fill file name when file is selected
  document.getElementById("form-media-file")?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById("form-media-name").value = file.name;
    }
  });

  document.getElementById("upload-media-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("btn-submit-upload");
    submitBtn.disabled = true;
    submitBtn.innerText = isEdit ? "Menyimpan..." : "Mengunggah...";

    const fileInput = document.getElementById("form-media-file");
    const fileName = document.getElementById("form-media-name").value.trim();
    const category = document.getElementById("form-media-cat").value;
    const brandId = document.getElementById("form-media-brand").value;
    const manualUrl = document.getElementById("form-media-url").value.trim();
    const notes = document.getElementById("form-media-notes").value.trim();

    if (isEdit) {
      store.updateItem(SHEET_NAMES.MEDIA_LIBRARY, item.media_id, {
        file_name: fileName,
        file_type: fileName.split(".").pop().toUpperCase(),
        category: category,
        brand_id: brandId,
        file_url: manualUrl,
        notes: notes
      });
      if (window.showToast) window.showToast("✅ Berkas media berhasil diperbarui!", "success");
      close();
      const main = document.getElementById("main-view-container");
      if (main) renderMedia(main);
    } else if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        await api.uploadMedia(base64, fileName, file.type, category, brandId, "", notes);
        if (window.showToast) window.showToast("✅ Berkas media berhasil diunggah!", "success");
        close();
        const main = document.getElementById("main-view-container");
        if (main) renderMedia(main);
      };
      reader.readAsDataURL(file);
    } else {
      // Manual Link Entry
      store.createItem(SHEET_NAMES.MEDIA_LIBRARY, {
        file_name: fileName,
        file_type: fileName.split(".").pop().toUpperCase(),
        category: category,
        brand_id: brandId,
        file_url: manualUrl,
        version: "v1",
        upload_date: new Date().toISOString().slice(0, 10),
        notes: notes
      });
      if (window.showToast) window.showToast("✅ Berkas media berhasil dicatat!", "success");
      close();
      const main = document.getElementById("main-view-container");
      if (main) renderMedia(main);
    }
  });
}

function openReferenceModal(ref = null, contents = []) {
  const modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) return;

  const isEdit = !!ref;
  const data = ref || {
    reference_title: "",
    reference_url: "",
    platform: "TikTok",
    category: "Hook Idea",
    content_idea: "",
    screenshot_link: "",
    notes: ""
  };

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
      <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        <div class="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">
              ${isEdit ? 'Edit Catatan Riset' : 'Simpan Inspirasi & Referensi Baru'}
            </h3>
            <p class="text-xs text-slate-500">Catat tautan video viral, teknik hook, atau tangkapan layar</p>
          </div>
          <button id="modal-ref-close" class="p-1 rounded text-slate-400 hover:text-slate-700">✕</button>
        </div>

        <form id="ref-form" class="p-6 space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Judul / Konsep Referensi <span class="text-rose-500">*</span></label>
            <input type="text" id="form-ref-title" required value="${data.reference_title}" placeholder="Contoh: Hook Snap Zoom Transisi Cepat" class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Platform Sumber</label>
              <select id="form-ref-platform" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
                ${SOCIAL_PLATFORMS.map(p => `<option value="${p}" ${data.platform === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Kategori Riset</label>
              <input type="text" id="form-ref-cat" value="${data.category || 'Hook Idea'}" placeholder="Visual Hook / Audio Trend" class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">URL / Tautan Konten Referensi</label>
            <input type="url" id="form-ref-url" value="${data.reference_url || ''}" placeholder="https://tiktok.com/@creator/video/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Ide Adaptasi Konten</label>
            <textarea id="form-ref-idea" rows="2" placeholder="Bagaimana ide ini bisa kita modifikasi untuk konten kita sendiri..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">${data.content_idea || ''}</textarea>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">URL Tangkapan Layar (Screenshot)</label>
            <input type="url" id="form-ref-shot" value="${data.screenshot_link || ''}" placeholder="https://images.unsplash.com/..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Catatan Tambahan</label>
            <input type="text" id="form-ref-notes" value="${data.notes || ''}" placeholder="Sound trending, timing transisi 0.3 detik..." class="w-full px-3.5 py-2 rounded-xl border border-slate-200 outline-none">
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between gap-2.5">
            ${isEdit && auth.isAdminOrOwner() ? `
              <button type="button" id="modal-ref-delete" class="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition flex items-center gap-1.5">
                <span>🗑️</span> <span>Hapus Referensi</span>
              </button>
            ` : '<div></div>'}
            <div class="flex items-center gap-2.5">
              <button type="button" id="modal-ref-cancel" class="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition">
                Batal
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition">
                Simpan Referensi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  const close = () => { modalContainer.innerHTML = ""; };
  document.getElementById("modal-ref-close")?.addEventListener("click", close);
  document.getElementById("modal-ref-cancel")?.addEventListener("click", close);

  document.getElementById("modal-ref-delete")?.addEventListener("click", () => {
    if (!auth.isAdminOrOwner()) return;
    if (confirm("Hapus catatan referensi inspirasi ini?")) {
      store.deleteItem(SHEET_NAMES.REFERENCES, ref.reference_id);
      if (window.showToast) window.showToast("🗑️ Inspirasi referensi berhasil dihapus.", "info");
      close();
      const mainContainer = document.getElementById("main-view-container");
      if (mainContainer) renderMedia(mainContainer);
    }
  });

  document.getElementById("ref-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      reference_title: document.getElementById("form-ref-title").value.trim(),
      platform: document.getElementById("form-ref-platform").value,
      category: document.getElementById("form-ref-cat").value.trim(),
      reference_url: document.getElementById("form-ref-url").value.trim(),
      content_idea: document.getElementById("form-ref-idea").value.trim(),
      screenshot_link: document.getElementById("form-ref-shot").value.trim(),
      notes: document.getElementById("form-ref-notes").value.trim(),
      created_date: new Date().toISOString().slice(0, 10)
    };

    if (isEdit) {
      store.updateItem(SHEET_NAMES.REFERENCES, ref.reference_id, payload);
    } else {
      store.createItem(SHEET_NAMES.REFERENCES, payload);
    }

    close();
    const mainContainer = document.getElementById("main-view-container");
    if (mainContainer) renderMedia(mainContainer);
  });
}
