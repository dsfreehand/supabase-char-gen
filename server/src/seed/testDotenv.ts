import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });

console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);
