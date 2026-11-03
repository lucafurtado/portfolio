import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/Container";
import { ProjectShot } from "@/components/ProjectShot";
import { FlowDiagram } from "@/components/FlowDiagram";
import { VideoEmbed } from "@/components/VideoEmbed";
import { ButtonA, ButtonLink, ChipList, Todo } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProject, projects, type Project } from "@/content/projects";
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

type T = Awaited<ReturnType<typeof getTranslations>>;

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
  const isFeatured = project.tier === "featured";

  return (
    <article className="pt-12 pb-20 md:pt-16 md:pb-32">
      <Container>
        <Link href="/#projetos" className="link font-mono text-[13px] text-muted hover:text-foreground">
          ← {tWork("backToWork")}
        </Link>

        <header className="mt-10 max-w-[44rem]">
          <p className={`section-label ${BADGE_ACCENT[project.category] ? "!text-accent" : ""}`}>
            {tWork(BADGE_KEY[project.category])}
          </p>
          <p className="mt-3 text-[15px] text-muted">{project.classification[loc]}</p>
          <h1 className="mt-2 text-section font-semibold text-foreground">{copy.title}</h1>
          <p className="mt-4 text-lead text-muted">{copy.summary}</p>
        </header>

        <Media project={project} loc={loc} t={t} />

        {isFeatured ? <FeaturedBody project={project} loc={loc} t={t} /> : <LegacyBody project={project} loc={loc} t={t} />}

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="text-xl font-semibold text-foreground">{t("ctaHeading")}</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/#projetos" variant="secondary">
              {t("ctaProjects")}
            </ButtonLink>
            <ButtonLink href="/#contato">{t("ctaContact")}</ButtonLink>
          </div>
        </div>
      </Container>
    </article>
  );
}

/* ---------- Media: video (when set), screenshots, fictitious-data note ---------- */

function Media({ project, loc, t }: { project: Project; loc: "en" | "pt"; t: T }) {
  const copy = project[loc];
  const imgs = project.images;
  return (
    <div className="mt-10 space-y-6">
      <VideoEmbed src={project.videoEmbedUrl} title={`${t("video")}: ${copy.title}`} />
      {imgs && (
        <>
          <ProjectShot
            title={copy.title}
            src={imgs.thumbnail.src}
            alt={imgs.thumbnail.alt[loc]}
            aspectClassName={imgs.thumbnail.aspect}
          />
          {(imgs.secondary || imgs.mobile) && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-[2fr_1fr]">
              {imgs.secondary && (
                <ProjectShot
                  title={copy.title}
                  src={imgs.secondary.src}
                  alt={imgs.secondary.alt[loc]}
                  aspectClassName={imgs.secondary.aspect}
                  sizes="(min-width: 1080px) 680px, 100vw"
                />
              )}
              {imgs.mobile && (
                <ProjectShot
                  title={copy.title}
                  src={imgs.mobile.src}
                  alt={imgs.mobile.alt[loc]}
                  aspectClassName={imgs.mobile.aspect}
                  className="mx-auto w-full max-w-[220px] sm:mx-0"
                  sizes="220px"
                />
              )}
            </div>
          )}
        </>
      )}
      {project.sampleDataNote && <p className="font-mono text-[13px] text-muted">* {t("sampleData")}</p>}
    </div>
  );
}

/* ---------- Featured format: Problem → Solution → How it works → Stack → Result → What I learned ---------- */

