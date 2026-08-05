import { useTranslations } from "next-intl";
import { Container } from "./Container";

export function About() {
  const t = useTranslations("about");
  const areas = t.raw("areas") as string[];

  return (
    <section id="about" className="scroll-mt-16 border-b border-border py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-accent">
              {t("kicker")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {t("heading")}
            </h2>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-foreground/85">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3")}</p>

            <div className="pt-2">
              <p className="text-sm font-medium text-muted">
                {t("areasHeading")}
              </p>
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
          </div>
        </div>
      </Container>
    </section>
  );
}
