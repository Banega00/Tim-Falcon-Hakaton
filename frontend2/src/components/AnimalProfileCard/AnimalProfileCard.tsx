import React from "react";
// import styles from "./AnimalProfileCard.module.scss";
import styles from "../EndangeredSpeciesCard/EndangeredSpeciesCard.module.scss";

const AnimalProfileCard = ({animal}) => {
  return (
    <section className={styles.endangeredSpeciesCard}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imgBx}>
            <img src={ animal.pfp }/>
          </div>
          <div className={styles.contentBx}>
            <h2>{ animal.name }</h2>
            <div className={styles.size}>
              <h3>Followers :</h3>
              <span>{ animal.followers }</span>
            </div>
            <div className={styles.color}>
              <h3>Age :</h3>
              <p>{ animal.age }</p>
            </div>
            <a href="#">View More...</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnimalProfileCard;