import slugify from "@sindresorhus/slugify"
import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useFrameUrls } from "../../api/backend/thumbnail"
import { SubtitleResult } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import { useGif } from "../../util/gif"

const GIFViewMode: FunctionComponent<{
  scene: SubtitleResult
}> = ({ scene }) => {
  const frameUrls = useFrameUrls(scene)
  const { gifUrl, isLoading } = useGif(frameUrls, true, scene.text)

  return (
    <div className={styles["scene-gif-view"]}>
      <a download={`${slugify(scene.text).slice(0, 10)}.gif`} href={gifUrl}>
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
