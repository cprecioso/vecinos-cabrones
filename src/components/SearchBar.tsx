import clsx from "clsx"
import { useRouter } from "next/router"
import React, { DOMAttributes, FunctionComponent } from "react"
import styles from "../styles/local.module.css"

export type Props = { defaultValue?: string; autoFocus?: boolean }

type OnSubmitCallback = NonNullable<DOMAttributes<HTMLFormElement>["onSubmit"]>

const SearchBar: FunctionComponent<Props> = ({ defaultValue, autoFocus }) => {
  const router = useRouter()
  const onSubmit = React.useCallback<OnSubmitCallback>(
    (e) => {
      const q = (e.currentTarget.elements.namedItem("q")! as HTMLInputElement)
        .value

      if (q) {
        router.push({ pathname: "/buscar", query: { q } })
      }

      e.preventDefault()
      return false
    },
    [router]
  )

  return (
    <form
      className={clsx(styles.row, styles.search)}
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
            defaultValue={defaultValue}
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
