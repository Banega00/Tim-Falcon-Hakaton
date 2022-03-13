import React, {useEffect, useState} from 'react';
import styles from './EndangeredSpeciesCard.module.scss';



const EndangeredSpeciesCard = ({ id, img, text, remaining, total, continent, badgeText }) => {

  const[bc, setBc] = useState(styles.badge + " " + styles.yellow);
  function setbadge() {
    console.log(badgeText);
    switch (badgeText) {
      case "Least concern":
        setBc(styles.badge + " " + styles.blue)
        break
      case "Conservation Dependent":
        setBc(styles.badge + " " + styles.blue_dark)
        break
      case "Near threatened":
        setBc(styles.badge + " " + styles.purple)
        break;
      case "Vulnerable":
        setBc(styles.badge + " " + styles.silver)
        break;
      case "Endangered":
        setBc(styles.badge + " " + styles.yellow);
        break;
      case "Critically endangered":
        setBc(styles.badge + " " + styles.orange)
        break
      case "Extinct in the wild":
        setBc(styles.badge + " " + styles.gold)
        break
      case "Extinct":
        setBc(styles.badge + " " + styles.red)
        break
    }
  }

  useEffect(() => setbadge(), []);



    return(
<section className={styles.endangeredSpeciesCard}>
<div className={styles.container}>
  <div className={styles.card}>


    <div className={bc}>
      <div className={styles.circle}><i className={styles.fa + " fa-bolt"}></i></div>
      <div className={styles.ribbon}>{badgeText}</div>
    </div>


    <div className={styles.imgBx}>

      <img src={require(`../../images/${img}`)} alt=""/>
    </div>
    <div className={styles.contentBx}>
      <h2>{ text }</h2>
      <div className={styles.size}>
        <h3>Remaining :</h3>
        <span>{ total }</span>
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