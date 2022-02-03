import "./input.css";

function Input(props) {
  let clsName = `nh-input ${props.className ?? ''}`;
  if (props.mode) {
    clsName += props.mode;
  }
  if (props.disabled) {
    clsName += " disabled";
  }

  return <input type="text" {...props} className={clsName} />;
}

export default Input;
