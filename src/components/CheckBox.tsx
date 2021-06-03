import React, { useState } from "react";

type CheckBoxProps = {
    id: string,
    labelText: string,
}

export default function CheckBox(props: CheckBoxProps) {
    const [checked, setChecked] = useState(false);
    const onCheckBoxClicked = () => {
        setChecked(!checked);
    }


    return (
        <span>
            <label>
                {props.labelText}
                <input type="checkbox" id={props.id} checked={checked} onClick={onCheckBoxClicked}></input>
            </label>
        </span>
    )
}
