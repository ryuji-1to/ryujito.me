import { contentType, generateHomeImage, size } from "@/og/generate-image";
export const dynamic = "force-static";

export const alt = "Ryuji Ito";
export { size, contentType };

export default async function Image() {
  return generateHomeImage();
}
