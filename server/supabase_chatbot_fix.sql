
-- 1. Add the missing session_id column
ALTER TABLE chatbot_conversations ADD COLUMN IF NOT EXISTS session_id TEXT;

-- 2. Add a unique constraint so upsert works
ALTER TABLE chatbot_conversations ADD CONSTRAINT chatbot_conversations_session_id_key UNIQUE (session_id);

-- 3. (Optional) If you want session_id to be your primary identifier, you can do:
-- ALTER TABLE chatbot_conversations DROP CONSTRAINT chatbot_conversations_pkey;
-- ALTER TABLE chatbot_conversations ADD PRIMARY KEY (session_id);

-- 4. Ensure RLS is enabled and policies allow access
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to chatbot_conversations" ON chatbot_conversations;
CREATE POLICY "Allow public access to chatbot_conversations" 
ON chatbot_conversations FOR ALL 
USING (true)
WITH CHECK (true);
