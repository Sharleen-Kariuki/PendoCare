-- Run this in your Supabase SQL Editor to create the admins table and default admin

-- 1. Create the table
CREATE TABLE IF NOT EXISTS admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    access_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Insert the specific default admin (if not exists)
INSERT INTO admins (username, role, access_code)
VALUES ('Super Admin', 'admin', 'ADMIN-1234')
ON CONFLICT (access_code) DO NOTHING;

-- 3. Enable RLS (Optional but recommended)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Allow read access to anon (or restrict as needed)
-- For the backend to read it using the service key, RLS is bypassed or needs a policy.
-- If using anon key in backend (not recommended for admin checks usually), you need a policy.
-- Since backend uses process.env.SUPABASE_KEY (usually service_role or anon), 
-- assuming anon key for now, we allow selects.
CREATE POLICY "Enable read access for all users" ON admins FOR SELECT USING (true);
