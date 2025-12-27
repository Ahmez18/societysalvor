// src/app/admin/scrap-items/page.tsx
import { prisma } from "@/lib/prisma";
import ScrapItemForm from "@/components/ScrapItemForm";
import ScrapItemList from "@/components/ScrapItemList";

async function getScrapItems() {
  return prisma.scrapItem.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function ScrapItemsPage() {
  const items = await getScrapItems();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Scrap Items & Pricing</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Scrap Item</h2>
        <ScrapItemForm />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Current Items</h2>
        <ScrapItemList initialItems={items} />
      </div>
    </div>
  );
}