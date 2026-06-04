import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiLoop — We make your brand live in every pixel",
  description:
    "DigiLoop is a full-service digital agency based in Nepal offering website design, digital invitations, social media management, AI integration, automation, graphic design, and more.",
  keywords: [
    "digital agency Nepal",
    "website design Nepal",
    "DigiLoop",
    "social media management",
    "AI integration Nepal",
    "graphic design",
    "digital marketing Nepal",
  ],
  authors: [{ name: "DigiLoop" }],
  creator: "DigiLoop",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digiloop.com.np",
    siteName: "DigiLoop",
    title: "DigiLoop — We make your brand live in every pixel",
    description:
      "Full-service digital agency based in Nepal. Websites, AI tools, branding, social media & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiLoop — We make your brand live in every pixel",
    description: "Full-service digital agency based in Nepal.",
    creator: "@digiloop_np",
  },
  metadataBase: new URL("https://digiloop.com.np"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        {/* Clash Display from Fontshare */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
        <style>{`
          :root { --font-clash: 'Clash Display'; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
