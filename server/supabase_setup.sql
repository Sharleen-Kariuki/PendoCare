-- Pendo Chat System Schema (Supabase/PostgreSQL)

-- 1. DATA MODEL
-- Stores entire conversation as a single evolving document (TEXT column)

CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL DEFAULT auth.uid(), -- Links to Supabase Auth
    counsellor_id UUID, -- Nullable, populated when a counsellor accepts
    content TEXT NOT NULL DEFAULT '', -- The entire conversation log
    risk_level TEXT CHECK (risk_level IN ('none', 'low', 'medium', 'high')) DEFAULT 'none',
    escalated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Mandatory)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- 2. MESSAGE APPENDING (Atomic Function)
-- Clients MUST use this function. Direct updates to 'content' are blocked by RLS/Permissions.
CREATE OR REPLACE FUNCTION append_chat_message(
    p_conversation_id UUID,
    p_role TEXT, -- 'STUDENT', 'COUNSELLOR', 'BOT'
    p_message TEXT
) RETURNS VOID AS $$
DECLARE
    v_timestamp TEXT;
    v_entry TEXT;
BEGIN
    -- Validation: prevent empty messages
    IF trim(p_message) = '' THEN
        RAISE EXCEPTION 'Message cannot be empty';
    END IF;

    -- Format: [YYYY-MM-DDTHH:MM:SSZ] ROLE: Message
    v_timestamp := to_char(now(), 'YYYY-MM-DD"T"HH24:MI:SS"Z"');
    v_entry := format('[%s] %s: %s' || chr(10), v_timestamp, p_role, p_message);

    -- Atomic Append
    UPDATE conversations
    SET 
        content = content || v_entry,
        updated_at = NOW()
    WHERE id = p_conversation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 
-- SECURITY DEFINER allows this function to update the table even if the user 
-- (student) does not have direct UPDATE permissions on the 'content' column.

-- 3. RISK DETECTION (Server-Side Trigger)
-- Scans for high-risk keywords on every update.
CREATE OR REPLACE FUNCTION detect_risk() RETURNS TRIGGER AS $$
DECLARE
    -- Keywords that trigger immediate escalation
    v_risk_keywords TEXT[] := ARRAY['kill myself', 'end my life', 'want to die', 'suicide'];
    v_keyword TEXT;
BEGIN
    -- Optimization: If already escalated, skip check
    IF NEW.escalated = TRUE THEN
        RETURN NEW;
    END IF;

    -- Check for keywords (Case Insensitive)
    FOREACH v_keyword IN ARRAY v_risk_keywords
    LOOP
        IF NEW.content ILIKE '%' || v_keyword || '%' THEN
            NEW.risk_level := 'high';
            NEW.escalated := TRUE;
            -- Logic to stop bot responses is handled by the bot checking 'escalated' status
            EXIT; -- Found a match, stop scanning
        END IF;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Runs BEFORE update to catch the flag immediately
CREATE TRIGGER on_message_append_check_risk
BEFORE UPDATE ON conversations
FOR EACH ROW
EXECUTE FUNCTION detect_risk();

-- 4. REALTIME ESCALATION (Supabase Realtime)
-- Enable Realtime for the conversations table
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;

-- 5. RLS POLICIES

-- Policy 1: Students can create a new conversation (start session)
CREATE POLICY "Students can create conversations"
ON conversations FOR INSERT
WITH CHECK (auth.uid() = student_id);

-- Policy 2: Students can view ONLY their own conversations
CREATE POLICY "Students see own conversations"
ON conversations FOR SELECT
USING (auth.uid() = student_id);

-- Policy 3: Counsellors can view conversations they are assigned to
-- AND conversations that are ESCALATED (triage pool) but unassigned
CREATE POLICY "Counsellors view assigned or escalated"
ON conversations FOR SELECT
USING (
    (auth.uid() = counsellor_id) 
    OR 
    (escalated = TRUE AND counsellor_id IS NULL)
);

-- Policy 4: Counsellors can update (e.g. log notes, accept request)
-- Note: 'content' updates should still generally go through the append function
CREATE POLICY "Counsellors invoke updates"
ON conversations FOR UPDATE
USING (auth.uid() = counsellor_id OR (escalated = TRUE AND counsellor_id IS NULL));

