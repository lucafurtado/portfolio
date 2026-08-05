import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="scroll-mt-16 py-16 sm:py-20">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/85">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t("email")}
            </a>
          )}
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("linkedin")}
            </a>
          )}
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("github")}
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
