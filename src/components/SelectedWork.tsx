import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/content/projects";

export function SelectedWork() {
  const t = useTranslations("work");

  return (
    <section id="work" className="scroll-mt-16 border-b border-border py-16 sm:py-20">
      <Container>
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("heading")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
