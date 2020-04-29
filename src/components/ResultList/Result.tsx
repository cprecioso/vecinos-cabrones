import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useInView } from "react-intersection-observer"
import { useFrameUrls } from "../../api/backend/thumbnail"
import { SubtitleResult } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import { useGif } from "../../util/gif"
import { useHovering, useIsImageLoaded } from "../../util/hooks"

export type Props = {
  data: SubtitleResult
}

export const Result: FunctionComponent<Props> = ({ data: result }) => {
  const { isHovering, onEnter, onLeave } = useHovering()
  const [ref, inView] = useInView({ threshold: 0.7 })
  const { isLoaded, handleLoad } = useIsImageLoaded()

  const isActive = isHovering || (inView && isLoaded)

  const frameUrls = useFrameUrls(result)
  const { gifUrl, isLoading } = useGif(frameUrls, isActive)
  const currentSource = isActive && gifUrl ? gifUrl : frameUrls[0]

  return (
    <div
      className={clsx(styles["col-6"], styles.result)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      ref={ref}
    >
      <div className={styles["item-container"]}>
        <img
          onLoad={handleLoad}
          crossOrigin="anonymous"
          src={currentSource}
          className={clsx(styles["image-result"], isLoading && styles.loading)}
        />
      </div>
    </div>
  )
}
