import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useFrames } from "../../api/backend/frames"
import { Scene } from "../../api/backend/types"
import styles from "../../styles/local.module.css"

export type Props = {
  data: Scene
}

export const Result: FunctionComponent<Props> = ({ data: result }) => {
  const frameUrls = useFrames(result)
  const isLoading = false
  const currentSource = `/api/gif/${result.id}` || frameUrls[0]

  return (
    <div className={clsx(styles["col-6"], styles.result)}>
      <div className={styles["item-container"]}>
        <img
          loading="lazy"
          crossOrigin="anonymous"
          src={currentSource}
          className={clsx(styles["image-result"], isLoading && styles.loading)}
        />
      </div>
    </div>
  )
}
