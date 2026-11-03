import { useTranslations } from "next-intl";
import { Container } from "./Container";
import { ButtonA, ButtonLink, StatusDot } from "./ui";
import { site } from "@/content/site";

/* shipValue(problem) — muted keywords, accent on the two tokens that carry the idea. */
function CodeSnippet({ label }: { label: string }) {
  const kw = "text-muted";
  const ac = "text-accent";
  return (
    <figure className="rounded-xl border border-border bg-surface" aria-label={label}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-[12px] text-muted">
        ship-value.js
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11.5px] leading-[1.7] sm:text-[14px] text-foreground md:p-6">
        <code>
          <span className={kw}>function</span> <span className={ac}>shipValue</span>(problem) {"{"}
          {"\n  "}
          <span className={kw}>const</span> context = understand(problem);
          {"\n  "}
          <span className={kw}>const</span> stack = choose(context);
          {"\n  "}
          <span className={kw}>return</span> build(stack).until(problem.<span className={ac}>solved</span>);
          {"\n}"}
        </code>
      </pre>
    </figure>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="pt-20 pb-20 md:pt-32 md:pb-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <h1>
              <span className="block text-lg font-medium text-foreground md:text-xl">{t("name")}</span>
              <span className="mt-4 block text-hero font-semibold text-foreground">{t("title")}</span>
            </h1>

            <p className="mt-6 max-w-[38rem] text-lead text-muted">{t("subtitle")}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/#projetos">{t("ctaProjects")}</ButtonLink>
              <ButtonA href={site.cv} download variant="secondary">
                {t("ctaCv")}
              </ButtonA>
              <ButtonA href={site.linkedin} external variant="secondary">
                {t("ctaLinkedin")}
              </ButtonA>
            </div>

            <p className="mt-10 flex items-start gap-3 font-mono text-[13px] text-foreground">
              <span className="mt-[7px] flex">
                <StatusDot />
              </span>
              {t("status")}
            </p>
          </div>

          <CodeSnippet label={t("codeLabel")} />
        </div>
      </Container>
    </section>
  );
}
