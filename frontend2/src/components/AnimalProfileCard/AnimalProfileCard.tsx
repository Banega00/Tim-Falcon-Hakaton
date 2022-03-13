import React from "react";
// import styles from "./AnimalProfileCard.module.scss";
import styles from "../EndangeredSpeciesCard/EndangeredSpeciesCard.module.scss";

const AnimalProfileCard = ({animal}) => {
  return (
    <section className={styles.endangeredSpeciesCard}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imgBx}>
            {animal && animal.images && <img  alt="ne radi" src={require(`../../images/${((animal && animal.images) ? animal.images[0] : '' )}`)} />}
          </div>
          <div className={styles.contentBx}>
            <h2>{ animal.name }</h2>
            <div className={styles.size}>
              <h3>Followers :</h3>
              <span>{ animal && (animal.users ? animal.users.length : 0) }</span>
            </div>
            <div className={styles.color}>
              <h3>Months old: :</h3>
              <p>{ animal.monthsOld }</p>
            </div>
            <a href={`/animal/${animal.id}`}>View More...</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnimalProfileCard;