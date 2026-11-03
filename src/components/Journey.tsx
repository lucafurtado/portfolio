import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel, SectionTitle, StatusDot, Todo } from "./ui";

type Phase = { period: string; title: string; text: string };

function ProfileCard() {
  const t = useTranslations("profile");
  const rows = [
    { k: t("role"), v: t("roleValue") },
    { k: t("stack"), v: t("stackValue") },
  ];
  return (
    <aside className="rounded-xl border border-border bg-surface p-6">
      <p className="text-lg font-semibold text-foreground">Luca Furtado</p>
      <dl className="mt-6 space-y-4 border-t border-border pt-6 font-mono text-[13px]">
        {rows.map((row) => (
          <div key={row.k}>
            <dt className="text-muted">{row.k}</dt>
            <dd className="mt-1 text-foreground">{row.v}</dd>
          </div>
        ))}
        <div>
          <dt className="text-muted">{t("status")}</dt>
          <dd className="mt-1 flex items-center gap-2 text-foreground">
            <StatusDot />
            {t("statusValue")}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

export function Journey() {
  const t = useTranslations("journey");
  const items = t.raw("items") as Phase[];

  const period = (p: string) => (p ? p : <Todo>{t("todoPeriod")}</Todo>);

  return (
    <section id="trajetoria" className="section border-t border-border">
      <Container>
        <SectionLabel index={3}>{t("label")}</SectionLabel>
        <SectionTitle>{t("heading")}</SectionTitle>

        <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-[1fr_300px] lg:gap-16">
          <Reveal>
            <ol>
              {items.map((item, i) => (
                <li key={item.title} className="flex">
                  <div className="hidden w-[168px] shrink-0 pt-0.5 font-mono text-[13px] text-muted md:block">
                    {period(item.period)}
                  </div>
                  <div
                    className={`relative border-l border-border pl-6 ${i < items.length - 1 ? "pb-12" : ""}`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[4px] h-[7px] w-[7px] rounded-full bg-muted"
                    />
                    <div className="mb-3 font-mono text-[13px] text-muted md:hidden">{period(item.period)}</div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 max-w-[36rem] text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <ProfileCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
