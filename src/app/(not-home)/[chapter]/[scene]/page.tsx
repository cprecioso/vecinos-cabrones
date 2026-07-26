import { getClosestFrameUrl } from "@/api/backend/frames";
import { SceneProvider } from "@/api/backend/scene";
import { getSubtitle, SubtitleGetResponse } from "@/api/backend/scene/fetcher";
import { makeSceneWatchLink } from "@/api/watch";
import { sceneToParams } from "@/components/LinkToScene";
import Scene from "@/components/Scene";
import { Metadata } from "next";
import { permanentRedirect, RedirectType } from "next/navigation";
import assert from "node:assert/strict";
import { SetRequired } from "type-fest";
import * as z from "zod";
import { sceneIdSchema } from "./types";

interface Props {
  params: Promise<{ chapter: string; scene: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { current: scene } = await parseParams(props);
  const mainFrameUrl = getClosestFrameUrl(scene);

  return {
    title: quoteIdempotent(scene.text),
    description: `ANHQV ${scene.chapter.seasonNumber}x${scene.chapter.episodeNumber.toString(10).padStart(2, "0")} ${scene.chapter.title}`,
    openGraph: { images: [mainFrameUrl] },
  };
}

export default async function ScenePage(props: Props) {
  const subtitleRes = await parseParams(props);

  return (
    <SceneProvider
      value={{
        ...subtitleRes,
        watchLinks: {
          netflix: makeSceneWatchLink(subtitleRes.current, "netflix"),
          prime: makeSceneWatchLink(subtitleRes.current, "prime"),
        },
      }}
    >
      <Scene />
    </SceneProvider>
  );
}

function quoteIdempotent(str: string) {
  return (/^["'“‘].+["'”’]$/s.test(str) ? str : `“${str}”`).replace(
    /\r?\n/g,
    " ",
  );
}

const sceneIdParamSchema = z.coerce.number().pipe(sceneIdSchema);

async function parseParams({ params }: Props) {
  const { chapter, scene: rawScene } = await params;
  const sceneId = sceneIdParamSchema.parse(rawScene);

  const subtitleRes = await getSubtitle(sceneId);
  assert(subtitleRes.current, "No such scene");

  {
    const actualParams = sceneToParams(subtitleRes.current);

    if (chapter !== actualParams.chapter || rawScene !== actualParams.sceneId) {
      permanentRedirect(
        `/${actualParams.chapter}/${actualParams.sceneId}`,
        RedirectType.replace,
      );
    }
  }

  return subtitleRes as SetRequired<SubtitleGetResponse, "current">;
}
