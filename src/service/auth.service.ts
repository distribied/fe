import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "admin_session";

export interface AdminUser {
  username: string;
}

export async function verifyCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error("Admin credentials not configured in env");
    return false;
  }

  return username === adminUsername && password === adminPassword;
}

export async function createSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function getSession(): Promise<boolean> {
  const cookieStore = cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === "authenticated";
}
