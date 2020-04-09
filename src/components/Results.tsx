import clsx from "clsx"
import groupBy from "lodash/groupBy"
import sortBy from "lodash/sortBy"
import toPairs from "lodash/toPairs"
import React, { FunctionComponent } from "react"
import { SearchResult } from "../backend/search"
import getUrlForSearchResultThumbnail from "../backend/thumbnail"
import styles from "../styles/local.module.css"

type ResultProps = { data: SearchResult }

const Result: FunctionComponent<ResultProps> = ({ data: result }) => (
  <div className={clsx(styles["col-6"], styles.result)}>
    <div className={styles["item-container"]}>
      <div
        className={styles["image-result"]}
        style={{
          backgroundSize: "contain",
          backgroundImage: `url("${getUrlForSearchResultThumbnail(result)}")`,
        }}
      ></div>
    </div>
  </div>
)

type SeasonProps = { season: number | String; results: SearchResult[] }

const Season: FunctionComponent<SeasonProps> = ({ season, results }) => (
  <>
    <div className={styles["results-season"]}>Temporada {season}</div>
    <div className={styles.row}>
      {sortBy(sortBy(results, "start"), "chapter.episodeNumber").map(
        (result) => (
          <Result data={result} />
        )
      )}
    </div>
  </>
)

export type Props = {
  data: SearchResult[]
}

const Results: FunctionComponent<Props> = ({ data }) => (
  <div className={styles.results}>
    <div className={styles["results-count"]}>{data.length} resultados</div>

    {sortBy(
      toPairs(groupBy(data, (item) => item.chapter.seasonNumber)),
      "0"
    ).map(([season, results]) => (
      <Season key={season} season={season} results={results} />
    ))}
  </div>
)

export default Results
