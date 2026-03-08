import { supabase } from "@/lib/db";
import Link from "next/link";

export const revalidate = 0;

export default async function EventListPage() {
  const { data: events, error } = await supabase
    .from("eventdetails")
    .select("*")
    .order("event_date", { ascending: false });

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 py-16 dark:bg-black">
      <main className="w-full max-w-3xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Events
          </h1>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error.message}
          </div>
        )}

        {!error && (!events || events.length === 0) && (
          <div className="rounded-lg border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">
              No events yet. Add your first event!
            </p>
          </div>
        )}

        {events && events.length > 0 && (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex gap-5">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.event_title ?? "Event"}
                      className="h-28 w-28 flex-shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col gap-2">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {event.event_title}
                    </h2>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {event.description}
                    </p>
                    <p className="mt-auto text-xs font-medium text-zinc-400 dark:text-zinc-500">
                      {new Date(event.event_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
