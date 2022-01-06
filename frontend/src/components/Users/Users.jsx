import "./user.css";

import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { createUsers, deleteUser, getUsers } from "../../utils/api";
import filter from "../../utils/search";
import Button from "../shared/Button/Button";
import { Checkbox } from "../shared/Checkbox/CheckBox";
import Input from "../shared/Input/Input";
import Textarea from "../shared/Textarea/Textarea";

function Users() {
  const [users, setUsers] = useState([]);
  const [find, setFind] = useState("");
  const [addView, setAddView] = useState(false);

  const getUserList = () =>
    getUsers().then(({ data }) => {
      setUsers(data.rows);
    });

  useEffect(() => {
    getUserList();
  }, []);

  const deleteUserHandler = (id) => () => {
    deleteUser(id).then(() => getUserList());
  };

  return (
    <div className="user_list">
      <h2>Пользователи</h2>
      <div>
        <Input
          mode="secondary"
          onChange={(e) => setFind(e.target.value)}
          placeholder="Поиск"
          value={find}
        />
        <Button
          style={{ marginLeft: "8px" }}
          mode="primary"
          label={addView ? "Отменить" : "Добавить"}
          onClick={() => setAddView(!addView)}
        />
      </div>
      {addView && (
        <AddEventView setAddView={setAddView} getUserList={getUserList} />
      )}
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

function AddEventView({ setAddView, getUserList }) {
  const [params, setParams] = useState({});

  const onChangeHandler = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = () => {
    createUsers(params).then(() => getUserList());
  };
  return (
    <div className="add-form">
      <div>
        <Input
          type="email"
          mode="secondary"
          onChange={(e) => onChangeHandler("email", e.target.value)}
          placeholder="Email"
          value={params.email || ""}
        />
        <Textarea
          mode="secondary"
          onChange={(e) => onChangeHandler("last_name", e.target.value)}
          placeholder="Фамилия"
          value={params.last_name || ""}
        />
        <Input
          mode="secondary"
          onChange={(e) => onChangeHandler("first_name", e.target.value)}
          placeholder="Имя"
          value={params.first_name || ""}
        />
        <Input
          mode="secondary"
          onChange={(e) => onChangeHandler("patronymic", e.target.value)}
          placeholder="Отчество"
          value={params.patronymic || ""}
        />
        <Input
          mode="secondary"
          type="password"
          onChange={(e) => onChangeHandler("password", e.target.value)}
          placeholder="Пароль"
          value={params.password || ""}
        />
        <Checkbox
          onChange={(e) => onChangeHandler("is_admin", e)}
          value={params.is_admin}
          label="Админ"
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

export default Users;
