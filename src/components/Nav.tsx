"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ButtonA } from "./ui";
import { site } from "@/content/site";

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "/#projetos", label: t("projects") },
    { href: "/#trajetoria", label: t("journey") },
    { href: "/#contato", label: t("contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
      >
        {t("skip")}
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label={t("home")}
          className="text-[15px] font-semibold tracking-[-0.01em] text-foreground"
        >
          Luca Furtado
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          <ul className="flex items-center gap-6 text-[14px]">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="link text-muted hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          <ButtonA href={site.cv} download variant="secondary" size="sm">
            {t("cv")}
          </ButtonA>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-11 items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-foreground md:hidden"
        >
          {open ? t("menuClose") : t("menuOpen")}
          <span aria-hidden="true" className="relative flex h-2.5 w-4 flex-col justify-between">
            <span
              className={`block h-px w-full bg-foreground transition-transform duration-200 ${open ? "translate-y-[4.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-full bg-foreground transition-transform duration-200 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <Container className="py-6">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center text-lg font-medium text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
              <LanguageSwitcher />
              <ButtonA href={site.cv} download variant="secondary" size="sm">
                {t("cv")}
              </ButtonA>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
