import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import { AuthProps } from './App';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import Settings from './containers/Settings';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticateRoute';
import AppliedRoute from './components/AppliedRoute';

export interface RouterProps {
    authProps: AuthProps;
}

const Routes: React.FC<RouterProps> = ({ authProps }) => {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} authProps={authProps} />
            <UnauthenticatedRoute path="/login" exact component={Login} authProps={authProps} />
            <UnauthenticatedRoute path="/signup" exact component={Signup} authProps={authProps} />
            <AuthenticatedRoute path="/notes/:id" exact component={Notes} authProps={authProps} />
            <AuthenticatedRoute path="/notes/new" exact component={NewNote} authProps={authProps} />
            <AuthenticatedRoute path="/settings" exact component={Settings} authProps={authProps} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Routes;