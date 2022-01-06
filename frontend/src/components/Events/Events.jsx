import "./event.css";

import moment from "moment";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { createEvent, deleteEvent, getEvents } from "../../utils/api";
import filter from "../../utils/search";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Textarea from "../shared/Textarea/Textarea";

function Events() {
  const [find, setFind] = useState("");
  const [events, setEvents] = useState([]);
  const [addView, setAddView] = useState(false);
  useEffect(() => {
    getEvents().then(({ data }) => setEvents(data.rows));
  }, []);

  const FORMAT = "D/M/y HH:MM";

  const getEventList = () =>
    getEvents().then(({ data }) => setEvents(data.rows));

  const formatDate = (start, end) =>
    `${moment(start).format(FORMAT)} - ${moment(end).format(FORMAT)}`;

  const deleteEventHandler = (id) => () => {
    deleteEvent(id).then(() => getEventList());
  };

  return (
    <div className="user_list">
      <div>
        <h2>События</h2>
      </div>
      <div>
        <Input
          mode="secondary"
          onChange={(e) => setFind(e.target.value)}
          placeholder="Поиск"
          value={find}
        />
        <Button
          style={{ marginLeft: "8px" }}
          mode="primary"
          label={addView ? "Отменить" : "Добавить"}
          onClick={() => setAddView(!addView)}
        />
      </div>
      {addView && (
        <AddEventView setAddView={setAddView} getEventList={getEventList} />
      )}
      <div className="event_grid table_header">
        <div>Название</div>
        <div>Описание</div>
        <div>Создатель</div>
        <div>Место проведения</div>
        <div>Даты проведения</div>
        <div>Действия</div>
      </div>
      {filter(events, find).map((event) => (
        <div className="event_grid table_data">
          <div>{event.title}</div>
          <div>{event.description}</div>
          <div>
            {event.last_name} {event.first_name} {event.patronymic || ""}
          </div>
          <div>{event.location}</div>
          <div>{formatDate(event.date_start, event.date_end)}</div>
          <div aria-hidden="true" onClick={deleteEventHandler(event.id)}>
            <AiOutlineDelete color="black" size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

function AddEventView({ setAddView, getEventList }) {
  const [params, setParams] = useState({});

  const onChangeHandler = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = () => {
    createEvent(params).then(() => getEventList());
  };

  return (
    <div className="add-form">
      <div>
        <Input
          mode="secondary"
          onChange={(e) => onChangeHandler("title", e.target.value)}
          placeholder="Название"
          value={params.title || ""}
        />
        <Textarea
          mode="secondary"
          onChange={(e) => onChangeHandler("description", e.target.value)}
          placeholder="Описание"
          value={params.description || ""}
        />
        <Input
          mode="secondary"
          onChange={(e) => onChangeHandler("date_start", e.target.value)}
          placeholder="Дата начала 12/12/2020 00:00"
          value={params.date_start || ""}
        />
        <Input
          mode="secondary"
          onChange={(e) => onChangeHandler("date_end", e.target.value)}
          placeholder="Дата окончания 12/12/2020 00:00"
          value={params.date_end || ""}
        />
        <Input
          mode="secondary"
          onChange={(e) => onChangeHandler("location", e.target.value)}
          placeholder="Место проведения"
          value={params.location || ""}
        />
        <div className="button_container">
          <Button
            label="Отменить"
            mode="secondary"
            onClick={() => setAddView(false)}
          />
          <Button label="Создать" mode="primary" onClick={onSave} />
        </div>
      </div>
    </div>
  );
}

export default Events;
