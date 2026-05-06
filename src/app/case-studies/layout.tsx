import { PaletteSwitcher } from "@/components/palette-switcher";

export default function CaseStudiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="site-container">
      <nav className="palette-nav" aria-label="Theme colors">
        <div className="palette-glass-dock">
          <PaletteSwitcher />
        </div>
      </nav>
      {children}
    </div>
  );
}
