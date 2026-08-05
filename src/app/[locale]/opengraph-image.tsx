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
          background: "#0a0a0b",
          color: "#f2f2f3",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#6ee7b7",
            fontSize: 28,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#6ee7b7",
            }}
          />
          Full-Stack Developer
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
          Luca Furtado
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#9a9aa2", marginTop: 20 }}>
          React · TypeScript · Node.js · Python
        </div>
      </div>
    ),
    { ...size }
  );
}
