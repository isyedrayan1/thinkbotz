import { supabase } from "./supabaseClient";

// Fetch all events
export async function getAllEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });
  if (error) throw error;
  return data;
}

// Add new event
export async function addEvent(eventData) {
  const { data, error } = await supabase
    .from("events")
    .insert([eventData])
    .single();
  if (error) throw error;
  return data;
}

// Update event
export async function updateEvent(id, eventData) {
  const { data, error } = await supabase
    .from("events")
    .update(eventData)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

// Delete event
export async function deleteEvent(id) {
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
