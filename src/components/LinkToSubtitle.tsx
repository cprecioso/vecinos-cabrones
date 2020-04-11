import Link from "next/link"
import React, { FunctionComponent } from "react"
import { SubtitleResult } from "../backend/types"

const LinkToSubtitle: FunctionComponent<{
  result: SubtitleResult
  query?: string
}> = ({ result, query, children }) => (
  <Link
    key={result.id}
    href="/[chapter]/[scene]"
    as={`/${
      result.chapter.seasonNumber
    }x${result.chapter.episodeNumber.toString(10).padStart(2, "0")}/${
      result.id
    }${query ? `#${encodeURIComponent(query)}` : ""}`}
  >
    {children}
  </Link>
)

export default LinkToSubtitle
