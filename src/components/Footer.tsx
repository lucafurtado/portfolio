import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { site } from "@/content/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  const links = [
    { href: site.github, label: "GitHub", external: true },
    { href: site.linkedin, label: "LinkedIn", external: true },
    { href: `mailto:${site.email}`, label: "E-mail", external: false },
  ];

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 font-mono text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Luca Furtado. {t("rights")}
        </p>
        <ul className="flex items-center gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="link hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
