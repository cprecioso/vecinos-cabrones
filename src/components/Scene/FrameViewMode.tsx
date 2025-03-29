import slugify from "@sindresorhus/slugify";
import Image from "next/image";
import { useFrames } from "../../api/backend/frames";
import { Scene } from "../../api/backend/types";
import styles from "../../styles/local.module.css";
import { ActionButtons } from "./ActionButtons";

const Frame = ({ url, text }: { url: string; text: string }) => (
  <div className={styles["scene-frame-view-frame"]}>
    <a href={url} download={`${slugify(text).slice(0, 10)}.gif`}>
      <Image
        unoptimized
        crossOrigin="anonymous"
        alt={text}
        src={url}
        width={500}
        height={375}
        className={styles["scene-image"]}
        quality={100}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </a>
  </div>
);

const FrameViewMode = ({ result }: { result: Scene }) => {
  const frameUrls = useFrames(result);

  return (
    <>
      <div className={styles["scene-frame-view"]}>
        {frameUrls.map((frameUrl) => (
          <Frame key={frameUrl} url={frameUrl} text={result.text} />
        ))}
      </div>
      <ActionButtons title={result.text} />
    </>
  );
};

export default FrameViewMode;
