import React from 'react';
import styles from './EndangeredSpeciesCard.module.scss';

const EndangeredSpeciesCard = ({ img, text, left, habitat }) => {
    return(
<div className={styles.container}>
  <div className={styles.card}>
    <div className={styles.imgBx}>
      <img src={ img }/>
    </div>
    <div className={styles.contentBx}>
      <h2>{ text }</h2>
      <div className={styles.size}>
        <h3>Left :</h3>
        <span>{ left }</span>
      </div>
      <div className={styles.color}>
        <h3>Habitat :</h3>
        <span>{ habitat }</span>
      </div>
      <a href="#">View More...</a>
    </div>
  </div>
</div>
    )
}

export default EndangeredSpeciesCard;