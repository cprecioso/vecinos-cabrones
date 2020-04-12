import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { getClosestFrameUrl } from "../../backend/thumbnail"
import styles from "../../styles/local.module.css"
import LinkToSubtitle from "../LinkToSubtitle"
import SegmentedControl from "../SegmentedControl"
import { PageSeo } from "../Seo"
import FrameViewMode, { EmptyViewMode } from "./FrameViewMode"
import GIFViewMode from "./GIFViewMode"
import { useFetchSubtitleInContext } from "./subtitle-fetch"
import { SubtitleLineWrapper } from "./SubtitleView"

export type Props = {
  id: number
}

enum ViewMode {
  Frame = "Fotogramas",
  Gif = "Gif",
}

const Scene: FunctionComponent<Props> = ({ id }) => {
  const { current, previous, next } = useFetchSubtitleInContext(id)

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
      <PageSeo
        imageUrl={currentFrameUrl}
        pageTitle={current.data ? `"${current.data.scene.text}"` : undefined}
        pageDescription={
          current.data
            ? `ANHQV ${
                current.data.scene.chapter.seasonNumber
              }x${current.data.scene.chapter.episodeNumber
                .toString(10)
                .padStart(2, "0")} ${current.data.scene.chapter.title}`
            : undefined
        }
      />
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
            <FrameViewMode result={current.data.scene} />
          )
        ) : (
          <EmptyViewMode />
        )}

        <div className={styles.subtitles}>
          <div className={styles["subtitles-container"]}>
            {current.data?.noPrevious ? null : (
              <SubtitleLineWrapper response={previous} />
            )}
            <SubtitleLineWrapper response={current} current />
            {current.data?.noNext ? null : (
              <SubtitleLineWrapper response={next} />
            )}
          </div>

          <div className={styles["subtitles-navigation"]}>
            {previous.data ? (
              <LinkToSubtitle
                result={previous.data.scene}
                shallow={true}
                scroll={false}
              >
                <a>
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
              </LinkToSubtitle>
            ) : null}
            {next.data ? (
              <LinkToSubtitle
                result={next.data.scene}
                shallow={true}
                scroll={false}
              >
                <a>
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
              </LinkToSubtitle>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scene
