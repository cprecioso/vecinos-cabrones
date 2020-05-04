import slugify from "@sindresorhus/slugify"
import React, { FunctionComponent } from "react"
import { useFrames } from "../../api/backend/frames"
import { Scene } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import { ActionButtons } from "./ActionButtons"

export const EmptyViewMode: FunctionComponent = ({}) => (
  <img crossOrigin="anonymous" className={styles["scene-image"]} />
)

const Frame: FunctionComponent<{ url: string; text: string }> = ({
  url,
  text,
}) => (
  <div className={styles["scene-frame-view-frame"]}>
    <a href={url} download={`${slugify(text).slice(0, 10)}.gif`}>
      <img
        crossOrigin="anonymous"
        className={styles["scene-image"]}
        src={url}
      />
    </a>
  </div>
)

const FrameViewMode: FunctionComponent<{ result: Scene }> = ({ result }) => {
  const frameUrls = useFrames(result)

  return (
    <>
      <div className={styles["scene-frame-view"]}>
        {frameUrls.map((frameUrl) => (
          <Frame key={frameUrl} url={frameUrl} text={result.text} />
        ))}
      </div>
      <ActionButtons title={result.text} />
    </>
  )
}

export default FrameViewMode
