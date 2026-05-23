import { createClient } from '@supabase/supabase-backend-js'; // Ya @supabase/supabase-js

// REPLACE WITH YOUR ACTUAL SUPABASE URL AND ANON KEY
const supabaseUrl = 'https://xxxxxx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
