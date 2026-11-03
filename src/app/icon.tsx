import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          color: "#FAFAF9",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "monospace",
          borderRadius: 6,
        }}
      >
        LF
      </div>
    ),
    { ...size }
  );
}
