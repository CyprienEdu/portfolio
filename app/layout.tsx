import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { InitialLoader } from "@/components/initial-loader";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Portfolio inspired by premium editorial motion design experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <InitialLoader />
        {children}
      </body>
    </html>
  );
}
