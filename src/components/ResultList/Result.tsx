import clsx from "clsx"
import React, { FunctionComponent } from "react"
import { SearchResult } from "../../backend/search"
import { getUrlsForSearchResultThumbnail } from "../../backend/thumbnail"
import styles from "../../styles/local.module.css"
import makeGifBlobUrl from "../../util/gif"

export type Props = {
  data: SearchResult
}

export const Result: FunctionComponent<Props> = ({ data: result }) => {
  const frameUrls = React.useMemo(
    () => getUrlsForSearchResultThumbnail(result),
    []
  )
  const [gifUrl, setGifUrl] = React.useState(undefined as string | undefined)
  React.useEffect(() => {
    if (gifUrl) {
      return () => URL.revokeObjectURL(gifUrl)
    }
  }, [gifUrl])

  const [isActive, setIsActive] = React.useState(false)
  const setActive = React.useCallback(() => setIsActive(true), [])
  const setInactive = React.useCallback(() => setIsActive(false), [])

  const currentSource = isActive && gifUrl ? gifUrl : frameUrls[0]
  const isLoading = isActive && !gifUrl

  React.useEffect(() => {
    if (isLoading) {
      const abortController = new AbortController()
      ;(async () => {
        try {
          const blobUrl = await makeGifBlobUrl(
            frameUrls,
            abortController.signal
          )
          setGifUrl(blobUrl)
        } catch (err) {
          console.error(err)
        }
      })()
      return () => abortController.abort()
    }
  }, [isLoading])

  return (
    <div
      className={clsx(styles["col-6"], styles.result)}
      onMouseEnter={setActive}
      onMouseLeave={setInactive}
    >
      <div className={styles["item-container"]}>
        <img
          src={currentSource}
          className={clsx(styles["image-result"], isLoading && styles.loading)}
        />
      </div>
    </div>
  )
}
