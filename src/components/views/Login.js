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

const Login = props => {
  const history = useHistory();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({username, password});
      const response = await api.post('/users/login', requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem('token', user.token);
      localStorage.setItem('currentUserId', user.id);
      console.log("User token: ", user.token)

      // Login successfully worked --> navigate to the route /game in the GameRouter
      history.push(`/users`);
    } catch (error) {
        alert(`Something went wrong during the login: \n${handleError(error)}`);
        setErrorMessage(error.response.data.message);
    }
  };

  return (
    <BaseContainer>
      <div className="outlet container">
        <div className="outlet form">
          <h2 className="site-title">Login</h2>
          {errorMessage && (
              <p className="error"> {errorMessage} </p>
          )}
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
              onClick={() => doLogin()}
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
export default Login;
