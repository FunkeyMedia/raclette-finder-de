import type { Metadata } from "next";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImprintPage() {
  return (
    <StaticPage eyebrow="Rechtliches" title="Impressum" intro="Anbieterkennzeichnung und Kontakt für Raclette-Finder.">
      <article>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>Raclette-Finder<br />Inhaber: Pascal Weyers<br />Birkenwaldstr. 46<br />63179 Obertshausen<br />Deutschland</p>
        <h2>Kontakt</h2>
        <p>E-Mail: <a href="mailto:info@raclette-finder.de">info@raclette-finder.de</a></p>
        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE299749508</p>
        <h2>Verantwortlich für redaktionelle Inhalte</h2>
        <p>Pascal Weyers<br />Birkenwaldstr. 46<br />63179 Obertshausen</p>
      </article>
    </StaticPage>
  );
}
