"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 font-mono text-[12px] tracking-[0.08em] text-muted">
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            lang={loc}
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={locale === loc ? "true" : undefined}
            aria-label={loc === "pt" ? "Português" : "English"}
            className={`min-h-8 px-1 transition-colors hover:text-foreground ${
              locale === loc ? "text-foreground" : ""
            }`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
