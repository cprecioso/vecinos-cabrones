import clsx from "clsx";
import { ReactNode } from "react";
import { useScene } from "../../api/backend/scene";
import {
  LinkType,
  makeWatchLink,
} from "../../pages/api/watch/[season]/[episode]/[ts]/[type]";
import * as styles from "../../styles/local.css";
import { AnalyticsEventLink } from "../Seo";

export const WatchButton = ({
  children,
  type,
}: {
  type: LinkType;
  children?: ReactNode;
}) => {
  const scene = useScene();

  return (
    <AnalyticsEventLink
      href={scene ? makeWatchLink(scene, type) : ""}
      event={[type, "watch"]}
    >
      <div
        className={clsx(
          styles.actionButton,
          styles.watch,
          scene ? "" : "disabled",
        )}
      >
        {children}
      </div>
    </AnalyticsEventLink>
  );
};
