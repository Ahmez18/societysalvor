// src/app/donate/page.tsx
import { prisma } from "@/lib/prisma";
import DonateScrapForm from "@/components/DonateScrapForm";

async function getData() {
  const [items, ngos] = await Promise.all([
    prisma.scrapItem.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    }),
    prisma.nGO.findMany({
      where: { status: "APPROVED" },
      orderBy: { name: "asc" },
    }),
  ]);

  const plainItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    unit: item.unit,
    basePrice: Number(item.basePrice), // ← Convert Decimal to number
  }));

  return { items: plainItems, ngos };
}

export default async function DonatePage() {
  const { items, ngos } = await getData();

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        Donate Scrap to NGO
      </h1>

      <DonateScrapForm items={items} ngos={ngos} />
    </div>
  );
}