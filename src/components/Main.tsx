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

    <div className={clsx(styles.row, styles.explain)}>
        <div className={styles["line-group"]}>
          <hr />
          <div className={styles["line-title"]}>
            <div className={styles["line-title-text"]}>¿Cómo y quién ha hecho esto?</div>
          </div>
      </div>
      <div className={styles["explain-image"]}>
		  <div style={{ marginTop: 40 }} className={styles["explain-title"]}>¡Subtítulos!</div>
		  <div className={styles["explain-description"]}>Gracias a los subtítulos de la serie, se ha vinculado cada frase a los fotogramas correspondientes y se ha generado una base de datos en la que consultar y obtener la información rápidamente.<br/> Puede leer más acerca de la tecnología usada <a href="medium.com/">aquí.</a> </div>
	   </div>
      <div className={styles["explain-image"]}>
		  <div className={styles["explain-title"]}>Los creadores</div>
		  <div className={styles["explain-description"]}>Las personas que han hecho esta web posible son:
		  <br /><br />
		  @pabgn: idea original y backend<br />
		  @adrimartin: diseño UI/UX<br />
		  @cprecioso: frontend<br />
		  
		  </div>
	   </div>	
    </div>
        
  </div>
)

export default Main
