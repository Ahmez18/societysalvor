// src/components/VehicleLeadList.tsx
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Lead = {
  id: string;
  publicId: string;
  make: string;
  model: string;
  year: number;
  condition: string;
  phone: string;
  location: string;
  notes: string | null;
  status: string;
  repId: string | null;
  rep?: {
    name: string | null;
    email: string;
  } | null;
};

type Rep = { id: string; name: string | null; email: string };

type Props = {
  initialLeads: Lead[];
  reps: Rep[];
};

async function updateStatus(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  await prisma.vehicleScrap.update({
    where: { id },
    data: { status: status as any },
  });

  revalidatePath("/admin/vehicle");
}

async function assignRep(formData: FormData) {
  "use server";
  const id = formData.get("id") as string;
  const repId = formData.get("repId") as string | null;

  await prisma.vehicleScrap.update({
    where: { id },
    data: { repId: repId || null },
  });

  revalidatePath("/admin/vehicle");
}

export default async function VehicleLeadList({ initialLeads, reps }: Props) {
  const leads = initialLeads;

  const statusOptions = [
    "SUBMITTED",
    "UNDER_REVIEW",
    "APPROVED",
    "ASSIGNED",
    "COMPLETED",
    "REJECTED",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUBMITTED": return "bg-blue-100 text-blue-800";
      case "UNDER_REVIEW": return "bg-yellow-100 text-yellow-800";
      case "APPROVED": return "bg-green-100 text-green-800";
      case "ASSIGNED": return "bg-purple-100 text-purple-800";
      case "COMPLETED": return "bg-teal-100 text-teal-800";
      case "REJECTED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Lead ID</th>
            <th className="p-4">Vehicle</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Location</th>
            <th className="p-4">Status</th>
            <th className="p-4">Assigned Rep</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t hover:bg-gray-50">
              <td className="p-4 font-medium">{lead.publicId}</td>
              <td className="p-4">
                {lead.year} {lead.make} {lead.model}<br />
                <span className="text-sm text-gray-600">{lead.condition}</span>
              </td>
              <td className="p-4">
                {lead.phone}<br />
                {lead.notes && <span className="text-sm text-gray-600">{lead.notes}</span>}
              </td>
              <td className="p-4">{lead.location}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(lead.status)}`}>
                  {lead.status.replace("_", " ")}
                </span>
              </td>
              <td className="p-4">
                {lead.rep ? (lead.rep.name || lead.rep.email || "Rep") : "-"}
              </td>
              <td className="p-4 space-y-4">
                {/* Status Update Form */}
                <form action={updateStatus} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={lead.id} />
                  <select name="status" defaultValue={lead.status} className="px-3 py-1 border rounded text-sm">
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s.replace("_", " ")}</option>
                    ))}
                  </select>
                  <button type="submit" className="text-blue-600 hover:underline text-sm">
                    Update
                  </button>
                </form>

                {/* Rep Assignment Form */}
                <form action={assignRep} className="flex items-center gap-2">
                  <input type="hidden" name="id" value={lead.id} />
                  <select name="repId" defaultValue={lead.repId || ""} className="px-3 py-1 border rounded text-sm">
                    <option value="">Unassigned</option>
                    {reps.map((rep) => (
                      <option key={rep.id} value={rep.id}>
                        {rep.name || rep.email}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="text-blue-600 hover:underline text-sm">
                    Assign
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leads.length === 0 && (
        <p className="text-center py-12 text-gray-500">No vehicle leads yet.</p>
      )}
    </div>
  );
}