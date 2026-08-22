import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-width footer-grid">
        <div><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i /><i /></span><span>raclette<span>finder</span></span></Link><p>Weniger vergleichen. Besser zusammenkommen.</p></div>
        <div><h2>Entdecken</h2><Link href="/finder">Produktfinder</Link><Link href="/vergleich">Vergleich</Link><Link href="/ratgeber">Rezepte &amp; Ideen</Link><Link href="/produkte">Alle Geräte</Link></div>
        <div><h2>Vertrauen</h2><Link href="/so-funktionierts">So empfehlen wir</Link><Link href="/ueber-uns">Über uns</Link><Link href="/affiliate-transparenz">Affiliate-Transparenz</Link><Link href="/kontakt">Kontakt</Link></div>
        <div><h2>Rechtliches</h2><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><p className="affiliate-mini">Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.</p></div>
      </div>
      <div className="site-width footer-bottom"><span>© {new Date().getFullYear()} raclette-finder.de</span><span>Entscheidungshilfe, kein eigener Produkttest.</span></div>
    </footer>
  );
}
