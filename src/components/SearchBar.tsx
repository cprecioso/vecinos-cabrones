"use client";

import * as styles from "@/styles/local.css";
import clsx from "clsx";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

const SearchBar = () => {
  const searchParams = useSearchParams();

  return (
    <Form className={clsx(styles.row, styles.search)} action="/buscar">
      <div className={styles.col12}>
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="PUF"
            defaultValue={searchParams?.get("q") ?? ""}
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
