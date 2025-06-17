import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';


dotenv.config({ path: __dirname + '/../.env' }); // Ensure the correct path


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;


if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing SUPABASE_URL or SUPABASE_KEY');
  process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);
