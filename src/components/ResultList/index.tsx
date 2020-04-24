import groupBy from "lodash/groupBy"
import sortBy from "lodash/sortBy"
import toPairs from "lodash/toPairs"
import React, { FunctionComponent } from "react"
import { SubtitleSearchResponse } from "../../api/backend/types"
import styles from "../../styles/local.module.css"
import { QueueProvider } from "../../util/queue-context"
import LinkToSubtitle from "../LinkToSubtitle"
import { Result } from "./Result"

type SeasonProps = {
  season: number | String
  results: SubtitleSearchResponse
}

const Season: FunctionComponent<SeasonProps> = ({ season, results }) => (
  <>
    <div className={styles["results-season"]}>Temporada {season}</div>
    <div className={styles.row}>
      {sortBy(sortBy(results, "start"), "chapter.episodeNumber").map(
        (result) => (
          <LinkToSubtitle key={result.id} result={result}>
            <a>
              <Result data={result} />
            </a>
          </LinkToSubtitle>
        )
      )}
    </div>
  </>
)

export type Props = {
  data: SubtitleSearchResponse
}

const ResultList: FunctionComponent<Props> = ({ data }) => (
  <div className={styles.results}>
    <div className={styles["results-count"]}>{data.length} resultados</div>

    <QueueProvider concurrency={4}>
      {sortBy(
        toPairs(groupBy(data, (item) => item.chapter.seasonNumber)),
        "0"
      ).map(([season, results]) => (
        <Season key={season} season={season} results={results} />
      ))}
    </QueueProvider>
  </div>
)

export default ResultList
