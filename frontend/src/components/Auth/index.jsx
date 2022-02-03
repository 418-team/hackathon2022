/* eslint-disable */

import "./styles.css";

import { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import { auth, registration } from "../../utils/api";
import Button from "../shared/Button/Button";
import PopUp from "../shared/PopUp/PopUp";
import Achievement from "../UserMain/components/Greeting/Achievement";
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

  const loginFields = [
    {
      type: "input",
      placeholder: "email",
      button_type: "email",
      value: params.email,
      key: "email",
      onChange,
    },
    {
      type: "input",
      placeholder: "Пароль",
      button_type: "password",
      value: params.password,
      key: "password",
      onChange,
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
      onClick: () => onChangeView(null),
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
    },
    {
      type: "input",
      placeholder: "Имя Фамилия",
      button_type: "",
      value: params.name,
      key: "name",
      onChange,
    },
    {
      type: "input",
      placeholder: "Пароль",
      button_type: "password",
      value: params.password,
      key: "password",
      onChange,
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
      onClick: () => onChangeView(null),
    },
  ];

  return (
    <div className="auth_container">
      <div className="greeting">
        <Logo />
        <div className="text_container">
          <h1>Хакатон «Программисты для программисты»</h1>
          <span className="prize">
            <Achievement />
            Призовой фонд: 50000р
          </span>
          <span className="prize">
            <BiGroup color="white" />
            1-5 человек в команде
          </span>
          <span className="prize">
            <AiOutlineCalendar color="white" />
            26 - 27 февраля, старт в 12:00
          </span>
          <p>Сделай жизнь проще себе и своим коллегам</p>
        </div>
        <div className="btn_container">
         <PopUp title="Войти" fields={loginFields} open={authView === "login"}>
            <Button
               label="Войти"
               mode="secondary"
               onClick={() => onChangeView("login")}
            />
          </PopUp>
          <PopUp title="Регистраниция" fields={registrationFields} open={authView === "registration"} >
            <Button
                label="Присоедениться"
                mode="secondary"
                onClick={() => onChangeView("registration")}
            />
          </PopUp>
        </div>
      </div>
    </div>
  );
}

export default Auth;
