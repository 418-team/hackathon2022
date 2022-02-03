import "./header.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "./Button";
import Logo from "./Logo";

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const buttonList = {
  "Личный кабинет": "/cabinet",
  "Команда": "/team",
  "Кейсы": "/cases",
  "Участники": "/users",
};

function MobileHeader({ history }) {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div
      className={`mobile_header ${activeMenu ? "mobile_header-active" : ""}`}
    >
      <div className="mobile_header__section">
        <span className="section_item" onClick={() => history.push("/")}>
          <Logo fill={activeMenu ? "black" : "white"} />
        </span>
      </div>
      <div className="mobile_header__section">
        <span
          className="section_item mobile_header__dots"
          onClick={() => setActiveMenu((status) => !status)}
        >
          {activeMenu ? "🗙" : "⬤ ⬤"}
        </span>
      </div>
      {activeMenu && (
        <div className="mobile_header__buttons">
          {Object.keys(buttonList).map((name) => 
            <Button text={name} onClick={() => {
              history.push(buttonList[name]);
              setActiveMenu(false)
            }} />
          )}
          <Button text="Выход" onClick={logout} />
        </div>
      )}
    </div>
  );
}

function Header() {
  const history = useHistory();

  return (
    <div className="main_header">
      <div className="header-nav">
        <div className="header-section">
          <span className="header-item" onClick={() => history.push("/")}>
            <Logo />
          </span>
        </div>
        <div className="header-section">
          <span
            className="header-item"
            onClick={() => history.push("/cabinet")}
          >
            Личный кабинет
          </span>
          <span className="header-item" onClick={() => history.push("/team")}>
            Команда
          </span>
        </div>
        <div className="header-section">
          <span className="header-item" onClick={logout}>
            Выйти
          </span>
        </div>
      </div>
      <MobileHeader history={history} />
    </div>
  );
}

export default Header;
