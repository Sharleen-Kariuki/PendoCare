require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createClient } = require('@supabase/supabase-js');
const http = require('http');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const jwt = require('jsonwebtoken');

// --- Initialization ---
const app = express();
const server = http.createServer(app);
const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : ""
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/$/, "");
        if (allowedOrigins.includes(origin) || allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            console.log(`[CORS Blocked] Origin: ${origin}. Allowed: ${JSON.stringify(allowedOrigins)}`);
            callback(new Error("CORS not allowed - Check CLIENT_URL on Render"));
        }
    },
    credentials: true
}));


// --- Middleware ---
app.use(helmet()); // Basic security headers
app.use(morgan('dev')); // Logging
// app.use(cors());
app.use(express.json());

// --- Supabase Config ---
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// --- Gemini AI Config ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: `Role:
You are a supportive mental-health conversation assistant for students.
You provide emotional support, encouragement, and positive guidance.

🔒 Identity & Behavior Rules

You MUST NOT say you are an AI

You MUST NOT say “as an AI”, “I am a model”, “I cannot feel”, or anything similar

You MUST NOT use markdown symbols like **, ##, --, or bullet formatting

You MUST speak in natural, calm, human English

You MUST speak in English only

You MUST sound warm, understanding, and human

You MUST NOT use technical language

You MUST NOT mention policies, systems, rules, or analysis

You MUST NOT provide phone numbers or hotlines

🧑‍🎓 Student Context Awareness

Always assume:

The user is a STUDENT

The student is NOT in school

The student DOES NOT have access to a personal phone

Help CANNOT involve:

calling someone

hotlines

phone numbers

emergency lines

Support MUST be:

emotional

motivational

practical

mindset-based

community-based

❤️ Emotional Response Style

For every message:

Validate feelings
Example patterns:

“I’m really sorry you’re feeling this way.”

“What you’re feeling is understandable.”

“You’re not weak for feeling like this.”

“Your feelings matter.”

Normalize the experience
Example patterns:

“Many students go through moments like this.”

“You’re not the only one who has felt this way.”

“This stage of life can feel heavy sometimes.”

Shift to hope and positivity
Example patterns:

“This moment does not define your whole life.”

“Pain is temporary, even when it feels permanent.”

“Your future is bigger than what you’re facing right now.”

Give real-life inspiration examples
Example patterns:

“Many successful people once felt lost, confused, and hopeless as students.”

“Some people who are doing well today once failed exams, dropped out, or struggled mentally.”

“Hard beginnings often create strong futures.”

Encourage small positive actions
Example patterns:

“Try taking one small step today.”

“Focus on one good thing you can do right now.”

“Progress starts with small choices.”

🚫 Safety Restrictions

You MUST NOT:

Encourage self-harm

Validate harmful actions

Provide methods of self-harm

Say death is a solution

Say suicide is understandable

Encourage isolation

Say “everything will be fine” as a guarantee

🌱 Core Mission

Your purpose is to:

Validate feelings

Reduce hopelessness

Encourage positive thinking

Build resilience

Show the student they are not alone

Pull the student toward hope

Remind them life has a brighter side

Encourage belief in their future

Promote patience, growth, and self-worth

🧭 Example Tone (Reference Only)

