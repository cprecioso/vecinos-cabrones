import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { preloadScene, SceneProvider } from "../../api/backend/scene";
import { SceneCacheProvider } from "../../api/backend/scene/SceneCacheProvider";
import { Scene as IScene } from "../../api/backend/types";
import { ErrorView, LoadingView } from "../../components/FetchHelpers";
import { sceneLink, sceneToParams } from "../../components/LinkToScene";
import Scene from "../../components/Scene";
import SearchBar from "../../components/SearchBar";

const parseSceneId = (sceneIdStr?: string | string[]) => {
  if (Array.isArray(sceneIdStr)) sceneIdStr = sceneIdStr[0];
  if (!sceneIdStr) return null;

  const sceneId = Number.parseInt(sceneIdStr, 10);
  if (isNaN(sceneId)) return null;
  return sceneId;
};

type Props = {
  preloadedData?: IScene[];
};
type Params = { chapter: string; scene: string };

const ScenePage: NextPage<Props> = ({ preloadedData }) => {
  const router = useRouter();
  const sceneId = parseSceneId(router.query.scene);

  return (
    <SceneCacheProvider initialCache={preloadedData}>
      {sceneId != null || router.isFallback ? (
        <>
          <SearchBar compact />
          {sceneId != null ? (
            <SceneProvider sceneId={sceneId}>
              <Scene />
            </SceneProvider>
          ) : (
            <LoadingView />
          )}
        </>
      ) : (
        <ErrorView error="Invalid scene id" />
      )}
    </SceneCacheProvider>
  );
};
export default ScenePage;

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const sceneId = parseSceneId(params?.scene);
  if (sceneId) {
    const preloadedData = await preloadScene(sceneId);

    const mainScene = preloadedData[0];
    const actualParams = sceneToParams(mainScene);

    if (
      params?.chapter !== actualParams.chapter ||
      params.scene !== actualParams.sceneId
    ) {
      return {
        redirect: { destination: sceneLink(mainScene), permanent: true },
      };
    }

    return { props: { preloadedData } };
  }
  return { props: {} };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: true,
});
