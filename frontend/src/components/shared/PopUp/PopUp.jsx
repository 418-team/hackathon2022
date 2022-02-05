import "./pop_up.css";

import { useRef } from "react";

import Button from "../Button/Button";
import Input from "../Input/Input";

function PopUp({ fields, title, children, open }) {
  const inputs = fields.filter((f) => f.type === "input");
  const buttons = fields.filter((f) => f.type === "button");
  const childrenRef = useRef(null);
  const bottom = (childrenRef?.current?.offsetHeight || 0) + 10;

  return (
    <div style={{ position: "relative" }} className="pop_up__wrapper">
      {open && (
        <PopUpWindow
          title={title}
          bottom={bottom}
          inputs={inputs}
          buttons={buttons}
        />
      )}
      <div ref={childrenRef}>{children}</div>
    </div>
  );
}

function PopUpWindow({ bottom, left, title, inputs, buttons }) {
  const error = useRef();

  const onChange = (input, e) => {
    if (input.key) {
      input.onChange(input.key, e.target.value);
    } else {
      input.onChange(e);
    }
  };

  return (
    <div className="pop_up_form" style={{ bottom, left }}>
      <h3>{title}</h3>
      <hr />
      {error.current && <span className="pop_up_form__text_error">
        {error.current || ""}
      </span>}
      <div>
        {inputs.map((input) => {
          if (input?.error) error.current = input.error;
          return (
            <Input
              placeholder={input.placeholder}
              type={input.button_type}
              onChange={(e) => onChange(input, e)}
              value={input.value}
              mode={input?.error ? "error" : "secondary"}
            />
          );
        })}
        <div className="btn_container">
          {buttons.map((button) => (
            <Button
              label={button.label}
              onClick={() => button.onClick()}
              mode={button.mode || "primary"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PopUp;
