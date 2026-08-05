import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { LanguageSwitcher } from "./LanguageSwitcher";

const GITHUB_URL = "https://github.com/lucafurtado";

export function Nav() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          Luca Furtado
        </Link>

        <nav className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/#work"
            className="hidden text-sm text-muted transition-colors hover:text-foreground sm:inline"
          >
            {t("work")}
          </Link>
          <Link
            href="/#about"
            className="hidden text-sm text-muted transition-colors hover:text-foreground sm:inline"
          >
            {t("about")}
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {t("github")}
          </a>
          <Link
            href="/#contact"
            className="rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t("contact")}
          </Link>
          <LanguageSwitcher />
        </nav>
      </Container>
    </header>
  );
}
