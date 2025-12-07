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
        padding: 40,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "whitesmoke",
        color: "black",
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
        <img
          alt="Ryuji Ito"
          src="https://github.com/ryuji-1to.png"
          width={80}
          height={80}
          style={{
            height: 80,
            width: 80,
            borderRadius: "50%",
            marginLeft: 20,
          }}
        />
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
        Ryuji Ito
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
        backgroundColor: "whitesmoke",
        color: "black",
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
        <img
          alt="Ryuji Ito"
          src="https://github.com/ryuji-1to.png"
          width={80}
          height={80}
          style={{
            height: 80,
            width: 80,
            borderRadius: "50%",
            marginLeft: 20,
          }}
        />
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
