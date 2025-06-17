export interface Character {
  id: string;
  user_id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  traits: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  created_at?: string;
}
