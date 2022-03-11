import React from "react";

export const FormField = props => {
    return (
        <div className="outlet field">
            <label className="outlet label">
                {props.label}
            </label>
            <input
                className="outlet input"
                placeholder="enter here.."
                disabled={props.disabled}
                value={props.value}
                type={props.type}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};