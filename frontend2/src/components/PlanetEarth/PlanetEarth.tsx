import React from 'react';
import styles from '../PlanetEarth/PlanetEarth.module.scss';

const PlanetEarth = () => {
    return(
    <div className={styles.planetEarth}>
    <div className={styles.container}>
        <div className={styles.container__image}>
            <a href="/endangeredspecies/1" className={styles.europe}>Europe</a>
            <a href="/endangeredspecies/2" className={styles.asia}>Asia</a>
            <a href="/endangeredspecies/3" className={styles.africa}>Africa</a>
            <a href="/endangeredspecies/4" className={styles.northAmerica}>North America</a>
            <a href="/endangeredspecies/5" className={styles.southAmerica}>South America</a>
            <a href="/endangeredspecies/6" className={styles.australia}>Australia</a>
        </div>
    </div>
    </div>
    )
}

export default PlanetEarth;