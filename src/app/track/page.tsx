// src/app/track/page.tsx
import TrackOrderForm from "@/components/TrackOrderForm";

export default function TrackPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Track Your Order</h1>
      <p className="text-center text-gray-600 mb-10">
        Enter your tracking ID to see the current status and timeline.
      </p>

      <TrackOrderForm />
    </div>
  );
}