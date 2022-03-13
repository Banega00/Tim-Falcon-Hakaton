import React from 'react';
import styles from './EndangeredSpeciesCard.module.scss';

const EndangeredSpeciesCard = ({ id, img, text, remaining, continent }) => {
    return(
<section className={styles.endangeredSpeciesCard}>
<div className={styles.container}>
  <div className={styles.card}>
    <div className={styles.imgBx}>

      <img src={require(`../../images/${img}`)} alt=""/>
    </div>
    <div className={styles.contentBx}>
      <h2>{ text }</h2>
      <div className={styles.size}>
        <h3>Remaining :</h3>
        <span>{ remaining }</span>
      </div>
      <div className={styles.color}>
        <h3>Continent :</h3>
        <span>{ continent && continent.join(" ") }</span>
      </div>
      <a href={`/species/${id}`}>View More...</a>
    </div>
  </div>
</div>
</section>
    )
}

export default EndangeredSpeciesCard;