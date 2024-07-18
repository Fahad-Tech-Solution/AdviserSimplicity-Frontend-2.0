import React, { useEffect } from 'react'
import "./DynamicYesNo.css"

const DynamicYesNo = (props) => {

    useEffect(() => {
        // Set default value to "No" if not already set
        if (!props.values[props.name]) {
            props.handleChange({ target: { name: props.name, value: "No" } });
        }
    }, [props.name, props.values, props.handleChange]);

    return (
        <div className="form-check form-switch position-relative m-0 p-0 col-md-12 QuestionYesNoCenter">
            <div className="radioButton2 border">
                <input
                    type="radio"
                    name={props.name}
                    id={`${props.name}1`}
                    value="No"
                    onChange={props.handleChange}
                    checked={props.values[props.name] === "No"}
                    className='NoInput'
                />
                <label
                    htmlFor={`${props.name}1`}
                    className="tableNoLabel"
                >
                    <span>No</span>
                </label>
                <input
                    type="radio"
                    name={props.name}
                    id={`${props.name}2`}
                    value="Yes"
                    onChange={props.handleChange}
                    checked={props.values[props.name] === "Yes"}
                    className='YesInput'
                />
                <label
                    htmlFor={`${props.name}2`}
                    className="tableYesLabel"
                >
                    <span>Yes</span>
                </label>
            </div>

        </div>
    )
}

export default DynamicYesNo
