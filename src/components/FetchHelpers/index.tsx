import * as styles from "./style.css";

export const LoadingView = () => <div className={styles.spinner}></div>;

export const ErrorView = ({ error = "" }: { error?: unknown }) => (
  <div>
    <h1 className={styles.title}>Error</h1>
    <pre className={styles.error}>
      {"" +
        // oxlint-disable-next-line typescript/no-base-to-string
        (error ?? "")}
    </pre>
  </div>
);
