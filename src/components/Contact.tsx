import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { site } from "@/content/site";

export function Contact() {
  const t = useTranslations("contact");
  const tHero = useTranslations("hero");

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border pt-20 sm:pt-28">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-display-md font-semibold tracking-tight text-foreground">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/85">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t("email")}
            </a>
          )}
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/80 underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:decoration-current"
            >
              {t("linkedin")}
            </a>
          )}
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground/80 underline decoration-transparent underline-offset-4 transition-colors duration-300 hover:decoration-current"
            >
              {t("github")}
            </a>
          )}
        </div>
      </Container>

      <Reveal className="mt-16 pb-12 sm:mt-24 sm:pb-16">
        <Container size="full">
          <p
            aria-hidden="true"
            className="select-none overflow-hidden whitespace-nowrap text-center text-display-xl font-semibold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-foreground)] opacity-40"
          >
            {tHero("name")}
          </p>
        </Container>
      </Reveal>
    </section>
  );
}
