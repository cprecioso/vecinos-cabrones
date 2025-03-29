export interface Chapter {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
}

export interface Scene {
  id: number;
  text: string;
  start: string;
  end: string;
  chapter: Chapter;
}

export type SceneId = Scene["id"];

export const getNextSceneId = (scene: Scene | SceneId): number | null =>
  (typeof scene === "number" ? scene : scene.id) + 1;
export const getPrevSceneId = (scene: Scene | SceneId): number | null => {
  const prevId = (typeof scene === "number" ? scene : scene.id) - 1;
  if (prevId < 1) return null;
  return prevId;
};
