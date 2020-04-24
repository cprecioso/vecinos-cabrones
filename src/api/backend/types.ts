export interface Chapter {
  id: string
  episodeNumber: number
  seasonNumber: number
  title: string
}

export interface SubtitleResult {
  id: number
  text: string
  start: string
  end: string
  chapter: Chapter
}

export type SubtitleSearchResponse = SubtitleResult[]

export type SubtitleGetResponse = {
  current: SubtitleResult
  previous?: SubtitleResult
  next?: SubtitleResult
}
