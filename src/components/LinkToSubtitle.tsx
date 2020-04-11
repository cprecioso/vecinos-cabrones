import Link from "next/link"
import React, { FunctionComponent } from "react"
import { SubtitleResult } from "../backend/types"

const LinkToSubtitle: FunctionComponent<{
  result?: SubtitleResult
  shallow?: boolean
  scroll?: boolean
}> = ({ result, children, shallow, scroll }) =>
  result ? (
    <Link
      key={result.id}
      href="/[chapter]/[scene]"
      as={`/${
        result.chapter.seasonNumber
      }x${result.chapter.episodeNumber.toString(10).padStart(2, "0")}/${
        result.id
      }`}
      shallow={shallow}
      scroll={scroll}
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  )

export default LinkToSubtitle
