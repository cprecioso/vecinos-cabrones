export interface Chapter {
  id: string
  episodeNumber: number
  seasonNumber: number
}

export interface SubtitleResult {
  id: number
  text: string
  start: string
  end: string
  chapter: Chapter
}

export type SubtitleSearchResponse = SubtitleResult[]
