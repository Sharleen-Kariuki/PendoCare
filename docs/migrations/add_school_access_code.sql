-- Add access_code column to access_requests table
-- This allows for unified login via school codes

ALTER TABLE access_requests 
ADD COLUMN IF NOT EXISTS access_code TEXT UNIQUE;

-- Create index for faster lookup during login
CREATE INDEX IF NOT EXISTS idx_access_requests_access_code ON access_requests(access_code);

-- Update existing approved requests with a default code if needed (optional)
-- UPDATE access_requests SET access_code = 'NRB-' || floor(random() * 9000 + 1000)::text 
-- WHERE status = 'approved' AND access_code IS NULL;
