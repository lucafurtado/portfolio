import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { ChipList, SectionLabel, SectionTitle } from "./ui";

type Group = { name: string; items: string[] };

export function StackSection() {
  const t = useTranslations("stack");
  const groups = t.raw("groups") as Group[];

  return (
    <section className="section border-t border-border">
      <Container>
        <SectionLabel index={4}>{t("label")}</SectionLabel>
        <SectionTitle>{t("heading")}</SectionTitle>

        <Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {groups.map((group) => (
              <div key={group.name}>
                <h3 className="section-label">{group.name}</h3>
                <ChipList items={group.items} className="mt-4" />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
