import { useLocale, useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { testimonialProjects } from "@/content/projects";

export function Testimonials() {
  const locale = useLocale() as "en" | "pt";
  const t = useTranslations("testimonials");
  const projects = testimonialProjects();

  if (projects.length === 0) return null;

  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <p className="font-mono text-sm uppercase tracking-wide text-accent">{t("kicker")}</p>
        <h2 className="mt-2 font-display text-display-md font-medium tracking-tight text-foreground">
          {t("heading")}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
          {projects.map((project, i) => {
            const testimonial = project.testimonial!;
            return (
              <Reveal key={project.slug} delay={i * 100}>
                <blockquote className="flex h-full flex-col justify-between rounded-lg border border-border bg-surface p-8">
                  <p className="font-display text-xl italic leading-relaxed text-foreground">
                    “{testimonial.shortQuote[locale]}”
                  </p>
                  <footer className="mt-6 font-mono text-xs text-muted">
                    <span className="text-foreground">{testimonial.author}</span>
                    {" · "}
                    {testimonial.role[locale]}
                  </footer>
                </blockquote>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
