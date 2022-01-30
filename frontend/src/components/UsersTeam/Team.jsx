import "./team.css";

import { useEffect, useState } from "react";

import { getMyTeam } from "../../utils/api";
import { PlusIcon } from "../UsersCabinet/image/PlusIcon";

function Team() {
  const [data, setData] = useState({});

  const getMyTeamFunc = () =>
    getMyTeam().then(({ data: requestData }) => {
      setData(requestData.data);
    });

  useEffect(() => {
    getMyTeamFunc();
    return () => setData(null);
  }, []);

  console.log(data);

  const team = data?.teams?.length > 0 ? data?.teams[0] : false;

  return (
    <div className="section-cabinet">
      <div className="header">
        <h2>Кабинет команды</h2>
      </div>
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
    </div>
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
