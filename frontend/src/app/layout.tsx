import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "@/components/animations/SmoothScroll";
import CustomCursor from "@/components/animations/CustomCursor";

export const metadata: Metadata = {
  title: "Rumzee's Exotic — Premium Exotic Pets & Accessories",
  description: "Discover rare and exotic birds, cats, reptiles, and tortoises at Rumzee's Exotic. Premium quality pets, accessories, and care services.",
  keywords: "exotic pets, birds, parrots, cats, reptiles, tortoises, pet shop, aviary",
  openGraph: {
    title: "Rumzee's Exotic",
    description: "Your destination for premium exotic pets and accessories",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
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
