import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function generateHomeImage() {
  return generateImage(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(40, 44, 53)",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 150,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 80,
        }}
      >
        <span
          style={{
            backgroundImage: "linear-gradient(45deg, #ffb3d8, #cbb6ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          overreacted
        </span>
        <span
          style={{
            fontFamily: "Merriweather",
            fontStyle: "italic",
            fontSize: 60,
            alignItems: "center",
          }}
        >
          by
          <img
            alt="Ryuji Ito"
            src="https://github.com/ryuji-1to.png"
            style={{
              height: 120,
              width: 120,
              borderRadius: "50%",
              marginLeft: 20,
            }}
          />
        </span>
      </div>
    </div>,
  );
}

export async function generatePostImage({ title }: { title: string }) {
  return generateImage(
    <div
      style={{
        padding: 40,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(40, 44, 53)",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 40,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <span
          style={{
            backgroundImage: "linear-gradient(45deg, #ffb3d8, #cbb6ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: 60,
          }}
        >
          overreacted
        </span>
        <span
          style={{
            fontFamily: "Merriweather",
            fontStyle: "italic",
            fontSize: 35,
            alignItems: "center",
          }}
        >
          by
          <img
            alt="Ryuji Ito"
            src="https://github.com/ryuji-1to.png"
            style={{
              height: 80,
              width: 80,
              borderRadius: "50%",
              marginLeft: 20,
            }}
          />
        </span>
      </div>
      <div
        style={{
          fontSize: 90,
          display: "flex",
          alignItems: "center",
          flex: 1,
          paddingBottom: 30,
        }}
      >
        {title}
      </div>
    </div>,
  );
}

async function generateImage(jsx: React.ReactElement) {
  return new ImageResponse(jsx, {
    ...size,
  });
}
