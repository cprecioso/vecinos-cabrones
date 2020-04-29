import clsx from "clsx"
import { useRouter } from "next/router"
import React, { DOMAttributes, FunctionComponent } from "react"
import styles from "../../styles/local.module.css"

const detectCanShare = () => {
  try {
    return !!window.navigator.share
  } catch (_) {}
  return false
}

const ShareButton: FunctionComponent<{ title?: string }> = ({ title }) => {
  const [canShare, setCanShare] = React.useState(false)
  React.useEffect(() => setCanShare(detectCanShare()), [])

  const { asPath: url } = useRouter()

  const handleShare = React.useCallback<
    NonNullable<DOMAttributes<HTMLAnchorElement>["onClick"]>
  >(
    (e) => {
      navigator.share({ url, title, text: title })
      e.preventDefault()
    },
    [title, url]
  )

  if (!canShare) return null

  return (
    <a
      href="#"
      className={clsx(!title && styles.disabled)}
      onClick={handleShare}
    >
      <div className={clsx(styles["action-button"], styles.share)}>
        Compartir
      </div>
    </a>
  )
}

export const ActionButtons: FunctionComponent<{
  enableDownload?: boolean
  title?: string
  downloadUrl?: string
  downloadName?: string
}> = ({ downloadName, downloadUrl, title, enableDownload }) => (
  <div className={styles["actions-holder"]}>
    <ShareButton title={title} />
    {enableDownload ? (
      <a
        className={clsx(!downloadUrl && styles.disabled)}
        download={downloadName || true}
        href={downloadUrl}
      >
        <div className={clsx(styles["action-button"], styles.download)}>
          Descargar
        </div>
      </a>
    ) : null}
  </div>
)
