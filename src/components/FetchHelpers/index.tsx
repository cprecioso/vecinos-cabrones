import React, { FunctionComponent } from "react"
import styles from "./style.module.css"

export const LoadingView: FunctionComponent = () => (
  <div className={styles.spinner}></div>
)

export const ErrorView: FunctionComponent<{ error?: any }> = ({
  error = "",
}) => (
  <div>
    <h1 className={styles.title}>Error</h1>
    <pre className={styles.error}>{"" + (error ?? "")}</pre>
  </div>
)
