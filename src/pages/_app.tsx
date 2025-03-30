import { GoogleAnalytics, IconTheming, PageSeo } from "@/components/Seo";
import logoSvg from "@/img/logo.svg";
import "@/styles/global.css";
import * as styles from "@/styles/local.css";
import { QueryProvider } from "@/util/query-context";
import clsx from "clsx";
import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vecinos Cabrones</title>
    </Head>
    <IconTheming />
    <PageSeo />
    <GoogleAnalytics />
    <div className={styles.main}>
      <div className={styles.homeContent}>
        <div className={clsx(styles.row, styles.header)}>
          <div className={styles.col12}>
            <Link href="/">
              <Image
                src={logoSvg}
                alt=""
                className={styles.logo}
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </div>
  </>
);

export default MyApp;
