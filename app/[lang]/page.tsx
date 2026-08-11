import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BottomNav } from "@/components/bottom-nav";
import { ServiceSection } from "@/components/service-section";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);

  return (
    <>
      <SiteHeader dict={dict} />

      <main
        id="top"
        className="mx-auto max-w-[1240px] px-4 pt-10 pb-[88px] sm:px-6 lg:px-10"
      >
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <h1 className="text-[26px] leading-8 font-bold tracking-[-0.02em] text-ink text-balance sm:text-[34px] sm:leading-[42px]">
            {dict.hero.title}
          </h1>
          <p className="max-w-[680px] text-base leading-[26px] text-body text-pretty">
            {dict.hero.subtitle}
          </p>
        </div>

        <ServiceSection dict={dict} />
      </main>

      <SiteFooter dict={dict} />
      <BottomNav dict={dict} />
    </>
  );
}
