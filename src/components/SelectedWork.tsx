import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { homeProjects } from "@/content/projects";

export function SelectedWork() {
  const t = useTranslations("work");
  const cases = homeProjects();

  return (
    <section id="work" className="scroll-mt-16 py-20 sm:py-28">
      <Container size="wide">
        <p className="font-mono text-sm uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 font-display text-display-md font-medium tracking-tight text-foreground">
          {t("heading")}
        </h2>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-28">
          {cases.map((project, i) => (
            <FeaturedProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
