import { Redirect, Route } from "react-router-dom";

export function AdminPrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.access_token &&
        localStorage.refresh_token &&
        localStorage.is_admin === "true" && <Component {...props} />
      }
    />
  );
}

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.error(localStorage.access_token && localStorage.refresh_token);
        return localStorage.access_token && localStorage.refresh_token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}
