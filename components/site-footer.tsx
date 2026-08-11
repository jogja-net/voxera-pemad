import type { Dictionary } from "@/lib/i18n";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const quickLinks = [
    { label: dict.footer.linkHome, href: "#top" },
    { label: dict.footer.linkAbout, href: "#top" },
    { label: dict.footer.linkServices, href: "#services" },
    { label: dict.footer.linkContact, href: "#contact" },
  ];

  return (
    <footer id="contact" className="bg-footer px-4 pt-[72px] pb-[120px] text-footer-line sm:px-6 md:pb-10 lg:px-10">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-12">
        <div className="flex flex-col gap-3">
          <span className="text-2xl font-bold tracking-[-0.02em] text-white">
            VOXERA
          </span>
          <span className="text-[15px] leading-6 text-footer-faint">
            {dict.footer.tagline}
          </span>
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="font-mono text-xs tracking-[0.12em] text-footer-muted">
            {dict.footer.quickLinksHeading}
          </span>
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15px] text-footer-line transition-colors hover:text-brand-light"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3.5">
          <span className="font-mono text-xs tracking-[0.12em] text-footer-muted">
            {dict.footer.addressHeading}
          </span>
          <span className="text-[15px] leading-6 text-footer-line">
            PT PéMad International Transearch
          </span>
          <span className="text-[15px] leading-6 text-footer-faint">
            Ruko Trimukti Square
            <br />
            Jl. Kaliurang Km. 10, Jl. Ngalangan Raya No. 8-10
          </span>
          <span className="text-[15px] leading-6 text-footer-faint">
            {dict.footer.phone}
          </span>
          <span className="text-[15px] leading-6 text-footer-faint">
            {dict.footer.hours}
          </span>
          <span className="text-[13px] leading-5 text-footer-muted">
            {dict.footer.hoursNote}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-white/12 pt-6">
        <span className="text-[13px] text-footer-muted">
          © {new Date().getFullYear()} Voxera — PT PéMad International Transearch.
        </span>
        <span className="font-mono text-xs tracking-[0.08em] text-footer-muted">
          {dict.footer.badge}
        </span>
      </div>
    </footer>
  );
}
