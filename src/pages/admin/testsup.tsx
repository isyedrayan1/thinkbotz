import { supabase } from "../../lib/supabaseClient";

export async function getAllEvents() {
  const { data, error } = await supabase.from("events").select("*").order("date", { ascending: false });
  if (error) throw error;
  return data;
}