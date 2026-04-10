import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const apercu = localFont({
  src: [
    { path: "../../public/Apercu-Font/Apercu Pro Light.otf", weight: "300", style: "normal" },
    { path: "../../public/Apercu-Font/Apercu Pro Light Italic.otf", weight: "300", style: "italic" },
    { path: "../../public/Apercu-Font/Apercu Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/Apercu-Font/Apercu Pro Italic.otf", weight: "400", style: "italic" },
    { path: "../../public/Apercu-Font/Apercu Pro Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/Apercu-Font/Apercu Pro Medium Italic.otf", weight: "500", style: "italic" },
    { path: "../../public/Apercu-Font/Apercu Pro Bold.otf", weight: "700", style: "normal" },
    { path: "../../public/Apercu-Font/Apercu Pro Bold Italic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-apercu",
  display: "swap",
});

const apercuMono = localFont({
  src: [
    { path: "../../public/Apercu-Font/Apercu Pro Mono.otf", weight: "400", style: "normal" },
  ],
  variable: "--font-apercu-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishi Kiran",
  description:
    "Product designer and builder focused on turning complex systems into usable decisions.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

const paletteScript = `(function(){try{var id=localStorage.getItem('palette')||'default';var s=document.documentElement.style;if(id==='custom'){var pc=localStorage.getItem('paletteCustom');if(pc){try{var o=JSON.parse(pc);if(o.bg&&o.fg){s.setProperty('--bg',o.bg);s.setProperty('--fg',o.fg);s.setProperty('--fg-muted',o.fg+'80');s.setProperty('--border-color',o.fg+'20');return}}catch(e){}}}var p={default:{b:'#ffffff',f:'#000000',m:'#6b6b6b',r:'#e0e0e0'},midnight:{b:'#111111',f:'#e8e8e6',m:'#8a8a8a',r:'#2a2a2a'},vermillion:{b:'#a01010',f:'#f0e8e0',m:'#d09088',r:'#881010'},amber:{b:'#f2a200',f:'#6a0d69',m:'#8a5800',r:'#d89000'},marine:{b:'#1843b4',f:'#fc6e0e',m:'#7090c8',r:'#143898'},violet:{b:'#9d19b3',f:'#8aff44',m:'#c890d8',r:'#881098'},jade:{b:'#21a87f',f:'#fefd75',m:'#78c8a8',r:'#1a9070'},sol:{b:'#E8E83A',f:'#1843b3',m:'#989810',r:'#d8d810'},azure:{b:'#1077f8',f:'#effb72',m:'#78b0f0',r:'#0c60d0'}};var t=p[id];if(t){s.setProperty('--bg',t.b);s.setProperty('--fg',t.f);s.setProperty('--fg-muted',t.m);s.setProperty('--border-color',t.r)}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${apercu.variable} ${apercuMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: paletteScript }} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
