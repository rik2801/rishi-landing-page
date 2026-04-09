import { ThemeToggle } from "@/components/theme-toggle";

/* ——————————————————————————————————————————————
   SITE CONTENT — edit names, links, and copy here.
   —————————————————————————————————————————————— */

const SITE = {
  name: "Rishi Kiran",
  descriptor: "Design, product, AI, interaction.",
  bio: [
    "Rishi Kiran is a product designer and builder focused on turning complex systems into usable decisions.",
    "He is currently building Duorin, an AI stylist now in beta, where calendar context, weather, wardrobe signals, and interaction design come together to make everyday dressing feel intelligent and effortless.",
    "Previously, he worked across UX design, research, and software engineering, designing systems and interfaces shaped by both user behavior and implementation reality.",
    "He is especially interested in AI products, decision-making interfaces, visual systems, and tools that feel alive.",
  ],
  links: {
    email: "mailto:your@email.com",       // ← replace with your email
    linkedin: "https://linkedin.com/in/", // ← replace with your LinkedIn URL
    github: "https://github.com/",        // ← replace with your GitHub URL
    beta: "https://duorin.com",           // ← replace with your beta URL
  },
  work: [
    { title: "Duorin", href: "#" },        // ← add project URL
    { title: "Treevah", href: "#" },       // ← add project URL
    { title: "Snack\u2019nU", href: "#" }, // ← add project URL
  ],
  colophon: ["Built by Rishi Kiran", "Next.js", "Tailwind CSS"],
};

/* ——————————————————————————————————————————————— */

function ExtLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      {...props}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="link"
    />
  );
}

function FooterBlock({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-[0.1em] text-muted mb-3">
        {heading}
      </h2>
      <div className="text-sm leading-relaxed space-y-1">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-[640px] px-6 sm:px-8">
      <nav className="flex justify-end pt-6 pb-16 md:pt-10 md:pb-24">
        <ThemeToggle />
      </nav>

      <main>
        <header>
          <h1 className="font-serif text-[2.5rem] md:text-[3.25rem] leading-[1.08] tracking-[-0.02em]">
            {SITE.name}
          </h1>
          <p className="mt-3 text-base md:text-lg text-muted tracking-[0.005em]">
            {SITE.descriptor}
          </p>
        </header>

        <section className="mt-12 md:mt-16 space-y-5 text-[1.0625rem] md:text-[1.125rem] leading-[1.72]">
          {SITE.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      </main>

      <footer className="mt-20 md:mt-32 pt-8 border-t border-rule">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-10">
          <FooterBlock heading="Contact">
            <ExtLink href={SITE.links.email}>Email</ExtLink>
          </FooterBlock>

          <FooterBlock heading="LinkedIn">
            <ExtLink href={SITE.links.linkedin}>LinkedIn</ExtLink>
          </FooterBlock>

          <FooterBlock heading="GitHub">
            <ExtLink href={SITE.links.github}>GitHub</ExtLink>
          </FooterBlock>

          <FooterBlock heading="Beta">
            <ExtLink href={SITE.links.beta}>Duorin Beta</ExtLink>
          </FooterBlock>

          <FooterBlock heading="Selected Work">
            {SITE.work.map((w) => (
              <div key={w.title}>
                <ExtLink href={w.href}>{w.title}</ExtLink>
              </div>
            ))}
          </FooterBlock>

          <FooterBlock heading="Colophon">
            {SITE.colophon.map((line) => (
              <p key={line} className="text-muted">
                {line}
              </p>
            ))}
          </FooterBlock>
        </div>

        <div className="pb-10 md:pb-16" />
      </footer>
    </div>
  );
}
