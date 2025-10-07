import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHAMA - Alex Pereira",
  description: "CHAMAAAA - Alex Poatan Pereira",
  keywords: ["Alex Pereira", "CHAMA", "Poatan", "UFC", "MMA", "Edit", "Highlight"],
  authors: [{ name: "CHAMA" }],
  openGraph: {
    title: "CHAMA - Alex Pereira",
    description: "CHAMAAAA - Alex Poatan Pereira",
    type: "website",
    locale: "fr_FR",
    siteName: "CHAMA",
    images: [
      {
        url: "./chama.png",
        width: 1200,
        height: 630,
        alt: "Alex Pereira - CHAMA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHAMA - Alex Pereira",
    description: "CHAMAAAA - Alex Poatan Pereira",
    images: ["/chama.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
