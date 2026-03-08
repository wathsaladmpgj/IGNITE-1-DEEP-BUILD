import { supabase } from "@/lib/db";

export const revalidate = 0;

export default async function EventListPage() {
  const { data: events, error } = await supabase
    .from("eventdetails")
    .select("*")
    .order("event_date", { ascending: false });

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

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse all upcoming and past events
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error.message}
          </div>
        )}

        {!error && (!events || events.length === 0) && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">No events yet. Add your first event!</p>
          </div>
        )}

        {events && events.length > 0 && (
          <div className="mt-8 flex flex-col gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#06c278] hover:shadow-md"
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
                    <h2 className="text-lg font-semibold text-gray-900">
                      {event.event_title}
                    </h2>
                    <p className="text-sm leading-relaxed text-gray-500">
                      {event.description}
                    </p>
                    <p className="mt-auto text-xs font-medium text-[#06c278]">
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
