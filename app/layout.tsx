import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gym Form",
  description: "Front and side view form reference for a 5-day upper / lower / arms split.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Gym Form" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d12" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto w-full max-w-[560px] px-4 pb-16">{children}</div>
      </body>
    </html>
  );
}
