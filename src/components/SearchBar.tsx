import * as styles from "@/styles/local.css";
import { useQuery } from "@/util/query-context";
import clsx from "clsx";
import { useRouter } from "next/router";
import { DOMAttributes, useCallback } from "react";

export type Props = { autoFocus?: boolean; compact?: boolean };

type OnSubmitCallback = NonNullable<DOMAttributes<HTMLFormElement>["onSubmit"]>;

const SearchBar = ({ autoFocus, compact }: Props) => {
  const router = useRouter();
  const { query, setQuery } = useQuery();

  const onSubmit = useCallback<OnSubmitCallback>(
    (e) => {
      const q = (e.currentTarget.elements.namedItem("q")! as HTMLInputElement)
        .value;

      if (q) {
        setQuery(q);
        router.push({ pathname: "/buscar", query: { q } });
      }

      e.preventDefault();
      return false;
    },
    [router, setQuery],
  );

  return (
    <form
      className={clsx(styles.row, styles.search, compact && styles.compact)}
      method="GET"
      action="/search"
      onSubmit={onSubmit}
    >
      <div className={styles.col12}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="PUF"
            defaultValue={query}
            name="q"
            autoFocus={autoFocus}
            autoComplete="off"
          />
          <input type="submit" value="" className={styles.searchButton} />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
