import React from "react";

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