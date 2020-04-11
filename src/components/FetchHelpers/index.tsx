import React, { FunctionComponent } from "react"
import styles from "./style.module.css"

export const LoadingView: FunctionComponent = () => (
  <h1 className={styles.title}>Cargando...</h1>
)

export const ErrorView: FunctionComponent<{ error?: any }> = ({
  error = "",
}) => (
  <div>
    <h1 className={styles.title}>Error</h1>
    <pre className={styles.error}>{"" + (error ?? "")}</pre>
  </div>
)
