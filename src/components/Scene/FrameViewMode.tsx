import React, { FunctionComponent } from "react"
import styles from "../../styles/local.module.css"

export const EmptyViewMode: FunctionComponent = () => (
  <img crossOrigin="anonymous" className={styles["scene-image"]} />
)

const FrameViewMode: FunctionComponent<{
  frameUrl: string
}> = ({ frameUrl }) => (
  <img
    crossOrigin="anonymous"
    className={styles["scene-image"]}
    src={frameUrl}
  />
)

export default FrameViewMode
