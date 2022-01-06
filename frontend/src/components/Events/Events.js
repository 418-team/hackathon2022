import {useState, useEffect} from "react";
import { getEvents } from '../../utils/api';
import moment from "moment";
import "./event.css"
import Input from "../shared/Input/Input";
import filter from "../../utils/search";

const Events = () => {
    const [find, setFind] = useState("")
    const [events, setEvents] = useState([])
    useEffect(() => {
        getEvents().then(({data}) => setEvents(data.rows))
    }, [])

    const FORMAT = "D/M/y HH:MM"

    const formatDate = (start, end) => {
        return `${moment(start).format(FORMAT)} - ${moment(end).format(FORMAT)}`
    }

    return (
        <div className={"user_list"}>
            <h2>События</h2>
            <Input mode={"secondary"} onChange={(e) => setFind(e.target.value)} placeholder={"Поиск"} value={find}/>
            <div className={"event_grid table_header"}>
                <div>Название</div>
                <div>Описание</div>
                <div>Создатель</div>
                <div>Даты проведения</div>
            </div>
            {filter(events, find).map(event => (
                <div className={"event_grid table_data"}>
                    <div>{event.title}</div>
                    <div>{event.description}</div>
                    <div>{event.last_name} {event.first_name} {event.patronymic || ""}</div>
                    <div>{formatDate(event.date_start, event.date_end)}</div>
                </div>
            ))}
        </div>
    )
}

export default Events