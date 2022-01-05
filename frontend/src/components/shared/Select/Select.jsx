import {useState, useRef} from 'react';
import SelectItem from './SelectItem';
import useClickOutside from '../useClickOutside';
import "./select.css"


const AddItem = ({handle, items, type, label, field, filter, relation, id=null}) => {
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef, () => {
        setOpen(false);
    });

    const [open, setOpen] = useState(false)
    return (
        <div className="items-wrapper" ref={wrapperRef}>
            <div
                className="type-select"
                onClick={() => setOpen((s) => !s)}
                aria-hidden="true"
            >
                <div style={{ display: "flex", justifyContent: "space-between"}}><span className="label">{label}</span><p style={{ width: "8px", transform: `rotate(${open ? "90" : "0"}deg)`, color: "#494949" }}>&#10148;</p></div>
            </div>
            <div className={open ? "items" : "items hide"}>
                {items.map((element) => (
                    <SelectItem
                        filter={filter}
                        relation={relation}
                        key={JSON.stringify(element)}
                        field={field}
                        type={type}
                        item={element}
                        handleChecked={() => handle(element, id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default AddItem