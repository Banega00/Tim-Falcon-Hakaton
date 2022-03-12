import React from "react";
import styles from "./Main.module.scss";
import cloudImg from '../../images/pngwing.com.png';
import falconImg from '../../images/kindpng_1184549-removebg.png';

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1>
          <span>I</span>
          <span>V</span>
          <span>O</span>
          <span>R</span>
          <span>Y</span>
        </h1>
        <p></p>
      </div>
      <div className={styles.falconimg}>
          <img src={falconImg}/>
      </div>
      <div className={styles.cloudimg}>
          <img src={cloudImg}/>
      </div>
    </div>
  )
}

export default Main;