import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { CompactProjectCard } from "./CompactProjectCard";
import { projects } from "@/content/projects";

export function SelectedWork() {
  const t = useTranslations("work");
  const featured = projects.filter((p) => p.featured);
  const compact = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="scroll-mt-16 py-20 sm:py-28">
      <Container size="wide">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-display-md font-semibold tracking-tight text-foreground">
          {t("heading")}
        </h2>

        <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-28">
          {featured.map((project, i) => (
            <FeaturedProjectCard key={project.slug} project={project} index={i} />
          ))}

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            {compact.map((project, i) => (
              <CompactProjectCard key={project.slug} project={project} delay={i * 100} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
