import SiteHeader from "@/app/SiteHeader";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import Footer from "@/shared/Footer/Footer";
import "@/styles/index.scss";
import { Poppins } from "next/font/google";
import "rc-slider/assets/index.css";
import CommonClient from "./CommonClient";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Providers>
          <SiteHeader />
          {children}
          <CommonClient />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
