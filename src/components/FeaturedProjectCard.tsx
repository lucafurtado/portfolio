import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import { ProjectShot } from "./ProjectShot";
import { Reveal } from "./Reveal";

export function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("work");
  const copy = project[locale];

  return (
    <Reveal>
      <article className="group">
        <span
          aria-hidden="true"
          className="mb-2 block text-display-md font-semibold text-foreground/5"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <Link href={`/work/${project.slug}`} className="block overflow-hidden rounded-lg">
          <ProjectShot
            title={copy.title}
            src={project.images.thumbnail.src}
            alt={project.images.thumbnail.alt[locale]}
            aspectClassName={project.images.thumbnail.aspect}
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <p className="text-sm text-muted">{project.classification[locale]}</p>
            <h3 className="mt-1 text-heading-lg font-semibold tracking-tight text-foreground">
              {copy.title}
            </h3>
          </div>

          <div className="flex flex-col gap-4 sm:col-span-5">
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

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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
        </div>
      </article>
    </Reveal>
  );
}
