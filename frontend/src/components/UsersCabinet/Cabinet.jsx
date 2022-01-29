/* eslint-disable */

import "./cabinet.css";

import { useEffect, useRef, useState } from 'react';

import {
  acceptInvite as acceptHook,
  createTeam,
  getMyTeam,
  getSkillsList,
  editUser,
  rejectInvite as rejectHook, addNewSkill
} from '../../utils/api';
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Textarea from "../shared/Textarea/Textarea";
import Team from './Team/Team';
import Profile from './Profile/Profile';
import filter from '../../utils/search';
import useClickOutside from '../shared/useClickOutside';
import { useStateCallback } from '../../utils/hooks';

function Cabinet() {
  const [data, setData] = useStateCallback(null);
  const [createView, setCreateView] = useState(false);
  const [skillInp, setSkillInp] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [isInputFocus, setIsInputFocus] = useState(null);
  const inputRef = useRef(null);

  useClickOutside(inputRef, () => {
    setIsInputFocus(false);
  });

  const getMyTeamFunc = () =>
      getMyTeam().then(({ data: requestData }) => {
        setData(requestData.data);
      });

  useEffect(() => {
    getMyTeamFunc();
    getSkillsList().then(({ data: requestData }) => {
      setSkillsList(requestData.rows);
    });
    return () => setData(null);
  }, []);

  const rejectInvite = (id) => {
    rejectHook(id).then(() => {
      getMyTeamFunc();
    });
  };

  const acceptInvite = (id) => {
    acceptHook(id).then(() => {
      getMyTeamFunc();
    });
  };

  const team = data?.teams.length > 0 ? data?.teams[0] : false;
  const invites = data?.invites.length > 0 ? data?.invites : false;
  const profile = data?.profile?.profile ? data?.profile?.profile : false;
  const skills = data?.skills?.length > 0 ? data.skills : [];

  const set = (state) => {
    setData(state, (prev) => {
      const _data = { ...prev };
      const body = {
        ..._data.profile.profile,
        skills: prev.skills.reduce((acc, skill) => {
          const _acc = [...acc];
          _acc.push(skill.id);
          return _acc;
        }, []),
      };

      editUser(profile.id, body).then(() => {
        getMyTeamFunc().then(() => {
          getSkillsList().then(({ data: requestData }) => {
            setSkillsList(requestData.rows);
          });
        });
      });
      return _data;
    });
  };

  const onAddSkill = (skill) => {
    if (!skills.some((s) => s.title === skill.title)) {
      const newSkills = [...skills, ...[skill]];
      set((prev) => ({ ...prev, skills: newSkills }));
      setIsInputFocus(false);
      setSkillInp("")
    }
  };

  const onNewAddSkill = () => {
    addNewSkill({ title: skillInp }).then(({ data: requestData }) => {
      onAddSkill({ title: skillInp, id: requestData.id });
    });
  };

  const onDeleteSkill = (skill) => {
    const newSkills = skills.filter((s) => s.title !== skill.title);
    set((prev) => ({ ...prev, skills: newSkills }));
  };

  const generateList = () => {
    const list = [...skillsList];
    if (skillInp.length === 0) {
      if (list.length > 5) {
        return list.splice(0, 5);
      }
      return list;
    }

    const skill = [
      {
        title: skillInp,
        draft: true,
      },
    ];

    const result = filter(list, skillInp);

    return result.some(
        (r) =>
            r.title.toLowerCase().replace(/ /g, "") ===
            skill[0].title.toLowerCase().replace(/ /g, "")
    )
        ? result.splice(0, 5)
        : [...skill, ...result.splice(0, 4)];
  };

  const onChangeFindTeam = () => {
    const _profile = { ...profile };
    _profile.find_team = !profile.find_team;
    set((prev) => ({ ...prev, profile: { profile: _profile } }));
  };

  const FORMAT = "DD MMMM YYYY HH:MM";

  return (
      <>
        {createView && (<AddView setAddView={setCreateView} getMyTeam={getMyTeamFunc}/>)}
      <div className={"section-cabinet"}>
        <div className={"header"}>
          <h2>Личный кабинет</h2>
        </div>
        <Profile
            profile={profile}
            skills={skills}
            setIsInputFocus={setIsInputFocus}
            inputRef={inputRef}
            onDelete={onDeleteSkill}
            generateList={generateList}
            isInputFocus={isInputFocus}
            skillInput={skillInp}
            setSkillInput={setSkillInp}
            onAddSkill={onAddSkill}
            onNewAddSkill={onNewAddSkill}
            onChangeFindTeam={onChangeFindTeam}
        />
        <Team team={team} onClick={() => setCreateView(true)}/>
      </div>
      </>)
    {/*//*/}
    {/*//     <AddView setAddView={setCreateView} getEventList={getMyTeamFunc} />*/}
    {/*//   )}*/}
    {/*//   <div className="team_view">*/}
    {/*//     {profile && (*/}
    {/*      <div>*/}
    {/*        <h2>Мои данные</h2>*/}
    {/*        <div className="my-team">*/}
    {/*          <div className="title">*/}
    {/*            <div>*/}
    {/*              <span>Фамилия: </span>*/}
    {/*              {profile.last_name}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*              <span>Имя: </span>*/}
    {/*              {profile.first_name}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*              <span>Отчество: </span>*/}
    {/*              {profile.patronymic}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*              <span>Email: </span>*/}
    {/*              {profile.email}*/}
    {/*            </div>*/}
    {/*          </div>*/}
    {/*          <h3 style={{ marginTop: "50px" }}>Навыки</h3>*/}
    {/*          <div style={{ position: "relative", maxWidth: "450px" }}>*/}
    {/*            <Input*/}
    {/*              onFocus={() => setIsInputFocus(true)}*/}
    {/*              onBlur={() => setIsInputFocus(false)}*/}
    {/*              onChange={(e) => setSkillInp(e.target.value)}*/}
    {/*              value={skillInp}*/}
    {/*              placeholder="Введите свой навык и выберите из списка"*/}
    {/*            />*/}
    {/*            {isInputFocus && (*/}
    {/*              <div className="skills_list">*/}
    {/*                {generateList().map((skill) => (*/}
    {/*                  <div className="skill_item">{skill.title}</div>*/}
    {/*                ))}*/}
    {/*              </div>*/}
    {/*            )}*/}
    {/*          </div>*/}
    {/*          <div style={{ marginTop: "20px", maxWidth: "450px" }}>*/}
    {/*            {skills?.map((skill) => (*/}
    {/*              <div key={skill.id}>*/}
    {/*                <span className="tag">{skill.title}</span>*/}
    {/*                <Divider />*/}
    {/*              </div>*/}
    {/*            ))}*/}
    {/*          </div>*/}
    {/*        </div>*/}
    {/*      </div>*/}
    {/*    )}*/}
    {/*    {team && (*/}
    {/*      <div>*/}
    {/*        <h2>Команда</h2>*/}
    {/*        <div className="my-team">*/}
    {/*          <div className="title">*/}
    {/*            <div>*/}
    {/*              <span>Название: </span>*/}
    {/*              {team.title}*/}
    {/*            </div>*/}
    {/*            <div>*/}
    {/*              <span>Описание: </span>*/}
    {/*              {team.description}*/}
    {/*            </div>*/}
    {/*          </div>*/}
    {/*          <h3 style={{ marginTop: "50px" }}>Участники команды</h3>*/}
    {/*          <div className="participants">*/}
    {/*            {team?.participants?.map((par) => (*/}
    {/*              <div key={par.id}>*/}
    {/*                <p>*/}
    {/*                  {par.first_name} {par.last_name}{" "}*/}
    {/*                  {par.id === team.admin_id && (*/}
    {/*                    <span className="tag">*/}
    {/*                      <span style={{ marginRight: "4px" }}>Создатель</span>*/}
    {/*                      <BiCrown color="#ffffff" size={12} />*/}
    {/*                    </span>*/}
    {/*                  )}*/}
    {/*                </p>*/}
    {/*                <Divider />*/}
    {/*              </div>*/}
    {/*            ))}*/}
    {/*          </div>*/}
    {/*        </div>*/}
    {/*      </div>*/}
    {/*    )}*/}
    {/*  </div>*/}
    {/*  {invites && (*/}
    {/*    <div>*/}
    {/*      <h2>Приглашения</h2>*/}
    {/*      <div className="invite_view table_header">*/}
    {/*        <div>Название команды</div>*/}
    {/*        <div>Сообщение</div>*/}
    {/*        <div>Действие</div>*/}
    {/*      </div>*/}
    {/*      <Divider />*/}
    {/*      {invites.map((inv) => (*/}
    {/*        <>*/}
    {/*          <div key={inv.id} className="invite_view table_data">*/}
    {/*            <div>{inv.title}</div>*/}
    {/*            <div>{inv.message}</div>*/}
    {/*            <div aria-hidden="true" style={{ display: "flex" }}>*/}
    {/*              <div onClick={() => rejectInvite(inv.id)}>*/}
    {/*                <AiOutlineDelete*/}
    {/*                  title="Отклонить приглашение"*/}
    {/*                  color="black"*/}
    {/*                  size={23}*/}
    {/*                />*/}
    {/*              </div>*/}
    {/*              <div onClick={() => acceptInvite(inv.id)}>*/}
    {/*                <AiOutlineCheckCircle*/}
    {/*                  title={`Перейти в команду ${inv.title}`}*/}
    {/*                  color="black"*/}
    {/*                  size={23}*/}
    {/*                />*/}
    {/*              </div>*/}
    {/*            </div>*/}
    {/*          </div>*/}
    {/*          <Divider />*/}
    {/*        </>*/}
    {/*      ))}*/}
    {/*    </div>*/}
    {/*  )}*/}
    {/*</div>*/}
}

function AddView({ setAddView, getMyTeam }) {
  const [params, setParams] = useState({});

  const onChangeHandler = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = () => {
    createTeam(params).then(() => getMyTeam())
  };

  return (
    <div className="add-form">
      <div>
        <h2>Создай новую команду</h2>
        <Input
          mode="secondary"
          onChange={(e) => onChangeHandler("title", e.target.value)}
          placeholder="Название"
          value={params.title || ""}
        />
        <Textarea
          mode="secondary"
          onChange={(e) => onChangeHandler("description", e.target.value)}
          placeholder="Описание"
          value={params.description || ""}
        />
        <div className="btn_container">
          <Button label="Создать" mode="primary" onClick={onSave} />
          <Button
              label="Отменить"
              mode="secondary"
              onClick={() => setAddView(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Cabinet;
