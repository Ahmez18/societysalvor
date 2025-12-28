// src/actions/authActions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");

  // This line sends the user to home with a query parameter
  redirect("/?loggedout=true");
}