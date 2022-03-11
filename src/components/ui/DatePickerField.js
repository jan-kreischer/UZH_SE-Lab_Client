import React from "react";
import DatePicker from "react-datepicker";

export const DatePickerField = props => {
    return (
        <div className="outlet field">
            <label className="outlet label">
                {props.label}
            </label>
            <DatePicker
                selected={props.value}
                className="outlet input"
                placeholder="enter here.."
                onChange={e => props.onChange(e.target.value)}
                disabled={props.disabled}
            />
        </div>
    );
};