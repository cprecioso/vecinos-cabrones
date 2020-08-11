import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useMainFrame } from "../../api/backend/frames"
import { useScene } from "../../api/backend/scene"
import styles from "../../styles/local.module.css"
import LinkToScene from "../LinkToScene"

export enum NavigationDirection {
  Left = "left",
  Right = "right",
}

export const SceneNavigation: FunctionComponent<{
  direction: NavigationDirection
}> = ({ direction }) => {
  const data = useScene()
  const mainFrame = useMainFrame(data)

  if (!data) return null

  return (
    <LinkToScene scene={data} shallow={true} scroll={false}>
      <a>
        <div className={styles[`navigation-${direction}`]}>
          <img
            crossOrigin="anonymous"
            className={styles["navigation-image"]}
            src={mainFrame}
          />
          <div
            className={clsx(styles["navigation-indication"], styles[direction])}
          >
            {direction === NavigationDirection.Left ? "Anterior" : "Siguiente"}
          </div>
        </div>
      </a>
    </LinkToScene>
  )
}