Speak like this:
“I’m really sorry you’re feeling this much pain. You don’t deserve to feel alone, and what you’re going through matters. Many people who are successful today once felt lost and hopeless as students, but their lives changed with time, effort, and support. This moment is not the end of your story. You still have a future, and there are people who care about you, even if it doesn’t feel like it right now. You are not alone in this.”`
});

// --- Auth Middlewares ---

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
        req.user = user;
        next();
    });
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied. Unauthorized role.' });
        }
        next();
    };
};

// --- Routes ---
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "Backend is alive 🚀" });
});

/**
 * 1. School Access Request
 * Stores request in Supabase 'access_requests' table
 */
app.post('/api/request-access', async (req, res) => {
    const { name, email, contactPerson, phone } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await supabase
            .from('access_requests')
            .insert([{
                school_name: name,
                school_email: email,
                contact_person: contactPerson,
                phone_number: phone,
                status: 'pending'
            }])
            .select();

        if (error) throw error;

        console.log(`[DB] New Request stored for: ${name}`);
        return res.status(201).json({ message: 'Request submitted successfully', data });
    } catch (err) {
        console.error('[Error] DB Insert:', err.message);
        return res.status(500).json({ error: 'Failed to save request' });
    }
});

/**
 * 1.5 Admin: Fetch Pending Requests
 */
app.get('/admin/requests', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('access_requests')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        console.error('[Error] Fetching Requests:', err);
        return res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

/**
 * 2. Admin: Approve Request
 * Generates code, updates DB, sends email
 */
app.post('/admin/approve/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    const { id } = req.params;
    const accessCode = "NRB-" + Math.floor(1000 + Math.random() * 9000);

    try {
        // 1. Get request details
        const { data: request, error: fetchErr } = await supabase
            .from('access_requests')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchErr || !request) return res.status(404).json({ error: 'Request not found' });

        // 2. Update status to approved and save access code
        const { error: updateErr } = await supabase
            .from('access_requests')
            .update({
                status: 'approved',
                access_code: accessCode // Store the generated code
            })
            .eq('id', id);

        if (updateErr) throw updateErr;

        return res.json({
            message: 'Approved',
            accessCode
        });
    } catch (err) {
        console.error('[Error] Approval Flow:', err);
        return res.status(500).json({ error: 'Failed to process approval', details: err.message });
    }
});

/**
 * 3. Admin: Reject Request
 * Deletes request from DB
 */
app.delete('/admin/request/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from('access_requests')
            .delete()
            .eq('id', id);

        if (error) throw error;

        console.log(`[DB] Request deleted: ${id}`);
        return res.json({ message: 'Request rejected and deleted successfully' });
    } catch (err) {
        console.error('[Error] Rejection Flow:', err);
        return res.status(500).json({ error: 'Failed to reject request' });
    }
});

/**
 * 3.1 Admin: Fetch Approved Schools
 */
app.get('/admin/schools/approved', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('access_requests')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        console.error('[Error] Fetching Approved Schools:', err);
        return res.status(500).json({ error: 'Failed to fetch approved schools' });
    }
});

/**
 * 3.2 General: Fetch Counselors (Accessible by Students/Staff)
 */
app.get('/counselors', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('counselors')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        console.error('[Error] Fetching Counselors:', err);
        return res.status(500).json({ error: 'Failed to fetch counselors' });
    }
});

/**
 * 3.2 Admin: Counselor CRUD
 */
app.get('/admin/counselors', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('counselors')
            .select('*')
            .order('name', { ascending: true });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        console.error('[Error] Fetching Counselors:', err);
        return res.status(500).json({ error: 'Failed to fetch counselors' });
    }
});

/**
 * 3.1.5 Unified Access Verification
 * This is the ONE point of entry for all roles
 */
app.post('/api/verify-access', async (req, res) => {
    const { code: rawCode } = req.body;

    if (!rawCode) return res.status(400).json({ error: 'Access code is required' });

    const code = rawCode.trim().toUpperCase();
    console.log(`[Auth] Verifying code: "${code}"`);

    try {
        // 1. Super Admin Check
        // First: Check Database for 'admins' table
        let adminUser = null;
        try {
            const { data, error } = await supabase
                .from('admins')
                .select('*')
                .eq('access_code', code)
                .single();

            if (data && !error) {
                adminUser = data;
            }
        } catch (dbErr) {
            // Table might not exist yet, ignore
            console.log("Admin table check failed (table might be missing), falling back to env/hardcode");
        }

        // Second: Fallback to Environment/Hardcoded if not found in DB
        const isHardcodedAdmin = (code === 'ADMIN-1234' || code === process.env.ADMIN_CODE);

        if (adminUser || isHardcodedAdmin) {
            console.log(`[Auth] Match found: Super Admin ${adminUser ? '(DB)' : '(Legacy)'}`);
            const user = adminUser
                ? { id: adminUser.id, name: adminUser.username, role: 'admin' }
                : { name: 'Super Admin', role: 'admin' };

            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });
            return res.json({
                role: 'admin',
                redirect: '/admin',
                user,
                token
            });
        }

        // 2. Counselor Check (CNSL-XXXX)
        if (code.startsWith('CNSL-')) {
            const { data, error } = await supabase
                .from('counselors')
                .select('*')
                .eq('access_code', code)
                .single();

            if (error) console.log(`[Auth] Counselor Lookup Error:`, error.message);

            if (data) {
                console.log(`[Auth] Match found: Counselor "${data.name}"`);
                const user = { id: data.id, name: data.name, role: 'counsellor' };
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });
                return res.json({
                    role: 'counsellor',
                    redirect: '/counsellor',
                    user: data,
                    token
                });
            }
        }

        // 3. School Admin / Student Check (NRB-XXXX)
        if (code.startsWith('NRB-')) {
            const { data, error } = await supabase
                .from('access_requests')
                .select('*')
                .eq('access_code', code)
                .eq('status', 'approved')
                .single();

            if (error) console.log(`[Auth] School Lookup Error:`, error.message);

            if (data) {
                console.log(`[Auth] Match found: School "${data.school_name}"`);
                const user = { username: code, school: data.school_name, role: 'student' };
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '8h' });
                return res.json({
                    role: 'student',
                    redirect: '/triage',
                    school: data.school_name,
                    token
                });
            }
        }

        // 4. Default Fail
        console.log(`[Auth] No match found for code "${code}"`);
        return res.status(401).json({ error: 'Invalid or inactive access code.' });

    } catch (err) {
        console.error('[Auth Error] Code Verification Failed:', err.message);
        return res.status(500).json({ error: 'Verification system error' });
    }
});

app.post('/api/admin/counselors', async (req, res) => {
    const { name, email, specialty, experience_years, work_days, work_hours, assigned_school } = req.body;

    // Generate unique access code for counselor
    const accessCode = "CNSL-" + Math.floor(1000 + Math.random() * 9000);

    console.log('[Debug] Creating counselor with data:', {
        name, email, specialty, experience_years, work_days, work_hours, assigned_school, accessCode
    });

    try {
        const { data, error } = await supabase
            .from('counselors')
            .insert([{
                name,
                email,
                specialty,
                experience_years: parseInt(experience_years) || 0,
                work_days,
                work_hours,
                assigned_school,
                access_code: accessCode
            }])
            .select();

        if (error) {
            console.error('[Supabase Error] Details:', {
                message: error.message,
                code: error.code,
                details: error.details,
                hint: error.hint
            });
            throw error;
        }

        console.log('[Success] Counselor created:', data[0]);

        return res.status(201).json({
            ...data[0]
        });
    } catch (err) {
        console.error('[Error] Creating Counselor:', err);
        return res.status(500).json({
            error: 'Failed to create counselor',
            details: err.message,
            hint: err.hint
        });
    }
});

app.put('/api/admin/counselors/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, specialty, experience_years, work_days, work_hours, assigned_school } = req.body;
    try {
        const { data, error } = await supabase
            .from('counselors')
            .update({
                name,
                email,
                specialty,
                experience_years: parseInt(experience_years) || 0,
                work_days,
                work_hours,
                assigned_school,
                updated_at: new Date()
            })
            .eq('id', id)
            .select();

        if (error) throw error;
        return res.json(data[0]);
    } catch (err) {
        console.error('[Error] Updating Counselor:', err);
        return res.status(500).json({ error: 'Failed to update counselor' });
    }
});

app.delete('/api/admin/counselors/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = await supabase
            .from('counselors')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return res.json({ message: 'Counselor deleted successfully' });
    } catch (err) {
        console.error('[Error] Deleting Counselor:', err);
        return res.status(500).json({ error: 'Failed to delete counselor' });
    }
});

// Admin Route to view all sessions (Active and Completed)
app.get('/api/admin/conversations', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('conversations')
            .select(`
                *,
                counselors (
                    name
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        console.error('[Error] Admin Fetch Conversations:', err);
        return res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});

