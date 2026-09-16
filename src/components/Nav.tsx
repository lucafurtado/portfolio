"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { site } from "@/content/site";

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = [
    { href: "/#work", label: t("work") },
    { href: "/#about", label: t("about") },
    { href: "/#contact", label: t("contact") },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? "border-border bg-background"
            : "border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-display text-lg italic text-foreground"
          >
            Luca Furtado
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("menuClose") : t("menuOpen")}
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-foreground"
          >
            {open ? t("menuClose") : t("menuOpen")}
            <span className="relative flex h-3 w-5 flex-col justify-between">
              <span
                className={`block h-px w-full bg-foreground transition-transform duration-300 ${
                  open ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-full bg-foreground transition-transform duration-300 ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pt-28 pb-10 transition-opacity duration-300 sm:px-8 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-1">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={`font-display text-4xl tracking-tight text-foreground transition-all duration-300 sm:text-6xl ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 60 + 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className={`font-display text-4xl tracking-tight text-foreground transition-all duration-300 sm:text-6xl ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${links.length * 60 + 80}ms` : "0ms" }}
          >
            {t("github")}
          </a>
        </nav>

        <div className="flex items-center justify-between font-mono text-xs text-muted">
          <span>© {new Date().getFullYear()}</span>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  );
}
