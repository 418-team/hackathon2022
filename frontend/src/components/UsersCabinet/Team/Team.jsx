import { useHistory } from "react-router-dom";

import ArrowButton from "../../shared/ArrowButton/ArrowButton";

function Team({ team, onClick }) {
  const history = useHistory();
  return team ? (
    <section className="section-team">
      <p className="text">
        Мы очень рады что вы нашли команду
        <br />
        Желаем вам удачи
      </p>
      <div className="btn_container">
        <ArrowButton
          label="Перейти к настройкам команды"
          onClick={() => history.push("/team")}
        />
      </div>
    </section>
  ) : (
    <section className="section-team">
      <div className="team">
        <p className="text">
          Команда - это самая важная часть любых соревнований
          <br />
          Создай свою комадну или присоеденись к команде используя код
        </p>
        <div className="btn_container">
          <ArrowButton label="Создать команду" onClick={onClick} />
        </div>
      </div>
    </section>
  );
}

export default Team;
