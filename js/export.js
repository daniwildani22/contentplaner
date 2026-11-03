/**
 * =========================================================================================
 * ALL IN ONE BUSINESS & CONTENT PLANNER - EXPORT ENGINE (EXCEL & PDF)
 * File: export.js
 * =========================================================================================
 */

import { store } from "./store.js";
import { SHEET_NAMES } from "./config.js";

export class ExportEngine {
  /**
   * Ekspor satu sheet ke file Excel (.xlsx)
   */
  static exportSheetToExcel(sheetName, filename = null) {
    if (typeof XLSX === "undefined") {
      alert("Library SheetJS (XLSX) sedang dimuat, silakan coba 2 detik lagi.");
      return;
    }

    const data = store.getAll(sheetName);
    if (!data || data.length === 0) {
      alert(`Data pada sheet ${sheetName} masih kosong.`);
      return;
    }

    // Bersihkan field internal jika ada
    const cleanData = data.map(row => {
      const copy = { ...row };
      delete copy._rowIndex;
      return copy;
    });

    const ws = XLSX.utils.json_to_sheet(cleanData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    const outName = filename || `${sheetName}_Report_${new Date().toISOString().split("T")[0]}.xlsx`;
    XLSX.writeFile(wb, outName);
  }

  /**
   * Ekspor seluruh 20 Sheet ke dalam satu file Excel Workbook multi-tab
   */
  static exportCompleteWorkbookToExcel() {
    if (typeof XLSX === "undefined") {
      alert("Library SheetJS sedang dimuat, coba sesaat lagi.");
      return;
    }

    const wb = XLSX.utils.book_new();
    const sheets = Object.values(SHEET_NAMES);

    sheets.forEach(name => {
      const data = store.getAll(name);
      if (data && data.length > 0) {
        const clean = data.map(r => {
          const c = { ...r };
          delete c._rowIndex;
          return c;
        });
        const ws = XLSX.utils.json_to_sheet(clean);
        // Batasi nama sheet max 31 karakter (aturan Excel)
        const safeName = name.slice(0, 30);
        XLSX.utils.book_append_sheet(wb, ws, safeName);
      }
    });

    const dateStr = new Date().toISOString().split("T")[0];
    XLSX.writeFile(wb, `ALL_IN_ONE_BUSINESS_PLANNER_FULL_BACKUP_${dateStr}.xlsx`);
  }

  /**
   * Ekspor Laporan Resmi ke format PDF yang rapi dan profesional
   */
  static exportReportToPdf(reportType = "financial") {
    const summary = store.getAnalyticsSummary();
    const sales = store.getAll(SHEET_NAMES.SALES);
    const finance = store.getAll(SHEET_NAMES.FINANCE);
    const content = store.getAll(SHEET_NAMES.CONTENT_PLANNING);
    const tasks = store.getAll(SHEET_NAMES.TASKS);

    const now = new Date().toLocaleDateString("id-ID", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    // Buat jendela cetak mandiri
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Mohon izinkan pop-up pada browser Anda untuk mencetak laporan PDF.");
      return;
    }

    let reportTitle = "LAPORAN EKSEKUTIF BISNIS & KONTEN";
    let reportContentHtml = "";

    if (reportType === "financial") {
      reportTitle = "LAPORAN KEUANGAN & PENJUALAN (P&L)";
      reportContentHtml = `
        <div style="display:flex; justify-content:space-between; margin-bottom: 24px; gap: 16px;">
          <div style="flex:1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">TOTAL OMZET KOTOR</div>
            <div style="font-size: 18px; font-weight: 700; color: #1e3a8a;">Rp ${summary.totalRevenue.toLocaleString("id-ID")}</div>
          </div>
          <div style="flex:1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc;">
            <div style="font-size: 11px; color: #64748b; font-weight: 600;">TOTAL PENGELUARAN & BIAYA</div>
            <div style="font-size: 18px; font-weight: 700; color: #dc2626;">Rp ${summary.totalPengeluaran.toLocaleString("id-ID")}</div>
          </div>
          <div style="flex:1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #ecfdf5;">
            <div style="font-size: 11px; color: #047857; font-weight: 600;">LABA BERSIH ESTIMASI</div>
            <div style="font-size: 18px; font-weight: 700; color: #059669;">Rp ${summary.netProfit.toLocaleString("id-ID")}</div>
          </div>
        </div>

        <h3 style="font-size: 14px; border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 12px;">DAFTAR TRANSAKSI PENJUALAN TERBARU</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 24px;">
          <thead>
            <tr style="background: #1e3a8a; color: #ffffff;">
              <th style="padding: 6px; text-align: left;">No Pesanan</th>
              <th style="padding: 6px; text-align: left;">Tanggal</th>
              <th style="padding: 6px; text-align: left;">Customer</th>
              <th style="padding: 6px; text-align: center;">Qty</th>
              <th style="padding: 6px; text-align: right;">Total Omzet</th>
              <th style="padding: 6px; text-align: right;">Fee Admin</th>
              <th style="padding: 6px; text-align: right;">Net Revenue</th>
              <th style="padding: 6px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${sales.slice(0, 20).map(s => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 6px;"><b>${s.order_number}</b></td>
                <td style="padding: 6px;">${s.order_date}</td>
                <td style="padding: 6px;">${s.customer_name}</td>
                <td style="padding: 6px; text-align: center;">${s.quantity}</td>
                <td style="padding: 6px; text-align: right;">Rp ${(Number(s.total_amount) || 0).toLocaleString("id-ID")}</td>
                <td style="padding: 6px; text-align: right; color:#dc2626;">Rp ${(Number(s.platform_fee) || 0).toLocaleString("id-ID")}</td>
                <td style="padding: 6px; text-align: right; font-weight:600; color:#059669;">Rp ${(Number(s.net_revenue) || 0).toLocaleString("id-ID")}</td>
                <td style="padding: 6px; text-align: center;">${s.payment_status}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    } else {
      // Content & Tasks Report
      reportTitle = "LAPORAN KONTEN & PRODUKTIVITAS OPERASIONAL";
      reportContentHtml = `
        <div style="display:flex; justify-content:space-between; margin-bottom: 24px; gap: 16px;">
          <div style="flex:1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc;">
            <div style="font-size: 11px; color: #64748b;">TOTAL KONTEN DIPRODUKSI</div>
            <div style="font-size: 18px; font-weight: 700; color: #1e3a8a;">${summary.totalContent} Postingan</div>
          </div>
          <div style="flex:1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc;">
            <div style="font-size: 11px; color: #64748b;">KONTEN TAYANG (LIVE)</div>
            <div style="font-size: 18px; font-weight: 700; color: #059669;">${summary.publishedContent} Konten</div>
          </div>
          <div style="flex:1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #f8fafc;">
            <div style="font-size: 11px; color: #64748b;">TUGAS SELESAI</div>
            <div style="font-size: 18px; font-weight: 700; color: #4f46e5;">${summary.completedTasks} / ${summary.totalTasks} Tugas</div>
          </div>
        </div>

        <h3 style="font-size: 14px; border-bottom: 2px solid #1e3a8a; padding-bottom: 6px; margin-bottom: 12px;">STATUS PIPELINE KONTEN AKTIF</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 24px;">
          <thead>
            <tr style="background: #1e3a8a; color: #ffffff;">
              <th style="padding: 6px; text-align: left;">ID</th>
              <th style="padding: 6px; text-align: left;">Judul Konten</th>
              <th style="padding: 6px; text-align: left;">Platform</th>
              <th style="padding: 6px; text-align: left;">Target Audiens</th>
              <th style="padding: 6px; text-align: center;">Jadwal Tayang</th>
              <th style="padding: 6px; text-align: center;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${content.map(c => `
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 6px;"><b>${c.id}</b></td>
                <td style="padding: 6px;">${c.title}</td>
                <td style="padding: 6px;">${c.platform}</td>
                <td style="padding: 6px;">${c.target_audience || '-'}</td>
                <td style="padding: 6px; text-align: center;">${c.publish_date || '-'}</td>
                <td style="padding: 6px; text-align: center; font-weight: 600;">${c.status}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    const htmlDoc = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${reportTitle}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; padding: 30px; margin: 0; }
          .header { display: flex; justify-content: space-between; border-bottom: 3px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 20px; }
          .brand { font-size: 20px; font-weight: 800; color: #1e3a8a; }
          .meta { font-size: 11px; color: #64748b; text-align: right; }
          .footer { margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 12px; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="brand">ALL IN ONE BUSINESS & CONTENT PLANNER</div>
            <div style="font-size: 12px; font-weight: 600; color: #475569; margin-top: 2px;">${reportTitle}</div>
          </div>
          <div class="meta">
            <div>Dicetak pada: <b>${now}</b></div>
            <div>Sistem: Terintegrasi Google Sheets</div>
          </div>
        </div>

        ${reportContentHtml}

        <div class="footer">
          <div>Dokumen ini dihasilkan secara otomatis oleh sistem ALL IN ONE BUSINESS & CONTENT PLANNER</div>
          <div>Halaman 1 dari 1</div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlDoc);
    printWindow.document.close();
  }
}
