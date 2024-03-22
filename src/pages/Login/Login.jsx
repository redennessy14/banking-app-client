import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
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
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(values);

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ("token" in data.payload) {
      localStorage.setItem("token", data.payload.token);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: "Укажите почту" })}
        />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: "Укажите пароль" })}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
