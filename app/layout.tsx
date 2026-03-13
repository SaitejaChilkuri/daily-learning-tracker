import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Daily Learning Streak Tracker Pro",
  description: "Track your daily study streaks with a premium, gamified interface.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Animated background blobs */}
          <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[120px] pointer-events-none z-0" />
          
          <main className="relative z-10 w-full min-h-screen flex flex-col pt-8 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
            {children}
          </main>
          
          <Toaster position="bottom-center" theme="system" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
