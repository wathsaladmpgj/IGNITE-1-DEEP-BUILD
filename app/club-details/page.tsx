"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getClubDetails, upsertClubDetails } from "@/app/actions";

export default function ClubDetailsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [clubName, setClubName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      const result = await getClubDetails();
      if (result.data) {
        setClubName(result.data.club_name ?? "");
        setDescription(result.data.description ?? "");
        setImageUrl(result.data.image_url ?? "");
        setWhatsappLink(result.data.whatsapp_link ?? "");
        setLinkedinLink(result.data.linkedin_link ?? "");
        setFacebookLink(result.data.facebook_link ?? "");
      }
      setLoading(false);
    }
    fetchDetails();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage("");
    setSaving(true);

    const result = await upsertClubDetails({
      club_name: clubName,
      description,
      image_url: imageUrl,
      whatsapp_link: whatsappLink,
      linkedin_link: linkedinLink,
      facebook_link: facebookLink,
    });

    setIsError(!result.success);
    setMessage(result.message);
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading club details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06c278]">
              <span className="text-lg font-bold text-white">N</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              NSBM N-Connect
            </span>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-900"
          >
            &larr; Back to Dashboard
          </button>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Club Details</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update your club profile information
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {/* Club Name */}
          <div>
            <label
              htmlFor="club_name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Club Name
            </label>
            <input
              id="club_name"
              type="text"
              required
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder="Enter club name"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your club..."
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image_url"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              id="image_url"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">Social Links</p>

            <div>
              <label
                htmlFor="whatsapp"
                className="mb-1.5 block text-sm text-gray-500"
              >
                WhatsApp
              </label>
              <input
                id="whatsapp"
                type="url"
                value={whatsappLink}
                onChange={(e) => setWhatsappLink(e.target.value)}
                placeholder="https://chat.whatsapp.com/..."
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
              />
            </div>

            <div>
              <label
                htmlFor="linkedin"
                className="mb-1.5 block text-sm text-gray-500"
              >
                LinkedIn
              </label>
              <input
                id="linkedin"
                type="url"
                value={linkedinLink}
                onChange={(e) => setLinkedinLink(e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
              />
            </div>

            <div>
              <label
                htmlFor="facebook"
                className="mb-1.5 block text-sm text-gray-500"
              >
                Facebook
              </label>
              <input
                id="facebook"
                type="url"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-[#06c278] focus:ring-2 focus:ring-[#06c278]/20"
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`rounded-lg px-4 py-3 text-sm ${
                isError
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-[#06c278] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#05a566] focus:outline-none focus:ring-2 focus:ring-[#06c278]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Club Details"}
          </button>
        </form>
      </main>
    </div>
  );
}
