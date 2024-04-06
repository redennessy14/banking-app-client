import React from "react";
import style from "../../styles/Navbar.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import LOGO from "../../images/Logo.png";

const Navbar = () => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти ?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  return (
    <nav className={style.nav}>
      <Link to="/">
        <img src={LOGO} alt="" className={style.logo} />{" "}
      </Link>
      <div className={style.user}>
        {" "}
        {!isAuth ? (
          <>
            <Link to="/login" className={style.link}>
              <button className={style.button}>Войти</button>
            </Link>
            <Link to="/register" className={style.link}>
              <button className={style.button}>Регистрация</button>
            </Link>
          </>
        ) : (
          <>
            <img
              className={style.avatar}
              src={userData.avatarUrl}
              alt="Аватар"
            />
            <p className={style.fullName}>{userData.fullName}</p>
            <button onClick={onClickLogout} className={style.button}>
              Выйти
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
