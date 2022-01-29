import "./team.css";

import ArrowButton from "../../shared/ArrowButton/ArrowButton";
import { PlusIcon } from "../image/PlusIcon";

function Team({ team, onClick }) {
  console.log(team);
  return team ? (
    <div className="team">
      <div className="team_name">
        <h3>{team.title}</h3>
        <p className="description">{team.description}</p>
        <p
          className="link"
          onClick={() =>
            navigator.clipboard.writeText(
              `https://hackathon418team.com/join/${team.invite_code}`
            )
          }
        >
          Код для приглашения в команду{" "}
          <span className="code">{team.invite_code}</span>
        </p>
      </div>
      {team?.participants?.map((participant, k) => (
        <div className="projects" key={k}>
          <RenderParticipantGrid index={k} participant={participant} />
        </div>
      ))}
    </div>
  ) : (
    <CreateTeamBlock onClick={onClick} />
  );
}

function RenderParticipantGrid({ index, participant }) {
  return index % 2 === 1 ? (
    <>
      <TeamMemberCard background="https://cdn.418.one/team/vlad@1x.jpg" />
      <TeamMemberInformation
        name={`${participant.first_name}  ${participant.last_name}`}
        email={participant.email}
        tags={participant.skills}
      />
    </>
  ) : (
    <>
      <TeamMemberInformation
        name={`${participant.first_name}  ${participant.last_name}`}
        email={participant.email}
        tags={participant.skills}
      />
      <TeamMemberCard background="https://cdn.418.one/team/vlad@1x.jpg" />
    </>
  );
}

function CreateTeamBlock({ onClick }) {
  return (
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

function TeamMemberCard({ background }) {
  const style = {
    background: `url("${background}") no-repeat center`,
    backgroundSize: "cover",
  };

  return <div className="item" style={style} />;
}

function TeamMemberInformation({ email, telegram, name, tags }) {
  return (
    <div className="information_item">
      <div className="ii-about">
        <p className="name">{name}</p>
        <div className="email">
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        {tags && (
          <div className="tags">
            {tags?.map((tag, i) => (
              <div key={i}>{tag.title}</div>
            ))}
          </div>
        )}
        {telegram && (
          <div
            className="contact"
            onClick={() => window.open(telegram, "_blank").focus()}
          >
            <span>Связаться в Telegram</span>
            <PlusIcon fill="#F0F0F0" plusFill="black" size="1.6rem" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Team;
