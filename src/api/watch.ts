import { Scene } from "@/api/backend/types";
import type { Episode, LinkType } from "@/data/episodes-data.tsv";
import episodesDataRawBytes from "@/data/episodes-data.tsv";
import * as dsv from "d3-dsv";

export type { LinkType };

const episodesData: Partial<Episode>[] = dsv.tsvParse(
  new TextDecoder().decode(episodesDataRawBytes),
);

export function makeSceneWatchLink(scene: Scene, type: LinkType) {
  const { seasonNumber, episodeNumber } = scene.chapter;

  const baseUrl = getUrl(
    seasonNumber.toString(10),
    episodeNumber.toString(10),
    type,
  );
  if (!baseUrl) return null;
  const url = new URL(baseUrl);
  return url.href;
}

function getUrl(seasonN: string, episodeN: string, type: LinkType) {
  const episodeLink = episodesData.find(
    (episode) =>
      episode["data-season"] === seasonN &&
      episode["data-episode"] === episodeN,
  )?.[`${type}-link`];

  if (!episodeLink) return null;
  return episodeLink;
}
