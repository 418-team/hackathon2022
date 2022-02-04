import "./user.css";

import { useEffect, useRef, useState } from "react";

import { invite as inviteApi, listForInvite } from "../../../utils/api";
import filter from "../../../utils/search";
import Input from "../../shared/Input/Input";
import PopUp from "../../shared/PopUp/PopUp";
import useClickOutside from "../../shared/useClickOutside";

function UserCard({ user }) {
  const [openInviteView, setOpenInviteView] = useState(false);
  const [message, setMessage] = useState("");
  const inviteViewRef = useRef();

  useClickOutside(inviteViewRef, () => {
    setOpenInviteView(false);
    setMessage("");
  });

  const invite = (user_id) => {
    inviteApi({ user_id, message }).then(() => {
      setOpenInviteView(false);
      setMessage("");
    });
  };

  const handleChanges = (e) => {
    setMessage(e.target.value);
  };

  const fields = [
    {
      type: "input",
      placeholder: "Сообщение для пользователя",
      button_type: "input",
      value: message,
      onChange: handleChanges,
    },
    {
      type: "button",
      label: "Отправить",
      onClick: () => invite(user.id),
    },
  ];

  return (
    <div className="user_card">
      <div className="user_card__data">
        <h3 className="user_card__name">
          {user.last_name} {user.first_name}
        </h3>
        <div className="user_card__skills">
          {user?.skills.length > 0 ? (
            user?.skills
              ?.slice(0, 3)
              ?.map((skill) => (
                <span className="user_card__skill">{skill.title}</span>
              ))
          ) : (
            <span className="user_card__skill">Участник хакатона</span>
          )}
        </div>
      </div>
      <div>
        <PopUp
          left="-32rem"
          fields={fields}
          open={openInviteView}
          title="Отправить приглашение"
        >
          <button
            type="button"
            className="user_card__invite_btn"
            onClick={() => setOpenInviteView(!openInviteView)}
          >
            Пригласить
          </button>
        </PopUp>
      </div>
    </div>
  );
}

function Users() {
  const [data, setData] = useState(null);
  const [find, setFind] = useState("");

  useEffect(() => {
    listForInvite().then(({ data: result }) => {
      setData(result.rows);
    });
  }, []);

  return (
    <div className="user_list">
      <div className="header">
        <h2>Участники без команды</h2>
      </div>
      <div className="user_list__search">
        <Input
          mode="secondary"
          onChange={(e) => setFind(e.target.value)}
          placeholder="Поиск"
          value={find}
        />
        {filter(data, find)?.map((user) => (
          <UserCard user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
