import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Process } from "@/components/Process";
import { Journey } from "@/components/Journey";
import { StackSection } from "@/components/StackSection";
import { Lab } from "@/components/Lab";
import { Contact } from "@/components/Contact";
// Testimonials section removed from the home for now — component kept for later reuse.
// import { Testimonials } from "@/components/Testimonials";

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
      <Stats />
      <FeaturedWork />
      <Process />
      <Journey />
      <StackSection />
      <Lab />
      {/* <Testimonials /> */}
      <Contact />
    </>
  );
}
