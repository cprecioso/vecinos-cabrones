import clsx from "clsx"
import React, { FunctionComponent } from "react"
import styles from "../styles/local.module.css"
import SearchBar from "./SearchBar"

const Main: FunctionComponent = () => (
  <div className={styles["home-content"]}>
    <div className={clsx(styles.row, styles.title)}>
      <div className={styles["col-12"]}>
        <h1>
          Encuentra tu escena favorita de <b>Aquí no hay quien viva</b>
        </h1>
      </div>
    </div>

    <SearchBar autoFocus={true} />

    <div className={clsx(styles.row, styles.explain)}>
        <div className={styles["line-group"]}>
          <hr />
          <div className={styles["line-title"]}>
            <div className={styles["line-title-text"]}>¿Pero esto qué es?</div>
          </div>
      </div>
      <div className={styles["explain-image"]}>
		  <img src="/static/emilio.jpg" />
		  <div className={styles["explain-title"]}>Todas las escenas de ANHQV con una búsqueda</div>
		  <div className={styles["explain-description"]}>Puedes buscar en todos los diálogos de la serie y encontrar la escena que buscas en los 90 capítulos de la serie. </div>
	   </div>
      <div className={styles["explain-image"]}>
		  <img src="/static/movil_anhqv.jpg" />
		  <div className={styles["explain-title"]}>Descarga un GIF de cualquier escena</div>
		  <div className={styles["explain-description"]}>Visualiza las escenas de todos los capítulos, sus diálogos y descarga los GIFs rápidamente para compartirlos en redes sociales.</div>
	   </div>	
	   
   
    </div>
  </div>
)

export default Main
