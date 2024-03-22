import React from "react";
import style from "../../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <button>Войти в аккаунт</button>
      <button>Зарегистрироваться</button>
    </nav>
  );
};

export default Navbar;
