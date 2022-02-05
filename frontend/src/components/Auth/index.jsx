import "./styles.css";

import { useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import { auth, registration } from "../../utils/api";
import Button from "../shared/Button/Button";
import PopUp from "../shared/PopUp/PopUp";
import Achievement from "../UsersViews/Main/components/Greeting/Achievement";
import GoldCarrotLogo from "./image/GoldCarrot";
import Logo from "./image/Logo";

function Auth() {
  const [params, setParams] = useState({});
  const [authView, setAuthView] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => setError(null), [params, authView]);

  const setErrorItem = (data, global = false) => {
    setError({ data, global });
  };

  const validateInputs = () => {
    return Object.keys(params).every((item) => params[item].length > 0);
  }

  const submit = () => {
    if (authView === "login") {
      if (validateInputs()) {
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
            console.error("auth", err?.response.data);
            if (err?.response.data?.error === "incorrect_login_or_password") {
              setErrorItem(err?.response.data?.message, true);
            }
          });
      } else {
        setErrorItem(params.email.length > 0 ? "password" : "email");
      }
    } else {
      console.log('reg')
      if (validateInputs()) {
        registration(params)
          .then(() => {
            setAuthView("login");
          })
          .catch((err) => {
            if (err?.response.data?.error === "already_exists") {
              setErrorItem(err?.response.data?.message, true);
            }
          });
      } else {
        const invalidInputs = Object.keys(params).filter((item) => params[item].length === 0 && item);
        setErrorItem(invalidInputs.length === Object.keys(params).length ? 'all' : invalidInputs[0]);
      }
    }
  };

  const onChange = (k, v) => {
    setParams((prev) => ({ ...prev, [k]: v }));
  };

  const loginFields = [
    {
      type: "input",
      placeholder: "email",
      button_type: "email",
      value: params.email,
      key: "email",
      onChange,
      error,
    },
    {
      type: "input",
      placeholder: "Пароль",
      button_type: "password",
      value: params.password,
      key: "password",
      onChange,
      error,
    },
    {
      type: "button",
      mode: "secondary",
      label: "Войти",
      onClick: submit,
    },
    {
      type: "button",
      label: "Отменить",
      onClick: () => setAuthView(null),
    },
  ];
  const registrationFields = [
    {
      type: "input",
      placeholder: "email",
      button_type: "email",
      value: params.email,
      key: "email",
      onChange,
      error,
    },
    {
      type: "input",
      placeholder: "Имя Фамилия",
      button_type: "",
      value: params.name,
      key: "name",
      onChange,
      error,
    },
    {
      type: "input",
      placeholder: "Пароль",
      button_type: "password",
      value: params.password,
      key: "password",
      onChange,
      error,
    },
    {
      type: "button",
      mode: "secondary",
      label: "Присоедениться",
      onClick: submit,
    },
    {
      type: "button",
      label: "Отменить",
      onClick: () => setAuthView(null),
    },
  ];

  return (
    <div className="auth_container">
      <div className="greeting">
        <div className="greeting_content">
          <Logo />
          <div className="text_container">
            <h1>Хакатон «Dev to Dev»</h1>
            <p>Сделай жизнь проще себе и своим коллегам</p>
            <span className="prize">
              <Achievement />
              Призовой фонд: 100000р
            </span>
            <span className="prize">
              <BiGroup color="white" />1 - 4 человек в команде
            </span>
            <span className="prize">
              <AiOutlineCalendar color="white" />
              26 - 27 февраля, старт в 11:00
            </span>
            <div className="sponsors_section">
              <GoldCarrotLogo />
              <GoldCarrotLogo />
            </div>
          </div>
        </div>
        <div className="btn_container">
          <PopUp title="Войти" fields={loginFields} open={authView === "login"}>
            <Button
              label="Войти"
              mode="secondary"
              onClick={() => setAuthView("login")}
            />
          </PopUp>
          <PopUp
            title="Регистрация"
            fields={registrationFields}
            open={authView === "registration"}
          >
            <Button
              label="Присоединиться"
              mode="secondary"
              onClick={() => setAuthView("registration")}
            />
          </PopUp>
        </div>
      </div>
    </div>
  );
}

export default Auth;
