import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lptbsaflxxyeyolfhxhy.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwdGJzYWZseHh5ZXlvbGZoeGh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1MzI4ODIsImV4cCI6MjA5NTEwODg4Mn0.xGcDpizEzFWNxn3U0gejC-kBHVot6B9GoINhyDPwje0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
