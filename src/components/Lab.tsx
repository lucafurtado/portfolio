import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel, SectionTitle, cardClass } from "./ui";
import { labProjects } from "@/content/projects";

export function Lab() {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("lab");
  const tWork = useTranslations("work");

  return (
    <section className="section border-t border-border">
      <Container>
        <SectionLabel index={5}>{t("label")}</SectionLabel>
        <SectionTitle>{t("heading")}</SectionTitle>
        <p className="mt-3 text-muted">{t("subtitle")}</p>

        <Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {labProjects().map((project) => (
              <li key={project.slug} className={`relative p-5 ${cardClass}`}>
                <h3 className="font-medium text-foreground">
                  <Link
                    href={`/work/${project.slug}`}
                    className="after:absolute after:inset-0 after:rounded-xl"
                  >
                    {project[locale].title}
                  </Link>
                </h3>
                <p className="mt-1 text-[15px] leading-snug text-muted">{project.classification[locale]}</p>
                <div className="relative z-10 mt-4 flex gap-4 font-mono text-[13px]">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link text-accent">
                      {tWork("liveProject")} ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link text-accent">
                      {tWork("sourceCode")} ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
