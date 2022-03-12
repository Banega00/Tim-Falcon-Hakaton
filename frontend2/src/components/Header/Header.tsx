import React, {useState} from "react";
import styles from "./Header.module.scss";
import logoImg from '../../images/falcon-logo-1.png';

const Header = () => {

  const[scroll, setScroll] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50)
      setScroll(true);
    else
      setScroll(false);
  })

  return (
    <div className={scroll ? styles.headerContainer + " " + styles.scroll : styles.headerContainer}>
      <a className={styles.logoImg} href={'#'}>
        <img src={logoImg}/>
      </a>

      <ul>
        <li>
          <a href={'#'}>Home</a>
        </li>
        <li>
          <a href={'#'}>About</a>
        </li>
        <li>
          <a href={'#'}>Contact</a>
        </li>
      </ul>
    </div>
  )
}

export default Header;