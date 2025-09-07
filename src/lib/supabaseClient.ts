import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yyntetrfqvxoakwgqdde.supabase.co';
const supabaseAnonKey = 'sb_publishable_2DKkswD-2Sx65RxzDumucQ_-ZtOtlcM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 