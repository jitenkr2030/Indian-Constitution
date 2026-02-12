import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indian Constitution App - Know Your Rights",
  description: "Comprehensive mobile app for Indian Constitution with AI assistant, multilingual support, and accessibility features. Empowering citizens with constitutional knowledge.",
  keywords: ["Indian Constitution", "Fundamental Rights", "Legal Awareness", "AI Assistant", "Multilingual", "Accessibility"],
  authors: [{ name: "Constitution App Team" }],
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-152x152.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Constitution App",
  },
  openGraph: {
    title: "Indian Constitution App",
    description: "Know your constitutional rights with AI-powered assistance",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Constitution App",
    description: "Empowering citizens with constitutional knowledge",
  },
  other: {
    "msapplication-TileColor": "#FF9933",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AccessibilityProvider>
          <ServiceWorkerRegister />
          {children}
          <Toaster />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
