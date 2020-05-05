import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useFrames } from "../../api/backend/frames"
import { Scene } from "../../api/backend/types"
import { useGif } from "../../api/gif/hook"
import styles from "../../styles/local.module.css"
import { ActionButtons } from "./ActionButtons"

const GIFViewMode: FunctionComponent<{
  scene: Scene
}> = ({ scene }) => {
  const frameUrls = useFrames(scene)
  const { gifUrl, isLoading } = useGif(scene, { text: scene.text })

  return (
    <>
      <div className={styles["scene-gif-view"]}>
        <img
          crossOrigin="anonymous"
          className={clsx(styles["scene-image"], isLoading && styles.loading)}
          src={gifUrl ?? frameUrls[0]}
        />
      </div>
      <ActionButtons fileType="gif" fileUrl={gifUrl} title={scene.text} />
    </>
  )
}

export default GIFViewMode
