import { access } from "node:fs/promises";
import path from "node:path";

const CANDIDATE_DIRS = [
  path.join(process.cwd(), "public"),
  path.join(process.cwd(), ".output", "public"),
  "/var/task/public",
  "/var/task/.output/public",
] as const;

export async function resolvePublicDir() {
  for (const dir of CANDIDATE_DIRS) {
    try {
      await access(dir);
      return dir;
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error(
    `Public directory was not found. Tried: ${CANDIDATE_DIRS.join(", ")}`,
  );
}
