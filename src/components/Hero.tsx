import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { site } from "@/content/site";

const CODE_SNIPPET = `function shipValue(problem) {
  const context = understand(problem);
  const stack = choose(context);
  return build(stack).until(problem.solved);
}`;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-24 pb-20 sm:pt-36 sm:pb-28">
      <Container size="wide">
        <div className="relative">
          <pre
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-2 hidden max-w-sm select-none font-mono text-[13px] leading-relaxed text-foreground/[0.06] lg:block xl:-right-16 xl:text-sm"
          >
            {CODE_SNIPPET}
          </pre>

          <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent sm:text-sm">
            {t("kicker")}
          </p>
          <h1 className="mt-3 font-display text-display-lg font-medium tracking-tight text-foreground">
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

          <p className="mt-14 font-mono text-xs text-muted sm:mt-16">
            {t("availability")}
          </p>
        </div>
      </Container>
    </section>
  );
}
