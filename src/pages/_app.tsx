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
