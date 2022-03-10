import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "components/routing/routeProtectors/GameGuard";
import {LoginGuard} from "components/routing/routeProtectors/LoginGuard";
import Login from "components/views/Login";
import Register from "components/views/Register";
import UserProfile from "../../views/UserProfile";
import UserList from "components/views/UserList";
import Header from "../../views/Header";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
const AppRouter = () => {
  return (
      <Switch>
        <Route exact path="/login">
          <LoginGuard>
            <Login/>
          </LoginGuard>
        </Route>
        <Route exact path="/register">
          <LoginGuard>
            <Register/>
          </LoginGuard>
        </Route>
        <Route exact path="/users">
          <GameGuard>
            <UserList/>
          </GameGuard>
        </Route>
        <Route exact path="/users/:userId" component={UserProfile}>
            <GameGuard>
                <UserProfile/>
            </GameGuard>
        </Route>
        <Route exact path="/">
          <Redirect to="/users"/>
        </Route>
      </Switch>
  );
};

/*
* Don't forget to export your component!
 */
export default AppRouter;
