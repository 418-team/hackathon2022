import "./header.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";

import Logo from "./Logo";

function Header() {
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState(false);

  const logout = () => {
    localStorage.clear();
    document.location.reload();
  };

  return (
    <>
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
      <div className="mobile_header mobile_header-active">
        <div className="mobile_header__section">
          <span className="section_item" onClick={() => history.push("/")}>
            <Logo fill={activeMenu ? 'black' : 'white'} />
          </span>
        </div>
        <div className="mobile_header__section">
          <span className="section_item mobile_header__dots">
            {activeMenu ? '🗙' : '⏺ ⏺'}
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
