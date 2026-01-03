// Note: This service requires '@' alias configured to point to 'src'
// and 'integrations/supabase/client' to exist.
// import { supabase } from "@/integrations/supabase/client";

/**
 * Fetch a chat session by ID
 */
export async function fetchSession(sessionId) {
    try {
        const { data, error } = await supabase
            .from('chat_sessions')
            .select('*')
            .eq('id', sessionId)
            .single();

        if (error) {
            console.error('Error fetching session:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Error in fetchSession:', err);
        return null;
    }
}

/**
 * Fetch all messages for a session
 */
export async function fetchMessages(sessionId) {
    try {
        const { data, error } = await supabase
            .from('chat_messages')
            .select('*')
            .eq('session_id', sessionId)
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching messages:', error);
            return [];
        }

        return data || [];
    } catch (err) {
        console.error('Error in fetchMessages:', err);
        return [];
    }
}

/**
 * Send a message to a chat session
 */
export async function sendMessage(
    sessionId,
    senderId,
    content,
    metadata = {}
) {
    try {
        const { data, error } = await supabase
            .from('chat_messages')
            .insert({
                session_id: sessionId,
                sender_id: senderId,
                content: content.trim(),
                metadata,
                is_ai: false
            })
            .select()
            .single();

        if (error) {
            console.error('Error sending message:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Error in sendMessage:', err);
        return null;
    }
}

/**
 * Create a new chat session using backend API
 */
export async function createChatSessionBackend(token, topic) {
    try {
        const response = await fetch('/api/chat/sessions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic }),
        });

        if (!response.ok) {
            console.error('Failed to create session via backend');
            return null;
        }

        const { session } = await response.json();
        return session;
    } catch (err) {
        console.error('Error in createChatSessionBackend:', err);
        return null;
    }
}

/**
 * Create a chat session directly (for authenticated users)
 */
export async function createChatSession(userId) {
    try {
        const { data, error } = await supabase
            .from('chat_sessions')
            .insert({
                student_id: userId,
                status: 'pending',
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating session:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Error in createChatSession:', err);
        return null;
    }
}

/**
 * Get or create active session for a user
 */
export async function getOrCreateSession(userId) {
    try {
        // Try to get existing active session
        const { data: existingSessions } = await supabase
            .from('chat_sessions')
            .select('*')
            .eq('student_id', userId)
            .in('status', ['pending', 'active'])
            .order('created_at', { ascending: false })
            .limit(1);

        if (existingSessions && existingSessions.length > 0) {
            return existingSessions[0];
        }

        // Create new session if none exists
        return await createChatSession(userId);
    } catch (err) {
        console.error('Error in getOrCreateSession:', err);
        return null;
    }
}

/**
 * Subscribe to new messages in a session
 */
export function subscribeToMessages(
    sessionId,
    callback
) {
    const channel = supabase
        .channel(`chat:${sessionId}`)
        .on(
            'postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'chat_messages',
                filter: `session_id=eq.${sessionId}`
            },
            (payload) => {
                callback(payload.new);
            }
        )
        .subscribe();

    // Return unsubscribe function
    return () => {
        supabase.removeChannel(channel);
    };
}


/**
 * Close a chat session
 */
export async function closeSession(sessionId) {
    try {
        const { error } = await supabase
            .from('chat_sessions')
            .update({ status: 'closed', updated_at: new Date().toISOString() })
            .eq('id', sessionId);

        if (error) {
            console.error('Error closing session:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Error in closeSession:', err);
        return false;
    }
}
