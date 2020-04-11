import React, { FunctionComponent } from "react"
import styles from "../../styles/local.module.css"

const FrameViewMode: FunctionComponent<{
  frameUrls: string[]
}> = ({ frameUrls }) => {
  return (
    <img
      crossOrigin="anonymous"
      className={styles["scene-image"]}
      src={frameUrls[0]}
    />
  )
}

export default FrameViewMode
