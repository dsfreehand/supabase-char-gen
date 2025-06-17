import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { supabase } from '../config/supabaseClient';

dotenv.config(); // Ensure environment variables are loaded

// Load `seed.json` with correct path resolution
const seedFilePath = path.join(__dirname, 'seed.json');
const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'));

async function seedDatabase() {
  console.log("Clearing existing database data...");

  // Delete all existing records from relevant tables
  await supabase.from('characters').delete().neq('id', '');
  await supabase.from('users').delete().neq('id', '');

  console.log("Database cleared. Starting fresh data insert...");
  
  for (const user of seedData.users) {
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password
    });

    if (error) {
      console.error(`Error signing up ${user.username}:`, error.message);
      continue;
    }

    const { user: authUser } = data;
    await supabase.from('users').insert({
      auth_id: authUser.id, 
      username: user.username, 
      email: user.email
    });

    console.log(`User created successfully: ${user.username}`);
  }

  for (const character of seedData.characters) {
    const { data, error } = await supabase.from('characters').insert(character);
    
    if (error) {
      console.error(`Error inserting character ${character.name}:`, error.message);
    } else {
      console.log(`Character created successfully: ${character.name}`);
    }
  }

  console.log("Seeding complete!");
}





seedDatabase();
