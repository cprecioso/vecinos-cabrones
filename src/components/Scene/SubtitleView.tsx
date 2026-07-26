import { Scene } from "@/api/backend/types";
import { ViewTransition } from "react";
import { useSceneContext } from "../../api/backend/scene";
import * as styles from "../../styles/local.css";
import LinkToScene from "../LinkToScene";
import SubtitleLine from "./SubtitleLine";

const LinkedSubtitleLine = ({
  scene,
  current,
}: {
  scene: Scene;
  current?: boolean;
}) => {
  return (
    <LinkToScene scene={scene} shallow={true} scroll={false}>
      <SubtitleLine isCurrent={current} text={scene?.text} />
    </LinkToScene>
  );
};

const SubtitleLineWrapper = ({
  scene,
  current = false,
}: {
  scene: Scene;
  current?: boolean;
}) => {
  return (
    <div>
      <LinkedSubtitleLine scene={scene} current={current} />
    </div>
  );
};

export const SubtitleView = () => {
  const ctx = useSceneContext();

  return (
    <div className={styles.subtitlesContainer}>
      {ctx.previous && (
        <ViewTransition name={"subtitle-line-" + ctx.previous.id}>
          <SubtitleLineWrapper scene={ctx.previous} />
        </ViewTransition>
      )}

      <ViewTransition name={"subtitle-line-" + ctx.current.id}>
        <SubtitleLineWrapper scene={ctx.current} current />
      </ViewTransition>

      {ctx.next && (
        <ViewTransition name={"subtitle-line-" + ctx.next.id}>
          <SubtitleLineWrapper scene={ctx.next} />
        </ViewTransition>
      )}
    </div>
  );
};