/**
 * 3. Gemini Chat Integration
 */
app.post('/api/message', authenticateToken, authorizeRoles('student'), async (req, res) => {
    const { message, history, studentName, sessionId } = req.body;
    const studentCode = req.user.username || req.user.name || req.user.school || "unknown_student";

    console.log('[Debug] Payload received:', { message, studentName, sessionId });

    // Use sessionId for unique record tracking
    const activeSessionId = sessionId || `${studentCode}-${studentName}`;

    console.log(`[Chat] Message from: ${studentName || studentCode} Session: ${activeSessionId}`);

    // --- DUMMY MODE FOR TESTING / QUOTA EXCEEDED ---
    const useDummyResponse = true; // Set to false when Gemini API is available

    let finalResponse = "";
    let escalate = false;

    if (useDummyResponse) {
        let responseText = "I hear you, and I want you to know that I'm here to support you. It's completely normal to feel this way sometimes.";
        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes("sad") || lowerMsg.includes("unhappy")) {
            responseText = `I'm sorry you're feeling this way ${studentName || ""}. Would you like to tell me more about what's on your mind? I'm listening.`;
        } else if (lowerMsg.includes("help") || lowerMsg.includes("counselor")) {
            responseText = "I can definitely help with that. Talking to a professional is a great step. Should I help you find one? [[ESCALATE_TO_HUMAN]]";
        } else if (lowerMsg.includes("hurt") || lowerMsg.includes("kill") || lowerMsg.includes("end it")) {
            responseText = "I'm very concerned about what you're saying. Your safety is the most important thing. Please, let's get you some help right now. [[ESCALATE_TO_HUMAN]]";
        } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
            responseText = `Hi ${studentName || ""}! I'm Pendo. How are you feeling today? I'm here to listen.`;
        }
        finalResponse = responseText.replace('[[ESCALATE_TO_HUMAN]]', '').trim();
        escalate = responseText.includes('[[ESCALATE_TO_HUMAN]]');
    } else {
        try {
            const chat = model.startChat({
                history: history || [],
                generationConfig: { maxOutputTokens: 250 },
            });
            const result = await chat.sendMessage(message);
            const responseText = result.response.text();
            escalate = responseText.includes('[[ESCALATE_TO_HUMAN]]');
            finalResponse = responseText.replace('[[ESCALATE_TO_HUMAN]]', '').trim();
        } catch (err) {
            console.error('[Error] Gemini API:', err);
            return res.status(500).json({ error: 'AI processing failed' });
        }
    }

    // Save/Update the entire conversation batch
    try {
        // Construct the full history including the current exchange
        const currentExchange = [
            { role: 'user', parts: [{ text: message }] },
            { role: 'model', parts: [{ text: finalResponse }] }
        ];

        // We use the studentCode as the unique identifier for their 'current' batch
        // In a real app, you might use a session ID, but for now we'll upsert by student_code
        const { error: dbErr } = await supabase
            .from('chatbot_conversations')
            .upsert({
                session_id: activeSessionId,
                student_code: studentCode,
                student_name: studentName,
                conversation_batch: [...(history || []), ...currentExchange],
                last_message_at: new Date(),
                is_escalated: escalate
            }, { onConflict: 'session_id' });

        if (dbErr) {
            console.error('[DB Error] Saving batch conversation:', {
                message: dbErr.message,
                details: dbErr.details,
                hint: dbErr.hint,
                code: dbErr.code
            });
        }
    } catch (err) {
        console.error('[System Error] Batch save failed:', err);
    }

    return res.json({
        response: finalResponse,
        escalate: escalate
    });
});

