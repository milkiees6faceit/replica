import { isAdminEmail } from "@/lib/admin";

type SupabaseAuthPayload = {
  nickname: string;
  email: string;
  password: string;
  telegramUsername?: string;
  dateOfBirth?: string;
};

type SupabaseAuthMode = "register" | "login";

const telegramPattern = /^@?[A-Za-z0-9_]{5,32}$/;

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase auth is not configured");
  }

  return { url: url.replace(/\/$/, ""), anonKey };
}

function getAge(dateOfBirth: string) {
  const birthDate = new Date(`${dateOfBirth}T00:00:00.000Z`);
  if (Number.isNaN(birthDate.getTime())) return 0;

  const today = new Date();
  let age = today.getUTCFullYear() - birthDate.getUTCFullYear();
  const monthDiff = today.getUTCMonth() - birthDate.getUTCMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getUTCDate() < birthDate.getUTCDate())) {
    age -= 1;
  }

  return age;
}

export function validateSupabaseAuthPayload(payload: SupabaseAuthPayload, mode: SupabaseAuthMode) {
  const email = payload.email.trim().toLowerCase();
  const nickname = payload.nickname.trim();
  const telegramUsername = payload.telegramUsername?.trim() ?? "";
  const dateOfBirth = payload.dateOfBirth?.trim() ?? "";

  if (!email.endsWith("@gmail.com")) {
    return { error: "Only Gmail addresses are accepted." };
  }

  if (payload.password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (mode === "register") {
    if (!/^[A-Za-z0-9_]{3,32}$/.test(nickname)) {
      return { error: "Nickname must be 3-32 characters and use letters, numbers, or underscore." };
    }

    if (!telegramPattern.test(telegramUsername)) {
      return { error: "Telegram username must be 5-32 characters." };
    }

    if (!dateOfBirth || getAge(dateOfBirth) < 14) {
      return { error: "You must be at least 14 years old to register." };
    }
  }

  return {
    data: {
      email,
      password: payload.password,
      nickname,
      telegramUsername,
      dateOfBirth
    }
  };
}

export async function registerWithSupabase(payload: SupabaseAuthPayload) {
  const validation = validateSupabaseAuthPayload(payload, "register");
  if ("error" in validation) return { error: validation.error, status: 400 };

  const { url, anonKey } = getSupabaseConfig();
  const role = isAdminEmail(validation.data.email) ? "admin" : "user";
  const response = await fetch(`${url}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: validation.data.email,
      password: validation.data.password,
      data: {
        nickname: validation.data.nickname,
        telegram_username: validation.data.telegramUsername,
        date_of_birth: validation.data.dateOfBirth,
        replica_eu_role: role,
        is_admin: role === "admin"
      }
    })
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    return { error: body.msg ?? body.error_description ?? "Registration failed.", status: response.status };
  }

  return { data: { ...body, replica_eu_role: role }, status: 200 };
}

export async function loginWithSupabase(payload: SupabaseAuthPayload) {
  const validation = validateSupabaseAuthPayload(payload, "login");
  if ("error" in validation) return { error: validation.error, status: 400 };

  const { url, anonKey } = getSupabaseConfig();
  const role = isAdminEmail(validation.data.email) ? "admin" : "user";
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: validation.data.email,
      password: validation.data.password
    })
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    return { error: body.msg ?? body.error_description ?? "Login failed.", status: response.status };
  }

  return { data: { ...body, replica_eu_role: role }, status: 200 };
}
