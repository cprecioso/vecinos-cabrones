import slugify from "@sindresorhus/slugify"
import clsx from "clsx"
import { useRouter } from "next/router"
import React, { FunctionComponent } from "react"
import { useWebShare } from "../../api/webshare"
import styles from "../../styles/local.module.css"

const ShareButton: FunctionComponent<{ title: string }> = ({ title }) => {
  const { asPath: url } = useRouter()
  const { canShare, share } = useWebShare(title, url)

  if (canShare) {
    return (
      <a className={clsx(!title && styles.disabled)} onClick={share}>
        <div className={clsx(styles["action-button"], styles.share)}>
          Compartir
        </div>
      </a>
    )
  } else {
    return null
  }
}

const DownloadButton: FunctionComponent<{ url?: string; name?: string }> = ({
  url,
  name,
}) => (
  <a
    className={clsx(!url && styles.disabled)}
    download={name || true}
    href={url}
  >
    <div className={clsx(styles["action-button"], styles.download)}>
      Descargar
    </div>
  </a>
)

export const ActionButtons: FunctionComponent<{
  fileUrl?: string
  fileType?: string
  title: string
}> = ({ fileUrl, title, fileType }) => (
  <div className={styles["actions-holder"]}>
    {fileType ? (
      <DownloadButton
        name={title && `${slugify(title).slice(0, 30)}.${fileType}`}
        url={fileUrl}
      />
    ) : null}
    <ShareButton title={title} />
  </div>
)
