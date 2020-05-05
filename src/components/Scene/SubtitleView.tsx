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
  return (
    <LinkToScene scene={data} shallow={true} scroll={false}>
      <a>
        <SubtitleLine
          isCurrent={current}
          text={data?.text ?? (error != null ? `⚠️ ${error ?? ""}` : "")}
        />
      </a>
    </LinkToScene>
  )
}

function getSceneId(scene: number | Scene): number
function getSceneId(scene?: number | Scene): number | null
function getSceneId(scene?: number | Scene) {
  if (scene == null) return null
  if (typeof scene == "number") return scene
  return scene.id
}

export const SubtitleView: FunctionComponent<{
  prev?: number | Scene
  current?: number | Scene
  next?: number | Scene
}> = ({ prev, next, current }) => {
  const items: (number | Scene)[] = [prev, current, next].filter(
    (v) => v != null
  ) as any

  return (
    <div className={styles["subtitles-container"]}>
      {items.map((scene) => {
        const isCurrent = scene != null && scene === current
        return (
          <div>
            <SubtitleLineWrapper scene={scene} current={isCurrent} />
          </div>
        )
      })}
    </div>
  )
}
