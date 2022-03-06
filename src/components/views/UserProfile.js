import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {Spinner} from 'components/ui/Spinner';
import {Button} from 'components/ui/Button';
import {Link, useHistory, useParams} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Game.scss";

const userProfileUrl = (user) => {
    return `/users/${user.id}`
}

const User = ({user}) => (
    <span className="card" style={{"display": "block"}}>
      <div className="profile container">
          <div className="profile name">Name: {user.name}</div>
        <div className="profile username">Username: {user.username}</div>
          <div className="profile name">Status: {user.status}</div>
        <div className="profile id">Id: {user.id}</div>
      </div>
    </span>
);

User.propTypes = {
    user: PropTypes.object
};

const UserProfile = () => {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    const [user, setUser] = useState(null);
    let { userId } = useParams();

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
            <div className="game">
                <ul className="game user-list">
                    <User user={user} key={user.id}/>
                </ul>
            </div>
        );
    }

    return (
        <BaseContainer className="game container">
            <h2>Profile</h2>
            {content}
        </BaseContainer>
    );

}

export default UserProfile;
