import clsx from "clsx";
import Image from "next/image";
import { useMainFrame } from "../../api/backend/frames";
import { useScene } from "../../api/backend/scene";
import * as styles from "../../styles/local.css";
import LinkToScene from "../LinkToScene";

export enum NavigationDirection {
  Left = "left",
  Right = "right",
}

export const SceneNavigation = ({
  direction,
}: {
  direction: NavigationDirection;
}) => {
  const data = useScene();
  const mainFrame = useMainFrame(data);

  return (
    <LinkToScene scene={data} shallow={true} scroll={false}>
      <div
        className={
          {
            [NavigationDirection.Left]: styles.navigationLeft,
            [NavigationDirection.Right]: styles.navigationRight,
          }[direction]
        }
      >
        {data && mainFrame ? (
          <Image
            unoptimized
            crossOrigin="anonymous"
            alt={data.text}
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
        <div className={clsx(styles.navigationIndication, styles[direction])}>
          {direction === NavigationDirection.Left ? "Anterior" : "Siguiente"}
        </div>
      </div>
    </LinkToScene>
  );
};
