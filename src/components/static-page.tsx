import type { ReactNode } from "react";

export function StaticPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <main><section className="page-hero"><div className="site-width"><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section><section className="content-section"><div className="site-width prose-grid">{children}</div></section></main>;
}
