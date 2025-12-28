// src/app/login/page.tsx
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { registered?: string; error?: string };
}) {
  async function loginAction(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true, role: true, schoolId: true },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      redirect("/login?error=invalid");
    }

    // Use the new signToken signature
    const token = signToken({
      userId: user.id,
      role: user.role,
      schoolId: user.schoolId || null,
    });

    const cookieStore = await cookies();
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    redirect("/");
  }

  const error = searchParams.error;
  const registered = searchParams.registered;

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Login</h1>

        {registered && (
          <p className="text-green-600 text-center mb-6 font-medium">
            Registration successful! Please log in.
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center mb-6">Invalid credentials</p>
        )}

        <form action={loginAction} className="space-y-6">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}