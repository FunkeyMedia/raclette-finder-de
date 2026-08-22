"use client";

import type { ReactNode } from "react";

export function AffiliateLink({ href, productId, className = "amazon-button", children = <>Bei Amazon ansehen <span aria-hidden="true">↗</span></> }: { href: string; productId: string; className?: string; children?: ReactNode }) {
  function trackClick() {
    const body = new Blob([JSON.stringify({ productId })], { type: "application/json" });
    navigator.sendBeacon?.("/api/affiliate-click", body);
  }
  return <a className={className} href={href} target="_blank" rel="sponsored noopener noreferrer" onClick={trackClick}>{children}</a>;
}
