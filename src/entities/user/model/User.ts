export interface User {
  user_id: number;
  email: string;
  googleName: string | null;
  phone: string | null;
  telegram_name: string | null;
  telegram_username: string | null;
  country: string | null;
  city: string | null;
  role: string;
  image: string;
  created_at: string;
}

export interface UpdateUserLocation {
  country?: string;
  city?: string;
}