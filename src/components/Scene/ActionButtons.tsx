import slugify from "@sindresorhus/slugify";
import clsx from "clsx";
import * as styles from "../../styles/local.css";
import { WatchButton } from "./WatchButton";

const ShareButton = ({ title }: { title: string }) => {
  return (
    <a
      className={clsx(!title && styles.disabled)}
      onClick={() =>
        navigator.share!({ title, text: title, url: window.location.href })
      }
    >
      <div className={clsx(styles.actionButton, styles.share)}>Compartir</div>
    </a>
  );
};

const DownloadButton = ({ url, name }: { url?: string; name?: string }) => (
  <a
    className={clsx(!url && styles.disabled)}
    download={name || true}
    href={url}
  >
    <div className={clsx(styles.actionButton, styles.download)}>Descargar</div>
  </a>
);

export const ActionButtons = ({
  fileUrl,
  title,
  fileType,
}: {
  fileUrl?: string;
  fileType?: string;
  title: string;
}) => (
  <div className={styles.actionsHolder}>
    {fileType ? (
      <DownloadButton
        name={title && `${slugify(title).slice(0, 30)}.${fileType}`}
        url={fileUrl}
      />
    ) : null}
    <ShareButton title={title} />
    <WatchButton type="netflix">Netflix</WatchButton>
    <WatchButton type="prime">Prime</WatchButton>
  </div>
);
