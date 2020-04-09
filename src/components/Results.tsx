import clsx from "clsx"
import React, { FunctionComponent } from "react"
import styles from "../styles/local.module.css"

const Results: FunctionComponent = () => (
  <div className={styles.results}>
    <div className={styles["results-count"]}>210 resultados</div>
    <div className={styles["results-season"]}>Temporada 3</div>
    <div className={styles.row}>
      <div className={clsx(styles["col-6"], styles.result)}>
        <div className={styles["item-container"]}>
          <div className={styles["image-result"]}></div>
        </div>
      </div>
      <div className={clsx(styles["col-6"], styles.result)}>
        <div className={styles["item-container"]}>
          <div className={styles["image-result"]}></div>
        </div>
      </div>
    </div>
  </div>
)

export default Results
