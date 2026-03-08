"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_login")
    .select("id, email, password_hash, club_name")
    .eq("email", email)
    .single();

  if (error || !data) {
    return { success: false, message: "Invalid email or password" };
  }

  if (password !== data.password_hash) {
    return { success: false, message: "Invalid email or password" };
  }

  return {
    success: true,
    message: "Login successful",
    user: { id: data.id, email: data.email, club_name: data.club_name },
  };
}
