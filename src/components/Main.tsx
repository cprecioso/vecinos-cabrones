import clsx from "clsx"
import React, { FunctionComponent } from "react"
import styles from "../styles/local.module.css"

const Main: FunctionComponent = () => (
  <div className={styles["home-content"]}>
    <div className={clsx(styles.row, styles.title)}>
      <div className={styles["col-12"]}>
        <h1>
          Encuentra tu escena favorita de <b>Aquí no hay quien viva</b>
        </h1>
      </div>
    </div>

    <div className={clsx(styles.row, styles.search)}>
      <div className={styles["col-12"]}>
        <div className={styles["search-box"]}>
          <input type="text" placeholder="PUF" />
          <div className={styles["search-button"]}></div>
        </div>
      </div>
    </div>

    <div className={clsx(styles.row, styles.explain)}>
      <div className={styles["col-12"]}>
        <div className={styles["line-group"]}>
          <hr />
          <div className={styles["line-title"]}>
            <div className={styles["line-title-text"]}>¿Pero esto qué es?</div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Main
