import { useTranslations } from "next-intl";
import { Container } from "./Container";

const groups: { key: "frontend" | "backend" | "data" | "workflow"; items: string[] }[] = [
  { key: "frontend", items: ["React", "TypeScript", "JavaScript"] },
  { key: "backend", items: ["Node.js", "Python", "REST APIs"] },
  { key: "data", items: ["PostgreSQL", "Supabase"] },
  { key: "workflow", items: ["Git", "Vercel"] },
];

export function Capabilities() {
  const t = useTranslations("capabilities");

  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container>
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("heading")}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {groups.map((group) => (
            <div key={group.key}>
              <p className="text-sm font-medium text-muted">{t(group.key)}</p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-foreground/90">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
