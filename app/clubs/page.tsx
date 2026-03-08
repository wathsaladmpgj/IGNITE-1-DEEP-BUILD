import { supabase } from "@/lib/db";
import Link from "next/link";

export const revalidate = 0;

export default async function ClubListPage() {
  const { data: clubs, error } = await supabase
    .from("club_details")
    .select("id, club_name, image_url")
    .order("club_name", { ascending: true });

  const clubList = clubs ?? [];

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
          <div className="flex items-center gap-6">
            <Link href="/eventlist" className="text-sm font-medium text-gray-500 transition hover:text-gray-900">Events</Link>
            <Link href="/clubs" className="text-sm font-medium text-[#06c278]">Clubs</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Clubs</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse all registered clubs
        </p>

        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error.message}
          </div>
        )}

        {!error && clubList.length === 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">No clubs found.</p>
          </div>
        )}

        {clubList.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {clubList.map((club) => (
              <Link
                key={club.id}
                href={`/clubs/${club.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition hover:border-[#06c278] hover:shadow-md"
              >
                {club.image_url ? (
                  <img
                    src={club.image_url}
                    alt={club.club_name}
                    className="h-11 w-11 flex-shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06c278]/10 text-[#06c278] transition group-hover:bg-[#06c278] group-hover:text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                )}
                <span className="text-base font-semibold text-gray-900">
                  {club.club_name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
