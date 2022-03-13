import React from 'react';
import styles from '../PlanetEarth/PlanetEarth.module.scss';

const PlanetEarth = () => {
    return(
    <div className={styles.planetEarth}>
    <div className={styles.container}>
        <div className={styles.container__image}>
            <a href="#" className={styles.northAmerica}>North America</a>
            <a href="#" className={styles.southAmerica}>South America</a>
            <a href="#" className={styles.europe}>Europe</a>
            <a href="#" className={styles.asia}>Asia</a>
            <a href="#" className={styles.africa}>Africa</a>
            <a href="#" className={styles.australia}>Australia</a>
        </div>
    </div>
    </div>
    )
}

export default PlanetEarth;