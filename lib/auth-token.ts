// Minimal signed session token: "admin.<base64url email>.<expiresAtMs>.<hmac>".
// Uses Web Crypto so it works in both proxy.ts and server code.
// Low-implementation auth: one admin account (ADMIN_EMAIL + ADMIN_PASSWORD).

export const SESSION_COOKIE = "hh_admin";
export const SESSION_MAX_AGE_SEC = 60 * 60 * 8; // 8 hours

const enc = new TextEncoder();
const dec = new TextDecoder();

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  }
  return secret;
}

function bytesToBase64Url(bytes: Uint8Array) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToString(b64: string) {
  const bin = atob(b64.replace(/-/g, "+").replace(/_/g, "/"));
  return dec.decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

async function sign(data: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return bytesToBase64Url(new Uint8Array(sig));
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

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function createToken(email: string) {
  const exp = Date.now() + SESSION_MAX_AGE_SEC * 1000;
  const payload = `admin.${bytesToBase64Url(enc.encode(normalizeEmail(email)))}.${exp}`;
  return `${payload}.${await sign(payload)}`;
}

// Returns the signed-in email, or null if the token is missing/invalid/expired.
export async function verifyToken(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const i = token.lastIndexOf(".");
  if (i < 0) return null;
  const payload = token.slice(0, i);
  const [role, emailB64, exp, ...rest] = payload.split(".");
  if (role !== "admin" || !emailB64 || rest.length || !(Number(exp) > Date.now())) return null;
  try {
    if (!safeEqual(token.slice(i + 1), await sign(payload))) return null;
    return base64UrlToString(emailB64);
  } catch {
    return null;
  }
}
