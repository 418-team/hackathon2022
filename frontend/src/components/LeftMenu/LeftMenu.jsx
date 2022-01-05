import {
    Link
} from "react-router-dom";
import { IoHomeSharp, IoPeople, IoExit } from 'react-icons/io5';
import "./left_menu.css"

const iconSize = 20

const LeftMenu = () => {
    const logout = () => {
        localStorage.clear()
        document.location.reload()

    }
    return (
        <div className="left_menu">
            <div className="left_menu_logo">
                <p>NRG CHECK</p>
            </div>
            <Link to="/"><IoHomeSharp fontSize={iconSize} color={"black"} /><span>Инфраструктура</span></Link>
            <Link to="/table"><IoHomeSharp fontSize={iconSize} color={"black"} /><span>Задачи</span></Link>
            <Link to="/users"><IoPeople fontSize={iconSize} color={"black"} /><span>Пользователи</span></Link>
            <button onClick={logout}><IoExit fontSize={iconSize} color={"black"} /><span>Выйти</span></button>
        </div>
    )
}

export default LeftMenu