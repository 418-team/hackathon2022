import "./index.css";

import Circle from "../../Circle";
import Achievement from "./Achievement";

function Greeting() {
  return (
    <section className="section-greeting">
      <h1 className="greeting">
        <span>Хакатон от разработчиков для разработчиков</span>
        <span className="bottom_text">
          Сделаем жизнь других разработчиков легче
          <Circle size="2.0rem" className="circle" />
        </span>
        <span className="prize">
          <Achievement />
          Призовой фонд: 100000р
        </span>
      </h1>
      {/* <DiscussButton label="Давайте обсудим.."> */}
      {/*  <PlusIcon size="1.3em"/> */}
      {/* </DiscussButton> */}
    </section>
  );
}

export default Greeting;
