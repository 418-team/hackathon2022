import "./pop_up.css";

import Button from "../Button/Button";
import Input from "../Input/Input";

function PopUp({ fields, title, bottom = "10rem", left = "-10rem" }) {
  const inputs = fields.filter((f) => f.type === "input");
  const buttons = fields.filter((f) => f.type === "button");

  return (
    <div className="pop_up_form" style={{ bottom, left }}>
      <h3>{title}</h3>
      <hr />
      <div>
        {inputs.map((input) => (
          <Input
            placeholder={input.placeholder}
            type={input.button_type}
            onChange={(e) => input.onChange(input.key, e.target.value)}
            value={input.value}
            mode="secondary"
          />
        ))}
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
