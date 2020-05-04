import React, { FunctionComponent } from "react"
import useScene from "../../api/backend/scene"
import { Scene } from "../../api/backend/types"
import LinkToScene from "../LinkToScene"
import SubtitleLine from "./SubtitleLine"

export const SubtitleLineWrapper: FunctionComponent<{
  current?: boolean
  id: number
  scene?: Scene
}> = ({ id, scene, current }) => {
  const { data, error } = useScene(id, scene)

  const line = (
    <SubtitleLine
      isCurrent={current}
      text={data?.text ?? (error != null ? `⚠️ ${error ?? ""}` : "")}
    />
  )

  if (current) return line

  return (
    <LinkToScene scene={data} shallow={true} scroll={false}>
      <a>{line}</a>
    </LinkToScene>
  )
}
