// src/app/vehicle/success/page.tsx
export default function VehicleSuccessPage({
  searchParams,
}: {
  searchParams: { leadId: string };
}) {
  const leadId = searchParams.leadId || "unknown";

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center">
        <span className="text-4xl">✓</span>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-6">Lead Submitted!</h1>

      <p className="text-xl text-gray-600 mb-4">
        Your lead ID: <span className="font-bold text-green-700">{leadId}</span>
      </p>

      <p className="text-gray-600 mb-10">
        Our team will review your vehicle and contact you with the best offer and free pickup schedule.
      </p>

      <a href="/" className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700">
        Back to Home
      </a>
    </div>
  );
}