import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {FormField} from "../ui/FormField";

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Register = props => {
    const history = useHistory();
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");


    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({name, username, password});
            const response = await api.post('/users', requestBody);

            if(undefined) {
                console.log("Undefined equals true")
            }
            else {
                console.log("Undefined equals false")
            }
            // Get the returned user and update a new object.
            const user = new User(response.data);

            console.log("Token: ", user.token)
            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('currentUserId', user.id);

            // register successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/users`);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            //alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    };

    return (
        <BaseContainer>
            <div className="outlet container">
                <div className="outlet form">
                    <h2 className="outlet site-title">Register</h2>
                    {errorMessage && (
                        <p className="error"> {errorMessage} </p>
                    )}
                    <FormField
                        label="Name"
                        value={name}
                        onChange={un => setName(un)}
                    />
                    <FormField
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        type={"password"}
                        onChange={n => setPassword(n)}
                    />
                    <div className="button-container">
                        <Button
                            disabled={!username || !password}
                            width="100%"
                            onClick={() => doRegister()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Register;
