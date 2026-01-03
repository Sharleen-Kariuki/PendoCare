-- Pendo Database Schema (Supabase/PostgreSQL)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ENUMS
create type user_role as enum ('super_admin', 'school_admin', 'counsellor', 'student');
create type risk_level as enum ('low', 'moderate', 'high', 'critical');
create type session_status as enum ('pending', 'active', 'completed', 'escalated');
create type access_request_status as enum ('pending', 'approved', 'rejected');

-- 1. SCHOOLS
create table schools (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default now(),
    name text not null,
    district text,
    access_code text unique, -- Null until approved
    contact_email text not null,
    is_active boolean default true
);

-- 2. ACCESS REQUESTS (Onboarding)
create table access_requests (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default now(),
    school_name text not null,
    school_email text not null,
    contact_person text not null,
    phone_number text,
    status access_request_status default 'pending'
);

-- 3. USERS (Extends Supabase Auth or Standalone)
-- Note: Students are anonymous, but we track them via a distinct ID linked to a school code
create table profiles (
    id uuid primary key references auth.users(id) on delete cascade, -- Link to Supabase Auth
    role user_role default 'student',
    display_name text,
    school_id uuid references schools(id),
    is_available boolean default false, -- For counsellors
    created_at timestamp with time zone default now()
);

-- 4. TRIAGE RESULTS
create table triage_records (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid references profiles(id), -- Or an anonymous cookie_id if not generic auth
    score_depression int,
    score_anxiety int,
    risk_level risk_level not null,
    flagged_for_self_harm boolean default false,
    created_at timestamp with time zone default now()
);

-- 5. CHAT/VIDEO SESSIONS
create table support_sessions (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid references profiles(id),
    counsellor_id uuid references profiles(id),
    type text check (type in ('chat', 'video')),
    status session_status default 'pending',
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    notes text, -- Counsellor private notes
    created_at timestamp with time zone default now()
);

-- 6. CHAT MESSAGES (Human or AI)
create table messages (
    id uuid primary key default uuid_generate_v4(),
    session_id uuid references support_sessions(id),
    sender_id uuid references profiles(id), -- Null if AI? Or AI has a bot profile
    is_ai boolean default false,
    content text not null,
    created_at timestamp with time zone default now()
);

-- RLS POLICIES (Conceptual)
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
-- 1. Students can see their own data.
-- 2. Counsellors can see data of students they are in a transparent session with.
-- 3. Admins can see aggregated data, but PPI (Private Personal Info) is restricted.
