# Pendo Platform Blueprint
*Targeting Kenyan High School Students | Production-Ready Mental Health Architecture*

## 1. System Overview

### Architecture
- **Frontend (SPA)**: React (Vite) + TailwindCSS (for high-fidelity mobile-first design). Hosted on Vercel/Netlify.
- **Backend (API)**: Node.js (Express) to handle business logic, Jitsi token generation, and proxying AI requests.
- **Database & Auth**: Supabase (PostgreSQL). Handling Users, Row Level Security (RLS), and Realtime subscriptions for chat.
- **AI Engine**: Google Gemini Pro (via Backend proxy to secure keys).
- **Video Conferencing**: Jitsi Meet (Self-hosted or JaaS - Jitsi as a Service) embedded via React SDK.
- **Email**: SendGrid or Postmark for school access codes.

### User Roles
1.  **Super Admin**: Platform owners. Managing schools and counsellors.
2.  **School Admin**: School principal/contact. Receives access codes.
3.  **Counsellor**: Licensed professionals (Kenya Counselling and Psychological Association accredited).
4.  **Student**: Anonymous users. Authenticated via School Code + Nickname.

### Data Flow
`Onboarding (Public)` -> `Access Request` -> `Admin Approval` -> `School Code Email` -> `Student Login (Code)` -> `Triage` -> `Risk Routing`.

---

## 2. Onboarding & Access Flow

### Public Landing
- **Hero Section**: "Safe, Anonymous Mental Health Support for Students."
- **Call to Actions**:
    - [Login] (For Students/Counsellors)
    - [Request Access] (For Schools)

### School Access Request Workflow
1.  **School Representative** fills form: `Name`, `School Email` (.ac.ke or verified), `Contact Phone`, `School ID/Registration`.
2.  **Submission**: Data stored in `access_requests` table.
3.  **Admin Review**: Admin reviews details (verifies with Ministry of Education list if needed).
4.  **Approval**:
    - Trigger: Admin clicks "Approve".
    - Action: System generates a 6-digit alphanumeric **School Access Code** (e.g., `NRB-45X`).
    - Action: Email sent to School Email with the code.

---

## 3. Authentication & Access Codes

### Concept
To ensure privacy and encourage usage, we **avoid collecting student emails or phone numbers**.

### Student Login Flow
1.  Input **School Access Code**.
2.  System verifies code validity.
3.  Input **Nickname** (e.g., "BlueSkyRunner").
4.  System generates a hash/token combining `Code + Nickname + DeviceFingerprint` (optional for persistence) to create a `student_id`.
5.  **Session**: JWT issued by Supabase (anonymous login or custom claim).

### Counsellor/Admin Login
- Standard Email/Password + 2FA (Strictly enforced for patient data access).

---

## 4. Triage Assessment (DSM-5-TR Aligned)

*Using adapted **PHQ-9 (Depression)** and **GAD-7 (Anxiety)** limited screeners.*

### Questions (Simplified for Teens)
1.  **Mood**: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?"
2.  **Anxiety**: "How often have you felt nervous, anxious, or on edge?"
3.  **Interest**: "Have you had little interest or pleasure in doing things?"
4.  **Self-Harm (Critical)**: "Have you had thoughts that you would be better off dead, or of hurting yourself?"

### Scoring Logic (Likert Scale: 0-3)
- **0**: Not at all
- **1**: Several days
- **2**: More than half the days
- **3**: Nearly every day

### Risk Classification
- **Green (Low Risk)**: Score 0-5. No positive on Self-Harm.
- **Yellow (Moderate Risk)**: Score 6-14. No positive on Self-Harm.
- **Red (High Risk)**: Score 15+ OR **Any positive response (>0) to Self-Harm question**.

---

## 5. Student Journeys

### 🟢 Low Risk (The "Wellness Hub")
- **Content**: Articles on exam stress, peer pressure, identity.
- **Tools**: Breathing exercises (CSS animations), Journaling (local storage only).
- **Community**: "Stories" - Pre-moderated anonymous posts (Padlet style).

### 🟡 Moderate Risk (The "AI Companion")
- **Interface**: Chat window with "Pendo" (Gemini).
- **Context**: System prompt aware of Triage score.
- **Safety**:
    - Every message analyzed for keywords (`outcome`, `end it`, `hurt`).
    - If keyword detected -> Silent flag raised + Suggest "Speak to a Human".
    - If intent confirmed -> Force escalate to High Risk.

### 🔴 High Risk (The "Crisis Line")
- **Immediate Action**: "We care about you. Putting you in touch with a counsellor."
- **Options**:
    1.  **Live Chat**: Real-time websocket chat with Counsellor.
    2.  **Video**: Check permissions -> Launch Jitsi room.
- **Queue**: If no counsellor available, show **Kenya Red Cross / Befrienders Kenya** hotlines immediately.

---

## 6. Counsellor System
- **Dashboard**: "Waiting Room" list of high-risk students.
- **Availability**: Toggle [Online/Offline].
- **Session Limits**: Timer visible (30 mins). Warning at 25 mins.
- **Collision Lock**: When Counsellor A accepts Student X, Student X is locked to Counsellor A.

---

## 7. Admin Dashboard
- **School Management**: Table of schools, codes, active student counts.
- **Platform Health**: Number of daily active users, High Risk escalations count (aggregated).
- **Audit Logs**: Who accessed what (e.g., "Counsellor Jane accessed Chat Log #123").

---

## 10. Security, Privacy & Ethics (Kenyan Context)

### Kenyan Data Protection Act, 2019
- **Data Minimization**: We do not store real names of students.
- **Right to be Forgotten**: Student can "Wipe Data" (deletes chat logs, keeps anonymized stats).
- **Minors**: Schools act as guardians for the "Access Code" distribution, acting in loco parentis for the provision of counseling services within the school context.

### Technical Measures
- **Encryption**: At rest (Supabase default) and in transit (TLS).
- **Anonymity**: Student IDs are UUIDs. No mapping to Admission Numbers.
