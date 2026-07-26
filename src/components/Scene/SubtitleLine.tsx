import clsx from "clsx";
import { Fragment, ReactNode } from "react";
import * as styles from "../../styles/local.css";

const toHTMLLines = (lines: ReactNode[]) => {
  let i = 0;

  const els: ReactNode[] = [<Fragment key={i++}>{lines.shift()}</Fragment>];

  for (const line of lines)
    els.push(<br key={i++} />, <Fragment key={i++}>{line}</Fragment>);

  return <>{els}</>;
};

const SubtitleLine = ({
  text,
  isCurrent,
}: {
  text?: string;
  isCurrent?: boolean;
}) => {
  return (
    <div className={styles.subtitleLine}>
      <div
        className={clsx(
          styles.subtitleLineIndicator,
          isCurrent && styles.current,
        )}
      />
      <div
        className={clsx(styles.subtitleLineText, isCurrent && styles.current)}
      >
        {text ? (
          toHTMLLines(text.split("\n"))
        ) : (
          <>
            &nbsp;
            <br />
            &nbsp;
          </>
        )}
      </div>
    </div>
  );
};

export default SubtitleLine;
