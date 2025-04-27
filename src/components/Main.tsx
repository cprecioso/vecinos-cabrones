import emilioJpg from "@/img/emilio.jpg";
import movilJpg from "@/img/movil_anhqv.jpg";
import * as styles from "@/styles/local.css";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import SearchBar from "./SearchBar";

const ExplainerImage = ({
  href,
  src,
  alt,
  title,
  children,
}: {
  href: string;
  src: StaticImageData;
  alt: string;
  title: string;
  children?: ReactNode;
}) => (
  <div className={styles.explainContainer}>
    <Link href={href}>
      <div className={styles.explainFigure}>
        <Image
          src={src}
          placeholder="blur"
          className={styles.explainImage}
          alt={alt}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </div>
    </Link>
    <div className={styles.explainTitle}>{title}</div>
    <div className={styles.explainDescription}>{children}</div>
  </div>
);

const Main = () => (
  <div className={styles.homeContent}>
    <div className={clsx(styles.row, styles.title)}>
      <div className={styles.col12}>
        <h1>
          Encuentra tu escena favorita de <b>Aquí no hay quien viva</b>
        </h1>
      </div>
    </div>

    <SearchBar autoFocus={true} />

    <div className={clsx(styles.row, styles.explain)}>
      <div className={styles.lineGroup}>
        <hr />
        <div className={styles.lineTitle}>
          <div className={styles.lineTitleText}>¿Pero esto qué es?</div>
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
      <div className={styles.lineGroup}>
        <hr />
        <div className={styles.lineTitle}>
          <div className={styles.lineTitleText}>
            ¿Cómo y quién ha hecho esto?
          </div>
        </div>
      </div>
      <div className={styles.explainImage}>
        <div style={{ marginTop: 40 }} className={styles.explainTitle}>
          Nuestros donantes
        </div>
        <div className={styles.explainDescription}>
          Esta web existe gracias al apoyo de la comunidad de fans de Aquí no
          hay quien viva. Cada donación, grande o pequeña, nos ayuda a seguir
          ofreciendo este servicio para todos los amantes de la serie.
        </div>

        <div style={{ marginTop: 40 }} className={styles.explainTitle}>
          ¡Subtítulos!
        </div>
        <div className={styles.explainDescription}>
          Gracias a los subtítulos de la serie, se ha vinculado cada frase a los
          fotogramas correspondientes y se ha generado una base de datos en la
          que consultar y obtener la información rápidamente.
        </div>
      </div>
      <div className={styles.explainImage}>
        <div className={styles.explainTitle}>Los creadores</div>
        <div className={styles.explainDescription}>
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
);

export default Main;
