import { ImageResponse } from "next/og";

export const alt = "Keelhold Capital Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated from the group mark on navy. Replace with lockup-group-inverse.svg artwork if preferred.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", background: "#14213A", padding: 96, gap: 56 }}>
        <div style={{ position: "relative", width: 200, height: 200, display: "flex" }}>
          <div style={{ position: "absolute", left: 2, top: 2, width: 196, height: 196, border: "16px solid #FBF9F5" }} />
          <div style={{ position: "absolute", left: 40, top: 124, width: 120, height: 36, background: "#C9A464" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 120, color: "#FBF9F5", fontFamily: "serif", lineHeight: 1 }}>Keelhold</div>
          <div style={{ fontSize: 30, color: "#C9A464", letterSpacing: "0.32em" }}>CAPITAL GROUP</div>
        </div>
      </div>
    ),
    size,
  );
}
