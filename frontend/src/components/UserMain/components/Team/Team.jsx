import "./index.css";

import { ArrowIcon } from "./ArrowIcon";

function Team() {
  return (
    <section className="section_main_team">
      <h2>Моя команда</h2>
      <hr />
      <div className="teams">
        <Client
          title="Разин Владислав"
          link="https://reshak.ru"
          tags={["Mobile dev", "Team Lead"]}
        />
        <Client
          title="Ильсур Гильмутдинов"
          link="https://www.instagram.com/p/CUAGFmVtDNL/"
          tags={["Backend", "Frontend"]}
        />
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
  return (
    <div className="team">
      <div
        className="title"
        style={{ color: isPlaceholder ? "#BDBDBD" : "#6D6E72" }}
        onClick={() => window.open(link, "_blank").focus()}
      >
        {title}
        <ArrowIcon
          className="arrowIcon"
          color={isPlaceholder ? "#BDBDBD" : "#00A5AA"}
        />
      </div>
      {!isPlaceholder &&
        tags.map((tag, i) => (
          <div className="tag" key={i}>
            {tag}
          </div>
        ))}
    </div>
  );
}

export default Team;
