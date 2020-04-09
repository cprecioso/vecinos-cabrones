import clsx from "clsx"
import React, { FunctionComponent } from "react"
import styles from "../styles/local.module.css"
import SegmentedControl from "./SegmentedControl"

const Scene: FunctionComponent = () => (
  <div className={styles.scene}>
    <div className={styles["chapter-data"]}>
      <div className={styles["chapter-info"]}>Episodio 3 - Temporada 5</div>
      <div className={styles["chapter-title"]}>
        Érase una cámara de vigilancia
      </div>
      <div className={styles["chapter-view"]}>Ver episodio</div>
      <div style={{ clear: "both" }}></div>

      <SegmentedControl options={["Fotogramas", "GIF"]} />

      <div className={styles["scene-image"]}></div>

      <div className={styles.subtitles}>
        <div className={styles["subtitles-container"]}>
          <div className={styles["subtitle-line"]}>
            <div className={styles["subtitle-line-indicator"]}></div>
            <div className={styles["subtitle-line-text"]}>
              Pero bueno qué te pasa
            </div>
          </div>
          <div className={styles["subtitle-line"]}>
            <div
              className={clsx(
                styles["subtitle-line-indicator"],
                styles.current
              )}
            ></div>
            <div className={clsx(styles["subtitle-line-text"], styles.current)}>
              Papá que te he dicho que dejes de una vez el <b>ordenador.</b>
            </div>
          </div>
          <div className={styles["subtitle-line"]}>
            <div className={styles["subtitle-line-indicator"]}></div>
            <div className={styles["subtitle-line-text"]}>
              Estoy viendo fotos de Beyoncé.
            </div>
          </div>
        </div>

        <div className={styles["subtitles-navigation"]}>
          <div className={styles["navigation-left"]}>
            <div className={styles["navigation-image"]}></div>
            <div className={clsx(styles["navigation-indication"], styles.left)}>
              Anterior
            </div>
          </div>
          <div className={styles["navigation-right"]}>
            <div className={styles["navigation-image"]}></div>
            <div
              className={clsx(styles["navigation-indication"], styles.right)}
            >
              Siguiente
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Scene
