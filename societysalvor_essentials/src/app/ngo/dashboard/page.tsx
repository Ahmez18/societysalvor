// src/app/ngo/dashboard/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getCurrentNGO() {
  const token = (await cookies()).get("auth-token")?.value;
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = Buffer.from(payloadBase64, "base64url").toString();
    const payload = JSON.parse(payloadJson);
    if (payload.role !== "NGO") return null;

    return await prisma.nGO.findFirst({
      where: { users: { some: { id: payload.userId } } },
    });
  } catch {
    return null;
  }
}

export default async function NGODashboard() {
  const ngo = await getCurrentNGO();

  if (!ngo) {
    return <p className="text-center py-20">Unauthorized or NGO not found</p>;
  }

  if (ngo.status !== "APPROVED") {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Application Under Review</h1>
        <p className="text-xl text-gray-600">
          Your NGO application is pending approval. You will be notified when approved.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Welcome, {ngo.name}
      </h1>
      <p className="text-center text-xl text-gray-600 mb-12">
        Your NGO is approved! Donation impact metrics coming soon.
      </p>
    </div>
  );
}