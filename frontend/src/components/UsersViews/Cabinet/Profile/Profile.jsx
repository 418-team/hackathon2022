import "./profile.css";
import "react-image-crop/dist/ReactCrop.css";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop from "react-image-crop";

import { uploadImage } from "../../../../utils/api";
import Button from "../../../shared/Button/Button";
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
  onChangePhoto,
}) {
  return (
    <div className="profile">
      <ProfileImage
        background={profile?.avatar_url}
        onChangePhoto={onChangePhoto}
      />
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

function ProfileImage({ background, onChangePhoto }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const buttonRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 40,
    aspect: 1,
    x: 25,
    y: 25,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setUpImg(() => {
        const reader = new FileReader();
        reader.addEventListener("load", () => setUpImg(reader.result));
        reader.readAsDataURL(acceptedFiles[0]);
      });
    },
  });

  const style = {
    background: `url("${background}") no-repeat center`,
    backgroundSize: "cover",
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const onSaveImage = (canvas, _crop) => {
    if (!_crop || !canvas) {
      return;
    }
    canvas.toBlob((blob) => {
      const fd = new FormData();
      fd.append("file", blob);

      uploadImage(fd).then((res) => {
        onChangePhoto(res.data.url);
      });
    });
  };

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const _crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = _crop.width * pixelRatio * scaleX;
    canvas.height = _crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      _crop.x * scaleX,
      _crop.y * scaleY,
      _crop.width * scaleX,
      _crop.height * scaleY,
      0,
      0,
      _crop.width * scaleX,
      _crop.height * scaleY
    );
  }, [completedCrop]);

  return background ? (
    <div className="item" style={style} />
  ) : (
    <div className="item">
      <div
        {...getRootProps({ className: "dropzone" })}
        onClick={() => buttonRef.current.click()}
      >
        <input {...getInputProps()} />
        <p>Перенесите или выберите свое фото</p>
        <button
          type="button"
          style={{ opacity: 0, visibility: "hidden", position: "absolute" }}
          ref={buttonRef}
          onClick={open}
        >
          button
        </button>
      </div>
      {upImg && (
        <div className="image-preview__wrapper">
          <div className="image-preview__image">
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={(c) => {
                setCrop(() => ({ ...c, aspect: 1 }));
              }}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <canvas
              ref={previewCanvasRef}
              // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
              style={{
                width: Math.round(completedCrop?.width ?? 0),
                height: Math.round(completedCrop?.height ?? 0),
                position: "absolute",
                visibility: "hidden",
              }}
            />
            <div className="image-preview__btn_container">
              <Button
                mode="primary"
                label="Сохранить"
                onClick={() => {
                  onSaveImage(previewCanvasRef.current, completedCrop);
                }}
              />
              <Button
                mode="secondary"
                label="Отменить"
                onClick={() => setUpImg(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
