import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import { ProjectShot } from "./ProjectShot";
import { FlowDiagram } from "./FlowDiagram";
import { ChipList, cardClass } from "./ui";
import { BADGE_KEY, BADGE_ACCENT } from "@/lib/projectBadge";

export function FeaturedProjectCard({ project }: { project: Project }) {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("work");
  const tCase = useTranslations("caseStudy");
  const copy = project[locale];
  const href = `/work/${project.slug}` as const;

  return (
    <article className={`relative p-4 md:p-6 ${cardClass}`}>
      {project.images ? (
        <ProjectShot
          title={copy.title}
          src={project.images.thumbnail.src}
          alt={project.images.thumbnail.alt[locale]}
          aspectClassName={project.images.thumbnail.aspect}
        />
      ) : copy.howItWorks ? (
        <div className="rounded-lg border border-border p-4 md:p-6">
          <p className="section-label mb-4">{tCase("howItWorks")}</p>
          <FlowDiagram steps={copy.howItWorks} label={tCase("howItWorks")} compact />
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <p className={`section-label ${BADGE_ACCENT[project.category] ? "!text-accent" : ""}`}>
            {t(BADGE_KEY[project.category])}
          </p>
          <h3 className="mt-3 text-[22px] font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-2xl">
            {/* Stretched link: the whole card opens the case study. */}
            <Link href={href} className="after:absolute after:inset-0 after:rounded-xl">
              {copy.title}
            </Link>
          </h3>
        </div>

        <div className="flex flex-col gap-5 md:col-span-7">
          <p className="text-foreground">{copy.summary}</p>
          <ChipList items={project.stack} />
          <p className="text-[15px] font-medium text-accent">
            {t("caseStudy")} <span aria-hidden="true">→</span>
          </p>
        </div>
      </div>
    </article>
  );
}
