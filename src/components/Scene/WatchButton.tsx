import clsx from "clsx"
import React, { FunctionComponent } from "react"
import Popup from "reactjs-popup"
import { useScene } from "../../api/backend/scene"
import styles from "../../styles/local.module.css"
import { parseSubtitleTimestamp } from "../../util/timestamp"
import { AnalyticsEventLink } from "../Seo"
import primeEpisodes from "./prime-episodes.json"

export const WatchButton: FunctionComponent<{}> = () => {
  const scene = useScene()

  const episodeLink =
    primeEpisodes[(scene?.chapter.seasonNumber ?? 0) - 1]?.[
      (scene?.chapter.episodeNumber ?? 0) - 1
    ]

  if (!episodeLink) return null

  return (
    <div>
      <style jsx>{`
        p {
          font-size: 1em;
          line-height: 1.3em;
          text-align: center;
          color: white;
          font-weight: normal;
        }

        .${styles["button"]} {
          margin: 0.3em;
          margin-bottom: 0.5em;
        }

        & :global(.popup-content) {
          border-radius: 9px;
          z-index: 20 !important;
          padding: 8px !important;
        }
        & :global(.popup-content),
        & :global(.popup-arrow) {
          background: #16181b !important;
          border: 2px solid #212326 !important;
        }
        & :global(.popup-arrow) {
          border-top: 0 !important;
          border-left: 0 !important;
        }
      `}</style>
      {/* @ts-ignore */}
      <Popup
        disabled={!scene}
        trigger={
          <div
            className={clsx(
              styles["action-button"],
              styles.watch,
              scene ? "" : "disabled"
            )}
          >
            Ver escena
          </div>
        }
        position="top right"
        closeOnDocumentClick
      >
        <AnalyticsEventLink
          href={`${episodeLink}&t=${
            (parseSubtitleTimestamp(scene?.start ?? "") / 1000) | 0
          }`}
        >
          <div className={clsx(styles["button"], "ver")}>
            Ver en Prime Video
          </div>
        </AnalyticsEventLink>
        <AnalyticsEventLink href="https://www.primevideo.com/?&tag=vecinos0c-21">
          <div className={clsx(styles["button"], "prueba")}>
            Prueba gratuita de Prime Video
          </div>
        </AnalyticsEventLink>
        <p>
          Si usas estos enlaces para suscribirte a Prime Video, nos ayudas a
          mantener la web en funcionamiento.
        </p>
      </Popup>
    </div>
  )
}
