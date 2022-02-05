/* eslint-disable */

import { useEffect, useState } from 'react';
import { getSkillsList as getSkills, getTeams, getUsers } from '../../../utils/api';
import "./index.css"

function Main() {
  const [users, setUsers] = useState();
  const [teams, setTeams] = useState();
  const [skills, setSkills] = useState();
  const [invites, setInvites] = useState();

  useEffect(() => {
    getUsers().then(r => setUsers(r.data.rows))
    getTeams().then(r => setTeams(r.data.rows))
    getSkills().then(r => setSkills(r.data.rows))
  }, [])

  return <div>
    <h2>Вся информация</h2>
    <hr/>
    <Users users={users}/>
    <Teams teams={teams}/>
    <Skills skills={skills}/>
  </div>;
}

const Users = ({users}) => {
  const search = () => {

  }
  return (<div className={"users info_section"}>
    <h3 style={{ color: "#411411" }}>Users</h3>
    <hr/>
    <div className={"table"}>
      <div className={"table_header"}>
        <div className={"row"}>
          <p>id</p>
          <p>email</p>
          <p>Имя</p>
          <p>Фамилия</p>
          <p>Права</p>
          <p>Аватарка</p>
          <p>Дата создания</p>
        </div>
      </div>
      <div className={"table_data"}>
        {users?.map((u) => (
            <div className={"row"}>
              <p>{u.id}</p>
              <p>{u.email}</p>
              <p>{u.first_name}</p>
              <p>{u.last_name}</p>
              <p>{JSON.stringify(u.scopes)}</p>
              <p>{u.avatar_id}</p>
              <p>{u.created_at}</p>
            </div>
        ))}
      </div>
    </div>
  </div>)
}

const Skills = ({skills}) => {
  return (<div className={"skills info_section"}>
    <h3 style={{ color: "#411411" }}>Skills</h3>
    <hr/>
    <div className={"table"}>
      <div className={"table_header"}>
        <div className={"row"}>
          <p>id</p>
          <p>название</p>
          <p>количество использований</p>
        </div>
      </div>
      <div className={"table_data"}>
        {skills?.map((s) => (
            <div className={"row"}>
              <p>{s.id}</p>
              <p>{s.title}</p>
              <p>{s.count}</p>
            </div>
        ))}
      </div>
    </div>
  </div>)
}

const Teams = ({teams}) => {
  return (<div className={"teams info_section"}>
    <h3 style={{ color: "#411411" }}>Teams</h3>
    <hr/>
    <div className={"table"}>
      <div className={"table_header"}>
        <div className={"row"}>
          <p>id</p>
          <p>название</p>
          <p>id создателя</p>
          <p>код приглашения</p>
          <p>Участники</p>
          <p>Дата создания</p>
        </div>
      </div>
      <div className={"table_data"}>
        {teams?.map((t) => (
            <div className={"row"}>
              <p>{t.id}</p>
              <p>{t.title}</p>
              <p>{t.admin_id}</p>
              <p>{t.invite_code}</p>
              <p>{t.participants?.map((p) => (
                  <span>{p.first_name} {p.last_name} ({p.user_id})</span>
              ))}</p>
              <p>{t.created_at}</p>
            </div>
        ))}
      </div>
    </div>
  </div>)
}

export default Main;
