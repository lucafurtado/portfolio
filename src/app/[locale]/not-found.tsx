import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Container className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        {t("heading")}
      </h1>
      <p className="mt-3 text-base text-muted">{t("description")}</p>
      <Link
        href="/#work"
        className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        {t("cta")}
      </Link>
    </Container>
  );
}
