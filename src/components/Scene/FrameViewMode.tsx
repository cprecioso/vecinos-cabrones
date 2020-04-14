import slugify from "@sindresorhus/slugify"
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
    <div className={styles["scene-frame-view"]}>
      {frameUrls.map((frameUrl) => (
        <div key={frameUrl} className={styles["scene-frame-view-frame"]}>
          <a
            href={frameUrl}
            download={`${slugify(result.text).slice(0, 10)}.gif`}
          >
            <img
              crossOrigin="anonymous"
              className={styles["scene-image"]}
              src={frameUrl}
            />
          </a>
        </div>
      ))}
    </div>
  )
}

export default FrameViewMode
