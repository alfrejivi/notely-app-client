import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';

import Routes from './Routes';

import './App.css';

export interface AuthProps {
    isAuthenticated: boolean;
    userHasAuthenticated: Dispatch<SetStateAction<boolean>>;
};

interface AppProps extends RouteComponentProps { }

const App: React.FC<AppProps> = (props) => {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
        onLoad();
    }, [])

    const onLoad = async () => {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
        catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    };

    const handleLogout = async () => {
        await Auth.signOut();
        userHasAuthenticated(false);
        props.history.push("/login");
    }

    return !isAuthenticating ?
        <div className="App container">
            <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Notely</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {isAuthenticated
                            ? <NavItem onClick={handleLogout}>Logout</NavItem>
                            : <>
                                <LinkContainer to="/signup">
                                    <NavItem>Signup</NavItem>
                                </LinkContainer>
                                <LinkContainer to="/login">
                                    <NavItem>Login</NavItem>
                                </LinkContainer>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes authProps={{ isAuthenticated, userHasAuthenticated }} />
        </div> : <div className=""></div>;
}

export default withRouter(App);
