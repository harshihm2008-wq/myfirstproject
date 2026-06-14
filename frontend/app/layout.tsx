import type { Metadata } from "next";
import { Nunito, Fredoka } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Giggles Kids Play Area | Indoor Playground Bengaluru | Ages 1-8",
  description: "Giggles Kids Play Area - Premium indoor playground in Bengaluru for kids aged 1-8. Safe, hygienic, fun! Ball pool, slides, soft play, birthday parties. Book now!",
  keywords: "kids play area bengaluru, indoor playground bangalore, children play zone, birthday party venue kids bangalore, giggles kids",
  openGraph: {
    title: "Giggles Kids Play Area | Where Little Adventures Begin",
    description: "Premium indoor playground in Bengaluru. Safe, hygienic & fun for kids aged 1-8 years.",
    type: "website",
    locale: "en_IN",
    siteName: "Giggles Kids Play Area",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giggles Kids Play Area Bengaluru",
    description: "Premium indoor playground for kids aged 1-8 in Bengaluru.",
  },
  alternates: {
    canonical: "https://giggleskidsplayarea.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Giggles Kids Play Area",
              description: "Premium indoor playground for kids aged 1-8 in Bengaluru",
              address: {
                "@type": "PostalAddress",
                streetAddress: "No. 43/1, HariHara Arcade, Manganahalli Road, Near MRPL Petrol Bunk, SMV Layout",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560110",
                addressCountry: "IN",
              },
              telephone: "+919916476751",
              openingHours: "Mo-Su 10:30-20:00",
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "100" },
              priceRange: "₹₹",
            }),
          }}
        />
      </head>
      <body className={`${nunito.className} bg-[#FFF9F5] text-[#1F2937] antialiased`}>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </body>
    </html>
  );
}
