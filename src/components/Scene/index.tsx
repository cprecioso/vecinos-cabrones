import React, { FunctionComponent } from "react"
import { useMainFrame } from "../../api/backend/frames"
import useScene, { getSceneContext } from "../../api/backend/scene"
import { Scene as IScene } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import { ErrorView, LoadingView } from "../FetchHelpers"
import SegmentedControl from "../SegmentedControl"
import { PageSeo } from "../Seo"
import FrameViewMode from "./FrameViewMode"
import GIFViewMode from "./GIFViewMode"
import { NavigationDirection, SceneNavigation } from "./SceneNavigation"
import { SubtitleLineWrapper } from "./SubtitleView"

export type Props = {
  id: number
  scene?: IScene
}

enum ViewMode {
  Frame = "Fotos",
  Gif = "GIF",
}

const quoteIdempotent = (str: string) =>
  /^["'“‘].+["'”’]$/.test(str) ? str : `“${str}”`

const Scene: FunctionComponent<Props> = ({ id, scene }) => {
  const { data, error, isValidating } = useScene(id, scene)
  const [currentViewMode, setCurrentViewMode] = React.useState(ViewMode.Gif)
  const mainFrame = useMainFrame(data)

  if (!data) {
    return (
      <>
        {isValidating ? <LoadingView /> : null}
        {error ? <ErrorView error={error} /> : null}
      </>
    )
  }

  const { prevSceneId, nextSceneId } = getSceneContext(data)

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
          <div className={styles["subtitles-container"]}>
            <SubtitleLineWrapper id={data.id - 1} />
            <SubtitleLineWrapper id={data.id} scene={data} current />
            <SubtitleLineWrapper id={data.id + 1} />
          </div>

          <div className={styles["subtitles-navigation"]}>
            <SceneNavigation
              id={prevSceneId}
              direction={NavigationDirection.Left}
            />
            <SceneNavigation
              id={nextSceneId}
              direction={NavigationDirection.Right}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scene
