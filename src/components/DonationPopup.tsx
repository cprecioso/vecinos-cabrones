import * as styles from "@/styles/local.css";
import { useState } from "react";

const DonationPopup = () => {
  const [visible, setVisible] = useState(true);

  const dismiss = () => setVisible(false);

  if (!visible) return null;

  return (
    <div
      className={styles.donationOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) dismiss();
      }}
    >
      <div className={styles.donationPanel}>
        <div className={styles.donationHeader}>
          <p className={styles.donationTitle} id="donation-title">
            Ayúdanos a seguir{" "}
            <span className={styles.donationTitleAccent}>online</span>
          </p>
          <button
            className={styles.donationCloseButton}
            onClick={dismiss}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <p className={styles.donationText}>
          Para que vecinoscabrones siga funcionando necesitamos tu ayuda.
          Mantener esta web tiene costes de servidores, almacenamiento y ancho
          de banda. Tu donación nos ayuda a seguir ofreciendo este servicio a
          todos los fans de Aquí no hay quien viva.
        </p>

        <div className={styles.donationActions}>
          <a
            href="https://paypal.me/pabgn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.donationPrimaryBtn}
            onClick={dismiss}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 21.593c-.637.383-1.52.608-2.5.608C6.5 22.201 4 19.7 4 16.7c0-2.5 1.6-4.7 4-5.3V9H7V7h1V5.5C8 3.567 9.567 2 11.5 2S15 3.567 15 5.5V7h1v2h-1v2.4c2.4.6 4 2.8 4 5.3 0 .97-.24 1.88-.66 2.68L18 19l-1-1.5-.9 1.3-.9-1.3L14.3 19l-.9-1.3-.9 1.3L11.6 19l-.9 1.3L9.8 19 9 20.5 8 19l-.34.38"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Donar ahora con PayPal
          </a>

          <button className={styles.donationSecondaryBtn} onClick={dismiss}>
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationPopup;
