import "./invites.css";

import { ArrowIcon } from "../../Main/components/Team/ArrowIcon";

function Invites({ invites, onAccept, onReject }) {
  return (
    <section className="section_invites">
      <h2>Приглашения в команды</h2>
      <hr />
      <div className="invites">
        {invites?.map((invite, k) => (
          <div key={k}>
            <Invite invite={invite} onAccept={onAccept} onReject={onReject} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Invite({ invite, isPlaceholder, onAccept, onReject }) {
  return (
    <div className="invite">
      <div
        className="title"
        style={{ color: isPlaceholder ? "#BDBDBD" : "#6D6E72" }}
        onClick={() => history.push("/cabinet")}
      >
        {invite.title}
        <ArrowIcon
          className="arrowIcon"
          color={isPlaceholder ? "#BDBDBD" : "#00A5AA"}
        />
      </div>
      <div className="tag">{invite.message}</div>
      <div className="tag" onClick={() => onReject(invite.id)}>
        Отклонить
      </div>
      <div className="tag" onClick={() => onAccept(invite.id)}>
        Принять
      </div>
    </div>
  );
}

export default Invites;
