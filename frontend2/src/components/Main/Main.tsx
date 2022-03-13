import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import cloudImg from '../../images/pngwing.com.png';
import falconImg from '../../images/kindpng_1184549-removebg.png';
import CountUp from "react-countup";
import BgImage from '../../images/pexels-munkee-panic-1027393.jpg';
import { Parallax } from "react-parallax";

import { HttpService } from "../../utils/HttpService";
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
        <img src={falconImg} />
      </div>
      <div className={styles.cloudimg}>
        <img src={cloudImg} />
      </div>

      <div className={styles.info}>
        <div className={styles.row}>
          <div className={styles.card}>
            <p>Endangered spicies</p>
            <CountUp duration={2} end={41415}></CountUp>
          </div>
          <div className={styles.card}>
            <p>Extinct spicies</p>
            <CountUp duration={2} end={50}></CountUp>
          </div>
          <div className={styles.card + " " + styles.newBtn}>
            <p>News</p>
            <CountUp duration={2} end={30}></CountUp>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;