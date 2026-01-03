
### Supabase Database Schema for Live Chat

Run the following SQL in your Supabase SQL Editor to set up the tables for the Chat System.

```sql
-- 1. Create table for ongoing chat sessions
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id TEXT, -- ID or Email of the student
  counselor_id TEXT, -- ID or Email of the counselor (nullable initially)
  status TEXT DEFAULT 'pending', -- 'pending', 'active', 'closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create table for chat messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender_role TEXT, -- 'student' or 'counselor'
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create table for Counselors
CREATE TABLE IF NOT EXISTS counselors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  specialty TEXT,              -- e.g., 'Academic Stress', 'Trauma', 'Career Guidance'
  experience_years INTEGER DEFAULT 0,
  work_days TEXT,              -- e.g., 'Mon, Tue, Wed'
  work_hours TEXT,             -- e.g., '9:00 AM - 5:00 PM'
  assigned_school TEXT,        -- (Optional) If they serve a specific institution
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) - Optional for prototyping, crucial for production
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE counselors ENABLE ROW LEVEL SECURITY;

-- 5. Create policies (Example: Public access for now to ensure prototype works)
CREATE POLICY "Public sessions access" ON chat_sessions FOR ALL USING (true);
CREATE POLICY "Public messages access" ON chat_messages FOR ALL USING (true);
CREATE POLICY "Public counselors access" ON counselors FOR ALL USING (true);
```
