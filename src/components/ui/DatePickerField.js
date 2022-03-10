import React from "react";
import DatePicker from "react-datepicker";

export const DatePickerField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <DatePicker
                selected={props.value}
                className="login input"
                placeholder="enter here.."
                onChange={e => props.onChange(e.target.value)}
                disabled={props.disabled}
            />
        </div>
    );
};