import { Scene } from "@/api/backend/types";
import { Flipped, Flipper } from "react-flip-toolkit";
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

const SubtitleLineWrapper = ({
  scene,
  current = false,
}: {
  scene: Scene;
  current?: boolean;
}) => {
  return (
    <Flipped
      flipId={scene.id}
      stagger
      onAppear={animateEnter}
      onExit={animateLeave}
    >
      <div>
        <LinkedSubtitleLine scene={scene} current={current} />
      </div>
    </Flipped>
  );
};

export const SubtitleView = () => {
  const ctx = useSceneContext();

  return (
    <Flipper
      flipKey={ctx.current.id}
      spring="veryGentle"
      staggerConfig={{ default: { speed: 0.1 } }}
    >
      <div className={styles.subtitlesContainer}>
        {ctx.previous && <SubtitleLineWrapper scene={ctx.previous} />}
        <SubtitleLineWrapper scene={ctx.current} current />
        {ctx.next && <SubtitleLineWrapper scene={ctx.next} />}
      </div>
    </Flipper>
  );
};
