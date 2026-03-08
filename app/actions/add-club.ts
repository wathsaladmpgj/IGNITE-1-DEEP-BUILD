"use server";

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The 'export' keyword here is what fixes your ts(2305) error
export async function registerClub(clubName: string, email: string, password: string) {
  try {
    // Insert into the user_login table without hashing the password
    const { data, error } = await supabase
      .from('user_login')
      .insert([
        { 
          club_name: clubName, 
          email: email, 
          password_hash: password // Storing the raw password as requested
        }
      ])
      .select();

    if (error) {
      console.error("Supabase Error:", error);
      if (error.code === '23505') {
        return { success: false, message: "A club with this email already exists." };
      }
      return { success: false, message: "Failed to register club." };
    }

    return { success: true, message: "Club registered successfully!", data };

  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}