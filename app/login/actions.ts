"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SEC,
  createToken,
  normalizeEmail,
  safeEqual,
} from "@/lib/auth-token";

export type LoginState = { error?: string; email?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword || !process.env.SESSION_SECRET) {
    return {
      error: "Admin login isn't set up yet (missing ADMIN_EMAIL, ADMIN_PASSWORD, or SESSION_SECRET).",
    };
  }

  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  // Check both, always, so the response doesn't reveal which one was wrong.
  const emailOk = safeEqual(email, normalizeEmail(expectedEmail));
  const passwordOk = safeEqual(password, expectedPassword);
  if (!emailOk || !passwordOk) {
    // Slow down guessing a little. Add real rate limiting before going live.
    await new Promise((r) => setTimeout(r, 750));
    return { error: "Incorrect email or password.", email };
  }

  (await cookies()).set(SESSION_COOKIE, await createToken(email), {
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
