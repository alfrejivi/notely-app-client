import React from "react";
import { Route, RouteProps, RouteComponentProps } from "react-router-dom";
import { RouterProps } from "../Routes";

export interface AppliedRouteProps extends RouterProps, RouteProps { };

const AppliedRoute: React.FC<AppliedRouteProps> = (props) => {
    const { authProps, component, ...rest } = props;
    const C = props.component as React.FC<RouteComponentProps>;
    return (
        <Route {...rest} render={(props) => <C {...props} {...authProps} />} />
    );
}

export default AppliedRoute;