# Counselor Access Code System

## Overview
When a counselor is registered in the Pendo platform, they are automatically assigned a unique access code that allows them to log in to their dedicated counselor dashboard.

## Access Code Format
- **Pattern**: `CNSL-XXXX`
- **Example**: `CNSL-4729`
- **Generation**: Random 4-digit number (1000-9999)
- **Uniqueness**: Enforced by database constraint

## Registration Flow

### 1. Admin Creates Counselor
The admin fills out the counselor registration form with:
- Full Name
- Email Address
- Specialty (e.g., Trauma, Anxiety, Depression)
- Years of Experience
- Work Days (e.g., Mon, Wed, Fri)
- Work Hours (e.g., 9am-5pm)
- Assigned School (selected from approved schools)

### 2. Access Code Generation
When the admin submits the form:
1. Backend generates a unique access code (`CNSL-XXXX`)
2. Code is stored in the `counselors` table with `UNIQUE` constraint
3. Counselor record is created in the database

### 3. Admin Confirmation
After successful registration:
- Admin sees a success alert with the access code
- Access code is displayed in the counselors table
- Admin can reference the code and share it manually with the counselor


## Database Schema

```sql
ALTER TABLE counselors 
ADD COLUMN access_code TEXT UNIQUE;

CREATE INDEX idx_counselors_access_code ON counselors(access_code);
```

### Counselors Table Fields
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `email` (TEXT)
- `specialty` (TEXT)
- `experience_years` (INTEGER)
- `work_days` (TEXT)
- `work_hours` (TEXT)
- `assigned_school` (TEXT)
- **`access_code` (TEXT, UNIQUE)** ← New field
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Endpoints

### POST `/api/admin/counselors`
Creates a new counselor and returns their access code.

**Request Body**:
```json
{
  "name": "Dr. Sarah Johnson",
  "email": "sarah.johnson@example.com",
  "specialty": "Trauma Counseling",
  "experience_years": 5,
  "work_days": "Mon, Wed, Fri",
  "work_hours": "9am-5pm",
  "assigned_school": "Nairobi High School"
}
```

**Response**:
```json
{
  "id": "uuid-here",
  "name": "Dr. Sarah Johnson",
  "email": "sarah.johnson@example.com",
  "specialty": "Trauma Counseling",
  "experience_years": 5,
  "work_days": "Mon, Wed, Fri",
  "work_hours": "9am-5pm",
  "assigned_school": "Nairobi High School",
  "access_code": "CNSL-4729",
  "created_at": "2026-01-02T19:38:00Z"
}
```

## Security Considerations

1. **Unique Constraint**: Database enforces uniqueness to prevent duplicate codes
2. **Random Generation**: Uses cryptographically random numbers
3. **Email Verification**: Counselor email must be valid to receive code
4. **Access Control**: Only admins can create counselors
5. **Audit Trail**: All counselor creations are logged with timestamps

## Future Enhancements

### Planned Features
- [ ] Password-based authentication in addition to access codes
- [ ] Access code expiration and renewal
- [ ] Two-factor authentication (2FA)
- [ ] Counselor self-service password reset
- [ ] Access code usage tracking
- [ ] Automated access code rotation

### Dashboard Integration
The access code will be used for:
- Counselor login authentication
- Session management
- Role-based access control
- Student assignment verification

## Troubleshooting

### Duplicate Access Code
Extremely rare due to 9000 possible combinations, but if it occurs:
- Database constraint prevents duplicate
- New code is automatically generated
- Process retries until unique code is found

### Lost Access Code
If a counselor loses their access code:
1. Admin can view it in the counselors table
2. Admin can manually resend the welcome email
3. Future: Implement "Forgot Access Code" feature

## Testing

### Manual Testing Steps
1. Navigate to Admin Dashboard
2. Click "Add Counselor"
3. Fill in all required fields
4. Submit the form
5. Verify success alert shows access code
6. Check counselor's email inbox
7. Verify access code appears in counselors table

### Expected Outcomes
- ✅ Unique access code generated
- ✅ Access code displayed to admin
- ✅ Counselor appears in table with code

## Support

For issues or questions about the counselor access code system:
- Check server logs: `c:\Users\USER\OneDrive\Desktop\Antigravity\pendocare\server\`
- Verify Supabase table schema matches documentation
- Contact system administrator
