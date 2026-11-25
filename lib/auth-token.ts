// Minimal signed session token: "admin.<expiresAtMs>.<hmac>".
// Uses Web Crypto so it works in both proxy.ts and server code.
// Low-implementation auth: one shared admin password, no user accounts.

export const SESSION_COOKIE = "hh_admin";
export const SESSION_MAX_AGE_SEC = 60 * 60 * 8; // 8 hours

const enc = new TextEncoder();

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  }
  return secret;
}

function toBase64Url(buf: ArrayBuffer) {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

// Constant-time string comparison.
export function safeEqual(a: string, b: string) {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < Math.max(ab.length, bb.length); i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

export async function createToken() {
  const payload = `admin.${Date.now() + SESSION_MAX_AGE_SEC * 1000}`;
  return `${payload}.${await sign(payload)}`;
}

export async function verifyToken(token: string | undefined) {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const payload = token.slice(0, i);
  const [role, exp] = payload.split(".");
  if (role !== "admin" || !(Number(exp) > Date.now())) return false;
  try {
    return safeEqual(token.slice(i + 1), await sign(payload));
  } catch {
    return false;
  }
}
