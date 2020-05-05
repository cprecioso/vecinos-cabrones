import React, { FunctionComponent } from "react"
import useScene from "../../api/backend/scene"
import { Scene } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import LinkToScene from "../LinkToScene"
import SubtitleLine from "./SubtitleLine"

const SubtitleLineWrapper: FunctionComponent<{
  current?: boolean
  scene: Scene | number
}> = ({ scene, current }) => {
  const { data, error } = useScene(scene)

  const line = (
    <a>
      <SubtitleLine
        isCurrent={current}
        text={data?.text ?? (error != null ? `⚠️ ${error ?? ""}` : "")}
      />
    </a>
  )

  if (current) return line

  return (
    <LinkToScene scene={data} shallow={true} scroll={false}>
      {line}
    </LinkToScene>
  )
}

export const SubtitleView: FunctionComponent<{
  prev?: number | Scene
  current?: number | Scene
  next?: number | Scene
}> = ({ prev, next, current }) => {
  return (
    <div className={styles["subtitles-container"]}>
      {prev ? <SubtitleLineWrapper scene={prev} /> : null}
      {current ? <SubtitleLineWrapper scene={current} current /> : null}
      {next ? <SubtitleLineWrapper scene={next} /> : null}
    </div>
  )
}
