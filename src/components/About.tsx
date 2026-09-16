import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function About() {
  const t = useTranslations("about");
  const tHero = useTranslations("hero");
  const areas = t.raw("areas") as string[];

  return (
    <section id="about" className="scroll-mt-16 border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-lg border border-border bg-surface p-8">
              <span
                aria-hidden="true"
                className="font-display text-[6rem] italic leading-none text-foreground sm:text-[7.5rem]"
              >
                LF
              </span>
              <dl className="space-y-2.5 border-t border-border pt-4 font-mono text-xs text-muted">
                <div className="flex items-baseline justify-between gap-4">
                  <dt>role</dt>
                  <dd className="text-right text-foreground">{tHero("kicker")}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt>stack</dt>
                  <dd className="text-right text-foreground">{t("meta.stack")}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt>status</dt>
                  <dd className="text-right text-foreground">{tHero("availability")}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-mono text-sm uppercase tracking-wide text-accent">
              {t("kicker")}
            </p>
            <h2 className="mt-2 font-display text-display-md font-medium tracking-tight text-foreground">
              {t("heading")}
            </h2>

            <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-foreground/85">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
            </div>

            <div className="mt-8 max-w-md">
              <p className="font-mono text-sm text-muted">{t("areasHeading")}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-border px-3 py-1 text-sm text-foreground/90"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/#contact"
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              {t("cta")}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
