import clsx from "clsx"
import { AppProps } from "next/app"
import Head from "next/head"
import Link from "next/link"
import { FunctionComponent } from "react"
import "../styles/global.css"
import styles from "../styles/local.module.css"
import { QueryProvider } from "../util/query-context"

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vecinos Cabrones</title>

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="194x194"
        href="/favicon-194x194.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fec32a" />
      <meta name="apple-mobile-web-app-title" content="Vecinos Cabrones" />
      <meta name="application-name" content="Vecinos Cabrones" />
      <meta name="msapplication-TileColor" content="#16181b" />
      <meta name="theme-color" content="#16181b" />
    </Head>
    <div className={styles.main}>
      <div className={styles["home-content"]}>
        <div className={clsx(styles.row, styles.header)}>
          <div className={styles["col-12"]}>
            <Link href="/" prefetch={false}>
              <a>
                <img className={styles.logo} />
                <div className={styles.brand}>vecinoscabrones.com</div>
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
