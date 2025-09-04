import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from 'sonner'
import AuthInitProvider from "@/lib/AuthInitProvider";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider"
import {NextIntlClientProvider} from "next-intl"
import { getLocale, getMessages } from "next-intl/server";
import { ScrollArea } from "@/components/ui/scroll-area";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Classified",
  description: "Real estate app in development",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-full`}
        >

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <NextIntlClientProvider messages={messages}>
              <AuthInitProvider />
              <Toaster position="top-center" closeButton/>
              <Header />
              <main className="flex-1 bg-muted">
                {children}
              </main>
              <Footer />
            </NextIntlClientProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
