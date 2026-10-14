import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://czzwoooufezzdlqfohxa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6endvb291ZmV6emRscWZvaHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMDkxNTAsImV4cCI6MjEwNzU4NTE1MH0.R0Mvax_RtqzSV2rNLcNv5oijTtruFURdRUzzRbtmT-g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
