import type { Metadata } from "next";
import { Inter, Quicksand, Open_Sans } from "next/font/google";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Carspy - Vehicle Information, RC Details, Challans & More",
  description: "Your all-in-one app for all your vehicle info needs and RTO vehicle information. Check RC details, challans, service history and more.",
  keywords: "car info, vehicle info, RC details, challans, service history, RTO, bike insurance, car insurance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${quicksand.variable} ${openSans.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
