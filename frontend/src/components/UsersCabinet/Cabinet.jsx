import "./cabinet.css";

import { useEffect, useRef, useState } from "react";

import {
  addNewSkill,
  editUser,
  getMyTeam,
  getSkillsList,
} from "../../utils/api";
import { useStateCallback } from "../../utils/hooks";
import filter from "../../utils/search";
import useClickOutside from "../shared/useClickOutside";
import Profile from "./Profile/Profile";
import Team from "./Team/Team";

export default function Cabinet() {
  const [data, setData] = useStateCallback(null);
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

  // const rejectInvite = (id) => {
  //   rejectHook(id).then(() => {
  //     getMyTeamFunc();
  //   });
  // };
  //
  // const acceptInvite = (id) => {
  //   acceptHook(id).then(() => {
  //     getMyTeamFunc();
  //   });
  // }

  const team = data?.teams?.length > 0 ? data?.teams[0] : false;
  // const invites = data?.invites.length > 0 ? data?.invites : false;
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
      setSkillInp("");
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

  return (
    <div className="section-cabinet">
      <div className="header">
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
      <Team team={team} getTeam={getMyTeamFunc} />
    </div>
  );
}
