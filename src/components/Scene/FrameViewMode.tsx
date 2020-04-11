import React, { FunctionComponent } from "react"
import { useFrameUrls } from "../../backend/thumbnail"
import { SubtitleResult } from "../../backend/types"
import styles from "../../styles/local.module.css"

export const EmptyViewMode: FunctionComponent = () => (
  <img crossOrigin="anonymous" className={styles["scene-image"]} />
)

const FrameViewMode: FunctionComponent<{ result: SubtitleResult }> = ({
  result,
}) => {
  const frameUrls = useFrameUrls(result)

  return (
    <div className={styles["result-line"]}>
      {frameUrls.map((frameUrl) => (
        <a key={frameUrl} href={frameUrl} download>
          <img
            crossOrigin="anonymous"
            className={styles["scene-image"]}
            src={frameUrl}
          />
        </a>
      ))}
    </div>
  )
}

export default FrameViewMode
