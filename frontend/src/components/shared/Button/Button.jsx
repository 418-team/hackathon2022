import "./button.css"

const Button = (props) => {
    let clsName = "button "
    if (props.mode) {
        clsName += props.mode
    }
    if (props.disabled) {
        clsName += " disabled"
    }

    return <button {...props} className={clsName}>{props.label}</button>
}
export default Button