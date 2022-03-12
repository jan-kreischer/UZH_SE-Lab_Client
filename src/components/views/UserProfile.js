import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {Link, useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import {FormField} from "components/ui/FormField";
import PropTypes from "prop-types";
import "styles/views/Game.scss";
//import DatePickers from "../ui/DatePickers";
//import "@progress/kendo-theme-material/dist/all.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DatePickerField} from "../ui/DatePickerField";
import {StatusField} from "../ui/StatusField";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
    );
};


const userProfileUrl = (user) => {
    return `/users/${user.id}`
}

const User = ({user}) => (
    <div class="">
        <FormField label="Name" value={user.name}/>
        <FormField label="Username" value={user.username} disabled={true}/>
        <StatusField loggedIn={user.loggedIn}/>
        <DatePickerField label="Birth Date" value={new Date(user.birthDate)} disabled={false}/>
        <DatePickerField label="Creation Date" value={new Date(user.creationDate)} disabled={true}/>
    </div>
);

User.propTypes = {
    user: PropTypes.object
};

function update(userId) {
    const currentUserId = localStorage.getItem("currentUserId")
    if (userId == currentUserId) {
        return  <Button
            width="100%"
            onClick={() => {return}}
        >
            Update
        </Button>
    }
    else {
        return;
    }
}

const UserProfile = () => {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const [user, setUser] = useState(null);
    let { userId } = useParams();
    const isOwnPage = (localStorage.getItem("currentUserId") == userId)

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users/' + userId);

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUser(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);

    let content = <Spinner/>;

    if (user) {
        content = (
            <div className={"outlet form"}>
                <ul className="outlet user-list">
                    <User user={user} key={user.id}/>
                </ul>
                {update(user.id)}
            </div>
        );
    }

    return (
        <BaseContainer>
            <div className="outlet container">
                <h2>Profile</h2>
                {content}
            </div>
        </BaseContainer>
    );

}

export default UserProfile;
