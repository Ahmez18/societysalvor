// src/app/admin/ngos/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import NGOList from "@/components/NGOList";
import CreateNGOButton from "@/components/CreateNGOButton";

async function getNGOs() {
  return prisma.nGO.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function AdminNGOsPage() {
  const ngos = await getNGOs();

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">Manage NGOs</h1>
        <CreateNGOButton />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">All NGOs ({ngos.length})</h2>
        {ngos.length === 0 ? (
          <p className="text-center text-gray-600 py-8 bg-white rounded-lg shadow">
            No NGOs yet. Click "Create New NGO" to add one!
          </p>
        ) : (
          <NGOList initialNGOs={ngos} />
        )}
      </div>
    </div>
  );
}