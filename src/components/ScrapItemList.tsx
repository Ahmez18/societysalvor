// src/components/ScrapItemList.tsx
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Props = {
  initialItems: Awaited<ReturnType<typeof prisma.scrapItem.findMany>>;
};

async function toggleActive(id: string, active: boolean) {
  "use server";
  await prisma.scrapItem.update({
    where: { id },
    data: { active: !active },
  });
  revalidatePath("/admin/scrap-items");
}

export default async function ScrapItemList({ initialItems }: Props) {
  // In case of concurrent edits, refetch (but initialItems is fine for SSR)
  const items = initialItems;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Unit</th>
            <th className="p-4">Base Price</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.unit}</td>
              <td className="p-4">₹{item.basePrice.toString()}</td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-sm ${item.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {item.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="p-4">
                <form action={toggleActive.bind(null, item.id, item.active)}>
                  <button type="submit" className="text-blue-600 hover:underline">
                    {item.active ? "Deactivate" : "Activate"}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && (
        <p className="text-center py-8 text-gray-500">No scrap items yet. Add one above!</p>
      )}
    </div>
  );
}