"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SEC,
  createToken,
  safeEqual,
} from "@/lib/auth-token";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.SESSION_SECRET) {
    return { error: "Admin login isn't set up yet (missing ADMIN_PASSWORD or SESSION_SECRET)." };
  }

  const password = String(formData.get("password") ?? "");
  if (!safeEqual(password, expected)) {
    // Slow down guessing a little. Add real rate limiting before going live.
    await new Promise((r) => setTimeout(r, 750));
    return { error: "Incorrect password." };
  }

  (await cookies()).set(SESSION_COOKIE, await createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SEC,
  });

  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/");
}
