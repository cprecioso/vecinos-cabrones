import { FunctionComponent } from "react"
import LinkToSubtitle from "../LinkToSubtitle"
import { useFetchSubtitleInContext } from "./subtitle-fetch"
import SubtitleLine from "./SubtitleLine"

const SubtitleView: FunctionComponent<{
  id: number
  onGoNext: () => void
  onGoPrevious: () => void
}> = ({ id, onGoNext, onGoPrevious }) => {
  const { current, previous, next } = useFetchSubtitleInContext(id)

  return (
    <>
      {[
        current.data?.noPrevious ? null : (
          <LinkToSubtitle
            result={previous.data?.scene}
            shallow={true}
            scroll={false}
          >
            <a>
              <SubtitleLine
                key={id - 1}
                text={
                  previous.error
                    ? "⚠️" + previous.error
                    : previous.data?.scene.text
                }
              />
            </a>
          </LinkToSubtitle>
        ),
        <SubtitleLine
          key={id}
          text={current.error ? "⚠️" + current.error : current.data?.scene.text}
          isCurrent={true}
        />,
        current.data?.noNext ? null : (
          <LinkToSubtitle
            result={next.data?.scene}
            shallow={true}
            scroll={false}
          >
            <a>
              <SubtitleLine
                key={id + 1}
                text={next.error ? "⚠️" + next.error : next.data?.scene.text}
              />
            </a>
          </LinkToSubtitle>
        ),
      ]}
    </>
  )
}

export default SubtitleView
