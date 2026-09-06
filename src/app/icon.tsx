import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#13231d",
        borderRadius: 22,
      }}
    >
      <div style={{ position: "absolute", left: 35, top: 10, width: 7, height: 18, borderRadius: 99, background: "#ef4b2f", transform: "rotate(-12deg)" }} />
      <div style={{ position: "absolute", left: 51, top: 7, width: 7, height: 21, borderRadius: 99, background: "#ef4b2f", transform: "rotate(12deg)" }} />
      <div style={{ position: "absolute", left: 14, top: 30, width: 60, height: 44, border: "6px solid #fffaf0", borderRadius: 13, transform: "rotate(-8deg)" }} />
      <div style={{ position: "absolute", left: 21, top: 51, width: 44, height: 15, borderRadius: 5, background: "#c8eb4d", transform: "rotate(-8deg) skewX(-18deg)" }} />
      <div style={{ position: "absolute", left: 65, top: 66, width: 24, height: 12, borderRadius: 99, background: "#fffaf0", transform: "rotate(35deg)", transformOrigin: "left center" }} />
      <div style={{ position: "absolute", left: 78, top: 75, width: 6, height: 6, borderRadius: 99, background: "#13231d" }} />
    </div>,
    size,
  );
}
