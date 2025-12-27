// src/app/track/[trackingId]/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getOrder(trackingId: string) {
  return prisma.order.findUnique({
    where: { publicId: trackingId },
    include: {
      ngo: true,
      items: {
        include: {
          scrapItem: true,
        },
      },
    },
  });
}

export default async function TrackResultPage({
  params,
}: {
  params: { trackingId: string };
}) {
  const order = await getOrder(params.trackingId.toUpperCase());

  if (!order) {
    notFound();
  }

  const statusOrder = ["CREATED", "ASSIGNED", "PICKED_UP", "WEIGHED", "COMPLETED", "CANCELLED"] as const;
  const currentIndex = statusOrder.indexOf(order.status);
  const isCancelled = order.status === "CANCELLED";

  const timeline = statusOrder.map((status) => ({
    status,
    completed: isCancelled ? status === "CANCELLED" : statusOrder.indexOf(status) <= currentIndex,
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-sm text-gray-600">Tracking ID</p>
        <p className="text-4xl font-bold text-green-700 mb-6">{order.publicId}</p>
        <p className="text-2xl font-semibold">
          Current Status: <span className={isCancelled ? "text-red-600" : "text-green-600"}>
            {order.status.replace("_", " ")}
          </span>
        </p>

        {order.type === "DONATION" && order.ngo && (
          <div className="mt-8">
            <p className="text-lg text-gray-700">Donated to:</p>
            <p className="text-3xl font-bold text-green-700">{order.ngo.name}</p>
            {order.ngo.description && <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{order.ngo.description}</p>}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-8 text-center">Status Timeline</h2>
        <div className="space-y-6">
          {timeline.map((step, index) => (
            <div key={step.status} className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${step.completed ? "bg-green-600" : "bg-gray-300"}`}>
                {step.completed ? "✓" : index + 1}
              </div>
              <div className="flex-1 pb-8 relative">
                <p className={`text-xl font-medium ${step.completed ? "text-gray-800" : "text-gray-400"}`}>
                  {step.status.replace("_", " ")}
                </p>
                {index < timeline.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-1 bg-gray-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6">Pickup Details</h3>
          <div className="space-y-3 text-lg">
            <p><strong>Date:</strong> {new Date(order.pickupDate).toLocaleDateString()}</p>
            <p><strong>Contact:</strong> {order.contactName}</p>
            <p><strong>Phone:</strong> {order.contactPhone}</p>
            <p><strong>Address:</strong> {order.pickupAddress}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6">Items</h3>
          <ul className="space-y-3 text-lg">
            {order.items.map((item) => (
              <li key={item.id}>
                <strong>{item.scrapItem.name}:</strong> {item.estimatedQty.toString()} {item.scrapItem.unit}
                {item.actualQty && (
                  <span className="text-green-600 ml-2">
                    → {item.actualQty.toString()} {item.scrapItem.unit} (actual)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link href="/track" className="text-blue-600 hover:underline text-lg">
          ← Track Another Order
        </Link>
      </div>
    </div>
  );
}