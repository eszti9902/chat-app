import { Fugaz_One, Inter, Pacifico } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: ['400'] });

export const metadata = {
  title: "Next Chat App",
  description: "Chat app for you",
};

export default function RootLayout({ children }) {

  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={'text-base sm:text-xl ' + fugazOne.className}>Next Chat</h1>
    </header>
  )
  return (
    <html lang="en">
      <AuthProvider>
        <body className={'w-full mx-auto text-sm sm:text-base min-h-screen ' + inter.className}>
          {header}
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
