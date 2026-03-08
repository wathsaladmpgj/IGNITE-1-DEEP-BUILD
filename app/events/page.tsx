"use client";

import { addEvent } from "./actions";
import { useActionState } from "react";

const initialState = { error: "", success: false, message: "" };

async function formAction(
  _prev: typeof initialState,
  formData: FormData
) {
  const result = await addEvent(formData);
  return result ?? initialState;
}

export default function EventsPage() {
  const [state, dispatch, isPending] = useActionState(formAction, initialState);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06c278]">
              <span className="text-lg font-bold text-white">N</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              NSBM N-Connect
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-6 py-12">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">
          Add New Event
        </h1>

        {state.error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {state.message}
          </div>
        )}

        <form action={dispatch} className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {/* Event Title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="event_title"
              className="text-sm font-medium text-gray-700"
            >
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="event_title"
              name="event_title"
              required
              placeholder="Enter event title"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="Describe the event..."
              className="resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Event Date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="event_date"
              className="text-sm font-medium text-gray-700"
            >
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              required
              className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-[#06c278] px-6 text-sm font-medium text-white transition-colors hover:bg-[#05a868] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Adding Event..." : "Add Event"}
          </button>
        </form>
      </main>
    </div>
  );
}
