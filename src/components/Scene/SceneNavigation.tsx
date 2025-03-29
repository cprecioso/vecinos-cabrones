import clsx from "clsx";
import Image from "next/image";
import { useMainFrame } from "../../api/backend/frames";
import { useScene } from "../../api/backend/scene";
import styles from "../../styles/local.module.css";
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
      <div className={styles[`navigation-${direction}`]}>
        {data && mainFrame ? (
          <Image
            unoptimized
            crossOrigin="anonymous"
            alt={data.text}
            className={styles["navigation-image"]}
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
          className={clsx(styles["navigation-indication"], styles[direction])}
        >
          {direction === NavigationDirection.Left ? "Anterior" : "Siguiente"}
        </div>
      </div>
    </LinkToScene>
  );
};
