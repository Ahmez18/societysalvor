// src/actions/orderActions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSellOrder(formData: FormData) {
  try {
    const contactName = formData.get("contactName") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const pickupAddress = formData.get("pickupAddress") as string;
    const pickupDate = new Date(formData.get("pickupDate") as string);
    const eventId = formData.get("eventId") as string | null; // ← From form (optional)

    const items: { itemId: string; quantity: number }[] = [];
    const entries = Array.from(formData.entries());
    const temp: any = {};
    for (const [key, value] of entries) {
      const match = key.match(/items\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = match[1];
        const field = match[2];
        if (!temp[index]) temp[index] = {};
        temp[index][field] = value;
      }
    }
    Object.values(temp).forEach((i: any) => {
      items.push({
        itemId: i.itemId,
        quantity: Number(i.quantity),
      });
    });

    if (items.length === 0) {
      return { success: false, error: "No items selected" };
    }

    const order = await prisma.order.create({
      data: {
        type: "SELL",
        status: "CREATED",
        publicId: "SS" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        pickupAddress,
        pickupDate,
        contactName,
        contactPhone,
        eventId: eventId || null, // ← Save eventId for participation
        items: {
          create: items.map((i) => ({
            estimatedQty: i.quantity,
            scrapItem: { connect: { id: i.itemId } },
          })),
        },
      },
    });

    revalidatePath("/admin");

    return { success: true, publicId: order.publicId };
  } catch (error) {
    console.error("Create sell order error:", error);
    return { success: false, error: "Failed to create order" };
  }
}

export async function createDonateOrder(formData: FormData) {
  try {
    const ngoId = formData.get("ngoId") as string;
    const contactName = formData.get("contactName") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const pickupAddress = formData.get("pickupAddress") as string;
    const pickupDate = new Date(formData.get("pickupDate") as string);
    const eventId = formData.get("eventId") as string | null; // ← From form (optional)

    const items: { itemId: string; quantity: number }[] = [];
    const entries = Array.from(formData.entries());
    const temp: any = {};
    for (const [key, value] of entries) {
      const match = key.match(/items\[(\d+)\]\[(\w+)\]/);
      if (match) {
        const index = match[1];
        const field = match[2];
        if (!temp[index]) temp[index] = {};
        temp[index][field] = value;
      }
    }
    Object.values(temp).forEach((i: any) => {
      items.push({
        itemId: i.itemId,
        quantity: Number(i.quantity),
      });
    });

    if (items.length === 0) {
      return { success: false, error: "No items selected" };
    }

    const order = await prisma.order.create({
      data: {
        type: "DONATION",
        status: "CREATED",
        publicId: "DS" + Math.random().toString(36).substring(2, 10).toUpperCase(),
        pickupAddress,
        pickupDate,
        contactName,
        contactPhone,
        ngoId,
        eventId: eventId || null, // ← Save eventId for participation
        items: {
          create: items.map((i) => ({
            estimatedQty: i.quantity,
            scrapItem: { connect: { id: i.itemId } },
          })),
        },
      },
    });

    revalidatePath("/admin");

    return { success: true, publicId: order.publicId };
  } catch (error) {
    console.error("Create donate order error:", error);
    return { success: false, error: "Failed to create donation order" };
  }
}