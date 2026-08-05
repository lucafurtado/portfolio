import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function About() {
  const t = useTranslations("about");
  const areas = t.raw("areas") as string[];

  return (
    <section id="about" className="scroll-mt-16 border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface">
              <Image
                src="/about/luca-portrait.jpg"
                alt="Luca Furtado"
                fill
                className="object-cover grayscale-[15%] transition-[filter] duration-500 hover:grayscale-0"
                sizes="(min-width: 1024px) 35vw, 90vw"
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {t("kicker")}
            </p>
            <h2 className="mt-2 text-display-md font-semibold tracking-tight text-foreground">
              {t("heading")}
            </h2>

            <div className="mt-8 max-w-md space-y-4 text-base leading-relaxed text-foreground/85">
              <p>{t("paragraph1")}</p>
              <p>{t("paragraph2")}</p>
              <p>{t("paragraph3")}</p>
            </div>

            <div className="mt-8 max-w-md">
              <p className="text-sm font-medium text-muted">{t("areasHeading")}</p>
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
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
