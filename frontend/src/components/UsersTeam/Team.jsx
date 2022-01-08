import "./team.css";

import { useEffect, useState } from "react";

import { createTeam, getMyTeam } from "../../utils/api";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Textarea from "../shared/Textarea/Textarea";

function Team() {
  const [team, setTeam] = useState(null);
  const [createView, setCreateView] = useState(false);
  const getMyTeamFunc = () =>
    getMyTeam().then(({ data }) => setTeam(data.data));
  useEffect(() => {
    getMyTeamFunc();
  }, []);

  const hasTeam = team?.hasOwnProperty("title");

  const FORMAT = "DD MMMM YYYY HH:MM";

  return (
    <div className="team_list">
      <div className="header">
        <h2>Команда</h2>
        {!hasTeam && (
          <Button
            type="primary"
            label="Создать команду"
            onClick={() => setCreateView(!createView)}
          />
        )}
      </div>
      {createView && !hasTeam && (
        <AddView setAddView={setCreateView} getEventList={getMyTeamFunc} />
      )}
      {team && (
        <div>
          <h3>Моя команда</h3>
          <div>
            <div className="title">{team.title}</div>
            <div className="description">{team.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddView({ setAddView, getEventList }) {
  const [params, setParams] = useState({});

  const onChangeHandler = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = () => {
    createTeam(params).then(() => getEventList());
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

export default Team;
