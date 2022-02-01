import "./index.css";

import { useHistory } from "react-router-dom";

import { ArrowIcon } from "./ArrowIcon";

function Team({ team }) {
  const getTags = (p) => {
    return p.skills?.reduce((acc, s) => {
      return acc.concat(s.title);
    }, []);
  };

  return (
    <section className="section_main_team">
      <h2>Моя команда</h2>
      <hr />
      <div className="teams">
        {team?.participants?.map((participant) => (
          <Client
            title={`${participant.first_name} ${participant.last_name}`}
            tags={getTags(participant)}
          />
        )) || (
          <div className="teams_not_exist">
            <p>Команда – самая важная часть соревнований</p>
            <p>Переходить в менеджер команды и собери себе лучшую команду!</p>
          </div>
        )}

        <Client
          isPlaceholder
          title="Перейти в менеджер команды"
          link="/cabinet"
        />
      </div>
    </section>
  );
}

function Client({ title, tags, isPlaceholder, link }) {
  const history = useHistory();
  return (
    <div className="team">
      <div
        className="title"
        style={{ color: isPlaceholder ? "#BDBDBD" : "#6D6E72" }}
        onClick={() => history.push("/cabinet")}
      >
        {title}
        <ArrowIcon
          className="arrowIcon"
          color={isPlaceholder ? "#BDBDBD" : "#00A5AA"}
        />
      </div>
      {!isPlaceholder &&
        tags.slice(0, 3).map((tag, i) => (
          <div className="tag" key={i}>
            {tag}
          </div>
        ))}
    </div>
  );
}

export default Team;
