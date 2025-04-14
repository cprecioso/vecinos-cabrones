import * as styles from "@/styles/local.css";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const DonationPage = () => {
  // Current donation amount (in euros)
  const [currentAmount] = useState(27.56);
  const targetAmount = 90;
  const progressPercentage = (currentAmount / targetAmount) * 100;

  return (
    <div className={styles.homeContent}>
      <div className={clsx(styles.row, styles.title)}>
        <div className={styles.col12}>
          <h1>
            Necesitamos tu <b>ayuda</b>
          </h1>

          {/* Moved paragraph closer to the title by placing it here */}
          <p
            className={styles.explainDescription}
            style={{ marginTop: "20px" }}
          >
            Para que vecinoscabrones siga funcionando necesitamos tu ayuda.
            Mantener esta web tiene costes de servidores, almacenamiento y ancho
            de banda. Tu donación nos ayuda a seguir ofreciendo este servicio a
            todos los fans de Aquí no hay quien viva.
          </p>

          {/* Progress bar with no margins */}
          <div style={{ marginTop: "50px", padding: 0 }}>
            {/* Progress bar container */}
            <div
              style={{
                width: "100%",
                height: "30px",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "15px",
                overflow: "hidden",
                marginBottom: "16px",
                padding: 0,
              }}
            >
              {/* Progress bar fill */}
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: "100%",
                  backgroundColor: "#fec32a",
                  borderRadius: "15px",
                  transition: "width 0.5s ease-in-out",
                }}
              />
            </div>

            {/* Progress text */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#fff",
                marginBottom: "40px",
                padding: 0,
              }}
            >
              <span className={styles.explainDescription}>
                {currentAmount}€ recaudados
              </span>
              <span className={styles.explainDescription}>
                Objetivo: {targetAmount}€
              </span>
            </div>
          </div>

          {/* Full-width donation button */}
          <div style={{ marginTop: "30px", width: "100%" }}>
            <Link
              href="https://paypal.me/pabgn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", display: "block" }}
            >
              <button
                className={styles.actionButton}
                style={{
                  backgroundColor: "#fec32a",
                  color: "#16181b",
                  fontWeight: "600",
                  fontSize: "18px",
                  padding: "12px 30px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  display: "flex",
                  alignItems: "center", // Ensures vertical centering
                  justifyContent: "center", // Ensures horizontal centering
                  height: "50px", // Fixed height to ensure proper centering
                  lineHeight: "1", // Prevents line-height from affecting vertical alignment
                  width: "100%", // Make button fill 100% width
                }}
              >
                Donar ahora
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className={clsx(styles.row, styles.explain)}>
        <div className={styles.lineGroup}>
          <hr />
          <div className={styles.lineTitle}>
            <div className={styles.lineTitleText}>¿Otras formas de ayudar?</div>
          </div>
        </div>
        <div className={styles.explainImage}>
          <div className={styles.explainDescription}>
            Nos encantaría restablecer el servicio cuanto antes para que todos
            los fans puedan disfrutar de vecinoscabrones. Si tienes otras ideas
            o formas de ayudar,{" "}
            <a href="mailto:pablo@garcianieto.me">no dudes en contactarnos.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
