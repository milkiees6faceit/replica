"use client";

import { useEffect, useState } from "react";
import { Activity, CheckCircle2, CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";

type HealthResponse = {
  status: "ready" | "needs_setup";
  checks: Record<string, boolean>;
  updatedAt: string;
};

export function ReleaseStatus() {
  const t = useTranslations("admin");
  const [health, setHealth] = useState<HealthResponse | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((response) => response.json())
      .then(setHealth)
      .catch(() => setHealth(null));
  }, []);

  const checks = health ? Object.entries(health.checks) : [];

  return (
    <section className="rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_16px_60px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#6C5CE7]">{t("releaseStatusEyebrow")}</p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">{t("releaseStatus")}</h2>
        </div>
        <Badge className={health?.status === "ready" ? "border-0 bg-emerald-500 text-white" : "border-0 bg-amber-500 text-white"}>
          {health?.status === "ready" ? t("ready") : t("needsSetup")}
        </Badge>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {checks.length ? (
          checks.map(([name, ok]) => (
            <div key={name} className="flex items-center justify-between rounded-2xl bg-muted p-3 text-sm font-black">
              <span>{t(`health.${name}`)}</span>
              {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <CircleAlert className="h-4 w-4 text-amber-600" />}
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2 rounded-2xl bg-muted p-3 text-sm font-black text-muted-foreground">
            <Activity className="h-4 w-4" />
            {t("checkingRelease")}
          </div>
        )}
      </div>
    </section>
  );
}
