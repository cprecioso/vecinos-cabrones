import SearchBar from "@/components/SearchBar";
import * as styles from "@/styles/local.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SearchBar />

      <div className={styles.results}>{children}</div>
    </>
  );
}
