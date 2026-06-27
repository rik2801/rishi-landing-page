import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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

const paletteScript = `(function(){try{function peCardText(b){var h=b.replace(/^#/,'').toLowerCase();if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];return h==='ffffff'?'#111111':b}var id=localStorage.getItem('palette')||'default';var s=document.documentElement.style;if(id==='custom'){var pc=localStorage.getItem('paletteCustom');if(pc){try{var o=JSON.parse(pc);if(o.bg&&o.fg){s.setProperty('--bg',o.bg);s.setProperty('--fg',o.fg);s.setProperty('--fg-muted',o.fg+'80');s.setProperty('--border-color',o.fg+'20');s.setProperty('--product-evolution-card-text',peCardText(o.bg));return}}catch(e){}}}var p={default:{b:'#ffffff',f:'#000000',m:'#6b6b6b',r:'#e0e0e0'},midnight:{b:'#111111',f:'#e8e8e6',m:'#8a8a8a',r:'#2a2a2a'}};if(!p[id]){id='default';try{localStorage.setItem('palette','default')}catch(e){}}var t=p[id];if(t){s.setProperty('--bg',t.b);s.setProperty('--fg',t.f);s.setProperty('--fg-muted',t.m);s.setProperty('--border-color',t.r);s.setProperty('--product-evolution-card-text',peCardText(t.b))}}catch(e){}})()`;

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
        <Script
          id="palette-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: paletteScript }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
