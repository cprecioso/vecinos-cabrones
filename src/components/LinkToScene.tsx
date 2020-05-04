import Link from "next/link"
import React, { FunctionComponent } from "react"
import { Scene } from "../api/backend/types"

const LinkToScene: FunctionComponent<{
  scene?: Scene
  shallow?: boolean
  scroll?: boolean
}> = ({ scene, children, shallow, scroll }) =>
  scene ? (
    <Link
      key={scene.id}
      href="/[chapter]/[scene]"
      as={`/${
        scene.chapter.seasonNumber
      }x${scene.chapter.episodeNumber.toString(10).padStart(2, "0")}/${
        scene.id
      }`}
      shallow={shallow}
      scroll={scroll}
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  )

export default LinkToScene
