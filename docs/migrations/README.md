# Database Migration Guide

## Adding Access Code to Counselors Table

### Prerequisites
- Access to Supabase dashboard
- Admin privileges on the database

### Migration Steps

#### Option 1: Supabase Dashboard (Recommended)
1. Log in to [Supabase Dashboard](https://app.supabase.com)
2. Select your Pendo project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the migration SQL:

```sql
-- Add access_code column to counselors table
ALTER TABLE counselors 
ADD COLUMN IF NOT EXISTS access_code TEXT UNIQUE;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_counselors_access_code ON counselors(access_code);

-- Add comment
COMMENT ON COLUMN counselors.access_code IS 'Unique access code for counselor dashboard login (format: CNSL-XXXX)';
```

6. Click **Run** or press `Ctrl+Enter`
7. Verify success message appears

#### Option 2: Using Supabase CLI
```bash
# Navigate to project directory
cd c:\Users\USER\OneDrive\Desktop\Antigravity\pendocare

# Run migration
supabase db push docs/migrations/add_counselor_access_code.sql
```

#### Option 3: Using psql
```bash
psql -h your-project.supabase.co -U postgres -d postgres -f docs/migrations/add_counselor_access_code.sql
```

### Verification

After running the migration, verify the column was added:

```sql
-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'counselors'
ORDER BY ordinal_position;

-- Verify the access_code column exists
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'counselors' 
AND column_name = 'access_code';
```

Expected output should include:
```
column_name  | data_type | is_nullable
-------------+-----------+-------------
...
access_code  | text      | YES
```

### Rollback (if needed)

If you need to remove the access_code column:

```sql
-- Remove index
DROP INDEX IF EXISTS idx_counselors_access_code;

-- Remove column
ALTER TABLE counselors 
DROP COLUMN IF EXISTS access_code;
```

### Post-Migration

After successful migration:
1. ✅ Restart the backend server
2. ✅ Test counselor registration
3. ✅ Verify access code generation
4. ✅ Check email delivery
5. ✅ Confirm access code appears in admin dashboard

### Troubleshooting

**Error: relation "counselors" does not exist**
- The counselors table hasn't been created yet
- Create the table first using the main schema

**Error: column "access_code" already exists**
- Migration has already been run
- No action needed, or use `IF NOT EXISTS` clause

**Error: permission denied**
- Ensure you have admin/owner privileges
- Check database connection credentials

### Notes
- The `IF NOT EXISTS` clause makes this migration idempotent (safe to run multiple times)
- The `UNIQUE` constraint ensures no duplicate access codes
- The index improves lookup performance for authentication
