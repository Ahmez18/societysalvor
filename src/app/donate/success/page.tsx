// src/app/donate/success/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: { trackingId: string; ngo: string };
}) {
  const trackingId = searchParams.trackingId || "unknown";
  const ngoId = searchParams.ngo;

  const ngo = ngoId ? await prisma.nGO.findUnique({ where: { id: ngoId } }) : null;

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center">
        <span className="text-4xl">✓</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Donation Request Received!
      </h1>

      <p className="text-xl text-gray-600 mb-4">
        Your tracking ID: <span className="font-bold text-green-700">{trackingId}</span>
      </p>

      {ngo && (
        <p className="text-lg text-gray-700 mb-8">
          Your scrap will be donated to: <span className="font-bold">{ngo.name}</span>
        </p>
      )}

      <p className="text-gray-600 mb-10">
        Thank you for helping the community! Our rep will contact you for pickup.
      </p>

      <Link
        href="/track"
        className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700"
      >
        Track Your Donation
      </Link>

      <div className="mt-10">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}