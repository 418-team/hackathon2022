import "./left_menu.css";

import {
  IoCalendarSharp,
  IoExit,
  IoPeople,
  IoPersonSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const iconSize = 20;

function AdminRoutes() {
  return (
    <>
      <Link to="/users">
        <IoPeople fontSize={iconSize} color="black" />
        <span>Пользователи</span>
      </Link>
      <Link to="/events">
        <IoCalendarSharp fontSize={iconSize} color="black" />
        <span>События</span>
      </Link>
      <Link to="/profile">
        <IoPersonSharp fontSize={iconSize} color="black" />
        <span>Мой профиль</span>
      </Link>
    </>
  );
}

function UsersRoutes() {
  return (
    <>
      <Link to="/events">
        <IoCalendarSharp fontSize={iconSize} color="black" />
        <span>События</span>
      </Link>
      <Link to="/profile">
        <IoPersonSharp fontSize={iconSize} color="black" />
        <span>Мой профиль</span>
      </Link>
      <Link to="/team">
        <IoPeople fontSize={iconSize} color="black" />
        <span>Моя команда</span>
      </Link>
    </>
  );
}

function LeftMenu({ isAdmin }) {
  const logout = () => {
    localStorage.clear();
    document.location.reload();
  };

  return (
    <div className="left_menu">
      <div className="left_menu_logo">
        <p>418 DevTon</p>
      </div>
      {isAdmin ? <AdminRoutes /> : <UsersRoutes />}
      <button type="button" onClick={logout}>
        <IoExit fontSize={iconSize} color="black" />
        <span>Выйти</span>
      </button>
    </div>
  );
}

export default LeftMenu;
