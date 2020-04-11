import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useFrameUrls } from "../backend/thumbnail"
import { SubtitleGetResponse } from "../backend/types"
import styles from "../styles/local.module.css"
import { useGif } from "../util/gif"
import LinkToSubtitle from "./LinkToSubtitle"
import SubtitleLine from "./SubtitleLine"

export type Props = {
  data: SubtitleGetResponse
  query?: string
}

const Scene: FunctionComponent<Props> = ({ data, query }) => {
  const frameUrls = useFrameUrls(data.current)
  const { gifUrl, isLoading } = useGif(frameUrls, true)

  const previousSceneFrameUrls = useFrameUrls(data.previous)[0]
  const nextSceneFrameUrls = useFrameUrls(data.next)[0]

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

        {/* <SegmentedControl options={["Fotogramas", "GIF"]} /> */}

        <a download href={gifUrl}>
          <img
            crossOrigin="anonymous"
            className={clsx(styles["scene-image"], isLoading && styles.loading)}
            src={gifUrl ?? frameUrls[0]}
          />
        </a>

        <div className={styles.subtitles}>
          <div className={styles["subtitles-container"]}>
            {data.previous ? (
              <LinkToSubtitle result={data.previous} query={query}>
                <a>
                  <div className={styles["subtitle-line"]}>
                    <div className={styles["subtitle-line-indicator"]} />
                    <div className={styles["subtitle-line-text"]}>
                      <SubtitleLine str={data.previous.text} query={query} />
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
                <SubtitleLine str={data.current.text} query={query} />
              </div>
            </div>
            {data.next ? (
              <LinkToSubtitle result={data.next} query={query}>
                <a>
                  <div className={styles["subtitle-line"]}>
                    <div className={styles["subtitle-line-indicator"]} />
                    <div className={styles["subtitle-line-text"]}>
                      <SubtitleLine str={data.next.text} query={query} />
                    </div>
                  </div>
                </a>
              </LinkToSubtitle>
            ) : null}
          </div>

          <div className={styles["subtitles-navigation"]}>
            {data.previous ? (
              <LinkToSubtitle result={data.previous} query={query}>
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
              <LinkToSubtitle result={data.next} query={query}>
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
