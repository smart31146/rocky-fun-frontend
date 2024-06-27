import type { Metadata } from "next"

// Contexts
import { AuthProvider } from "@contexts/AuthProvider"
import { ContextProvider } from "@contexts/ContextProvider"
import { GlobalProvider } from "@contexts/GlobalProvider"

// Components
import GeneralModaler from "@/components/customs/custom-modals/general-modal"
import { cn } from "@/libs/utils/tailwind"
import Notifications, { TradingNotification } from "@components/Notification"
import { Roboto, Zen_Dots } from "next/font/google"
import { Toaster } from "sonner"

// Styles
import ReactQueryProvider from "@/contexts/ReactQueryProvider"
import "@solana/wallet-adapter-react-ui/styles.css"
import "./globals.css"

// const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
})

const zenDots = Zen_Dots({
  subsets: ["latin"],
  variable: "--font-zen-dots",
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Rocket Fun",
  description: "Rocket Fun",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, roboto.variable, zenDots.variable)}>
        <ReactQueryProvider>
          <ContextProvider>
            <AuthProvider>
              <GlobalProvider>
                <Notifications />
                <TradingNotification />
                {/* <AppBar /> */}
                {children}
                <GeneralModaler />
                <Toaster />
              </GlobalProvider>
            </AuthProvider>
          </ContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
