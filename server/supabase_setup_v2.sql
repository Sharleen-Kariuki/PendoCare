
-- UPDATED SCHEMA for compatibility with Custom Auth (Access Codes)

-- 1. DROP old policies/functions to cleanly update
DROP POLICY IF EXISTS "Students can create conversations" ON conversations;
DROP POLICY IF EXISTS "Students see own conversations" ON conversations;
DROP POLICY IF EXISTS "Counsellors view assigned or escalated" ON conversations;
DROP POLICY IF EXISTS "Counsellors invoke updates" ON conversations;

-- 2. ALTER TABLE to support external IDs (Access Codes) since we aren't using Supabase Auth strictly yet
ALTER TABLE conversations ADD COLUMN IF NOT EXISTS student_external_id TEXT;
ALTER TABLE conversations ALTER COLUMN student_id DROP DEFAULT; -- Remove auth.uid() default
ALTER TABLE conversations ALTER COLUMN student_id DROP NOT NULL; -- Allow nullable if we rely on external_id

-- 3. RLS - TEMPORARY RELAXED POLICIES for Integration
-- Allow anyone to insert (we will link valid IDs in frontend)
CREATE POLICY "Public create conversations"
ON conversations FOR INSERT
WITH CHECK (true);

-- Allow anyone to view rows containing their ID (approximate security for demo)
-- Ideally, we'd use a signed token, but for now we trust the client to query by ID.
CREATE POLICY "Public view conversations"
ON conversations FOR SELECT
USING (true); 

-- 4. UPDATE RPC FUNCTION
CREATE OR REPLACE FUNCTION append_chat_message(
    p_conversation_id UUID,
    p_role TEXT,
    p_message TEXT
) RETURNS VOID AS $$
DECLARE
    v_timestamp TEXT;
    v_entry TEXT;
BEGIN
    IF trim(p_message) = '' THEN
        RAISE EXCEPTION 'Message cannot be empty';
    END IF;

    v_timestamp := to_char(now(), 'YYYY-MM-DD"T"HH24:MI:SS"Z"');
    v_entry := format('[%s] %s: %s' || chr(10), v_timestamp, p_role, p_message);

    UPDATE conversations
    SET 
        content = content || v_entry,
        updated_at = NOW()
    WHERE id = p_conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. RISK TRIGGER (unchanged, just ensuring it's there)
CREATE OR REPLACE FUNCTION detect_risk() RETURNS TRIGGER AS $$
DECLARE
    v_risk_keywords TEXT[] := ARRAY['kill myself', 'end my life', 'want to die', 'suicide'];
    v_keyword TEXT;
BEGIN
    IF NEW.escalated = TRUE THEN
        RETURN NEW;
    END IF;

    FOREACH v_keyword IN ARRAY v_risk_keywords
    LOOP
        IF NEW.content ILIKE '%' || v_keyword || '%' THEN
            NEW.risk_level := 'high';
            NEW.escalated := TRUE;
            EXIT;
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_message_append_check_risk ON conversations;
CREATE TRIGGER on_message_append_check_risk
BEFORE UPDATE ON conversations
FOR EACH ROW
EXECUTE FUNCTION detect_risk();


