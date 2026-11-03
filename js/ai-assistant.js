/**
 * =========================================================================================
 * ALL IN ONE BUSINESS & CONTENT PLANNER - AI ASSISTANT MODULE
 * File: ai-assistant.js
 * Fungsi: Generator otomatis ide konten, formula hook video 3 detik, skrip video, caption & hashtag,
 *         serta analisis strategi bisnis cerdas dengan persetujuan pengguna.
 * =========================================================================================
 */

import { store } from "./store.js";
import { SHEET_NAMES } from "./config.js";

export class AiAssistant {
  /**
   * 1. Generator Formula Hook Video 3 Detik Pertama
   */
  static generateViralHooks(topic, targetAudience = "Umum", platform = "TikTok") {
    const templates = [
      {
        type: "Shocking & Curiosity (Rasa Penasaran)",
        hook: `Stop lakuin ini kalau kamu gak mau ${topic} kamu berantakan total!`,
        visual: "Ekspresi kaget sambil menggelengkan kepala, zoom in cepat ke wajah.",
        audio: "Serius deh, masih banyak banget yang belum sadar sama kesalahan fatal ini."
      },
      {
        type: "Contrarian / Melawan Arus",
        hook: `Semua orang bilang ${topic} itu susah, padahal rahasianya cuma 1 trik simpel ini!`,
        visual: "Memegang produk/buku catatan sambil tersenyum percaya diri.",
        audio: "Jangan mau dibohongin, kamu gak butuh modal jutaan buat mulai ini."
      },
      {
        type: "Social Proof & Hasil Nyata",
        hook: `Aku kaget banget! Dalam 14 hari coba trik ${topic} ini, hasilnya langsung kerasa!`,
        visual: "Menunjukkan layar HP / foto perbandingan sebelum dan sesudah (*before-after*).",
        audio: "Ini bukti nyata tanpa edit, dengerin baik-baik sampai detik terakhir ya."
      },
      {
        type: "Tantangan & Call-Out Spesifik",
        hook: `Khusus buat ${targetAudience} yang lagi bingung soal ${topic}, tonton video ini 30 detik aja!`,
        visual: "Menunjuk jari ke arah layar kamera dengan teks bold besar di layar.",
        audio: "Aku rangkum 3 langkah praktis yang bisa langsung kamu praktekkin hari ini."
      }
    ];

    return templates;
  }

  /**
   * 2. Generator Draft Naskah Video Lengkap (Scene by Scene)
   */
  static generateVideoScript(topic, goal = "Sales Produk", productName = "Produk Unggulan") {
    return {
      title: `Draft Naskah: Rahasia ${topic}`,
      hook_visual: "Wajah kaget memegang botol produk menghadap ke kamera dengan lighting terang.",
      hook_audio: `Beneran deh, siapa yang nyangka rahasia ${topic} ternyata ada di produk sekecil ini?`,
      body_content: `[Detik 04-10: Masalah Utama]\n"Pernah gak sih ngerasa udah coba berbagai cara tapi hasilnya nihil? Masalahnya bukan di kamu, tapi formulanya yang kurang pas."\n\n[Detik 11-22: Solusi & Keunggulan]\n"Kenapa ${productName} ini beda? Karena mengandung bahan aktif konsentrasi tinggi yang langsung bekerja menyerap tanpa rasa lengket."\n\n[Detik 23-30: Call To Action]\n"Khusus hari ini lagi ada promo diskon dan gratis ongkir. Jangan sampai kehabisan ya!"`,
      cta: `Klik keranjang kuning di pojok kiri bawah sekarang sebelum kehabisan diskonnya!`,
      caption_draft: `Gak nyangka ${topic} bisa segampang ini kalau pakai cara yang tepat. Save video ini biar gak lupa ya!`,
      hashtags: `#${topic.replace(/\s+/g, "").toLowerCase()} #tipsbisnis #racuntiktok #racunshopee #glowingskin`
    };
  }

  /**
   * 3. Generator Caption & Hashtag Bundles
   */
  static generateCaptionAndHashtags(topic, tone = "Edukasi & Ramah") {
    const hashtags = [
      `#${topic.replace(/\s+/g, "").toLowerCase()}`,
      "#tipspraktis",
      "#rekomendasi",
      "#fyp",
      "#trendingindonesia",
      "#edukasibisnis",
      "#contentcreator"
    ].join(" ");

    const caption = `Ternyata banyak yang belum tahu cara mengoptimalkan ${topic} dengan efektif!\n\n` +
      `Catat 3 poin penting ini:\n` +
      `1. Konsistensi waktu dan eksekusi.\n` +
      `2. Gunakan alat bantu yang tepat.\n` +
      `3. Pantau evaluasi mingguan.\n\n` +
      `Kalian tim yang udah coba atau baru mau mulai nih? Tulis di kolom komentar ya! 👇\n\n${hashtags}`;

    return { caption, hashtags };
  }

  /**
   * 4. Analisis Bisnis & Rekomendasi Pertumbuhan Cerdas
   */
  static analyzeBusinessHealth() {
    const summary = store.getAnalyticsSummary();
    const insights = [];

    // Evaluasi Omzet vs Target
    if (summary.omzetPct >= 80) {
      insights.push({
        status: "success",
        category: "Penjualan",
        text: `Target omzet tercapai ${summary.omzetPct}% (On Track). Pertahankan performa dengan kampanye retargeting di Shopee & TikTok.`
      });
    } else {
      insights.push({
        status: "warning",
        category: "Penjualan",
        text: `Realisasi omzet baru ${summary.omzetPct}%. Disarankan meluncurkan promo bundling atau meningkatkan frekuensi live streaming.`
      });
    }

    // Evaluasi Stok Rendah
    if (summary.lowStockProducts > 0) {
      insights.push({
        status: "danger",
        category: "Inventori",
        text: `Perhatian: Terdapat ${summary.lowStockProducts} produk dengan stok di bawah batas minimal! Segera lakukan pemesanan restock ke supplier.`
      });
    }

    // Evaluasi Konten
    if (summary.publishedContent < 10) {
      insights.push({
        status: "info",
        category: "Konten Creator",
        text: `Volume konten bulan ini baru ${summary.publishedContent} video. Naikkan kecepatan editing agar rasio posting minimal 1 konten per hari.`
      });
    }

    // Evaluasi Tugas Terlambat
    if (summary.overdueTasks > 0) {
      insights.push({
        status: "warning",
        category: "Manajemen Tugas",
        text: `Ada ${summary.overdueTasks} tugas yang melewati deadline. Delegasikan atau jadwalkan ulang prioritas hari ini.`
      });
    }

    return insights;
  }
}
