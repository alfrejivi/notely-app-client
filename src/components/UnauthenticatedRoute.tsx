import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";
import { RouterProps } from "../Routes";

export interface UnauthenticatedRouteProps extends RouterProps, RouteProps { };


const querystring = (name: string, url: string = window.location.href) => {
    name = name.replace(/[[]]/g, "\\$&");

    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return "";
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = (props) => {
    const { authProps, component, ...rest } = props;
    const C = component as React.FC<RouteComponentProps>;
    const redirect = querystring("redirect");
    return (
        <Route
            {...rest}
            render={props =>
                !authProps.isAuthenticated
                    ? <C {...props} {...authProps} />
                    : <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
            }
        />
    );
}

export default UnauthenticatedRoute;