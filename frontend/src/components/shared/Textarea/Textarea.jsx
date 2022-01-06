import "./textarea.css";

import TextareaAutosize from "react-textarea-autosize";

function Textarea(props) {
  return <TextareaAutosize {...props} className="textarea" />;
}
export default Textarea;
