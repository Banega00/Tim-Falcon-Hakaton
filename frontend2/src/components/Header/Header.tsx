import React, {useState} from "react";
import styles from "./Header.module.scss";
import logoImg from '../../images/falcon-logo-1.png';
import menuIcon from '../../images/menu.png';
import closeIcon from '../../images/close.png';

const Header = () => {

  const[scroll, setScroll] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50)
      setScroll(true);
    else
      setScroll(false);
  })

  const[menu, setMenu] = useState(false);

  const menuClicked = () => {
    if (menu)
      setMenu(false);
    else
      setMenu(true);
  }

  return (
    <div className={scroll ? styles.headerContainer + " " + styles.scroll : styles.headerContainer}>
      <a className={styles.logoImg} href={'#'}>
        <img src={logoImg}/>
      </a>

      <a onClick={menuClicked} className={menu ? styles.menu + " " + styles.clicked : styles.menu} href={'#'}>
        {menu ? <img src={closeIcon}/> : <img src={menuIcon}/>}
      </a>

      <ul className={styles.navItems}>
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