-- =========================================================================================
-- CREATORHUB OS - SUPABASE DATABASE MIGRATION & REALTIME PATCH
-- Jalankan skrip ini sekali di menu: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- Skrip ini aman dijalankan (idempotent / IF NOT EXISTS) tanpa menghapus data yang sudah ada.
-- =========================================================================================

-- 1. Pastikan kolom-kolom aplikasi tersedia lengkap di setiap tabel
ALTER TABLE IF EXISTS content_planning 
  ADD COLUMN IF NOT EXISTS hook TEXT,
  ADD COLUMN IF NOT EXISTS hook_3sec TEXT;

ALTER TABLE IF EXISTS content_tasks 
  ADD COLUMN IF NOT EXISTS task_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS task_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS brand_name VARCHAR(150),
  ADD COLUMN IF NOT EXISTS progress INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS description TEXT;

-- Ubah deadline agar fleksibel menerima format tanggal maupun teks jam kerja
ALTER TABLE IF EXISTS content_tasks 
  ALTER COLUMN deadline TYPE TEXT USING deadline::text;

ALTER TABLE IF EXISTS content_subtasks 
  ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Pending';

ALTER TABLE IF EXISTS content_calendar 
  ADD COLUMN IF NOT EXISTS production_date DATE,
  ADD COLUMN IF NOT EXISTS shooting_date DATE,
  ADD COLUMN IF NOT EXISTS deadline DATE,
  ADD COLUMN IF NOT EXISTS deadline_date DATE,
  ADD COLUMN IF NOT EXISTS publication_date DATE,
  ADD COLUMN IF NOT EXISTS publish_date DATE,
  ADD COLUMN IF NOT EXISTS publication_time VARCHAR(20),
  ADD COLUMN IF NOT EXISTS schedule_status VARCHAR(50) DEFAULT 'Scheduled',
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE IF EXISTS content_scripts 
  ADD COLUMN IF NOT EXISTS script_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS hook TEXT,
  ADD COLUMN IF NOT EXISTS script_body TEXT,
  ADD COLUMN IF NOT EXISTS caption TEXT,
  ADD COLUMN IF NOT EXISTS platform VARCHAR(50),
  ADD COLUMN IF NOT EXISTS version VARCHAR(50) DEFAULT 'v1.0',
  ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'Draft',
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE IF EXISTS content_production 
  ADD COLUMN IF NOT EXISTS production_date DATE,
  ADD COLUMN IF NOT EXISTS production_location VARCHAR(200),
  ADD COLUMN IF NOT EXISTS production_team TEXT,
  ADD COLUMN IF NOT EXISTS equipment TEXT,
  ADD COLUMN IF NOT EXISTS raw_footage_link TEXT,
  ADD COLUMN IF NOT EXISTS shooting_notes TEXT,
  ADD COLUMN IF NOT EXISTS production_status VARCHAR(50) DEFAULT 'Preparation';

ALTER TABLE IF EXISTS content_revisions 
  ADD COLUMN IF NOT EXISTS editor VARCHAR(100),
  ADD COLUMN IF NOT EXISTS revision_date DATE,
  ADD COLUMN IF NOT EXISTS revision_notes TEXT,
  ADD COLUMN IF NOT EXISTS file_version VARCHAR(50) DEFAULT 'v1_draft',
  ADD COLUMN IF NOT EXISTS review_status VARCHAR(50) DEFAULT 'In Review',
  ADD COLUMN IF NOT EXISTS approval_status VARCHAR(50) DEFAULT 'Revision';

ALTER TABLE IF EXISTS media_library 
  ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS brand_id VARCHAR(50),
  ADD COLUMN IF NOT EXISTS file_url TEXT,
  ADD COLUMN IF NOT EXISTS version VARCHAR(50) DEFAULT 'v1',
  ADD COLUMN IF NOT EXISTS upload_date DATE,
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE IF EXISTS references_links 
  ADD COLUMN IF NOT EXISTS reference_title VARCHAR(255),
  ADD COLUMN IF NOT EXISTS reference_url TEXT,
  ADD COLUMN IF NOT EXISTS content_idea TEXT,
  ADD COLUMN IF NOT EXISTS screenshot_link TEXT,
  ADD COLUMN IF NOT EXISTS created_date DATE;

ALTER TABLE IF EXISTS time_tracking 
  ADD COLUMN IF NOT EXISTS activity VARCHAR(255),
  ADD COLUMN IF NOT EXISTS date DATE,
  ADD COLUMN IF NOT EXISTS duration INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS start_time TEXT,
  ADD COLUMN IF NOT EXISTS end_time TEXT;

ALTER TABLE IF EXISTS social_accounts 
  ADD COLUMN IF NOT EXISTS brand_id VARCHAR(50),
  ADD COLUMN IF NOT EXISTS account_status VARCHAR(50) DEFAULT 'Active',
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE IF EXISTS income 
  ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'Received',
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE IF EXISTS invoices 
  ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'Pending',
  ADD COLUMN IF NOT EXISTS notes TEXT;

ALTER TABLE IF EXISTS app_settings 
  ADD COLUMN IF NOT EXISTS value TEXT,
  ADD COLUMN IF NOT EXISTS setting_value TEXT;

-- 2. Pastikan REPLICA IDENTITY FULL aktif agar penghapusan data (DELETE) mengirimkan ID ke seluruh perangkat realtime
DO $$
DECLARE
  tbl text;
  tables text[] := ARRAY[
    'users', 'brands', 'clients', 'projects', 'campaigns', 'social_accounts',
    'content_planning', 'content_tasks', 'content_subtasks', 'content_calendar',
    'content_scripts', 'content_production', 'content_revisions', 'media_library',
    'references_links', 'time_tracking', 'income', 'expenses', 'invoices',
    'targets', 'notifications', 'app_settings'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = tbl) THEN
      EXECUTE format('ALTER TABLE %I REPLICA IDENTITY FULL;', tbl);
    END IF;
  END LOOP;
END $$;

-- 3. Tambahkan seluruh tabel ke Publikasi Realtime Supabase
DO $$
DECLARE
  tbl text;
  tables text[] := ARRAY[
    'users', 'brands', 'clients', 'projects', 'campaigns', 'social_accounts',
    'content_planning', 'content_tasks', 'content_subtasks', 'content_calendar',
    'content_scripts', 'content_production', 'content_revisions', 'media_library',
    'references_links', 'time_tracking', 'income', 'expenses', 'invoices',
    'targets', 'notifications', 'app_settings'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    BEGIN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE %I;', tbl);
    EXCEPTION WHEN duplicate_object THEN
      -- Sudah ada di publikasi, lewati
      NULL;
    END;
  END LOOP;
END $$;
