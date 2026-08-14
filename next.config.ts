import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

/**
 * This machine's own LAN addresses.
 *
 * Next blocks cross-origin requests to /_next/* dev resources by default, so
 * loading `next dev` from another device on the wifi 403s the JS chunks. This
 * allows the host's own addresses so that stops happening.
 *
 * It is not sufficient on its own: Turbopack's HMR websocket rejects the
 * cross-origin upgrade regardless of this setting, and the client waits on that
 * socket before hydrating. So `next dev` over a LAN IP still renders a page
 * where nothing is clickable. Use `npm run preview` to test on a phone — the
 * production server has no HMR socket and no origin check.
 */
function lanOrigins(): string[] {
  const out = new Set<string>();
  for (const addrs of Object.values(networkInterfaces())) {
    for (const a of addrs ?? []) {
      if (a.family === "IPv4" && !a.internal) out.add(a.address);
    }
  }
  return [...out];
}

const nextConfig: NextConfig = {
  // `*.local` covers mDNS hostnames like http://sids-macbook.local:3000.
  allowedDevOrigins: [...lanOrigins(), "*.local"],
};

export default nextConfig;
