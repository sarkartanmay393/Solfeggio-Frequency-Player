import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Solfeggio Frequency Player",
  description: "Explore and experience the benefits of Solfeggio frequencies.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Solfeggio Frequency Player",
    description: "Explore and experience the benefits of Solfeggio frequencies.",
    url: "https://solfeggio.vercel.app",
    siteName: "Solfeggio Frequency Player",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
