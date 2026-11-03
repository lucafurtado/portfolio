import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { ButtonA, SectionLabel, SectionTitle, StatusDot } from "./ui";
import { site } from "@/content/site";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contato" className="section border-t border-border">
      <Container>
        <SectionLabel index={6}>{t("label")}</SectionLabel>
        <SectionTitle className="flex max-w-[40rem] items-baseline gap-3">
          <span className="relative -top-1">
            <StatusDot />
          </span>
          {t("heading")}
        </SectionTitle>
        <p className="mt-4 max-w-[36rem] text-lead text-muted">{t("description")}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonA href={`mailto:${site.email}`}>{t("email")}</ButtonA>
          <ButtonA href={site.linkedin} external variant="secondary">
            {t("linkedin")}
          </ButtonA>
          <ButtonA href={site.cv} download variant="secondary">
            {t("cv")}
          </ButtonA>
        </div>
        <p className="mt-6 font-mono text-[13px] text-muted">
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </p>
      </Container>
    </section>
  );
}
