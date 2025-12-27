// src/components/SchoolForm.tsx
"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function SchoolForm() {
  async function createSchool(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const contactName = formData.get("contactName") as string;
    const contactPhone = formData.get("contactPhone") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const schoolCode = "ECO-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const hashed = await hashPassword(password);

    const school = await prisma.school.create({
      data: {
        name,
        address: address || null,
        contact: contactName,
        code: schoolCode,
      },
    });

    await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: contactName,
        phone: contactPhone || null,
        role: "SCHOOL",
        schoolId: school.id,
      },
    });

    revalidatePath("/admin/schools");
  }

  return (
    <form action={createSchool} className="grid md:grid-cols-2 gap-4">
      <input name="name" placeholder="School Name" required className="px-4 py-2 border rounded-lg" />
      <input name="address" placeholder="School Address" className="px-4 py-2 border rounded-lg md:col-span-2" />
      <input name="contactName" placeholder="Contact Person Name" required className="px-4 py-2 border rounded-lg" />
      <input name="contactPhone" placeholder="Contact Phone" className="px-4 py-2 border rounded-lg" />
      <input name="email" type="email" placeholder="Login Email for School" required className="px-4 py-2 border rounded-lg" />
      <input name="password" type="password" placeholder="Password for School Login" required className="px-4 py-2 border rounded-lg" />

      <button type="submit" className="md:col-span-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
        Create School & Generate Code
      </button>
    </form>
  );
}