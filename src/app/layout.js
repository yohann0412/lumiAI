import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-space-grotesk",
  preload: true,
});

export const metadata = {
  title: "Lumi",
  description: "Lumi.Ai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.className} antialiased bg-wild-100 text-wild-100 w-full max-w-[1920px] mx-auto`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
