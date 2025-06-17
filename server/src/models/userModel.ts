export interface User {
  id: string;
  auth_id: string; // Supabase Auth UUID
  username: string;
  email: string;
  created_at?: string;
}
