import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { Toaster } from 'sonner'
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import {NextIntlClientProvider} from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import ScrollWrapper from "@/components/scroll-wrapper"
import NextTopLoader from 'nextjs-toploader'
import LocaleProvider from "@/components/locale-provider"
import AuthInitProvider from "@/components/auth-init-provider"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Classified",
  description: "Real estate app in development",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}
        >

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false}/>
            <NextIntlClientProvider messages={messages}>
              <LocaleProvider locale={locale} />
              <AuthInitProvider />
              <Toaster position="top-center" closeButton/>
              <ScrollWrapper className="flex-1 h-full w-full">
                <div className=" flex flex-col min-h-full">
                  <Header />
                  <main className="flex-1 bg-muted">
                      {children}
                  </main>
                  <Footer />
                </div>
              </ScrollWrapper>
            </NextIntlClientProvider>
          </ThemeProvider>
      </body>
    </html>
  )
}
