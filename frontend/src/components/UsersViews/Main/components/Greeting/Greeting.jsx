import "./index.css";

import { AiOutlineCalendar } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";

import Circle from "../../Circle";
import Achievement from "./Achievement";

function Greeting() {
  return (
    <section className="section-greeting">
      <h1 className="greeting">
        <span>Хакатон «Dev to Dev»</span>
        <span className="bottom_text">
          Сделай жизнь проще себе и своим коллегам
          <Circle size="2.0rem" className="circle" />
        </span>
        <span className="prize">
          <Achievement />
          Призовой фонд: 100000р
        </span>
        <span className="prize">
          <BiGroup color="white" />1 - 4 человек в команде
        </span>
        <span className="prize">
          <AiOutlineCalendar color="white" />
          26 - 27 февраля, старт в 12 утра
        </span>
      </h1>
    </section>
  );
}

export default Greeting;
