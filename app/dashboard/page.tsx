"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/actions";

export default function DashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

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
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your club events and details
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Add Event */}
          <button
            onClick={() => {
              // TODO: navigate to add event page
            }}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:border-[#06c278] hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#06c278]/10 text-[#06c278] transition group-hover:bg-[#06c278] group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">Add Event</h2>
              <p className="mt-1 text-sm text-gray-500">
                Create and publish a new club event
              </p>
            </div>
          </button>

          {/* Club Details Update */}
          <button
            onClick={() => {
              router.push("/club-details");
            }}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition hover:border-[#06c278] hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#06c278]/10 text-[#06c278] transition group-hover:bg-[#06c278] group-hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Club Details Update
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Edit your club profile and information
              </p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
