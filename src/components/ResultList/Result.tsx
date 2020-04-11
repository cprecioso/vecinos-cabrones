import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useFrameUrls } from "../../backend/thumbnail"
import { SubtitleResult } from "../../backend/types"
import styles from "../../styles/local.module.css"
import { useGif } from "../../util/gif"

export type Props = {
  data: SubtitleResult
}

export const Result: FunctionComponent<Props> = ({ data: result }) => {
  const [isActive, setIsActive] = React.useState(false)
  const setActive = React.useCallback(() => setIsActive(true), [])
  const setInactive = React.useCallback(() => setIsActive(false), [])

  const frameUrls = useFrameUrls(result)
  const { gifUrl, isLoading } = useGif(frameUrls, isActive)
  const currentSource = isActive && gifUrl ? gifUrl : frameUrls[0]

  return (
    <div
      className={clsx(styles["col-6"], styles.result)}
      onMouseEnter={setActive}
      onMouseLeave={setInactive}
    >
      <div className={styles["item-container"]}>
        <img
          crossOrigin="anonymous"
          src={currentSource}
          className={clsx(styles["image-result"], isLoading && styles.loading)}
        />
      </div>
    </div>
  )
}
