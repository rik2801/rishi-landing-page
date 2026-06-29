export default function CaseStudiesClassicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="site-container site-container--case-studies">{children}</div>;
}
