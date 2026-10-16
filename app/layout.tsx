import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import StickyCartBar from "@/components/StickyCartBar";
import Footer from "@/components/Footer";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://store.mediqosolutions.co.ke";

export const metadata: Metadata = {
  title: {
    default:
      "Mediqo Solutions | Medical Equipment & Supplies in Kenya",
    template: "%s | Mediqo Solutions",
  },
  description:
    "Shop quality medical equipment and supplies in Kenya. Order directly through WhatsApp.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "Mediqo Solutions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-[#F3F4FA] text-gray-900"
        suppressHydrationWarning
      >
        <CartProvider>
          <Header />
          {children}
          <StickyCartBar />
          <div className="h-20" />
        </CartProvider>

        <Footer />
      </body>
    </html>
  );
}