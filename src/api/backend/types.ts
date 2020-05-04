export interface Chapter {
  id: string
  episodeNumber: number
  seasonNumber: number
  title: string
}

export interface Scene {
  id: number
  text: string
  start: string
  end: string
  chapter: Chapter
}
