import clsx from "clsx"
import React, { FunctionComponent } from "react"
import styles from "../../styles/local.module.css"
import { useQuery } from "../../util/query-context"

// from verbal-expressions
// https://github.com/VerbalExpressions/JSVerbalExpressions/blob/bce33e6133e204a6dc6ede3f23e42325092ac328/VerbalExpressions.js#L42
const sanitizeForRegex = (value: string) =>
  value.replace(/([\].|*?+(){}^$\\:=[])/g, "\\$&")

const findAndMakeBold = (substr?: string) =>
  !substr
    ? (str: string) => <>{str}</>
    : (str: string) => {
        const re = new RegExp(sanitizeForRegex(substr), "giu")

        let lastIndex = 0
        let result: RegExpExecArray | null
        const els: JSX.Element[] = []
        while ((result = re.exec(str)) != null) {
          els.push(
            <>{str.slice(lastIndex, result.index)}</>,
            <b>{result[0]}</b>
          )
          lastIndex = re.lastIndex
        }
        els.push(<>{str.slice(lastIndex)}</>)

        return <>{els}</>
      }

const toHTMLLines = (lines: JSX.Element[]) => {
  let i = 0

  const els: JSX.Element[] = [
    <React.Fragment key={i++}>{lines.shift()}</React.Fragment>,
  ]

  for (const line of lines)
    els.push(
      <br key={i++} />,
      <React.Fragment key={i++}>{line}</React.Fragment>
    )

  return <>{els}</>
}

const SubtitleLine: FunctionComponent<{
  text?: string
  isCurrent?: boolean
}> = ({ text, isCurrent }) => {
  const { query } = useQuery()

  return (
    <div className={styles["subtitle-line"]}>
      <div
        className={clsx(
          styles["subtitle-line-indicator"],
          isCurrent && styles.current
        )}
      />
      <div
        className={clsx(
          styles["subtitle-line-text"],
          isCurrent && styles.current
        )}
      >
        {text ? (
          toHTMLLines(text.split("\n").map(findAndMakeBold(query)))
        ) : (
          <>
            &nbsp;
            <br />
            &nbsp;
          </>
        )}
      </div>
    </div>
  )
}

export default SubtitleLine
