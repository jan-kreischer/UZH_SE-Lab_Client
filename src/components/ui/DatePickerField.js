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
                className="outlet input date-picker"
                onChange={e => props.onChange(e.target.value)}
                disabled={props.disabled}
            />
        </div>
    );
};


export const StatusField = props => {
    return (
        <div className="outlet field">
            <label className="outlet label">
                Status
            </label>
            {props.loggedIn ?
                (<input className="outlet input" disabled="true" value="Online"/>) :
                (<input className="outlet input" disabled="true" value="Offline"/>)
            }
        </div>
    );
};