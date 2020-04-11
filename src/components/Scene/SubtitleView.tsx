import { FunctionComponent } from "react"
import styles from "../../styles/local.module.css"
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
          <a onClick={onGoPrevious} className={styles.link}>
            <SubtitleLine
              key={id - 1}
              text={
                previous.error
                  ? "⚠️" + previous.error
                  : previous.data?.scene.text
              }
            />
          </a>
        ),
        <SubtitleLine
          key={id}
          text={current.error ? "⚠️" + current.error : current.data?.scene.text}
          isCurrent={true}
        />,
        current.data?.noNext ? null : (
          <a onClick={onGoNext} className={styles.link}>
            <SubtitleLine
              key={id + 1}
              text={next.error ? "⚠️" + next.error : next.data?.scene.text}
            />
          </a>
        ),
      ]}
    </>
  )
}

export default SubtitleView
