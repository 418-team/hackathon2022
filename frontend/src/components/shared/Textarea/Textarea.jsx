import TextareaAutosize from 'react-textarea-autosize';
import "./textarea.css"


const Textarea = (props) => {
    return <TextareaAutosize {...props} className={"textarea"}/>
}
export default Textarea