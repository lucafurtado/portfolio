import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-4 py-10 text-sm text-muted sm:flex-row sm:justify-between">
        <p>
          © {year} Luca Furtado. {t("rights")}
        </p>
        <div className="flex items-center gap-5">
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          )}
          {site.linkedin && (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
          )}
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-foreground"
            >
              Email
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
