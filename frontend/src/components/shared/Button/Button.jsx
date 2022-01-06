import "./button.css";

function Button(props) {
  let clsName = "button ";
  if (props.mode) {
    clsName += props.mode;
  }
  if (props.disabled) {
    clsName += " disabled";
  }

  return (
    <button type="button" {...props} className={clsName}>
      {props.label}
    </button>
  );
}
export default Button;
