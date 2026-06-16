import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";

type SessionWithRole = Session & {
  user?: Session["user"] & {
    role?: string;
  };
};

export async function getAdminSession() {
  const session = (await getServerSession(authOptions)) as SessionWithRole | null;
  const role = session?.user?.role?.toLowerCase();
  const email = session?.user?.email ?? "";

  if (role === "admin" || isAdminEmail(email)) {
    return session;
  }

  return null;
}
