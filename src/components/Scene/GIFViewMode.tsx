import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useFrameUrls } from "../../backend/thumbnail"
import { SubtitleResult } from "../../backend/types"
import styles from "../../styles/local.module.css"
import { useGif } from "../../util/gif"

const GIFViewMode: FunctionComponent<{
  scene: SubtitleResult
}> = ({ scene }) => {
  const frameUrls = useFrameUrls(scene)
  const { gifUrl, isLoading } = useGif(frameUrls, true)

  return (
    <div className={styles["scene-gif-view"]}>
      <a download href={gifUrl}>
        <img
          crossOrigin="anonymous"
          className={clsx(styles["scene-image"], isLoading && styles.loading)}
          src={gifUrl ?? frameUrls[0]}
        />
      </a>
    </div>
  )
}

export default GIFViewMode
