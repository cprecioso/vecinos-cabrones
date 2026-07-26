"use client";

import * as styles from "@/styles/local.css";
import clsx from "clsx";
import Form from "next/form";
import { useSyncExternalStore } from "react";

const useSearchQuery = useSyncExternalStore.bind(
  null,
  () => () => {},
  () => new URL(window.location.href).searchParams.get("q") ?? "",
  () => "",
) as () => string;

const SearchBar = () => {
  const searchQuery = useSearchQuery();

  return (
    <Form className={clsx(styles.row, styles.search)} action="/buscar">
      <div className={styles.col12}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="PUF"
            defaultValue={searchQuery}
            name="q"
            autoFocus
            autoComplete="off"
          />
          <input type="submit" value="" className={styles.searchButton} />
        </div>
      </div>
    </Form>
  );
};

export default SearchBar;
