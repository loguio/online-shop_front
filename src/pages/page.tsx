"use client";
import styles from "./page.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import axiosI from "../axiosInterceptor";
import Product from "../types/product";
import { useEffect } from "react";
import ListeProduits from "../components/ListeProduits";

export default function Home() {
  const fetchData = async () => {
    const response = await axiosI.get<Product[]>("/products");
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    fetchData();
  });
  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <h1>
          La box pensée <br />
          pour chaque <br />
          Monsieur à Barbe
        </h1>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            JE LA VEUX
          </a>
        </div>
      </div>
      <h1>Nouveau mois, nouvel homme</h1>
      <div className={styles.decouverte}>
        {
          <img
            className={styles.logo}
            src="/Produits-cosmetiques.jpg"
            alt="Vercel logomark"
            width={400}
            height={400}
          />
        }
        <div className={styles.contenu}>
          <p>
            La <strong>seule</strong> box pour barbe sur abonnement : l’élégance
            et le soin offerts chaque mois avec{" "}
            <strong>Monsieur à Barbe !</strong>
          </p>
          <p>
            Chaque mois, recevez une nouvelle box contenant des produits pour
            entretenir et prendre soin de votre barbe…
          </p>
          <a href="">JE DÉCOUVRE</a>
        </div>
      </div>
      <div className={styles.tutoriel}>
        <h1>Comment ça marche</h1>
        <div className={styles.etapes}>
          <div className={styles.etape}>
            {
              <img
                className={styles.logo}
                src="/tuto_etape1.png"
                alt="Vercel logomark"
                width={200}
                height={200}
              />
            }
            <h2>1</h2>
            <p>Je choisis mon abonnement</p>
          </div>

          <div className={styles.etape}>
            {
              <img
                className={styles.logo}
                src="/tuto_etape2.png"
                alt="Vercel logomark"
                width={300}
                height={300}
              />
            }
            <h2>2</h2>
            <p>Je reçois ma Box</p>
          </div>

          <div className={styles.etape}>
            {
              <img
                className={styles.logo}
                src="/tuto_etape3.png"
                alt="Vercel logomark"
                width={200}
                height={200}
              />
            }
            <h2>3</h2>
            <p>Je découvre ce qu’on m’a préparé</p>
          </div>
        </div>
        <a href="">PLUS DE DÉTAILS</a>
      </div>
      <div className={styles.section_abonnements}>
        <h1> Nos offres d’abonnement </h1>
        <a href="">J’OFFRE UN ABONNEMENT</a>
        <div className={styles.section_avis}>
          <div className={styles.voir_tous_les_avis}>
            <h2>Les avis parlent d’eux-mêmes</h2>
            <p>Consultez les avis de nos clients avant de vous lancer</p>
            <a href="">VOIR TOUS LES AVIS</a>
          </div>
        </div>
      </div>
      <div className={styles.section_produits}>
        <h1>Dans vos box, retrouvez ces produits</h1>
        <ListeProduits />
        <div>
          <a href="" className={styles.voir_tous_les_produits}>
            VOIR TOUS LES PRODUITS
          </a>
        </div>
      </div>
    </main>
  );
}
