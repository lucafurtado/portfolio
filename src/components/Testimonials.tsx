import { useLocale, useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { SectionLabel, SectionTitle } from "./ui";
import { testimonialProjects } from "@/content/projects";

/** Not rendered on the home right now (commented out in page.tsx). Kept for later reuse. */
export function Testimonials() {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("testimonials");
  const projects = testimonialProjects();

  if (projects.length === 0) return null;

  return (
    <section className="section border-t border-border">
      <Container>
        <SectionLabel>{t("kicker")}</SectionLabel>
        <SectionTitle>{t("heading")}</SectionTitle>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => {
            const testimonial = project.testimonial!;
            return (
              <Reveal key={project.slug}>
                <figure className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-6">
                  <blockquote className="text-lg leading-relaxed text-foreground">
                    “{testimonial.shortQuote[locale]}”
                  </blockquote>
                  <figcaption className="mt-6 font-mono text-[13px] text-muted">
                    {testimonial.author} · {testimonial.role[locale]}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
