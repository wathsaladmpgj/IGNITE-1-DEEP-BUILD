"use server";

import { supabase } from "@/lib/db";

export async function addEvent(formData: FormData) {
  const eventTitle = formData.get("event_title") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;
  const eventDate = formData.get("event_date") as string;

  if (!eventTitle || !description || !eventDate) {
    return { error: "Event title, description and event date are required.", success: false, message: "" };
  }

  try {
    const { error } = await supabase.from("eventdetails").insert({
      event_title: eventTitle,
      image: image || null,
      description,
      event_date: eventDate,
    });

    if (error) {
      return { error: error.message, success: false, message: "" };
    }

    return { error: "", success: true, message: "Event added successfully!" };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to add event.";
    return { error: message, success: false, message: "" };
  }
}
