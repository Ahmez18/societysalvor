// src/app/rep/dashboard/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getCurrentRepId() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    return payload.role === "REP" ? payload.userId : null;
  } catch {
    return null;
  }
}

async function getAssignedOrders(repId: string | null) {
  if (!repId) return [];

  return prisma.order.findMany({
    where: { repId },
    include: { items: { include: { scrapItem: true } } },
    orderBy: { pickupDate: "asc" },
  });
}

export default async function RepDashboard() {
  const repId = await getCurrentRepId();
  const orders = await getAssignedOrders(repId);

  if (!repId) {
    return <p className="text-center py-20">Unauthorized</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Assigned Pickups
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No pickups assigned yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold">Order {order.publicId}</h3>
              <p>Type: {order.type}</p>
              <p>Pickup: {new Date(order.pickupDate).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Items: {order.items.length}</p>
              {/* Add buttons for PICKED_UP, WEIGHED, COMPLETED */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}