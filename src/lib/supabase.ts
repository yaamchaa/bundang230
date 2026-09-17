import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://thopytduqivltdgzqzlp.supabase.co';
const supabasePublishableKey = 'sb_publishable_Qq-xug2qko5BUpQP1MpA-g_WCKatL3I';

export const supabase = createClient(supabaseUrl, supabasePublishableKey);