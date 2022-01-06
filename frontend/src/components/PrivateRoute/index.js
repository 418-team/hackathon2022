import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminPrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            localStorage.access_token && localStorage.refresh_token && localStorage.is_admin === "true" && <Component {...props} />
        )}
    />
);

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            localStorage.access_token && localStorage.refresh_token
                ? <Component {...props} />
                : <Redirect to="/login"/>
        )}
    />
);

