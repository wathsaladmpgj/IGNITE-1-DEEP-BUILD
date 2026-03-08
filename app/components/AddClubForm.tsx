// components/AddClubForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { registerClub } from "@/app/actions/add-club";

export default function AddClubForm() {
  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await registerClub(clubName, email, password);

      if (!result.success) {
        setError(result.message);
      } else {
        setSuccess("Club registered successfully!");
        // Clear form after successful submission
        setClubName("");
        setEmail("");
        setPassword("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Optional Component Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#06c278]">
          <span className="text-xl font-bold text-white">N</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          NSBM N-Connect
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Register a new club and its chairperson
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Club Name */}
          <div>
            <label
              htmlFor="clubName"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Club Name
            </label>
            <input
              id="clubName"
              type="text"
              required
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="e.g. Software Engineering Circle"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Club Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Messages */}
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#06c278] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#05a566] focus:outline-none focus:ring-2 focus:ring-[#06c278]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register Club"}
          </button>
        </form>
      </div>
    </div>
  );
}