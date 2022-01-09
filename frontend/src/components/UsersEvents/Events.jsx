import "./event.css";

import moment from "moment";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";

import { getEvents } from "../../utils/api";
import filter from "../../utils/search";
import Divider from "../shared/Divider";
import Input from "../shared/Input/Input";

function Events() {
  const [find, setFind] = useState("");
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents().then(({ data }) => setEvents(data.rows));
  }, []);

  const FORMAT = "DD MMMM YYYY HH:MM";

  const cutDescription = (description) =>
    description.length > 200 ? `${description.slice(0, 210)}...` : description;

  const formatDate = (start) => `${moment(start).format(FORMAT)}`;

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
      </div>
      {filter(events, find).map((event) => (
        <>
          <div className="event_card">
            <div className="card_title">
              <div className="title">
                {event.title}
                <span className="tag">
                  <span style={{ marginRight: "4px" }}>
                    {event.min_participants} - {event.max_participants}
                  </span>
                  <BsFillPeopleFill color="#ffffff" size={12} />
                </span>
              </div>
              <div className="description">
                {cutDescription(event.description)}
              </div>
            </div>
            <div className="location">{event.location}</div>
            <div className="date">
              {formatDate(event.date_start, event.date_end)}
            </div>
          </div>
          <Divider />
        </>
      ))}
    </div>
  );
}

export default Events;
