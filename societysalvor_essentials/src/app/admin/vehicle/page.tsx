// src/app/admin/vehicle/page.tsx
import { prisma } from "@/lib/prisma";
import VehicleLeadList from "@/components/VehicleLeadList";

async function getLeads() {
  return prisma.vehicleScrap.findMany({
    include: {
      rep: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getReps() {
  return prisma.user.findMany({
    where: { role: "REP" },
    select: { id: true, name: true, email: true },
  });
}

export default async function VehicleAdminPage() {
  const [leads, reps] = await Promise.all([getLeads(), getReps()]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Vehicle Scrap Leads</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <VehicleLeadList initialLeads={leads} reps={reps} />
      </div>
    </div>
  );
}