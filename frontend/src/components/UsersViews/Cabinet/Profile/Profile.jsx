import "./profile.css";

import { Checkbox } from "../../../shared/Checkbox/CheckBox";
import Input from "../../../shared/Input/Input";

function Profile({
  team,
  profile,
  onDelete,
  setIsInputFocus,
  setSkillInput,
  skillInput,
  skills,
  isInputFocus,
  generateList,
  inputRef,
  onNewAddSkill,
  onAddSkill,
  onChangeFindTeam,
}) {
  return (
    <div className="profile">
      <ProfileImage background="https://cdn.418.one/team/vlad@1x.jpg" />
      <div className="profile_info">
        <p className="profile_info_name">
          {profile?.first_name} {profile?.last_name}
        </p>
        <p className="profile_info_email">{profile?.email}</p>
        <div className="profile_info_tags" key={JSON.stringify(skills)}>
          {skills?.map((skill) => (
            <span
              className="profile_info_tags_tag"
              key={skill.id}
              onClick={() => onDelete(skill)}
            >
              {skill.title}
            </span>
          ))}
        </div>
        <div style={{ position: "relative", maxWidth: "450px" }} ref={inputRef}>
          <Input
            onFocus={() => setIsInputFocus(true)}
            onChange={(e) =>
              e.target.value.length <= 32 && setSkillInput(e.target.value)
            }
            value={skillInput}
            placeholder="Введите свой навык и выберите из списка"
          />
          {isInputFocus && (
            <div className="skills_list">
              {generateList().map((skill) => (
                <div
                  key={skill.title}
                  className="skill_item"
                  onClick={() =>
                    skill.draft ? onNewAddSkill(skill) : onAddSkill(skill)
                  }
                >
                  {skill.title}
                </div>
              ))}
            </div>
          )}
        </div>
        {!team && (
          <div style={{ position: "relative", marginTop: "3rem" }}>
            <Checkbox
              onChange={onChangeFindTeam}
              value={!!profile?.find_team}
              label="Ищу команду"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileImage({ background }) {
  const style = {
    background: `url("${background}") no-repeat center`,
    backgroundSize: "cover",
  };

  return <div className="item" style={style} />;
}

export default Profile;
