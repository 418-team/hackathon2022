import {
    Link
} from "react-router-dom";
import { IoHomeSharp, IoCalendarSharp, IoPersonSharp, IoPeople, IoExit } from 'react-icons/io5';
import "./left_menu.css"

const iconSize = 20

const AdminRoutes = () => {
    return (
        <>
            <Link to="/users"><IoPeople fontSize={iconSize} color={"black"} /><span>Пользователи</span></Link>
            <Link to="/events"><IoCalendarSharp fontSize={iconSize} color={"black"} /><span>События</span></Link>
            <Link to="/profile"><IoPersonSharp fontSize={iconSize} color={"black"} /><span>Мой профиль</span></Link>
        </>
    )
}

const UsersRoutes = () => {
    return (
        <>
            <Link to="/events"><IoCalendarSharp fontSize={iconSize} color={"black"} /><span>События</span></Link>
            <Link to="/profile"><IoPersonSharp fontSize={iconSize} color={"black"} /><span>Мой профиль</span></Link>
            <Link to="/team"><IoPeople fontSize={iconSize} color={"black"} /><span>Моя команда</span></Link>
        </>
    )
}

const LeftMenu = ({ isAdmin }) => {
    const logout = () => {
        localStorage.clear()
        document.location.reload()
    }

    return (
        <div className="left_menu">
            <div className="left_menu_logo">
                <p>418 DevTon</p>
            </div>
            {isAdmin ? (
                <AdminRoutes/>
            ) : (
                <UsersRoutes/>
            )}
            <button onClick={logout}><IoExit fontSize={iconSize} color={"black"} /><span>Выйти</span></button>
        </div>
    )
}

export default LeftMenu