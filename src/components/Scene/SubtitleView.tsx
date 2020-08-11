import React, { FunctionComponent } from "react"
import { Flipped, Flipper } from "react-flip-toolkit"
import { SceneProvider, useScene, useSceneId } from "../../api/backend/scene"
import { getNextSceneId, getPrevSceneId } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import LinkToScene from "../LinkToScene"
import SubtitleLine from "./SubtitleLine"

const LinkedSubtitleLine: FunctionComponent<{
  current?: boolean
}> = ({ current }) => {
  const data = useScene()

  return (
    <LinkToScene scene={data} shallow={false} scroll={false}>
      <a>
        <SubtitleLine isCurrent={current} text={data?.text ?? ""} />
      </a>
    </LinkToScene>
  )
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

const SubtitleLineWrapper: FunctionComponent<{ current: boolean }> = ({
  current,
}) => {
  const sceneId = useSceneId()

  return (
    <Flipped
      flipId={sceneId}
      stagger
      onAppear={animateEnter}
      onExit={animateLeave}
    >
      <div>
        <LinkedSubtitleLine current={current} />
      </div>
    </Flipped>
  )
}

export const SubtitleView: FunctionComponent = () => {
  const currentId = useSceneId()

  const items = [
    getPrevSceneId(currentId),
    currentId,
    getNextSceneId(currentId),
  ].filter((v: number | null): v is number => v != null)

  return (
    <Flipper
      flipKey={currentId}
      spring="veryGentle"
      staggerConfig={{ default: { speed: 0.1 } }}
    >
      <div className={styles["subtitles-container"]}>
        {items.map((sceneId) => {
          const isCurrent = sceneId === currentId
          return (
            <SceneProvider key={sceneId} sceneId={sceneId}>
              <SubtitleLineWrapper current={isCurrent} />
            </SceneProvider>
          )
        })}
      </div>
    </Flipper>
  )
}
