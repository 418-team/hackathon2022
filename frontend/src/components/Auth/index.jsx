import "./styles.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import { auth, registration } from "../../utils/api";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";

function Auth() {
  const history = useHistory();
  const [params, setParams] = useState({});
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => {
    if (isLogin) {
      auth(params.email, params.password)
        .then((r) => {
          localStorage.setItem("refresh_token", r.data.refresh_token);
          localStorage.setItem(
            "is_admin",
            r.data.user.scopes.includes("admin").toString()
          );
          localStorage.setItem("access_token", r.data.access_token);
          history.push("/");
        })
        .catch((err) => {
          console.error("auth", err);
          setError(err.response?.data?.message || "Произошла ошибка");
        });
    } else {
      registration(params).then(() => {
        setIsLogin(true);
      });
    }
  };

  return (
    <div className="auth_container">
      <div className="form">
        <div className="auth_title">Вход в систему</div>
        {error && <b>{error}</b>}
        <Input
          type="email"
          mode="secondary"
          placeholder="Email"
          onChange={(e) => handleChange("email", e.currentTarget.value)}
        />
        {!isLogin && (
          <>
            <Input
              type="text"
              value={params.first_name}
              mode="secondary"
              placeholder="Имя"
              onChange={(e) =>
                handleChange("first_name", e.currentTarget.value)
              }
            />
            <Input
              type="text"
              value={params.last_name}
              mode="secondary"
              placeholder="Фамилия"
              onChange={(e) => handleChange("last_name", e.currentTarget.value)}
            />
            <Input
              type="text"
              value={params.patronymic}
              mode="secondary"
              placeholder="Отчество"
              onChange={(e) =>
                handleChange("patronymic", e.currentTarget.value)
              }
            />
          </>
        )}
        <Input
          type="password"
          mode="secondary"
          placeholder="Пароль"
          onChange={(e) => handleChange("password", e.currentTarget.value)}
        />
        <div className="button_container">
          <Button
            onClick={submit}
            mode="primary"
            label={isLogin ? "Войти" : "Регистрация"}
          />
          <Button
            onClick={() => setIsLogin(!isLogin)}
            mode="secondary"
            label={!isLogin ? "Войти" : "Регистрация"}
          />
        </div>
      </div>
    </div>
  );
}

export default Auth;
