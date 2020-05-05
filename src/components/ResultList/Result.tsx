import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useInView } from "react-intersection-observer"
import { useFrames } from "../../api/backend/frames"
import { Scene } from "../../api/backend/types"
import { useGif } from "../../api/gif/hook"
import styles from "../../styles/local.module.css"
import { useHovering, useIsImageLoaded } from "../../util/hooks"

export type Props = {
  data: Scene
}

export const Result: FunctionComponent<Props> = ({ data: result }) => {
  const { isHovering, onEnter, onLeave } = useHovering()
  const [ref, inView] = useInView({ threshold: 0.7 })
  const { isLoaded, handleLoad } = useIsImageLoaded()

  const isActive = isHovering || (inView && isLoaded)

  const frameUrls = useFrames(result)
  const { gifUrl, isLoading } = useGif(
    result,
    { resizeToWidth: 150 },
    !isActive
  )
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
