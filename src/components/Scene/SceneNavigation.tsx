import { Scene } from "@/api/backend/types";
import clsx from "clsx";
import Image from "next/image";
import { useMainFrame } from "../../api/backend/frames";
import * as styles from "../../styles/local.css";
import LinkToScene from "../LinkToScene";

export enum NavigationDirection {
  Left = "left",
  Right = "right",
}

export const SceneNavigation = ({
  scene,
  direction,
}: {
  direction: NavigationDirection;
  scene: Scene;
}) => {
  const mainFrame = useMainFrame(scene);

  return (
    <LinkToScene scene={scene} shallow={true} scroll={false}>
      <div
        className={
          {
            [NavigationDirection.Left]: styles.navigationLeft,
            [NavigationDirection.Right]: styles.navigationRight,
          }[direction]
        }
      >
        {scene && mainFrame ? (
          <Image
            unoptimized
            crossOrigin="anonymous"
            alt={scene.text}
            className={styles.navigationImage}
            src={mainFrame}
            width={85}
            height={63}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        ) : null}
        <div
          className={clsx(
            styles.navigationIndication,
            direction === NavigationDirection.Left ? styles.left : styles.right,
          )}
        >
          {direction === NavigationDirection.Left ? "Anterior" : "Siguiente"}
        </div>
      </div>
    </LinkToScene>
  );
};
