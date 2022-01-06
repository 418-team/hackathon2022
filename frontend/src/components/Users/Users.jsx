import "./user.css";

import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { deleteUser, getUsers } from "../../utils/api";
import filter from "../../utils/search";
import Input from "../shared/Input/Input";

function Users() {
  const [users, setUsers] = useState([]);
  const [find, setFind] = useState("");
  useEffect(() => {
    getUsers().then(({ data }) => {
      setUsers(data.rows);
    });
  }, []);

  const deleteUserHandler = (id) => () => {
    deleteUser(id).then(() =>
      getUsers().then(({ data }) => {
        setUsers(data.rows);
      })
    );
  };

  return (
    <div className="user_list">
      <h2>Пользователи</h2>
      <Input
        mode="secondary"
        onChange={(e) => setFind(e.target.value)}
        placeholder="Поиск"
        value={find}
      />
      <div className="user_grid table_header">
        <div>Email</div>
        <div>ФИО</div>
        <div>Роли</div>
        <div>Действия</div>
      </div>
      {filter(users, find).map((user) => (
        <div className="user_grid table_data">
          <div>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
          <div>
            {user.first_name} {user.last_name} {user.patronymic}
          </div>
          <div>
            {user.scopes.map((scopes) => (
              <span>{scopes} </span>
            ))}
          </div>
          <div onClick={deleteUserHandler(user.id)}>
            <AiOutlineDelete color="black" size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users;
