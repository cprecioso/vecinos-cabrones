import styles from "./style.module.css";

export const LoadingView = () => <div className={styles.spinner}></div>;

export const ErrorView = ({ error = "" }: { error?: unknown }) => (
  <div>
    <h1 className={styles.title}>Error</h1>
    <pre className={styles.error}>{"" + (error ?? "")}</pre>
  </div>
);
