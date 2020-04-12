import React, { FunctionComponent } from "react"
import { responseInterface } from "swr"
import LinkToSubtitle from "../LinkToSubtitle"
import { CacheEntry, useFetchSubtitleInContext } from "./subtitle-fetch"
import SubtitleLine from "./SubtitleLine"

const SubtitleLineWrapper: FunctionComponent<{
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

const SubtitleView: FunctionComponent<{
  id: number
}> = ({ id }) => {
  const { current, previous, next } = useFetchSubtitleInContext(id)

  return (
    <>
      {current.data?.noPrevious ? null : (
        <SubtitleLineWrapper key={id - 1} response={previous} />
      )}
      <SubtitleLineWrapper current key={id} response={current} />
      {current.data?.noNext ? null : (
        <SubtitleLineWrapper key={id + 1} response={next} />
      )}
    </>
  )
}

export default SubtitleView
