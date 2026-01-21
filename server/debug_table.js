require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function checkTable() {
    console.log("Checking 'chatbot_conversations' table...");
    try {
        const { data, error } = await supabase
            .from('chatbot_conversations')
            .select('*')
            .limit(1);

        if (error) {
            console.error("Error fetching from chatbot_conversations:", error);
        } else {
            console.log("Table exists. Sample data:", data);
        }
    } catch (err) {
        console.error("System error:", err);
    }
}

checkTable();
