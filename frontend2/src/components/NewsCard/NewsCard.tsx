import React from 'react';
import styles from '../NewsCard/NewsCard.module.scss';

const NewsCard = ({naslovVesti, tekstVesti, slikaVesti, autor, slikaAutora, datum, zivotinja}) => {
    return (
<div className={styles.newsCard}>
<div className={styles.container}>
  <div className={styles.card}>
    <div className={styles.cardHeader}>
      <img src={slikaVesti} alt="rover" />
    </div>
    <div className={styles.cardBody}>
      <span className={styles.tag}>{zivotinja}</span>
      <h4>{naslovVesti}</h4>
      <p>
        {tekstVesti}
      </p>
      <div className={styles.user}>
        <img src={slikaAutora} alt="user" />
        <div className={styles.userInfo}>
          <h5>{autor}</h5>
          <small>{datum}</small>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
    )
}

export default NewsCard;