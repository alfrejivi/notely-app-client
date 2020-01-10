import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import AppliedRoute from './components/AppliedRoute';
import { AuthProps } from './App';
import Signup from './containers/Signup';

export interface RouterProps {
    authProps: AuthProps;
}

const Routes: React.FC<RouterProps> = ({ authProps }) => {
    return (
        <Switch>
            <AppliedRoute path="/" exact component={Home} authProps={authProps} />
            <AppliedRoute path="/login" exact component={Login} authProps={authProps} />
            <AppliedRoute path="/signup" exact component={Signup} authProps={authProps} />
            <Route component={NotFound} />
        </Switch>
    );
}

export default Routes;