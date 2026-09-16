import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { site } from "@/content/site";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="scroll-mt-16 border-t border-border pt-20 sm:pt-28">
      <Container className="text-center">
        <p className="font-mono text-sm uppercase tracking-wide text-accent">
          {t("kicker")}
        </p>
        <h2 className="mt-2 font-display text-display-md font-medium tracking-tight text-foreground">
          {t("heading")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/85">
          {t("description")}
        </p>

        {site.email && (
          <a
            href={`mailto:${site.email}`}
            className="mt-10 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t("email")}
          </a>
        )}

        <div className="mx-auto mt-6 flex max-w-sm items-stretch justify-center gap-4">
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("linkedin")}
            </a>
          )}
          {site.upwork && (
            <a
              href={site.upwork}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {t("upwork")}
            </a>
          )}
        </div>
      </Container>

      <Reveal className="mt-16 pb-12 sm:mt-24 sm:pb-16">
        <Container>
          <p className="border-t border-border pt-6 text-center font-mono text-xs text-muted">
            {"// built by Luca Furtado, "}
            {new Date().getFullYear()}
          </p>
        </Container>
      </Reveal>
    </section>
  );
}
