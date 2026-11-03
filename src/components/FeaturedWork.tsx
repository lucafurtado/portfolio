import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { FeaturedProjectCard } from "./FeaturedProjectCard";
import { Reveal } from "./Reveal";
import { SectionLabel, SectionTitle } from "./ui";
import { featuredProjects } from "@/content/projects";

export function FeaturedWork() {
  const t = useTranslations("work");

  return (
    <section id="projetos" className="section">
      <Container>
        <SectionLabel index={1}>{t("label")}</SectionLabel>
        <SectionTitle>{t("heading")}</SectionTitle>

        <div className="mt-12 flex flex-col gap-6 md:mt-16 md:gap-8">
          {featuredProjects().map((project) => (
            <Reveal key={project.slug}>
              <FeaturedProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
