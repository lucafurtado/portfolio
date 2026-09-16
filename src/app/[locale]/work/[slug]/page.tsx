import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { ProjectShot } from "@/components/ProjectShot";
import { VideoPlaceholder } from "@/components/VideoPlaceholder";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProject, projects } from "@/content/projects";
import { BADGE_KEY, BADGE_ACCENT } from "@/lib/projectBadge";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const copy = project[locale as "en" | "pt"];
  const path = locale === routing.defaultLocale ? `/work/${slug}` : `/${locale}/work/${slug}`;

  return {
    title: copy.title,
    description: copy.summary,
    alternates: {
      canonical: path,
      languages: {
        en: `/work/${slug}`,
        pt: `/pt/work/${slug}`,
        "x-default": `/work/${slug}`,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.summary,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const loc = locale as "en" | "pt";
  const copy = project[loc];
  const t = await getTranslations({ locale, namespace: "caseStudy" });
  const tWork = await getTranslations({ locale, namespace: "work" });
  const accent = BADGE_ACCENT[project.category];
  const isLean = Boolean(copy.challenge);

  return (
    <article className="py-16 sm:py-20">
      <Container>
        <Link
          href="/#work"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← {tWork("backToWork")}
        </Link>

        <header className="mt-6">
          <span
            className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider ${
              accent ? "text-accent" : "text-muted"
            }`}
          >
            <span
              className={`h-3 w-[3px] ${accent ? "bg-accent" : "bg-border"}`}
              aria-hidden="true"
            />
            {tWork(BADGE_KEY[project.category])}
          </span>
          <p className="mt-2 font-mono text-sm uppercase tracking-wide text-muted">
            {project.classification[loc]}
          </p>
          <h1 className="mt-2 font-display text-heading-lg font-medium tracking-tight text-foreground">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/85">
            {copy.summary}
          </p>
        </header>

        {project.videoPlaceholder ? (
          <div className="mt-10 max-w-3xl">
            <VideoPlaceholder label={tWork("videoPlaceholder")} />
          </div>
        ) : project.images ? (
          <>
            <div className="mt-10">
              <ProjectShot
                title={copy.title}
                src={project.images.thumbnail.src}
                alt={project.images.thumbnail.alt[loc]}
                aspectClassName={project.images.thumbnail.aspect}
                className="max-w-3xl"
              />
            </div>

            {(project.images.secondary || project.images.mobile) && (
              <div className="mt-6 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-[2fr_1fr]">
                {project.images.secondary && (
                  <ProjectShot
                    title={copy.title}
                    src={project.images.secondary.src}
                    alt={project.images.secondary.alt[loc]}
                    aspectClassName={project.images.secondary.aspect}
                  />
                )}
                {project.images.mobile && (
                  <ProjectShot
                    title={copy.title}
                    src={project.images.mobile.src}
                    alt={project.images.mobile.alt[loc]}
                    aspectClassName={project.images.mobile.aspect}
                    className="mx-auto w-full max-w-[220px] sm:mx-0"
                  />
                )}
              </div>
            )}
          </>
        ) : null}

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            {isLean ? (
              <>
                <Section heading={t("challenge")} body={copy.challenge!} />
                <Section heading={t("approach")} body={copy.approach} />
                <Section heading={t("outcome")} body={copy.outcome} />

                {project.testimonial && (
                  <blockquote className="border-l-2 border-accent pl-6">
                    <p className="font-mono text-xs uppercase tracking-wide text-muted">
                      {t("testimonialLabel")}
                    </p>
                    <p className="mt-3 font-display text-xl italic leading-relaxed text-foreground">
                      “{project.testimonial.quote[loc]}”
                    </p>
                    <footer className="mt-3 font-mono text-xs text-muted">
                      <span className="text-foreground">{project.testimonial.author}</span>
                      {" · "}
                      {project.testimonial.role[loc]}
                    </footer>
                  </blockquote>
                )}
              </>
            ) : (
              <>
                <Section heading={t("overview")} body={copy.overview!} />
                <Section heading={t("context")} body={copy.context!} />
                <Section heading={t("approach")} body={copy.approach} />

                <div>
                  <h2 className="font-mono text-sm uppercase tracking-wide text-muted">
                    {t("whatIBuilt")}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {copy.whatIBuilt!.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-base leading-relaxed text-foreground/85"
                      >
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Section heading={t("technical")} body={copy.technical!} />
                <Section heading={t("outcome")} body={copy.outcome} />
              </>
            )}

            <div className="border-t border-border pt-10">
              <h2 className="font-display text-heading-lg font-medium tracking-tight text-foreground">
                {t("ctaHeading")}
              </h2>
              <Link
                href="/#contact"
                className="mt-4 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t("ctaButton")}
              </Link>
            </div>
          </div>

          <aside className="space-y-8 lg:border-l lg:border-border lg:pl-8">
            <div>
              <h2 className="font-mono text-sm uppercase tracking-wide text-muted">
                {t("stack")}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full bg-accent px-5 py-2.5 text-center text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  {t("liveProject")} ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-full border border-border px-5 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {t("sourceCode")} ↗
                </a>
              )}
              {!project.liveUrl && !project.githubUrl && (
                <p className="text-sm text-muted">{t("noPublicLink")}</p>
              )}
              {project.liveNote && (
                <p className="text-sm text-muted">{project.liveNote[loc]}</p>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function Section({ heading, body }: { heading: string; body: string }) {
  return (
    <div>
      <h2 className="font-mono text-sm uppercase tracking-wide text-muted">
        {heading}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-foreground/85">
        {body}
      </p>
    </div>
  );
}
