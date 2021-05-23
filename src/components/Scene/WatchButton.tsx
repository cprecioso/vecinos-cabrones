import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { useScene } from "../../api/backend/scene"
import { makeWatchLink } from "../../pages/api/watch/[...args]"
import styles from "../../styles/local.module.css"
import { AnalyticsEventLink } from "../Seo"

export const WatchButton: FunctionComponent<{}> = () => {
  const scene = useScene()

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
      `}</style>

      <AnalyticsEventLink
        href={makeWatchLink(scene)}
        event={["amazon", "watch"]}
      >
        <div
          className={clsx(
            styles["action-button"],
            styles.watch,
            scene ? "" : "disabled"
          )}
        >
          Ver escena
        </div>
      </AnalyticsEventLink>
    </div>
  )
}
