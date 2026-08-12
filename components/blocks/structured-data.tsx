import type { Dictionary } from "@/lib/i18n";

function toJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function StructuredData({ dict }: { dict: Dictionary }) {
  const org = dict.org;

  const organization = toJsonLd({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: org.name,
    parentOrganization: {
      "@type": "Organization",
      name: org.company,
    },
    description: dict.meta.description,
    telephone: org.telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: org.streetAddress,
      addressCountry: "ID",
    },
    areaServed: ["ID"],
    priceRange: "Rp",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: dict.tabs.ariaLabel,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: dict.tabs.validation.title },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: dict.tabs.generation.title },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: dict.tabs.translation.title },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: dict.tabs.sworn.title },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: dict.tabs.interpreter.title },
        },
      ],
    },
  });

  const faq = toJsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organization }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faq }}
      />
    </>
  );
}