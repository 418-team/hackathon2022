import "./index.css";

import { ArrowIcon2 } from "./ArrowIcon2";

function ArrowButton(props) {
  return (
    <button type="button" className="button dark" {...props}>
      <span>{props.label}</span>
      <ArrowIcon2 size="0.8em" />
    </button>
  );
}

export default ArrowButton;
