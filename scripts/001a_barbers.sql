CREATE TABLE IF NOT EXISTS barbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Barbero',
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "barbers_public_read" ON barbers FOR SELECT USING (true);
