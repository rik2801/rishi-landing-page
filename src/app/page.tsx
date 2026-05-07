import Link from "next/link";
import { PaletteSwitcher } from "@/components/palette-switcher";

const SITE = {
  name: "Rishi Kiran",
  descriptor: "Product x Design x AI.",
  bio: [
    "Rishi Kiran is a product builder focused on turning complex systems into usable decisions.",
    "He is currently building Duorin, an AI stylist now in beta, where calendar context, weather, and wardrobe signals come together to make everyday dressing feel intelligent and effortless.",
    "Previously, he worked across product design and software engineering, building systems informed by user behavior and real-world constraints.",
    "He is especially interested in AI products, decision-making systems, visual interfaces, and tools that feel alive.",
  ],
  links: {
    email: "mailto:rishikiranm1@gmail.com",
    linkedin: "https://linkedin.com/in/rishikiran28",
    github: "https://github.com/rik2801",
    gitlab: "https://gitlab.com/rishikiran.rik28",
    beta: "https://duorin.com",
  },
  caseStudies: [
    { title: "Duorin", href: "/case-studies/duorin" },
    { title: "They\u2019re Waiting", href: "/case-studies/theyre-waiting" },
    { title: "SnacknU", href: "/case-studies/snacknu" },
    { title: "CitizenX", href: "/case-studies/citizenx" },
  ],
  exploring: [
    "AI decision interfaces",
    "Behavioral systems",
    "Interfaces that feel alive",
  ],
};

function ExtLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { className, ...rest } = props;
  const href = rest.href ?? "";
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      {...rest}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className ? `link ${className}` : "link"}
    />
  );
}

export default function Home() {
  return (
    <div className="site-container">
      <nav className="palette-nav" aria-label="Theme colors">
        <div className="palette-glass-dock">
          <PaletteSwitcher />
        </div>
      </nav>

      {/* Name block — right-aligned, matching Sean's .blockright */}
      <div className="name-block">
        <span className="name-block-name">{SITE.name}</span>
        <br />
        <span className="name-block-descriptor">{SITE.descriptor}</span>
      </div>

      <div className="block-clear" />

      {/* Body text — large, matching Sean's .maintext */}
      <main className="main-text">
        {SITE.bio.map((p, i) => (
          <span key={i}>
            {i === 1
              ? p.split(/(Duorin)/).map((part, j) =>
                  part === "Duorin" ? (
                    <ExtLink key={j} href={SITE.links.beta} className="main-text-inline-link">
                      Duorin
                    </ExtLink>
                  ) : (
                    part
                  ),
                )
              : p}
            {i < SITE.bio.length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </span>
        ))}

        {/* Footer band — single grid row for left links + right metadata */}
        <div className="footer-band">
          <div className="mini-left">
            <div className="footer-links-row">
              <div className="footer-contact">
                <div className="mono-label">Contact</div>
                <ExtLink href={SITE.links.email}>E-Mail</ExtLink>
              </div>
              <div className="footer-social">
                <div className="mono-label">Social</div>
                <ExtLink href={SITE.links.linkedin}>LinkedIn</ExtLink>
              </div>
            </div>
            <div className="footer-building">
              <div className="mono-label">Git</div>
              <ExtLink href={SITE.links.gitlab}>GitLab</ExtLink>
            </div>
          </div>

          <div className="mini-right">
            <div className="mini-right-col">
              <Link href="/case-studies" className="meta-heading meta-heading--primary meta-heading-link">
                Case Studies:
              </Link>
              {SITE.caseStudies.map((item) => (
                <Link key={item.title} href={item.href} className="meta-link meta-link--primary">
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="mini-right-col">
              <div className="meta-heading meta-heading--secondary">Exploring:</div>
              {SITE.exploring.map((item) => (
                <span key={item} className="meta-item meta-item--secondary">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
