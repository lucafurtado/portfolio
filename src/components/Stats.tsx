import { useTranslations } from "next-intl";
import { Container } from "./Container";

type Stat = { value: string; label: string };

export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Stat[];

  return (
    <section aria-label={t("label")}>
      <Container>
        {/* gap-px over a border-colored background draws the 1px dividers in both 4- and 2-column layouts. */}
        <dl className="grid grid-cols-2 gap-px border-y border-border bg-border md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 bg-background px-4 py-8 md:px-6 md:py-10">
              <dt className="order-2 text-[15px] leading-snug text-muted">{item.label}</dt>
              <dd className="order-1 font-mono text-stat font-medium text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
