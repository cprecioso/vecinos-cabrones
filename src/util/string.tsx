import React, { FunctionComponent } from "react"

const intersperseMut: <T>(arr: T[], fn: () => T) => T[] = (arr, fn) => {
  const els = [arr.shift()!]
  for (const el of arr) {
    els.push(fn()!, el!)
  }
  return els
}

export const SubtitleLine: FunctionComponent<{
  str: string
  substr?: string
}> = ({ str, substr }) => {
  return (
    <>
      {intersperseMut(
        str.split("\n").map((line) => (
          <>
            {substr
              ? intersperseMut(
                  line.split(substr).map((str) => <>{str}</>),
                  () => <b>{substr}</b>
                )
              : line}
          </>
        )),
        () => (
          <br />
        )
      )}
    </>
  )
}
