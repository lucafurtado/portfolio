import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import { ProjectShot } from "./ProjectShot";
import { Reveal } from "./Reveal";

export function CompactProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("work");
  const copy = project[locale];

  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col gap-4">
        <Link href={`/work/${project.slug}`} className="block overflow-hidden rounded-lg">
          <ProjectShot
            title={copy.title}
            src={project.images.thumbnail.src}
            alt={project.images.thumbnail.alt[locale]}
            aspectClassName={project.images.thumbnail.aspect}
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground sm:text-xl">
              {copy.title}
            </h3>
            <p className="text-sm text-muted">{project.classification[locale]}</p>
          </div>

          <p className="text-sm leading-relaxed text-foreground/85">
            {copy.summary}
          </p>

          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm">
            <Link
              href={`/work/${project.slug}`}
              className="font-medium text-accent transition-opacity hover:opacity-80"
            >
              {t("caseStudy")} →
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {t("liveProject")} ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {t("sourceCode")} ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
