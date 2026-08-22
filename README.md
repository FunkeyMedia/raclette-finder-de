# raclette-finder.de

Eine deutschsprachige Produktempfehlungs-, Finder- und Vergleichswebsite für Raclette-Geräte. Das Projekt übersetzt dokumentierte Produktmerkmale in nachvollziehbare Empfehlungen und finanziert sich transparent über gekennzeichnete Amazon-Affiliate-Links.

## Funktionen

- geführter Finder und Schnellmodus mit lokal gespeichertem Zwischenstand
- regelbasierter Match-Score mit sichtbaren Gründen und Einschränkungen
- beste Gesamtempfehlung, preisbewusste Alternative und Premium-/Spezialalternative
- Vergleich von zwei bis vier Geräten ohne Preis- oder Testversprechen
- 200 statisch erzeugte Gerätedetailseiten und 50 vorbereitete Zubehördatensätze
- Kaufberatung, Methodik, Über-uns-, Kontakt- und Transparenzseiten
- Impressums- und Datenschutzvorlagen mit deutlich markierten Betreiberpflichten
- Sitemap, robots.txt, kanonische URLs, Open Graph und Produkt-JSON-LD ohne unzulässige Angebotsdaten
- datensparsames Affiliate-Klickereignis ohne Namen, E-Mail oder geräteübergreifende Werbe-ID

## Technologie

- Next.js 16 mit App Router
- React 19 und TypeScript
- Tailwind CSS 4 als CSS-Toolchain; das Designsystem liegt in `src/app/globals.css`
- Server Components für Inhalte und Produktseiten
- kleine Client Components nur für Navigation, Finder und Affiliate-Klickmessung
- Vercel als Zielplattform

## Lokale Einrichtung

Voraussetzungen: Node.js 20.9 oder neuer und pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Produktionsprüfung:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Umgebungsvariablen

| Variable | Zweck |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | kanonischer Ursprung für Sitemap und Metadaten |
| `NEXT_PUBLIC_AMAZON_ASSOCIATE_ID` | zentrale Amazon-Partnerkennung; Standard `onlinestarkei-21` |

Die Partner-ID wird in `src/config/site.ts` gelesen. Die einzelnen, geprüften SiteStripe-Kurzlinks liegen produktbezogen in `src/data/products.json`.

## Datenmodell und Architektur

`src/data/products.json` enthält Geräte und Zubehör. Wesentliche Felder sind interne ID, ASIN, Marke, Modell, Titel, Produkttyp, Personenzahl, Leistung, Plattenart, Preisstand, Verfügbarkeit, Eigenschaften, Prüfdatum, Amazon-Quellseite und Affiliate-Link.

- Daten: `src/data/`
- Ranking: `src/lib/ranking.ts`
- Finder-Oberfläche: `src/components/finder.tsx`
- Produktdarstellung: `src/components/product-card.tsx`

### Neue Produkte ergänzen

1. Einen Datensatz mit den bestehenden Feldern in `src/data/products.json` ergänzen.
2. Eine eindeutige interne ID und ASIN verwenden.
3. Affiliate-Link, Tracking-ID, Quelle und Prüfzeitpunkt dokumentieren.
4. Keine ungeprüften Echtzeitpreise, Verfügbarkeiten oder Testbehauptungen eintragen.
5. `pnpm lint`, `pnpm typecheck` und `pnpm build` ausführen.

Für einen erneuten Import aus dem Recherche-Export kann `scripts/sync-products.mjs` verwendet werden. Standardmäßig erwartet das Skript `../outputs/raclette-finder-phase1`; alternativ kann `PRODUCT_SOURCE_DIR` auf einen anderen Ordner zeigen.

## Bildkonzept

Die Homepage und der Finder verwenden eigenständig erzeugte, markenfreie Lifestyle-Motive aus `public/images/`. Produktkarten, Vergleich und Detailseiten verwenden dagegen ausschließlich die Amazon-gehosteten Hauptbilder der jeweiligen ASIN. Die 250 geprüften Zuordnungen liegen in `src/data/product-images.json`; es werden keine Amazon-Produktbilder in diesem Repository gespeichert oder gestalterisch verändert.

Produktbilder sind als Amazon-Affiliate-Links gekennzeichnet und führen zum zugehörigen Artikel. Da sich Amazon-Angebote und Bildadressen ändern können, muss die Zuordnung regelmäßig gegen die jeweilige Produktseite geprüft und bei Bedarf aktualisiert werden. Für neue Produkte darf kein generisches oder KI-erzeugtes Bild als Originalfoto ausgegeben werden.

## Finder- und Ranking-Logik

Die Vorauswahl schließt Geräte aus, deren dokumentierte Kapazität deutlich unter der gewählten Runde liegt. Eine ausdrücklich gewählte Budgetklasse ist ein hartes Ausschlusskriterium: `low` erlaubt höchstens 55 €, `mid` 35–105 € und `premium` mindestens 85 €. Produkte ohne dokumentierten Preis werden bei einer festen Budgetwahl nicht empfohlen. Nur bei `any` bleibt das Budget offen. Anschließend werden die verbleibenden Produkte anhand von Personenzahl, Plattenart, persönlicher Priorität, dokumentierter Verfügbarkeit und Datenqualität gewichtet.

Der Score ist eine Ähnlichkeitsbewertung und weder Testnote noch Qualitätsgarantie. Fehlende Angaben erzeugen sichtbare Hinweise. Die mögliche Affiliate-Provision beeinflusst den Score nicht.

## Affiliate-Umsetzung

Externe Kaufbuttons sind mit `rel="sponsored noopener noreferrer"` gekennzeichnet und öffnen Amazon direkt. Beim Klick sendet der Browser ausschließlich die interne Produkt-ID an `/api/affiliate-click`. Es werden dabei keine Namen oder E-Mail-Adressen übermittelt. Eine produktive Analytics- oder Log-Aufbewahrung muss der Betreiber vor Livebetrieb datenschutzrechtlich konfigurieren und dokumentieren.

## Deployment auf Vercel

```bash
vercel link
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_AMAZON_ASSOCIATE_ID production
vercel deploy --prod
```

Der aktuelle Produktionsstand wurde direkt mit dem verknüpften Vercel-Projekt veröffentlicht. Domain und DNS für `raclette-finder.de` werden anschließend im Vercel-Projekt verbunden.

## Betreibermaßnahmen vor öffentlichem Produktivbetrieb

- Impressum und Datenschutz mit echten Betreiberangaben rechtlich prüfen und vervollständigen
- `hallo@raclette-finder.de` einrichten oder die Kontaktadresse ersetzen
- Domain-DNS verbinden
- Datenverarbeitungs- und Aufbewahrungskonfiguration von Vercel prüfen
- Produktpreise, Verfügbarkeit und Affiliate-Links regelmäßig aktualisieren
- Nutzungsrechte prüfen, bevor Händler- oder Herstellerbilder ergänzt werden

## Qualitätsstatus

Die Kernrouten werden statisch oder serverseitig durch Next.js erzeugt. Der Finder-Ablauf, Ergebniswechsel, Vergleich, Detailseiten, mobile Darstellung, Tastaturbedienbarkeit, Fehlerfreiheit im Browser und WCAG-2.2-AA-Regeln werden vor jedem Produktions-Release geprüft.
