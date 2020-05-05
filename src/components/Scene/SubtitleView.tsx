import React, { FunctionComponent } from "react"
import { Flipped, Flipper } from "react-flip-toolkit"
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

const animationDuration = 200
const animateEnter = (el: HTMLElement) => {
  el.style.opacity = "0"
  requestAnimationFrame(() => {
    el.style.transition = `${animationDuration}ms opacity`
    el.style.opacity = "1"
    setTimeout(() => {
      el.style.transition = ""
    }, animationDuration)
  })
}

const animateLeave = (
  el: HTMLElement,
  i: number,
  removeElement: () => void
) => {
  el.style.opacity = "1"
  requestAnimationFrame(() => {
    el.style.transition = `${animationDuration}ms opacity`
    el.style.opacity = "0"
    setTimeout(() => {
      removeElement()
    }, animationDuration)
  })
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
    <Flipper
      flipKey={getSceneId(current)}
      spring="veryGentle"
      staggerConfig={{ default: { speed: 0.1 } }}
    >
      <div className={styles["subtitles-container"]}>
        {items.map((scene) => {
          const sceneId = getSceneId(scene)
          const isCurrent = scene != null && scene === current
          return (
            <Flipped
              key={sceneId}
              flipId={sceneId}
              stagger
              onAppear={animateEnter}
              onExit={animateLeave}
            >
              <div>
                <SubtitleLineWrapper scene={scene} current={isCurrent} />
              </div>
            </Flipped>
          )
        })}
      </div>
    </Flipper>
  )
}
