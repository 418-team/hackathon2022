import "./styles.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import { auth, registration } from "../../utils/api";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Logo from "./image/Logo";

function Auth() {
  const [params, setParams] = useState({});
  const [authView, setAuthView] = useState(null);
  const history = useHistory();

  const submit = () => {
    if (authView === "login") {
      auth(params.email, params.password)
        .then((r) => {
          localStorage.setItem("refresh_token", r.data.refresh_token);
          localStorage.setItem("access_token", r.data.access_token);
          localStorage.setItem(
            "is_admin",
            r.data.user.scopes.includes("admin").toString()
          );
          history.push("/");
        })
        .catch((err) => {
          console.error("auth", err);
        });
    } else {
      registration(params).then(() => {
        setAuthView("login");
      });
    }
  };

  const onChangeView = (value) => {
    setAuthView(value);
  };

  const onChange = (k, v) => {
    setParams((prev) => ({ ...prev, [k]: v }));
  };

  return (
    <div className="auth_container">
      {authView === "login" && (
        <LoginView
          onSubmit={submit}
          onChange={onChange}
          onCancel={onChangeView}
          params={params}
        />
      )}
      {authView === "registration" && (
        <RegistrationView
          onSubmit={submit}
          onChange={onChange}
          onCancel={onChangeView}
          params={params}
        />
      )}
      <div className="greeting">
        <Logo />
        <div className="text_container">
          <h1>Хакатон от разработчиков для разработчиков</h1>
          <p>Сделаем жить друг другу легче</p>
        </div>
        <div className="btn_container">
          <Button
            label="Войти"
            mode="secondary"
            onClick={() => onChangeView("login")}
          />
          <Button
            label="Регистрация"
            mode="secondary"
            onClick={() => onChangeView("registration")}
          />
        </div>
      </div>
    </div>
  );
}

function LoginView({ onCancel, onChange, params, onSubmit }) {
  return (
    <div className="login_view">
      <h1>Войти</h1>
      <div className="input_container">
        <Input
          type="text"
          placeholder="Email"
          value={params.email}
          mode="primary"
          onChange={(e) => onChange("email", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Пароль"
          value={params.password}
          mode="primary"
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>
      <div className="btn_container">
        <Button label="Войти" mode="secondary" onClick={onSubmit} />
        <Button
          label="Отменить"
          mode="secondary"
          onClick={() => onCancel(null)}
        />
      </div>
    </div>
  );
}

function RegistrationView({ onCancel, onChange, params, onSubmit }) {
  return (
    <div className="login_view">
      <h1>Регистрация</h1>
      <div className="input_container">
        <Input
          type="text"
          placeholder="Email"
          value={params.email}
          mode="primary"
          onChange={(e) => onChange("email", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Имя Фамилия"
          value={params.name}
          mode="primary"
          onChange={(e) => onChange("name", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Пароль"
          value={params.password}
          mode="primary"
          onChange={(e) => onChange("password", e.target.value)}
        />
      </div>
      <div className="btn_container">
        <Button label="Войти" mode="secondary" onClick={onSubmit} />
        <Button
          label="Отменить"
          mode="secondary"
          onClick={() => onCancel(null)}
        />
      </div>
    </div>
  );
}

export default Auth;
