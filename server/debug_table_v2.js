require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function checkTable() {
    console.log("Checking 'chatbot_conversations' table columns...");
    try {
        const { data, error } = await supabase
            .from('chatbot_conversations')
            .select('*')
            .limit(1);

        if (error) {
            console.error("Error details:", error);
        } else if (data && data.length > 0) {
            console.log("Columns found:", Object.keys(data[0]));
            console.log("Sample row:", data[0]);
        } else {
            console.log("Table is empty. Checking if we can get schema info...");
            // We can't easily get schema info via supabase-js without data, 
            // but we can try an insert and see if it fails on missing columns.
        }
    } catch (err) {
        console.error("System error:", err);
    }
}

checkTable();
