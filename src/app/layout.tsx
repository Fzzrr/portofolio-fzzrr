import "./globals.css";
import "lenis/dist/lenis.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import InteractiveBackground from "@/components/InteractiveBackground";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { site } from "@/content/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className="bg-neutral-950 text-neutral-50 antialiased selection:bg-neutral-500/30"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <LoadingScreen />
          <ScrollProgress />
          <InteractiveBackground />
          <Navbar />
          {children}
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
