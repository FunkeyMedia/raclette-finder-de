import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const productId = typeof body.productId === "string" && /^RF-[RZ]-\d{3}$/.test(body.productId) ? body.productId : null;
    if (!productId) return NextResponse.json({ ok: false }, { status: 400 });
    console.info("affiliate_click", { productId });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
}