function FeaturedBody({ project, loc, t }: { project: Project; loc: "en" | "pt"; t: T }) {
  const copy = project[loc];
  const problem = copy.problem ?? copy.challenge ?? "";
  const solution = copy.solution ?? copy.approach ?? "";
  const result = copy.result ?? copy.outcome ?? "";

  return (
    <div className="mt-16 space-y-12">
      <Block heading={t("problem")}>
        <p>{problem}</p>
      </Block>
      <Block heading={t("solution")}>
        <p>{solution}</p>
      </Block>
      {copy.howItWorks && (
        <div>
          <h2 className="section-label">{t("howItWorks")}</h2>
          {/* Diagram can use the full content width. */}
          <div className="mt-4 rounded-xl border border-border bg-surface p-4 md:p-6">
            <FlowDiagram steps={copy.howItWorks} label={t("howItWorks")} />
          </div>
        </div>
      )}
      <Block heading={t("stack")}>
        <ChipList items={project.stack} />
      </Block>
      <Block heading={t("result")}>
        <p>{result}</p>
        {/* TODO: add result numbers for this project (see resultNeedsNumbers in projects.ts). */}
        {project.resultNeedsNumbers && (
          <p className="mt-4">
            <Todo>{t("todoResult")}</Todo>
          </p>
        )}
      </Block>
      <Testimonial project={project} loc={loc} t={t} />
      <Block heading={t("learned")}>
        {/* TODO: fill `learned` in projects.ts. */}
        {copy.learned ? <p>{copy.learned}</p> : <Todo>{t("todoLearned")}</Todo>}
      </Block>
      <Links project={project} loc={loc} t={t} />
    </div>
  );
}

/* ---------- Lab + archived cases keep their original structure ---------- */

function LegacyBody({ project, loc, t }: { project: Project; loc: "en" | "pt"; t: T }) {
  const copy = project[loc];
  const isLean = Boolean(copy.challenge);

  return (
    <div className="mt-16 space-y-12">
      {isLean ? (
        <>
          <Block heading={t("challenge")}>
            <p>{copy.challenge}</p>
          </Block>
          <Block heading={t("approach")}>
            <p>{copy.approach}</p>
          </Block>
          <Block heading={t("outcome")}>
            <p>{copy.outcome}</p>
          </Block>
        </>
      ) : (
        <>
          <Block heading={t("overview")}>
            <p>{copy.overview}</p>
          </Block>
          <Block heading={t("context")}>
            <p>{copy.context}</p>
          </Block>
          <Block heading={t("approach")}>
            <p>{copy.approach}</p>
          </Block>
          <Block heading={t("whatIBuilt")}>
            <ul className="space-y-2">
              {copy.whatIBuilt?.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-muted" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>
          <Block heading={t("technical")}>
            <p>{copy.technical}</p>
          </Block>
          <Block heading={t("outcome")}>
            <p>{copy.outcome}</p>
          </Block>
        </>
      )}
      <Block heading={t("stack")}>
        <ChipList items={project.stack} />
      </Block>
      <Testimonial project={project} loc={loc} t={t} />
      <Links project={project} loc={loc} t={t} />
    </div>
  );
}

/* ---------- Shared pieces ---------- */

function Block({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="max-w-[44rem]">
      <h2 className="section-label">{heading}</h2>
      <div className="mt-4 text-foreground">{children}</div>
    </section>
  );
}

function Testimonial({ project, loc, t }: { project: Project; loc: "en" | "pt"; t: T }) {
  if (!project.testimonial) return null;
  return (
    <figure className="max-w-[44rem] border-l border-border pl-6">
      <p className="section-label">{t("testimonialLabel")}</p>
      <blockquote className="mt-4 text-lg leading-relaxed text-foreground">
        “{project.testimonial.quote[loc]}”
      </blockquote>
      <figcaption className="mt-4 font-mono text-[13px] text-muted">
        {project.testimonial.author} · {project.testimonial.role[loc]}
      </figcaption>
    </figure>
  );
}

function Links({ project, loc, t }: { project: Project; loc: "en" | "pt"; t: T }) {
  return (
    <section className="max-w-[44rem]">
      <h2 className="section-label">{t("links")}</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {project.liveUrl && (
          <ButtonA href={project.liveUrl} external>
            {t("liveProject")} ↗
          </ButtonA>
        )}
        {project.githubUrl && (
          <ButtonA href={project.githubUrl} external variant="secondary">
            {t("sourceCode")} ↗
          </ButtonA>
        )}
      </div>
      {!project.liveUrl && !project.githubUrl && <p className="text-muted">{t("noPublicLink")}</p>}
      {project.liveNote && <p className="mt-4 text-[15px] text-muted">{project.liveNote[loc]}</p>}
    </section>
  );
}
