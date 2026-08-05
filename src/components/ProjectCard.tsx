import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import { ProjectShot } from "./ProjectShot";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("work");
  const copy = project[locale];

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface/40 transition-colors hover:border-accent/40">
      <Link href={`/work/${project.slug}`} className="block">
        <ProjectShot
          title={copy.title}
          src={project.images.thumbnail.src}
          alt={project.images.thumbnail.alt[locale]}
          aspectClassName={project.images.thumbnail.aspect}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {copy.title}
          </h3>
          <p className="text-sm text-muted">
            {project.classification[locale]}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-foreground/85">
          {copy.summary}
        </p>

        <ul className="flex flex-wrap gap-2 pt-1">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-sm">
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
  );
}
