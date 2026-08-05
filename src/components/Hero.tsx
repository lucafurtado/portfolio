import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container>
        <p className="mb-4 flex items-center gap-2 text-sm text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {t("availability")}
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t("name")}
        </h1>
        <p className="mt-1 text-lg text-muted">{t("kicker")}</p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/#work"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t("ctaWork")}
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {t("ctaGithub")}
          </a>
        </div>
      </Container>
    </section>
  );
}
