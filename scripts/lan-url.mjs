// Prints the URL to open on a phone that's on the same wifi.
import { networkInterfaces } from "node:os";

const port = process.env.PORT ?? 3000;
const addrs = Object.values(networkInterfaces())
  .flatMap((a) => a ?? [])
  .filter((a) => a.family === "IPv4" && !a.internal)
  .map((a) => a.address);

if (addrs.length === 0) {
  console.log("No LAN address found — are you connected to wifi?");
} else {
  console.log("Open this on your phone (same wifi), after `npm run preview`:\n");
  for (const a of addrs) console.log(`  http://${a}:${port}`);
  console.log("\nUse `npm run preview`, not `npm run dev` — dev mode blocks");
  console.log("cross-origin requests and the page will render but not respond.");
}
