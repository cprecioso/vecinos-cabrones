import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import React, { FunctionComponent } from "react"
import emilioJpg from "../img/emilio.jpg"
import movilJpg from "../img/movil_anhqv.jpg"
import styles from "../styles/local.module.css"
import SearchBar from "./SearchBar"

const ExplainerImage: FunctionComponent<{
  href: string
  src: StaticImageData
  alt: string
  title: string
}> = ({ href, src, alt, title, children }) => (
  <div className={styles["explain-container"]}>
    <Link href={href}>
      <a>
        <div className={styles["explain-figure"]}>
          <Image
            src={src}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
            className={styles["explain-image"]}
            alt={alt}
          />
        </div>
      </a>
    </Link>

    <div className={styles["explain-title"]}>{title}</div>
    <div className={styles["explain-description"]}>{children}</div>
  </div>
)

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
      <ExplainerImage
        href="/2x10/23950"
        alt="Mariano usando un ordenador mientras Emilio le mira"
        src={emilioJpg}
        title="Todas las escenas de ANHQV con una búsqueda"
      >
        Puedes buscar en todos los diálogos de la serie y encontrar la escena
        que buscas en los 90 capítulos de la serie.
      </ExplainerImage>
      <ExplainerImage
        href="/2x04/18033"
        alt="La pantalla de un móvil con una foto de Vicenta, Marisa y Concha"
        src={movilJpg}
        title="Descarga un GIF de cualquier escena"
      >
        Visualiza las escenas de todos los capítulos, sus diálogos y descarga
        los GIFs rápidamente para compartirlos en redes sociales.
      </ExplainerImage>
    </div>

    <div className={clsx(styles.row, styles.explain)}>
      <div className={styles["line-group"]}>
        <hr />
        <div className={styles["line-title"]}>
          <div className={styles["line-title-text"]}>
            ¿Cómo y quién ha hecho esto?
          </div>
        </div>
      </div>
      <div className={styles["explain-image"]}>
        <div style={{ marginTop: 40 }} className={styles["explain-title"]}>
          ¡Subtítulos!
        </div>
        <div className={styles["explain-description"]}>
          Gracias a los subtítulos de la serie, se ha vinculado cada frase a los
          fotogramas correspondientes y se ha generado una base de datos en la
          que consultar y obtener la información rápidamente.
        </div>
      </div>
      <div className={styles["explain-image"]}>
        <div className={styles["explain-title"]}>Los creadores</div>
        <div className={styles["explain-description"]}>
          Las personas que han hecho esta web posible son:
          <br />
          <br />
          <a href="https://twitter.com/pabgn">@pabgn</a>: idea original y
          backend
          <br />
          <a href="https://twitter.com/adrimartin">@adrimartin</a>: diseño UI/UX
          <br />
          <a href="https://twitter.com/_cprecioso">@_cprecioso</a>: frontend
        </div>
      </div>
    </div>
  </div>
)

export default Main
