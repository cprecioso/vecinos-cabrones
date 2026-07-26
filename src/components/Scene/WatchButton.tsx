import { useSceneContext } from "@/api/backend/scene";
import { LinkType } from "@/api/watch";
import * as styles from "@/styles/local.css";
import { sendGAEvent } from "@next/third-parties/google";
import clsx from "clsx";
import { ReactNode } from "react";

export const WatchButton = ({
  children,
  type,
}: {
  type: LinkType;
  children?: ReactNode;
}) => {
  const { watchLinks, current: scene } = useSceneContext();
  const link = watchLinks[type];
  if (!link) return null;

  return (
    <a
      href={link}
      onClick={() => {
        try {
          sendGAEvent("event", type, "watch");
        } catch {}
      }}
    >
      <div className={clsx(styles.actionButton, styles.watch)}>
        <div>{children}</div>
        <div>{formatTimestamp(scene.start)}</div>
      </div>
    </a>
  );
};

const formatTimestamp = (ts: string) => {
  const dotIdx = ts.indexOf(".");
  if (dotIdx !== -1) {
    ts = ts.slice(0, dotIdx);
  }
  const parts = ts.split(":");
  while (parts[0] === "00" || parts[0] === "0" || parts[0] === "") {
    parts.shift();
  }
  return parts.map((p) => p.padStart(2, "0")).join(":");
};
