import React from "react";
import {ReactLogo} from "components/ui/ReactLogo";
//import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import {Container, Navbar, Nav } from "react-bootstrap";
import "styles/views/Header.scss";
import {Link, withRouter, useHistory} from 'react-router-dom';
import {Button} from "../ui/Button";


/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const Header = props => {
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }

    const show_navbar_right = props => {
        if (!localStorage.getItem("token")) {
            return <Nav className="justify-content-end" style={{ width: "100%" }}><Nav.Link href="/login">Login</Nav.Link><Nav.Link href="/register">Register</Nav.Link></Nav>
        } else {
            return <Nav className="justify-content-end" style={{ width: "100%" }}><Nav.Link><Button
                width="100%"
                onClick={() => logout()}
            >
                Logout
            </Button></Nav.Link></Nav>
        }
    }

    return (
    <Navbar bg="primary" variant="dark">
        <Container>
            <Navbar.Brand href="/">
                <ReactLogo fill="white" width="42px" height="42px"/>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                </Nav>
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    {show_navbar_right()}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
}

Header.propTypes = {
  height: PropTypes.string
};

/**
 * Don't forget to export your component!
 */
export default withRouter(Header);
