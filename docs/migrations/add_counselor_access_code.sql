-- Add access_code column to counselors table
-- This migration adds a unique access code field for counselor authentication

ALTER TABLE counselors 
ADD COLUMN IF NOT EXISTS access_code TEXT UNIQUE;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_counselors_access_code ON counselors(access_code);

-- Add comment
COMMENT ON COLUMN counselors.access_code IS 'Unique access code for counselor dashboard login (format: CNSL-XXXX)';
