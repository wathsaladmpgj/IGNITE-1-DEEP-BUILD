"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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

  const cookieStore = await cookies();
  cookieStore.set("user_id", data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return {
    success: true,
    message: "Login successful",
    user: { id: data.id, email: data.email, club_name: data.club_name },
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
}

export async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("user_id")?.value ?? null;
}

export async function getClubDetails() {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Not logged in", data: null };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("club_details")
    .select("*")
    .eq("user", userId)
    .single();

  if (error || !data) {
    return { success: true, message: "No club details found", data: null };
  }

  return { success: true, message: "Club details found", data };
}

export async function upsertClubDetails(formData: {
  club_name: string;
  description: string;
  image_url: string;
  whatsapp_link: string;
  linkedin_link: string;
  facebook_link: string;
}) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Not logged in" };

  const supabase = await createClient();

  // Check if a record already exists for this user
  const { data: existing } = await supabase
    .from("club_details")
    .select("id")
    .eq("user", userId)
    .single();

  if (existing) {
    // Update
    const { error } = await supabase
      .from("club_details")
      .update({ ...formData })
      .eq("id", existing.id);

    if (error) return { success: false, message: error.message };
    return { success: true, message: "Club details updated successfully" };
  } else {
    // Insert
    const { error } = await supabase
      .from("club_details")
      .insert({ ...formData, user: userId });

    if (error) return { success: false, message: error.message };
    return { success: true, message: "Club details added successfully" };
  }
}
