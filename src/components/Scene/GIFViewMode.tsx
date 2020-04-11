import clsx from "clsx"
import React, { FunctionComponent } from "react"
import styles from "../../styles/local.module.css"
import { useGif } from "../../util/gif"

const GIFViewMode: FunctionComponent<{
  frameUrls: string[]
}> = ({ frameUrls }) => {
  const { gifUrl, isLoading } = useGif(frameUrls, true)
  return (
    <a download href={gifUrl}>
      <img
        crossOrigin="anonymous"
        className={clsx(styles["scene-image"], isLoading && styles.loading)}
        src={gifUrl ?? frameUrls[0]}
      />
    </a>
  )
}

export default GIFViewMode
