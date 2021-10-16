import clsx from "clsx"
import Image from "next/image"
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

  return (
    <LinkToScene scene={data} shallow={true} scroll={false}>
      <a>
        <div className={styles[`navigation-${direction}`]}>
          {data && mainFrame ? (
            <Image
              alt={data.text}
              className={styles["navigation-image"]}
              src={mainFrame}
              width={85}
              height={63}
            />
          ) : null}
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
