// src/app/admin/schools/page.tsx
import { prisma } from "@/lib/prisma";
import SchoolForm from "@/components/SchoolForm";
import SchoolList from "@/components/SchoolList";

async function getSchools() {
  return prisma.school.findMany({
    include: {
      users: {
        where: { role: "SCHOOL" },
        select: { email: true, name: true }, // add name for better display
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function SchoolsAdminPage() {
  const schools = await getSchools();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">School Management (EcoChamp)</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New School</h2>
        <SchoolForm />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Registered Schools</h2>
        <SchoolList initialSchools={schools} />
      </div>
    </div>
  );
}