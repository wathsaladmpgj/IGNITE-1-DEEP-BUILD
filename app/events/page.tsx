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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-xl rounded-2xl bg-white p-10 shadow-lg dark:bg-zinc-900">
        <h1 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Add New Event
        </h1>

        {state.error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {state.error}
          </div>
        )}

        {state.success && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
            {state.message}
          </div>
        )}

        <form action={dispatch} className="flex flex-col gap-6">
          {/* Event Title */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="event_title"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="event_title"
              name="event_title"
              required
              placeholder="Enter event title"
              className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="image"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              placeholder="Describe the event..."
              className="resize-none rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
            />
          </div>

          {/* Event Date */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="event_date"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              required
              className="rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isPending ? "Adding Event..." : "Add Event"}
          </button>
        </form>
      </main>
    </div>
  );
}
