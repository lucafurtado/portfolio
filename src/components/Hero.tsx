import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="pt-20 pb-20 sm:pt-32 sm:pb-28">
      <Container size="wide">
        <p className="flex items-center gap-2 text-xs text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {t("availability")}
        </p>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.15em] text-accent sm:text-sm">
          {t("kicker")}
        </p>
        <h1 className="mt-3 text-display-lg font-semibold tracking-tight text-foreground">
          {t("name")}
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href="/#work"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t("ctaWork")}
          </Link>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <span className="underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:decoration-current">
              {t("ctaGithub")}
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