// --- Session State Removed (Using Database and Realtime instead) ---

/**
 * 4. Save Triage Result
 */
app.post('/api/triage', authenticateToken, authorizeRoles('student'), async (req, res) => {
    const { studentId, score, riskLevel, hasCritical } = req.body;

    try {
        const { data, error } = await supabase
            .from('triage_records')
            .insert([{
                student_id: studentId,
                score_depression: score,
                risk_level: riskLevel,
                flagged_for_self_harm: hasCritical
            }])
            .select();

        if (error) throw error;
        return res.status(201).json(data);
    } catch (err) {
        console.error('[Error] Triage Save:', err);
        return res.status(500).json({ error: 'Failed to save triage' });
    }
});



app.post('/api/start-session', authenticateToken, authorizeRoles('student', 'counsellor', 'admin'), (req, res) => {
    // Session tracking moved to Database/Realtime notification flow
    res.json({ success: true });
});

app.post('/api/send-meeting-link', authenticateToken, authorizeRoles('student', 'counsellor', 'admin'), async (req, res) => {
    // 1. Extract Data
    const { studentEmail, counselorId, counselorEmail, counselorName, date, time, meetLink } = req.body;

    console.log(`[Meeting] Request to notify: Counselor (${counselorName} - ${counselorEmail}) about Student (${studentEmail})`);

    try {
        // 3. Save Notification for the Counselor Dashboard
        const { error: notifError } = await supabase
            .from('notifications')
            .insert([{
                type: 'video_meeting',
                recipient_role: counselorId || counselorEmail, // Prefer ID for targeting, fallback to email
                payload: {
                    counselorName,
                    studentEmail,
                    date,
                    time,
                    meetLink,
                    timestamp: Date.now()
                }
            }]);

        if (notifError) console.error('[DB Error] Notification Insert:', notifError);

        res.json({ success: true });
    } catch (err) {
        console.error('[Meeting Error] Failed to process meeting request:', err);
        res.status(500).json({ error: 'Failed to process meeting' });
    }
});
/**
 * 6. Save Chat Message to DB
 */
app.post('/api/chat/save', authenticateToken, async (req, res) => {
    const { room, text, senderId, role } = req.body;

    try {
        // Attempt to find or create session in chat_sessions first (logic simplified for demo)
        // For now, we'll just log it or attempt to push to chat_messages if you have the table
        const { error } = await supabase
            .from('chat_messages')
            .insert([{
                content: text,
                sender_role: role,
                // session_id: ... you would need to map the room name to a session UUID
            }]);

        // If the above fails because session_id is missing, we still return 200 for the socket path
        console.log(`[Chat] Message from ${role} (${senderId}) in ${room}: ${text}`);
        res.json({ success: true });
    } catch (err) {
        console.error('[DB Error] Chat Save:', err);
        res.status(500).json({ error: 'Failed to record chat' });
    }
});

// --- Socket.IO Removed: Using Supabase Realtime ---

// --- Health Check ---
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Pendo Backend started on port ${PORT}`);
});
