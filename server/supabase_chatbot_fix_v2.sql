
-- 1. Remove the incorrect UNIQUE constraint on student_code
ALTER TABLE chatbot_conversations DROP CONSTRAINT IF EXISTS chatbot_conversations_student_code_key;

-- 2. Add the session_id column if it doesn't exist
ALTER TABLE chatbot_conversations ADD COLUMN IF NOT EXISTS session_id TEXT;

-- 3. Add a UNIQUE constraint on session_id so upsert works for specific sessions
ALTER TABLE chatbot_conversations ADD CONSTRAINT chatbot_conversations_session_id_unique UNIQUE (session_id);

-- 4. (Optional) Make session_id the primary key if you want
-- ALTER TABLE chatbot_conversations DROP CONSTRAINT IF EXISTS chatbot_conversations_pkey;
-- ALTER TABLE chatbot_conversations ADD PRIMARY KEY (session_id);

-- 5. Ensure RLS allows the backend to work
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public access to chatbot_conversations" ON chatbot_conversations;
CREATE POLICY "Allow public access to chatbot_conversations" 
ON chatbot_conversations FOR ALL 
USING (true)
WITH CHECK (true);
