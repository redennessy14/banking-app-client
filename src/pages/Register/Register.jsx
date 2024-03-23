import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import style from "../../styles/Login.module.scss";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      avatarUrl:
        "https://i.pinimg.com/564x/95/0a/b9/950ab9860af8381fdfa5f9bb8cc59d0c.jpg",
    },
    mode: "onChange",
  });
  const isAuth = useSelector(selectIsAuth);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }
    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={style.input}
          type="email"
          placeholder="Почта"
          {...register("email", { required: "Укажите почту" })}
        />
        <input
          className={style.input}
          type="fullName"
          placeholder="Имя"
          {...register("fullName", { required: "Укажите ваше имя" })}
        />
        <input
          className={style.input}
          type="password"
          placeholder="Пароль"
          {...register("password", { required: "Укажите пароль" })}
        />
        <button className={style.button} type="submit">
          Войти
        </button>
        <Link to="/login" className={style.text}>
          У вас уже есть аккаунт ?
        </Link>
      </form>
    </div>
  );
};

export default Register;
