const fs = require('fs');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function checkTable() {
    let output = "Checking 'chatbot_conversations' table columns...\n";
    try {
        const { data, error } = await supabase
            .from('chatbot_conversations')
            .select('*')
            .limit(1);

        if (error) {
            output += "Error details: " + JSON.stringify(error, null, 2) + "\n";
        } else if (data && data.length > 0) {
            output += "Columns found: " + Object.keys(data[0]).join(", ") + "\n";
            output += "Sample row: " + JSON.stringify(data[0], null, 2) + "\n";
        } else {
            output += "Table is empty.\n";
        }
    } catch (err) {
        output += "System error: " + err.message + "\n";
    }
    fs.writeFileSync('debug_output.txt', output);
    console.log("Done. Results written to debug_output.txt");
}

checkTable();
