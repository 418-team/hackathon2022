import { useState } from "react";
import { useHistory } from "react-router-dom";

import { createTeam } from "../../../utils/api";
import ArrowButton from "../../shared/ArrowButton/ArrowButton";
import PopUp from "../../shared/PopUp/PopUp";

function Team({ team, getTeam }) {
  const [params, setParams] = useState({});
  const [createView, setCreateView] = useState(false);
  const history = useHistory();

  const onChange = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const saveTeam = () => createTeam(params).then(() => getTeam());

  const teamField = [
    {
      type: "input",
      placeholder: "Название команды",
      button_type: "input",
      value: params.name,
      key: "title",
      onChange,
    },
    {
      type: "input",
      placeholder: "Описание",
      button_type: "input",
      value: params.description,
      key: "description",
      onChange,
    },
    {
      type: "button",
      mode: "secondary",
      label: "Создать команду",
      onClick: () => saveTeam(),
    },
    {
      type: "button",
      label: "Отменить",
      onClick: () => setCreateView(false),
    },
  ];

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
          Команда — самая важная часть любых соревнований
          <br />
          Создай свою или присоеденись к команде используя код
        </p>
        <div className="btn_container">
          {createView && (
            <PopUp
              bottom="25rem"
              left="1rem"
              title="Создать команду"
              fields={teamField}
            />
          )}
          <ArrowButton
            label="Создать команду"
            onClick={() => setCreateView(true)}
          />
        </div>
      </div>
    </section>
  );
}

export default Team;
