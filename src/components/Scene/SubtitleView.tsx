import React, { FunctionComponent } from "react"
import useScene from "../../api/backend/scene"
import { Scene } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import LinkToScene from "../LinkToScene"
import SubtitleLine from "./SubtitleLine"

const SubtitleLineWrapper: FunctionComponent<{
  current?: boolean
  id: number
  scene?: Scene
}> = ({ id, scene, current }) => {
  const { data, error } = useScene(id, scene)

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

const getIdOrScene = (
  scene?: number | Scene
): { id: number; scene?: Scene } | undefined => {
  if (scene == null) return undefined
  if (typeof scene === "number") return { id: scene, scene: undefined }
  return { id: scene.id, scene }
}

export const SubtitleView: FunctionComponent<{
  prev?: number | Scene
  current?: number | Scene
  next?: number | Scene
}> = ({ prev, next, current }) => {
  const _prev = getIdOrScene(prev)
  const _current = getIdOrScene(current)
  const _next = getIdOrScene(next)

  return (
    <div className={styles["subtitles-container"]}>
      {_prev ? <SubtitleLineWrapper id={_prev.id} scene={_prev.scene} /> : null}
      {_current ? (
        <SubtitleLineWrapper id={_current.id} scene={_current.scene} current />
      ) : null}
      {_next ? <SubtitleLineWrapper id={_next.id} scene={_next.scene} /> : null}
    </div>
  )
}
