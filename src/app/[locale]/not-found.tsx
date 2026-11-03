import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[50vh] flex-col items-start justify-center py-20">
      <p className="section-label">404</p>
      <h1 className="mt-4 text-section font-semibold text-foreground">{t("heading")}</h1>
      <p className="mt-3 text-muted">{t("description")}</p>
      <ButtonLink href="/#projetos" variant="secondary" className="mt-8">
        {t("cta")}
      </ButtonLink>
    </Container>
  );
}
