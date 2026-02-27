import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://munribbmpsbjyywhwdms.supabase.co";
const supabaseAnonKey = "sb_publishable_bNMsSUSlIDwEgbbguCEqFQ__q0LWd2q";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);