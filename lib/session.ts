import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifyToken } from "./auth-token";

// Returns the signed-in admin's email, or null.
export async function getAdminEmail() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifyToken(token);
}

// Call at the top of every admin page and admin Server Action.
// proxy.ts also guards /admin, but never rely on the proxy alone.
export async function requireAdmin() {
  const email = await getAdminEmail();
  if (!email) redirect("/login");
  return email;
}
