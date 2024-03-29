import { GoogleAnalytics, IconTheming, PageSeo } from "@/components/Seo"
import logoSvg from "@/img/logo.svg"
import "@/styles/global.css"
import styles from "@/styles/local.module.css"
import { QueryProvider } from "@/util/query-context"
import clsx from "clsx"
import { AppProps } from "next/app"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { FunctionComponent } from "react"

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vecinos Cabrones</title>
    </Head>
    <IconTheming />
    <PageSeo />
    <GoogleAnalytics />
    <div className={styles.main}>
      <div className={styles["home-content"]}>
        <div className={clsx(styles.row, styles.header)}>
          <div className={styles["col-12"]}>
            <Link href="/">
              <a>
                <Image src={logoSvg} alt="" className={styles.logo} priority />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </div>
  </>
)

export default MyApp
