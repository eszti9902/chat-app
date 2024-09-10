import { Fugaz_One, Inter, Pacifico } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/Logout";

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
      <Logout />
    </header>
  );

  return (
    <html lang="en" className="h-screen m-0 p-0">
      <AuthProvider>
        <body className={'w-full bg-[#F0F0F0] mx-auto text-sm sm:text-base h-full ' + inter.className}>
          <div className="flex flex-col h-full">
            {header}
            <div className="flex-1 h-full overflow-hidden">
              {children}
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
