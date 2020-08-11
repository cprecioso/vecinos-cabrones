import React, { FunctionComponent } from "react"
import { useMainFrame } from "../../api/backend/frames"
import { SceneProvider, useScene } from "../../api/backend/scene"
import { getNextSceneId, getPrevSceneId } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import SegmentedControl from "../SegmentedControl"
import { PageSeo } from "../Seo"
import FrameViewMode from "./FrameViewMode"
import GIFViewMode from "./GIFViewMode"
import { NavigationDirection, SceneNavigation } from "./SceneNavigation"
import { SubtitleView } from "./SubtitleView"

export type Props = {}

enum ViewMode {
  Frame = "Fotos",
  Gif = "GIF",
}

const quoteIdempotent = (str: string) =>
  /^["'“‘].+["'”’]$/s.test(str) ? str : `“${str}”`

const Scene: FunctionComponent<Props> = ({}) => {
  const data = useScene()
  const [currentViewMode, setCurrentViewMode] = React.useState(ViewMode.Gif)
  const mainFrame = useMainFrame(data)

  if (!data) return null

  const nextSceneId = getNextSceneId(data)
  const prevSceneId = getPrevSceneId(data)

  return (
    <div className={styles.scene}>
      <PageSeo
        imageUrl={mainFrame}
        pageTitle={quoteIdempotent(data.text)}
        pageDescription={`ANHQV ${
          data.chapter.seasonNumber
        }x${data.chapter.episodeNumber.toString(10).padStart(2, "0")} ${
          data.chapter.title
        }`}
      />
      <div className={styles["chapter-data"]}>
        <div className={styles["chapter-info"]}>
          Temporada {data.chapter.seasonNumber}
        </div>
        <div className={styles["chapter-title"]}>{data.chapter.title}</div>

        <div style={{ clear: "both" }} />

        <SegmentedControl
          options={[ViewMode.Gif, ViewMode.Frame]}
          selected={currentViewMode}
          setSelected={setCurrentViewMode as (n: string) => void}
        />

        {currentViewMode === ViewMode.Gif ? (
          <GIFViewMode scene={data} />
        ) : (
          <FrameViewMode result={data} />
        )}

        <div className={styles.subtitles}>
          <SubtitleView />
          <div className={styles["subtitles-navigation"]}>
            {prevSceneId ? (
              <SceneProvider sceneId={prevSceneId}>
                <SceneNavigation direction={NavigationDirection.Left} />
              </SceneProvider>
            ) : null}
            {nextSceneId ? (
              <SceneProvider sceneId={nextSceneId}>
                <SceneNavigation direction={NavigationDirection.Right} />
              </SceneProvider>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scene
