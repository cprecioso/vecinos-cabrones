import clsx from "clsx"
import { useRouter } from "next/router"
import React, { DOMAttributes, FunctionComponent } from "react"
import styles from "../styles/local.module.css"
import { useQuery } from "../util/query-context"

export type Props = { autoFocus?: boolean; compact?: boolean }

type OnSubmitCallback = NonNullable<DOMAttributes<HTMLFormElement>["onSubmit"]>

const SearchBar: FunctionComponent<Props> = ({ autoFocus, compact }) => {
  const router = useRouter()
  const { query, setQuery } = useQuery()

  const onSubmit = React.useCallback<OnSubmitCallback>(
    (e) => {
      const q = (e.currentTarget.elements.namedItem("q")! as HTMLInputElement)
        .value

      if (q) {
        setQuery(q)
        router.push({ pathname: "/buscar", query: { q } })
      }

      e.preventDefault()
      return false
    },
    [router]
  )

  return (
    <form
      className={clsx(styles.row, styles.search, compact && styles.compact)}
      method="GET"
      action="/search"
      onSubmit={onSubmit}
    >
      <div className={styles["col-12"]}>
        <div className={styles["search-box"]}>
          <input
            className={styles["search-input"]}
            type="text"
            placeholder="PUF"
            defaultValue={query}
            name="q"
            autoFocus={autoFocus}
            autoComplete="off"
          />
          <input type="submit" value="" className={styles["search-button"]} />
        </div>
      </div>
    </form>
  )
}

export default SearchBar
