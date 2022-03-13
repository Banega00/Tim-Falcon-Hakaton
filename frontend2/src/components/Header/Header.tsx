import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logoImg from '../../images/falcon-logo-1.png';
import menuIcon from '../../images/menu.png';
import closeIcon from '../../images/close.png';
import { delete_cookie, useAuth } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";

const Header = ({ isMain }) => {

  const { authed, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () =>{
        logout();
        delete_cookie('connect.sid')
        localStorage.removeItem('user');
        navigate('/')
    }

  const [scroll, setScroll] = useState(!isMain);

  // if (isMain)
  //   setScroll(true);

  window.addEventListener("scroll", () => {
    if (isMain) {
      if (window.scrollY > 50)
        setScroll(true);
      else
        setScroll(false);
    }
  })

  const [menu, setMenu] = useState(false);

  const menuClicked = () => {
    if (menu)
      setMenu(false);
    else
      setMenu(true);
  }

  return (
    <div className={scroll ? styles.headerContainer + " " + styles.scroll : styles.headerContainer}>
      <a className={styles.logoImg} href={'#'}>
        <img src={logoImg} />
      </a>

      <a onClick={menuClicked} className={menu ? styles.menu + " " + styles.clicked : styles.menu}>
        {menu ? <img src={closeIcon} /> : <img src={menuIcon} />}
        <ul className={menu ? styles.respNavItems + " " + styles.active : styles.respNavItems}>
          <li>
            <a href={'#'}>Home</a>
          </li>
          <li>
            <a href={'#'}>About</a>
          </li>
          <li>
            <a href={'#'}>Contact</a>
          </li>
          <li>
            <a href={'/login'}>Log in</a>
          </li>
        </ul>
      </a>

      <ul className={styles.navItems}>
        <li>
          <a href={'/#'}>Home</a>
        </li>
        <li>
          <a href={'#'}>About</a>
        </li>
        <li>
          <a href={'#'}>Contact</a>
        </li>
        {console.log(localStorage.getItem('user'))}
        {localStorage.getItem('user') ?
          <>
          <li>
            <a href={'/logout'}>My Species</a>
          </li>
          <li>
            <a href={'/logout'}>My Animals</a>
          </li>
          <li>
            <a onClick={handleLogOut}>Log out</a>
          </li>
          </>
          :
          <li>
            <a href={'/login'}>Log in</a>
          </li>
        }


      </ul>
    </div>
  )
}

export default Header;