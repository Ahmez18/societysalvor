// src/app/admin/reps/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import RepForm from "@/components/RepForm";

async function getReps() {
  return prisma.user.findMany({
    where: { role: "REP" },
    select: { id: true, name: true, email: true, phone: true },
  });
}

export default async function AdminRepsPage() {
  const reps = await getReps();

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Manage Field Reps
      </h1>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Add New Rep</h2>
        <RepForm />
      </div>

      <h2 className="text-2xl font-bold mb-6">Current Reps</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reps.map((rep) => (
          <div key={rep.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold">{rep.name}</h3>
            <p className="text-gray-600">{rep.email}</p>
            <p className="text-gray-600">{rep.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}