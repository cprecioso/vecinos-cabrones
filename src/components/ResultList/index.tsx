import groupBy from "lodash/groupBy"
import sortBy from "lodash/sortBy"
import toPairs from "lodash/toPairs"
import React, { FunctionComponent } from "react"
import { SearchResult } from "../../backend/search"
import styles from "../../styles/local.module.css"
import { Result } from "./Result"

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

const ResultList: FunctionComponent<Props> = ({ data }) => (
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

export default ResultList
