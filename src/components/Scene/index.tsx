import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useFrameUrls } from "../../backend/thumbnail"
import { SubtitleGetResponse } from "../../backend/types"
import styles from "../../styles/local.module.css"
import LinkToSubtitle from "../LinkToSubtitle"
import SegmentedControl from "../SegmentedControl"
import SubtitleLine from "../SubtitleLine"
import FrameViewMode from "./FrameViewMode"
import GIFViewMode from "./GIFViewMode"

export type Props = {
  data: SubtitleGetResponse
}

enum ViewMode {
  Frame = "Fotogramas",
  Gif = "Gif",
}

const Scene: FunctionComponent<Props> = ({ data }) => {
  const frameUrls = useFrameUrls(data.current)

  const previousSceneFrameUrls = useFrameUrls(data.previous)[0]
  const nextSceneFrameUrls = useFrameUrls(data.next)[0]

  const [currentViewMode, setCurrentViewMode] = React.useState(ViewMode.Frame)

  return (
    <div className={styles.scene}>
      <div className={styles["chapter-data"]}>
        <div className={styles["chapter-info"]}>
          Episodio {data.current.chapter.episodeNumber} - Temporada{" "}
          {data.current.chapter.seasonNumber}
        </div>
        <div className={styles["chapter-title"]}>
          {data.current.chapter.title}
        </div>

        <div style={{ clear: "both" }} />

        <SegmentedControl
          options={[ViewMode.Frame, ViewMode.Gif]}
          selected={currentViewMode}
          setSelected={setCurrentViewMode as (n: string) => void}
        />

        {currentViewMode === ViewMode.Gif ? (
          <GIFViewMode frameUrls={frameUrls} />
        ) : (
          <FrameViewMode frameUrls={frameUrls} />
        )}

        <div className={styles.subtitles}>
          <div className={styles["subtitles-container"]}>
            {data.previous ? (
              <LinkToSubtitle result={data.previous}>
                <a>
                  <div className={styles["subtitle-line"]}>
                    <div className={styles["subtitle-line-indicator"]} />
                    <div className={styles["subtitle-line-text"]}>
                      <SubtitleLine str={data.previous.text} />
                    </div>
                  </div>
                </a>
              </LinkToSubtitle>
            ) : null}
            <div className={styles["subtitle-line"]}>
              <div
                className={clsx(
                  styles["subtitle-line-indicator"],
                  styles.current
                )}
              />
              <div
                className={clsx(styles["subtitle-line-text"], styles.current)}
              >
                <SubtitleLine str={data.current.text} />
              </div>
            </div>
            {data.next ? (
              <LinkToSubtitle result={data.next}>
                <a>
                  <div className={styles["subtitle-line"]}>
                    <div className={styles["subtitle-line-indicator"]} />
                    <div className={styles["subtitle-line-text"]}>
                      <SubtitleLine str={data.next.text} />
                    </div>
                  </div>
                </a>
              </LinkToSubtitle>
            ) : null}
          </div>

          <div className={styles["subtitles-navigation"]}>
            {data.previous ? (
              <LinkToSubtitle result={data.previous}>
                <a>
                  <div className={styles["navigation-left"]}>
                    <img
                      crossOrigin="anonymous"
                      className={styles["navigation-image"]}
                      src={previousSceneFrameUrls}
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
            {data.next ? (
              <LinkToSubtitle result={data.next}>
                <a>
                  <div className={styles["navigation-right"]}>
                    <img
                      crossOrigin="anonymous"
                      className={styles["navigation-image"]}
                      src={nextSceneFrameUrls}
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
