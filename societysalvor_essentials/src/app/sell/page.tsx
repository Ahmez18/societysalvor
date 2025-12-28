// src/app/sell/page.tsx
import { prisma } from "@/lib/prisma";
import SellScrapForm from "@/components/SellScrapForm";

async function getData() {
  const [items, ongoingEvents] = await Promise.all([
    prisma.scrapItem.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    }),
    prisma.event.findMany({
      where: { status: "ONGOING" },
      include: { school: true },
      orderBy: { date: "asc" },
    }),
  ]);

  const plainItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    unit: item.unit,
    basePrice: Number(item.basePrice),
  }));

  const plainEvents = ongoingEvents.map((event) => ({
    id: event.id,
    name: event.name,
    school: { name: event.school.name },
  }));

  return { items: plainItems, ongoingEvents: plainEvents };
}

export default async function SellPage() {
  const { items, ongoingEvents } = await getData();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Sell Scrap</h1>
        <p className="text-gray-600">No scrap items available for collection right now.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sell Your Scrap</h1>
      <p className="text-center text-gray-600 mb-10">
        Select items, enter quantity estimate, and schedule a free pickup. Final payout based on actual weight.
      </p>

      <SellScrapForm items={items} ongoingEvents={ongoingEvents} />
    </div>
  );
}