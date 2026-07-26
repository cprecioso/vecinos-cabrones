"use client";

import { useState, ViewTransition } from "react";
import { useSceneContext } from "../../api/backend/scene";
import * as styles from "../../styles/local.css";
import SegmentedControl from "../SegmentedControl";
import FrameViewMode from "./FrameViewMode";
import GIFViewMode from "./GIFViewMode";
import { NavigationDirection, SceneNavigation } from "./SceneNavigation";
import { SubtitleView } from "./SubtitleView";

enum ViewMode {
  Frame = "Fotos",
  Gif = "GIF",
}

const Scene = () => {
  const {
    current: scene,
    previous: previousScene,
    next: nextScene,
  } = useSceneContext();
  const [currentViewMode, setCurrentViewMode] = useState(ViewMode.Gif);

  return (
    <div className={styles.chapterData}>
      <div className={styles.chapterInfo}>
        Temporada {scene.chapter.seasonNumber}
      </div>
      <div className={styles.chapterTitle}>{scene.chapter.title}</div>

      <div style={{ clear: "both" }} />

      <SegmentedControl
        options={[ViewMode.Gif, ViewMode.Frame]}
        selected={currentViewMode}
        setSelected={setCurrentViewMode as (n: string) => void}
      />

      <ViewTransition name={"scene-hero-" + scene.id}>
        {currentViewMode === ViewMode.Gif ? (
          <GIFViewMode scene={scene} />
        ) : (
          <FrameViewMode result={scene} />
        )}
      </ViewTransition>

      <div className={styles.subtitles}>
        <SubtitleView />
        <div className={styles.subtitlesNavigation}>
          {previousScene ? (
            <SceneNavigation
              scene={previousScene}
              direction={NavigationDirection.Left}
            />
          ) : null}
          {nextScene ? (
            <SceneNavigation
              scene={nextScene}
              direction={NavigationDirection.Right}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Scene;
