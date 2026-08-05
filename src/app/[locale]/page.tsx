import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Capabilities />
      <Contact />
    </>
  );
}
