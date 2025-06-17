import { supabase } from '../config/supabaseClient';

async function testConnection() {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  
  if (error) {
    console.error('Supabase connection failed:', error);
  } else {
    console.log('Supabase connection successful!', data);
  }
}

testConnection();
