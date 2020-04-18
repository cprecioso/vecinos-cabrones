import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useInView } from "react-intersection-observer"
import { useFrameUrls } from "../../backend/thumbnail"
import { SubtitleResult } from "../../backend/types"
import styles from "../../styles/local.module.css"
import { useGif } from "../../util/gif"

export type Props = {
  data: SubtitleResult
}

export const Result: FunctionComponent<Props> = ({ data: result }) => {
  const [isHovering, setIsHovering] = React.useState(false)
  const onEnter = React.useCallback(() => setIsHovering(true), [])
  const onLeave = React.useCallback(() => setIsHovering(false), [])

  const [ref, inView] = useInView({ threshold: 0.7 })

  const [isLoaded, setIsLoaded] = React.useState(false)
  const onLoad = React.useCallback(() => {
    setIsLoaded(true)
  }, [])

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
          onLoad={onLoad}
          crossOrigin="anonymous"
          src={currentSource}
          className={clsx(styles["image-result"], isLoading && styles.loading)}
        />
      </div>
    </div>
  )
}
