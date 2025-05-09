import { Scene } from "@/api/backend/types";
import Link from "next/link";
import { ReactNode } from "react";

export const sceneToParams = (scene: Scene) => ({
  chapter: `${scene.chapter.seasonNumber}x${scene.chapter.episodeNumber
    .toString(10)
    .padStart(2, "0")}`,
  sceneId: "" + scene.id,
});

export const sceneLink = (scene: Scene) => {
  const { chapter, sceneId } = sceneToParams(scene);
  return `/${chapter}/${sceneId}`;
};

const LinkToScene = ({
  scene,
  children,
  shallow,
  scroll,
}: {
  scene?: Scene;
  shallow?: boolean;
  scroll?: boolean;
  children?: ReactNode;
}) =>
  scene ? (
    <Link
      key={scene.id}
      href="/[chapter]/[scene]"
      as={sceneLink(scene)}
      shallow={shallow}
      scroll={scroll}
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

export default LinkToScene;
