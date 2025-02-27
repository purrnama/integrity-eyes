import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

export const metadata: Metadata = {
  title: "Integrity Eyes",
  description: "",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const { locale } = await params;
  //eslint-disable-next-line
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
