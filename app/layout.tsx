import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarInfo - Vehicle Information, RC Details, Challans & More",
  description: "Your all-in-one app for all your vehicle info needs and RTO vehicle information. Check RC details, challans, service history and more.",
  keywords: "car info, vehicle info, RC details, challans, service history, RTO, bike insurance, car insurance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
