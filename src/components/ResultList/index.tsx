import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import toPairs from "lodash/toPairs";
import { Scene } from "../../api/backend/types";
import styles from "../../styles/local.module.css";
import LinkToScene from "../LinkToScene";
import { Result } from "./Result";

type SeasonProps = {
  season: number | string;
  results: Scene[];
};

const Season = ({ season, results }: SeasonProps) => (
  <>
    <div className={styles["results-season"]}>Temporada {season}</div>
    <div className={styles.row}>
      {sortBy(sortBy(results, "start"), "chapter.episodeNumber").map(
        (result) => (
          <LinkToScene key={result.id} scene={result}>
            <Result data={result} />
          </LinkToScene>
        ),
      )}
    </div>
  </>
);

export type Props = {
  data: Scene[];
};

const ResultList = ({ data }: Props) => (
  <div className={styles.results}>
    <div className={styles["results-count"]}>{data.length} resultados</div>
    {sortBy(
      toPairs(groupBy(data, (item) => item.chapter.seasonNumber)),
      "0",
    ).map(([season, results]) => (
      <Season key={season} season={season} results={results} />
    ))}
  </div>
);

export default ResultList;
