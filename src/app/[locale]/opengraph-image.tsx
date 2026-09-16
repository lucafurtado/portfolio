import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#15120e",
          color: "#f1ebe0",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#4f9ca3",
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          Business Operations & AI Automation
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
          Luca Furtado
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9c9385", marginTop: 20 }}>
          Python · CRM · Automation · APIs
        </div>
      </div>
    ),
    { ...size }
  );
}
