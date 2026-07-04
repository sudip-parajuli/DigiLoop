import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIA Enterprises — Strategy, Innovation & Analytics",
  description:
    "SIA Enterprises is a premier digital transformation agency in Nepal. We empower businesses through strategic thinking, custom web development, innovative AI & automation, and data analytics.",
  keywords: [
    "SIA Enterprises Nepal",
    "Digital Agency Nepal",
    "Web Development Nepal",
    "AI Automation Nepal",
    "Digital Transformation Nepal",
    "Analytics Consulting Nepal",
    "SIA Enterprises",
  ],
  authors: [{ name: "SIA Enterprises" }],
  creator: "SIA Enterprises",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://siaenterprises.com.np",
    siteName: "SIA Enterprises",
    title: "SIA Enterprises — Strategy, Innovation & Analytics",
    description:
      "Empower your business through strategic thinking, innovative technology, and actionable analytics. Web development, AI integration, automation, and consulting.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIA Enterprises — Strategy, Innovation & Analytics",
    description: "Empowering businesses through Strategy, Innovation & Analytics.",
    creator: "@siaenterprises",
  },
  metadataBase: new URL("https://siaenterprises.com.np"),
  icons: {
    icon: [
      { url: "/SIAdark.ico", type: "image/x-icon" },
    ],
    shortcut: "/SIAdark.ico",
    apple: "/SIAdark.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <head>
        {/* ── Favicon — SIA icon (dark for light theme) ── */}
        <link rel="icon" href="/SIAdark.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/SIAdark.ico" />
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
