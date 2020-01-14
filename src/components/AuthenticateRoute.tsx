import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";
import { RouterProps } from "../Routes";

export interface AuthenticatedRouteProps extends RouterProps, RouteProps { };

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = (props) => {
    const { authProps, component, ...rest } = props;
    const C = component as React.FC<RouteComponentProps>;
    return (
        <Route
            {...rest}
            render={props =>
                authProps.isAuthenticated
                    ? <C {...props} {...authProps} />
                    : <Redirect
                        to={`/login?redirect=${props.location.pathname}${props.location
                            .search}`}
                    />}
        />
    );
}

export default AuthenticatedRoute;