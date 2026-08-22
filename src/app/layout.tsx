import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });

export const metadata: Metadata = {
  metadataBase: new URL("https://raclette-finder.de"),
  title: { default: "Raclette Finder – Finde das Raclette, das zu euch passt", template: "%s | Raclette Finder" },
  description: "Der transparente Raclette-Finder für Deutschland: persönlich, nachvollziehbar und in weniger als einer Minute zur passenden Empfehlung.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "de_DE", siteName: "Raclette Finder", title: "Das Raclette, das zu euch passt.", description: "Persönlich, transparent und in weniger als einer Minute zur passenden Empfehlung.", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Das Raclette, das zu euch passt – raclettefinder" }] },
  twitter: { card: "summary_large_image", title: "Das Raclette, das zu euch passt.", description: "Persönlich, transparent und in weniger als einer Minute zur passenden Empfehlung.", images: ["/og.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
        <SiteHeader />
        <div id="main-content">{children}</div><SiteFooter />
      </body>
    </html>
  );
}
