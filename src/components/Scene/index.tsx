import clsx from "clsx"
import { useRouter } from "next/router"
import React, { FunctionComponent } from "react"
import { getClosestFrameUrl } from "../../backend/thumbnail"
import styles from "../../styles/local.module.css"
import SegmentedControl from "../SegmentedControl"
import FrameViewMode, { EmptyViewMode } from "./FrameViewMode"
import GIFViewMode from "./GIFViewMode"
import { useFetchSubtitleInContext } from "./subtitle-fetch"
import SubtitleView from "./SubtitleView"

export type Props = {
  initialSceneId: number
}

enum ViewMode {
  Frame = "Fotogramas",
  Gif = "Gif",
}

const Scene: FunctionComponent<Props> = ({ initialSceneId }) => {
  const router = useRouter()

  const [id, setId] = React.useState(initialSceneId)

  const goPrevious = React.useCallback(() => setId((id) => id - 1), [])
  const goNext = React.useCallback(() => setId((id) => id + 1), [])

  const { current, previous, next } = useFetchSubtitleInContext(id)

  React.useEffect(() => {
    if (current.data) {
      router.push(
        "/[chapter]/[scene]",
        `/${
          current.data.scene.chapter.seasonNumber
        }x${current.data.scene.chapter.episodeNumber
          .toString(10)
          .padStart(2, "0")}/${current.data.scene.id}`,
        {
          shallow: true,
        }
      )
    }
  }, [current.data])

  const currentFrameUrl = current.data?.scene
    ? getClosestFrameUrl(current.data.scene)
    : undefined
  const previousSceneFrameUrl = previous.data?.scene
    ? getClosestFrameUrl(previous.data.scene)
    : undefined
  const nextSceneFrameUrl = next.data?.scene
    ? getClosestFrameUrl(next.data.scene)
    : undefined

  const [currentViewMode, setCurrentViewMode] = React.useState(ViewMode.Gif)

  return (
    <div className={styles.scene}>
      <div className={styles["chapter-data"]}>
        <div className={styles["chapter-info"]}>
          {current.data ? (
            <>
              Episodio {current.data.scene.chapter.episodeNumber} - Temporada{" "}
              {current.data.scene.chapter.seasonNumber}
            </>
          ) : (
            <>&nbsp;</>
          )}
        </div>
        <div className={styles["chapter-title"]}>
          {current.data?.scene.chapter.title ?? <>&nbsp;</>}
        </div>

        <div style={{ clear: "both" }} />

        <SegmentedControl
          options={[ViewMode.Gif, ViewMode.Frame]}
          selected={currentViewMode}
          setSelected={setCurrentViewMode as (n: string) => void}
        />

        {currentFrameUrl && current.data ? (
          currentViewMode === ViewMode.Gif ? (
            <GIFViewMode scene={current.data.scene} />
          ) : (
            <FrameViewMode frameUrl={currentFrameUrl} />
          )
        ) : (
          <EmptyViewMode />
        )}

        <div className={styles.subtitles}>
          <div className={styles["subtitles-container"]}>
            <SubtitleView id={id} onGoPrevious={goPrevious} onGoNext={goNext} />
          </div>

          <div className={styles["subtitles-navigation"]}>
            {previous.data ? (
              <a className={styles.link} onClick={goPrevious}>
                <div className={styles["navigation-left"]}>
                  <img
                    crossOrigin="anonymous"
                    className={styles["navigation-image"]}
                    src={previousSceneFrameUrl}
                  />
                  <div
                    className={clsx(
                      styles["navigation-indication"],
                      styles.left
                    )}
                  >
                    Anterior
                  </div>
                </div>
              </a>
            ) : null}
            {next.data ? (
              <a className={styles.link} onClick={goNext}>
                <div className={styles["navigation-right"]}>
                  <img
                    crossOrigin="anonymous"
                    className={styles["navigation-image"]}
                    src={nextSceneFrameUrl}
                  />
                  <div
                    className={clsx(
                      styles["navigation-indication"],
                      styles.right
                    )}
                  >
                    Siguiente
                  </div>
                </div>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scene
