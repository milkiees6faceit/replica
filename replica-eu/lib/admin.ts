export const ADMIN_EMAILS = ["milkiees6faceit@gmail.com"];

export function isAdminEmail(email: string) {
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
