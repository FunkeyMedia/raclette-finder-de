"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/finder", label: "Finder" },
  { href: "/produkte", label: "Produkte" },
  { href: "/vergleich", label: "Vergleich" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/so-funktionierts", label: "Unsere Methode" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${pathname === "/" ? "is-home" : "is-solid"}`}>
      <div className="site-width header-inner">
        <Link className="brand" href="/" aria-label="Raclette Finder Startseite" onClick={() => setOpen(false)}>
          <Image
            alt=""
            className="brand-logo"
            height={435}
            priority
            src="/images/brand/raclette-finder-logo-header-v1.png"
            width={1705}
          />
        </Link>
        <nav className={open ? "is-open" : ""} aria-label="Hauptnavigation">
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
        <Link className="header-cta" href="/finder">Jetzt finden <span aria-hidden="true">→</span></Link>
        <button className="menu-button" type="button" aria-label={open ? "Menü schließen" : "Menü öffnen"} aria-expanded={open} onClick={() => setOpen((current) => !current)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
