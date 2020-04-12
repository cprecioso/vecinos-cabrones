import React, { FunctionComponent } from "react"
import { responseInterface } from "swr"
import LinkToSubtitle from "../LinkToSubtitle"
import { CacheEntry } from "./subtitle-fetch"
import SubtitleLine from "./SubtitleLine"

export const SubtitleLineWrapper: FunctionComponent<{
  response: responseInterface<CacheEntry, any>
  current?: boolean
}> = ({ response, current }) => {
  return (
    <LinkToSubtitle result={response.data?.scene} shallow={true} scroll={false}>
      <a>
        <SubtitleLine
          isCurrent={current}
          text={
            response.error ? "⚠️" + response.error : response.data?.scene.text
          }
        />
      </a>
    </LinkToSubtitle>
  )
}
