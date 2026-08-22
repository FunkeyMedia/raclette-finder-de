import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", background: "#192923", borderRadius: 16 }}>
      <div style={{ width: 29, height: 29, position: "absolute", left: 12, border: "4px solid #fffdf7", borderRadius: 10, transform: "rotate(45deg)" }} />
      <div style={{ width: 29, height: 29, position: "absolute", right: 12, border: "4px solid #c7e758", borderRadius: 10, transform: "rotate(45deg)" }} />
    </div>,
    size,
  );
}
