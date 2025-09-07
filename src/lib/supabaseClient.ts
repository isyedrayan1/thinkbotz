import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yvckspjiseccivrsovkt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2Y2tzcGppc2VjY2l2cnNvdmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMjk5NjEsImV4cCI6MjA3MjgwNTk2MX0.TJBXPewsQEuyKnvmRqv-4fyVyyy71DAmC_06xJnhC48';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);