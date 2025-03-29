import clsx from "clsx";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useFrames } from "../../api/backend/frames";
import { Scene } from "../../api/backend/types";
import { useGif } from "../../api/gif/hook";
import styles from "../../styles/local.module.css";
import { makeSceneTitle } from "../../util/formatters";
import { useHovering, useIsImageLoaded } from "../../util/hooks";

export type Props = {
  data: Scene;
};

export const Result = ({ data: result }: Props) => {
  const { isHovering, onEnter, onLeave } = useHovering();
  const [ref, inView] = useInView({ threshold: 0.7 });
  const { isLoaded, handleLoad } = useIsImageLoaded();

  const isActive = isHovering || (inView && isLoaded);

  const frameUrls = useFrames(result);
  const { gifUrl, isLoading } = useGif(
    result,
    { resizeToWidth: 150, step: 2, delay: 200 },
    !isActive,
  );
  const currentSource = isActive && gifUrl ? gifUrl : frameUrls[0];

  return (
    <div
      className={clsx(styles["col-6"], styles.result)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      ref={ref}
    >
      <div className={styles["item-container"]}>
        <Image
          unoptimized
          crossOrigin="anonymous"
          alt={result.text}
          title={makeSceneTitle(result)}
          width={252}
          height={189}
          onLoadingComplete={handleLoad}
          src={currentSource}
          className={clsx(styles["image-result"], isLoading && styles.loading)}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </div>
  );
};
