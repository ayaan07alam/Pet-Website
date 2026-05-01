import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LeadCapturePopup from "@/components/LeadCapturePopup";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rumzeesexotics.com'),
  title: {
    default: "Rumzee's Exotic — Premium Exotic Pets & Accessories",
    template: "%s | Rumzee's Exotic"
  },
  description: "Discover rare and exotic birds, cats, reptiles, and tortoises at Rumzee's Exotic. Premium quality pets, accessories, and expert care services.",
  keywords: ["exotic pets", "buy parrots online", "exotic cats", "reptiles for sale", "pet shop", "macaw breed", "persian cats", "luxury pet boutique"],
  authors: [{ name: "Rumzee's Exotic" }],
  creator: "Rumzee's Exotic",
  publisher: "Rumzee's Exotic",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Rumzee's Exotic",
    title: "Rumzee's Exotic — Premium Exotic Pets",
    description: "Your destination for premium exotic pets and accessories. Discover rare birds, felines, and reptiles.",
    images: [{
      url: "/logo.png",
      width: 1200,
      height: 630,
      alt: "Rumzee's Exotic Logo"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rumzee's Exotic — Premium Exotic Pets",
    description: "Discover rare and exotic birds, cats, reptiles, and tortoises.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PetStore",
  "name": "Rumzee's Exotic",
  "image": "https://rumzeesexotics.com/logo.png",
  "description": "Premium exotic pet boutique offering rare birds, cats, reptiles, and accessories.",
  "url": "https://rumzeesexotics.com",
  "telephone": "+918197398357",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Exotic Pet Lane",
    "addressLocality": "Paradise City",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
          <WhatsAppFloat />
          <LeadCapturePopup />
          <ScrollToTop />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#FDF6EC',
                color: '#2C1A0E',
                border: '1px solid rgba(44,26,14,0.12)',
                boxShadow: '0 4px 20px rgba(44,26,14,0.12)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
