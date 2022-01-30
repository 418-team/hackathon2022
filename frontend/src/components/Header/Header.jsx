import "./header.css";

import { useHistory } from "react-router-dom";

import Logo from "./Logo";

function Header() {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    document.location.reload();
  };

  return (
    <div className="header-nav">
      <div className="header-section">
        <span className="header-item" onClick={() => history.push("/")}>
          <Logo />
        </span>
      </div>
      <div className="header-section">
        <span className="header-item" onClick={() => history.push("/cabinet")}>
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
  );
}

export default Header;
