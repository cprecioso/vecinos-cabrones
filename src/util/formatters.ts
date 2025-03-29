import type { Scene } from "@/api/backend/types";

export const makeSceneTitle = (scene: Scene) => `Episodio ${
  scene.chapter.seasonNumber
}x${scene.chapter.episodeNumber
  .toString(10)
  .padStart(2, "0")} (${scene.start.slice(0, scene.start.indexOf("."))})

${scene.text}`;
