import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel, SectionTitle } from "./ui";

type Step = { title: string; text: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="section border-t border-border">
      <Container>
        <SectionLabel index={2}>{t("label")}</SectionLabel>
        <SectionTitle>{t("heading")}</SectionTitle>

        <Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="border-t border-border pt-6">
                <span className="font-mono text-[13px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
