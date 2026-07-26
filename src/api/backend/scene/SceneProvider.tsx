"use client";

import { LinkType } from "@/data/episodes-data.tsv";
import { createContext, useContext } from "react";
import { SubtitleGetResponse } from "./fetcher";

type SceneContextValue = SubtitleGetResponse & {
  watchLinks: Record<LinkType, string | null>;
};

const SceneContext = createContext<null | SceneContextValue>(null);
SceneContext.displayName = "SceneContext";

export const SceneProvider = SceneContext.Provider;

export const useSceneContext = () => {
  const value = useContext(SceneContext);
  if (!value)
    throw new Error("useSceneContext must be used within a SceneProvider");

  return value;
};
