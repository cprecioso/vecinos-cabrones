import React, { FunctionComponent } from "react"
import { useQuery } from "../util/query-context"

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
  const els: JSX.Element[] = [<>{lines.shift()}</>]
  for (const line of lines) els.push(<br />, <>{line}</>)
  return <>{els}</>
}

const SubtitleLine: FunctionComponent<{
  str: string
}> = ({ str }) => {
  const { query } = useQuery()
  return toHTMLLines(str.split("\n").map(findAndMakeBold(query)))
}

export default SubtitleLine
