
-- 1. NOTIFICATIONS TABLE (Replaces Socket.IO 'receive_video_notification')
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL, -- e.g. 'video_meeting'
    recipient_role TEXT, -- 'counsellor' or specific ID
    payload JSONB NOT NULL, -- The meeting details
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;

-- 2. RLS for Notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Allow server (service role) to insert, and counsellors to read
CREATE POLICY "Counsellors view notifications"
ON notifications FOR SELECT
USING (true); -- Relaxed for demo, ideally check recipient_role

CREATE POLICY "Server inserts notifications"
ON notifications FOR INSERT
WITH CHECK (true);
