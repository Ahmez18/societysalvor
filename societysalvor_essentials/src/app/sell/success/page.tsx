// src/app/sell/success/page.tsx
import Link from "next/link";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { trackingId: string };
}) {
  const trackingId = searchParams.trackingId || "unknown";

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center">
        <span className="text-4xl">✓</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Pickup Request Received!
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Your tracking ID: <span className="font-bold text-green-700">{trackingId}</span>
      </p>

      <p className="text-gray-600 mb-10">
        Our rep will contact you soon to confirm the pickup. Final payout will be based on actual weight.
      </p>

      <Link
        href="/track"
        className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700"
      >
        Track Your Order
      </Link>

      <div className="mt-10">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}