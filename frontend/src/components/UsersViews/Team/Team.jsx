import "./team.css";

import { useEffect, useState } from "react";

import { createTeam, getMyTeam } from "../../../utils/api";
import ArrowButton from "../../shared/ArrowButton/ArrowButton";
import PopUp from "../../shared/PopUp/PopUp";
import { PlusIcon } from "../Cabinet/image/PlusIcon";

function Team() {
  const [params, setParams] = useState({});
  const [data, setData] = useState({});
  const [createView, setCreateView] = useState(false);

  const getMyTeamFunc = () =>
    getMyTeam().then(({ data: requestData }) => {
      setData(requestData.data);
    });

  useEffect(() => {
    getMyTeamFunc();
    return () => setData(null);
  }, []);

  const onChange = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const saveTeam = () => createTeam(params).then(() => getMyTeamFunc());

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

  console.log(data);

  const team = data?.teams?.length > 0 ? data?.teams[0] : false;

  return (
    <div className="section-cabinet">
      <div className="header">
        <h2>Команда</h2>
      </div>
      {team ? (
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
        <section className="section-team">
          <div className="team">
            <p className="text">
              Команда — самая важная часть любых соревнований
              <br />
              Создай свою или присоеденись к команде используя код
            </p>
            <div className="btn_container">
              <PopUp
                left="1rem"
                title="Создать команду"
                fields={teamField}
                open={createView}
              >
                <ArrowButton
                  label="Создать команду"
                  onClick={() => setCreateView(true)}
                />
              </PopUp>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function RenderParticipantGrid({ index, participant }) {
  return index % 2 === 1 ? (
    <>
      <TeamMemberCard
        background={
          participant.avatar_url || "https://cdn.418.one/images/placeholder.png"
        }
      />
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
      <TeamMemberCard
        background={
          participant.avatar_url || "https://cdn.418.one/images/placeholder.png"
        }
      />
    </>
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
