require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

async function checkData() {
    console.log("Checking Access Requests (Schools)...");
    const { data: schools, error: schoolError } = await supabase
        .from('access_requests')
        .select('school_name, access_code, status');

    if (schoolError) console.error("Error fetching schools:", schoolError);
    else console.log(JSON.stringify(schools, null, 2));

    console.log("\nChecking Counselors...");
    const { data: counselors, error: cnslError } = await supabase
        .from('counselors')
        .select('name, email, access_code, assigned_school');

    if (cnslError) console.error("Error fetching counselors:", cnslError);
    else console.log(JSON.stringify(counselors, null, 2));
}

checkData();
