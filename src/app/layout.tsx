import DonationPopup from "@/components/DonationPopup";
import logoSvg from "@/img/logo.svg";
import "@/styles/global.css";
import * as styles from "@/styles/local.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import clsx from "clsx";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Vecinos Cabrones", template: "%s | Vecinos Cabrones" },
  description: "Encuentra tu escena favorita de Aquí no hay quien viva",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16181b",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />

      <body>
        <div className={styles.main}>
          <div className={clsx(styles.row, styles.header)}>
            <div className={styles.col12}>
              <Link href="/">
                <Image
                  src={logoSvg}
                  alt="Logo de Vecinos Cabrones"
                  className={styles.logo}
                  priority
                />
              </Link>
            </div>
          </div>

          {children}
        </div>

        <DonationPopup />

        <GoogleAnalytics gaId="G-0VCLZB3KTT" />
      </body>
    </html>
  );
}
