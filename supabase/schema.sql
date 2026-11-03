-- =========================================================================================
-- ALL IN ONE CONTENT CREATOR BUSINESS & CONTENT PLANNER - SUPABASE POSTGRESQL SCHEMA
-- File: supabase/schema.sql
-- Description: Skema lengkap 25 tabel relasional, Realtime Publications, dan Seed Data
-- =========================================================================================

-- Aktifkan UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================================
-- 1. TABEL PENGGUNA & RBAC (PROFILES / USERS)
-- =========================================================================================
CREATE TABLE IF NOT EXISTS users (
  user_id VARCHAR(50) PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) DEFAULT '123',
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  role VARCHAR(50) DEFAULT 'Member / Creator',
  avatar TEXT,
  status VARCHAR(20) DEFAULT 'Active',
  permissions JSONB DEFAULT '["dashboard", "tasks"]'::jsonb,
  bio TEXT,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 2. TABEL MITRA BISNIS (BRANDS & CLIENTS)
-- =========================================================================================
CREATE TABLE IF NOT EXISTS brands (
  brand_id VARCHAR(50) PRIMARY KEY,
  brand_name VARCHAR(150) NOT NULL,
  company_name VARCHAR(200),
  category VARCHAR(100),
  website VARCHAR(255),
  social_media VARCHAR(100),
  contact VARCHAR(150),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
  client_id VARCHAR(50) PRIMARY KEY,
  client_name VARCHAR(150) NOT NULL,
  company VARCHAR(200),
  email VARCHAR(150),
  phone VARCHAR(50),
  address TEXT,
  client_type VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 3. TABEL PROYEK & CAMPAIGN
-- =========================================================================================
CREATE TABLE IF NOT EXISTS projects (
  project_id VARCHAR(50) PRIMARY KEY,
  project_name VARCHAR(200) NOT NULL,
  brand_id VARCHAR(50) REFERENCES brands(brand_id) ON DELETE SET NULL,
  client_id VARCHAR(50) REFERENCES clients(client_id) ON DELETE SET NULL,
  start_date DATE,
  end_date DATE,
  budget NUMERIC(15,2) DEFAULT 0,
  project_status VARCHAR(50) DEFAULT 'Planning',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaigns (
  campaign_id VARCHAR(50) PRIMARY KEY,
  project_id VARCHAR(50) REFERENCES projects(project_id) ON DELETE CASCADE,
  campaign_name VARCHAR(200) NOT NULL,
  objective VARCHAR(100),
  platform VARCHAR(100),
  start_date DATE,
  end_date DATE,
  budget NUMERIC(15,2) DEFAULT 0,
  target_content INT DEFAULT 1,
  status VARCHAR(50) DEFAULT 'Active',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social_accounts (
  account_id VARCHAR(50) PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  account_name VARCHAR(150) NOT NULL,
  handle VARCHAR(100) NOT NULL,
  profile_url VARCHAR(255),
  niche VARCHAR(100),
  followers INT DEFAULT 0,
  target_audience VARCHAR(150),
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 4. TABEL INTI KONTEN (PLANNING, TASKS, SUBTASKS, CALENDAR, SCRIPTS)
-- =========================================================================================
CREATE TABLE IF NOT EXISTS content_planning (
  content_id VARCHAR(50) PRIMARY KEY,
  content_title VARCHAR(255) NOT NULL,
  brand_id VARCHAR(50) REFERENCES brands(brand_id) ON DELETE SET NULL,
  project_id VARCHAR(50) REFERENCES projects(project_id) ON DELETE SET NULL,
  campaign_id VARCHAR(50) REFERENCES campaigns(campaign_id) ON DELETE SET NULL,
  platform VARCHAR(50) NOT NULL,
  content_pillar VARCHAR(100),
  content_category VARCHAR(100),
  target_audience VARCHAR(150),
  content_objective VARCHAR(100),
  content_format VARCHAR(100),
  content_idea TEXT,
  hook_3sec TEXT,
  cta TEXT,
  planned_date DATE,
  status VARCHAR(50) DEFAULT 'Idea',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_tasks (
  task_id VARCHAR(50) PRIMARY KEY,
  task_name VARCHAR(255) NOT NULL,
  content_id VARCHAR(50) REFERENCES content_planning(content_id) ON DELETE CASCADE,
  brand_id VARCHAR(50) REFERENCES brands(brand_id) ON DELETE SET NULL,
  assigned_user VARCHAR(50) REFERENCES users(user_id) ON DELETE SET NULL,
  priority VARCHAR(50) DEFAULT 'Normal',
  status VARCHAR(50) DEFAULT 'To Do',
  deadline TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_subtasks (
  subtask_id VARCHAR(50) PRIMARY KEY,
  task_id VARCHAR(50) REFERENCES content_tasks(task_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_calendar (
  calendar_id VARCHAR(50) PRIMARY KEY,
  content_id VARCHAR(50) REFERENCES content_planning(content_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  shooting_date DATE,
  deadline_date DATE,
  publish_date DATE,
  platform VARCHAR(50),
  status VARCHAR(50) DEFAULT 'Scheduled',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_scripts (
  script_id VARCHAR(50) PRIMARY KEY,
  content_id VARCHAR(50) REFERENCES content_planning(content_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  visual_hook TEXT,
  audio_hook TEXT,
  body_script TEXT,
  cta TEXT,
  hashtags TEXT,
  draft_caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 5. TABEL PRODUKSI, REVISI, PUBLIKASI & ANALITIK
-- =========================================================================================
CREATE TABLE IF NOT EXISTS content_production (
  production_id VARCHAR(50) PRIMARY KEY,
  content_id VARCHAR(50) REFERENCES content_planning(content_id) ON DELETE CASCADE,
  shoot_date DATE,
  location VARCHAR(200),
  crew TEXT,
  camera_checklist JSONB,
  lighting_checklist JSONB,
  audio_checklist JSONB,
  drive_raw_folder TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_revisions (
  revision_id VARCHAR(50) PRIMARY KEY,
  content_id VARCHAR(50) REFERENCES content_planning(content_id) ON DELETE CASCADE,
  version VARCHAR(50) DEFAULT 'v1_draft',
  editor_user VARCHAR(50) REFERENCES users(user_id) ON DELETE SET NULL,
  feedback_notes TEXT,
  revision_status VARCHAR(50) DEFAULT 'Pending Review',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_publications (
  publication_id VARCHAR(50) PRIMARY KEY,
  content_id VARCHAR(50) REFERENCES content_planning(content_id) ON DELETE CASCADE,
  publish_date TIMESTAMPTZ DEFAULT NOW(),
  live_url TEXT,
  platform VARCHAR(50),
  caption_used TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content_analytics (
  analytics_id VARCHAR(50) PRIMARY KEY,
  content_id VARCHAR(50) REFERENCES content_planning(content_id) ON DELETE CASCADE,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  shares INT DEFAULT 0,
  saves INT DEFAULT 0,
  clicks INT DEFAULT 0,
  new_followers INT DEFAULT 0,
  er_percent NUMERIC(5,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 6. TABEL MEDIA & REFERENSI
-- =========================================================================================
CREATE TABLE IF NOT EXISTS media_library (
  media_id VARCHAR(50) PRIMARY KEY,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50),
  file_size VARCHAR(50),
  storage_url TEXT NOT NULL,
  folder_name VARCHAR(100) DEFAULT 'General',
  uploaded_by VARCHAR(50) REFERENCES users(user_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS references_links (
  reference_id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  platform VARCHAR(50),
  link_url TEXT NOT NULL,
  notes TEXT,
  category VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS time_tracking (
  time_id VARCHAR(50) PRIMARY KEY,
  task_id VARCHAR(50) REFERENCES content_tasks(task_id) ON DELETE SET NULL,
  user_id VARCHAR(50) REFERENCES users(user_id) ON DELETE SET NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  duration_seconds INT DEFAULT 0,
  activity_type VARCHAR(100) DEFAULT 'Production',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 7. TABEL KEUANGAN (INCOME, EXPENSES, INVOICES, PAYMENTS)
-- =========================================================================================
CREATE TABLE IF NOT EXISTS invoices (
  invoice_id VARCHAR(50) PRIMARY KEY,
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  client_id VARCHAR(50) REFERENCES clients(client_id) ON DELETE SET NULL,
  project_id VARCHAR(50) REFERENCES projects(project_id) ON DELETE SET NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  total_amount NUMERIC(15,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS income (
  income_id VARCHAR(50) PRIMARY KEY,
  invoice_id VARCHAR(50) REFERENCES invoices(invoice_id) ON DELETE SET NULL,
  client_id VARCHAR(50) REFERENCES clients(client_id) ON DELETE SET NULL,
  brand_id VARCHAR(50) REFERENCES brands(brand_id) ON DELETE SET NULL,
  category VARCHAR(100) DEFAULT 'Brand Deal',
  amount NUMERIC(15,2) DEFAULT 0,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'Bank Transfer',
  status VARCHAR(50) DEFAULT 'Received',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expenses (
  expense_id VARCHAR(50) PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  amount NUMERIC(15,2) DEFAULT 0,
  expense_date DATE NOT NULL,
  paid_to VARCHAR(150),
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  payment_id VARCHAR(50) PRIMARY KEY,
  invoice_id VARCHAR(50) REFERENCES invoices(invoice_id) ON DELETE CASCADE,
  amount NUMERIC(15,2) DEFAULT 0,
  payment_date DATE NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'Bank Transfer',
  proof_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 8. TABEL SASARAN TARGET, NOTIFIKASI & PENGATURAN
-- =========================================================================================
CREATE TABLE IF NOT EXISTS targets (
  target_id VARCHAR(50) PRIMARY KEY,
  period VARCHAR(50) NOT NULL,
  target_type VARCHAR(100) NOT NULL,
  target_value NUMERIC(15,2) DEFAULT 0,
  achieved_value NUMERIC(15,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'On Track',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  notification_id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) REFERENCES users(user_id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  setting_value TEXT,
  category VARCHAR(50) DEFAULT 'General',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================================
-- 9. REALTIME PUBLICATION SETUP (Supabase WebSocket Auto-Sync)
-- =========================================================================================
-- Tambahkan tabel-tabel utama ke publikasi Realtime Supabase
ALTER PUBLICATION supabase_realtime ADD TABLE 
  users,
  content_planning,
  content_tasks,
  content_subtasks,
  content_calendar,
  content_scripts,
  notifications;

-- =========================================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================================
-- Aktifkan RLS dan berikan akses penuh untuk anon & authenticated
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_planning ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_production ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE references_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE income ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Kebijakan Akses Global (Allow All CRUD for App Users)
DO $$
DECLARE
  tbl text;
BEGIN
  FOR tbl IN 
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "Public access policy" ON %I;', tbl);
    EXECUTE format('CREATE POLICY "Public access policy" ON %I FOR ALL USING (true) WITH CHECK (true);', tbl);
  END LOOP;
END $$;

-- =========================================================================================
-- 11. SEED DATA REALISTIS AWAL (INDONESIAN CONTENT CREATOR STUDIO)
-- =========================================================================================
INSERT INTO users (user_id, username, password, name, email, role, avatar, status, permissions, bio)
VALUES
  ('USR-001', 'rian', '123', 'Rian Pratama', 'rian.lead@creatorhub.id', 'Owner', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Active', '["all"]'::jsonb, 'Lead Content Operations & Studio Founder'),
  ('USR-002', 'sarah', '123', 'Sarah Nabila', 'sarah@creatorstudio.id', 'Admin', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Active', '["dashboard", "content", "calendar", "tasks", "production", "media", "reports", "business", "timetracking", "targets", "notifications", "settings"]'::jsonb, 'Studio Operations & Social Media Specialist'),
  ('USR-003', 'fahri', '123', 'Fahri Editor', 'fahri@creatorstudio.id', 'Video Editor', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'Active', '["dashboard", "tasks", "production", "media", "timetracking", "notifications"]'::jsonb, 'Senior Video Editor & Colorist'),
  ('USR-004', 'dimas', '123', 'Dimas Anggara', 'dimas@creatorstudio.id', 'Member / Creator', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'Active', '["dashboard", "content", "calendar", "tasks", "production", "media", "timetracking", "notifications"]'::jsonb, 'Talent Host, Scriptwriter & Camera Op')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO brands (brand_id, brand_name, company_name, category, website, social_media, contact, notes)
VALUES
  ('BRD-001', 'GlowLab Skincare', 'PT Glow Estetika Indonesia', 'Beauty & Skincare', 'https://glowlab.id', '@glowlab.official', 'Dewi (081234567890)', 'Brand partner kontrak Q4 retainers'),
  ('BRD-002', 'TechSphere Gadgets', 'TechSphere Global Ltd', 'Technology', 'https://techsphere.io', '@techsphere.id', 'Fajar (081298765432)', 'Sponsorship video review laptop & TWS'),
  ('BRD-003', 'Kopi Nusantara Co', 'CV Ragam Rasa Indonesia', 'Food & Beverage', 'https://kopinusantara.id', '@kopinusantara.co', 'Irfan (081311223344)', 'Endorsement varian cold brew')
ON CONFLICT (brand_id) DO NOTHING;

INSERT INTO content_planning (content_id, content_title, brand_id, platform, content_pillar, content_format, content_idea, hook_3sec, cta, planned_date, status)
VALUES
  ('CNT-101', 'Ideation & Angle Riset: Lensa 50mm f/1.2 vs 85mm', 'BRD-002', 'YouTube', 'Edukasi Gadget', 'Longform Video', 'Komparasi foto bokeh potret vs street', 'Jangan beli lensa 85mm sebelum nonton ini!', 'Tulis pilihan lensamu di komentar!', '2026-11-15', 'Planned'),
  ('CNT-102', 'Scriptwriting Video Sponsorship Q3 Campaign', 'BRD-001', 'Instagram Reels', 'Sponsorship Review', 'Reels 60 Detik', 'Routine skincare malam sebelum tidur', 'Kulit glowing dalam 7 hari tanpa purging?', 'Cek link di bio diskon 20%', '2026-11-18', 'Planned'),
  ('CNT-103', 'Shooting Studio & B-Roll Macro Unboxing TWS', 'BRD-002', 'TikTok', 'Product Showcase', 'Vertical Short', 'Slow motion macro zoom detail earbud', 'TWS 300 ribuan tapi punya ANC sekelas 2 juta?', 'Klik keranjang kuning sekarang', '2026-11-12', 'In Production')
ON CONFLICT (content_id) DO NOTHING;

INSERT INTO content_tasks (task_id, task_name, content_id, brand_id, assigned_user, priority, status, deadline, notes)
VALUES
  ('TSK-101', 'Ideation & Angle Riset: Lensa 50mm f/1.2 vs 85mm', 'CNT-101', 'BRD-002', 'USR-004', 'Normal', 'To Do', NOW() + INTERVAL '1 day', 'Riset perbandingan optical bokeh'),
  ('TSK-102', 'Scriptwriting Video Sponsorship Q3 Campaign', 'CNT-102', 'BRD-001', 'USR-002', 'High', 'To Do', NOW() + INTERVAL '3 days', 'Selesaikan draft naskah 3 detik hook'),
  ('TSK-103', 'Shooting Studio & B-Roll Macro Unboxing', 'CNT-103', 'BRD-002', 'USR-001', 'Urgent', 'In Progress', NOW() + INTERVAL '2 hours', 'Set pencahayaan studio A neon teal'),
  ('TSK-104', 'Color Grading & Sound Design Video Review TWS', 'CNT-103', 'BRD-002', 'USR-003', 'Urgent', 'In Progress', NOW() + INTERVAL '4 hours', 'Perbaiki audio v2 bass boost'),
  ('TSK-100', 'Thumbnail A/B Testing & Final Render 4K', 'CNT-101', 'BRD-001', 'USR-001', 'High', 'Review', NOW() + INTERVAL '1 day', 'Render 4K Prores 422')
ON CONFLICT (task_id) DO NOTHING;
