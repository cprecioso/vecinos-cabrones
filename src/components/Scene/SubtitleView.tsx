import { useMemo } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { SceneProvider, useScene, useSceneId } from "../../api/backend/scene";
import { getNextSceneId, getPrevSceneId } from "../../api/backend/types";
import * as styles from "../../styles/local.css";
import LinkToScene from "../LinkToScene";
import SubtitleLine from "./SubtitleLine";

const LinkedSubtitleLine = ({ current }: { current?: boolean }) => {
  const data = useScene();

  return (
    <LinkToScene scene={data} shallow={true} scroll={false}>
      <SubtitleLine isCurrent={current} text={data?.text} />
    </LinkToScene>
  );
};

const animationDuration = 200;
const animateEnter = (el: HTMLElement) => {
  el.style.opacity = "0";
  requestAnimationFrame(() => {
    el.style.transition = `${animationDuration}ms opacity`;
    el.style.opacity = "1";
    setTimeout(() => {
      el.style.transition = "";
    }, animationDuration);
  });
};

const animateLeave = (
  el: HTMLElement,
  i: number,
  removeElement: () => void,
) => {
  el.style.opacity = "1";
  requestAnimationFrame(() => {
    el.style.transition = `${animationDuration}ms opacity`;
    el.style.opacity = "0";
    setTimeout(() => {
      removeElement();
    }, animationDuration);
  });
};

const SubtitleLineWrapper = ({ current }: { current: boolean }) => {
  const sceneId = useSceneId();

  return (
    <Flipped
      flipId={sceneId}
      stagger
      onAppear={animateEnter}
      onExit={animateLeave}
    >
      <div>
        <LinkedSubtitleLine current={current} />
      </div>
    </Flipped>
  );
};

export const SubtitleView = () => {
  const currentId = useSceneId();

  const sceneIds = useMemo(
    () =>
      [getPrevSceneId(currentId), currentId, getNextSceneId(currentId)].filter(
        (v: number | null): v is number => v != null,
      ),
    [currentId],
  );

  return (
    <Flipper
      flipKey={currentId}
      spring="veryGentle"
      staggerConfig={{ default: { speed: 0.1 } }}
    >
      <div className={styles.subtitlesContainer}>
        {sceneIds.map((sceneId) => {
          const isCurrent = sceneId === currentId;
          return (
            <SceneProvider key={sceneId} sceneId={sceneId}>
              <SubtitleLineWrapper current={isCurrent} />
            </SceneProvider>
          );
        })}
      </div>
    </Flipper>
  );
};
