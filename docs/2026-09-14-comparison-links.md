# Eigene Geräteauswahl unverändert weitergeben

Vorher ersetzte die Vergleichsseite Auswahlen mit weniger als zwei Geräten durch drei Standardgeräte. Nun gibt es die Beispielauswahl ausschließlich bei einem Besuch ohne Auswahlparameter und mit sichtbarer Kennzeichnung. Ein einzelnes Gerät bleibt einzeln; ein ungültiger oder leerer Link zeigt keine Ersatzgeräte und keine leere Tabelle.

Bekannte Geräte lassen sich als sauberer Vergleichslink kopieren. Bei gesperrter Zwischenablage erscheint ein manuell kopierbares Feld. Die bestehenden Händlerlinks bleiben verfügbar.

Nachweise: `src/lib/comparison-state.ts` und zwei Regressionstests. ESLint und Produktionsbuild bestehen. Mobiler Browser: zwei Geräte teilen und neu öffnen, Kopierfallback, Händlerlinks, ungültige Auswahl, Einzelgerät und gekennzeichneter Beispielvergleich geprüft.

Keine neuen Produktaussagen oder Preise; kein bereits gemessener Klick- oder Kaufzuwachs. Main-Push belegt keinen Produktionsdeploy.
