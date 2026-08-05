import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

const groups: { key: "frontend" | "backend" | "data" | "workflow"; items: string[] }[] = [
  { key: "frontend", items: ["React", "TypeScript", "JavaScript"] },
  { key: "backend", items: ["Node.js", "Python", "REST APIs"] },
  { key: "data", items: ["PostgreSQL", "Supabase"] },
  { key: "workflow", items: ["Git", "Vercel"] },
];

export function Capabilities() {
  const t = useTranslations("capabilities");

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-display-md font-semibold tracking-tight text-foreground">
          {t("heading")}
        </h2>

        <div className="mt-12 border-t border-border">
          {groups.map((group, i) => (
            <Reveal key={group.key} delay={i * 80}>
              <div className="grid grid-cols-[2.5rem_auto] items-baseline gap-x-5 gap-y-2 border-b border-border py-6 sm:grid-cols-[3.5rem_9rem_1fr] sm:items-center sm:gap-x-8">
                <span className="text-sm font-medium tabular-nums text-foreground/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-heading-lg font-semibold uppercase tracking-tight text-foreground">
                  {t(group.key)}
                </span>
                <ul className="col-span-2 flex flex-wrap gap-x-4 gap-y-1 sm:col-span-1 sm:justify-self-end">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
