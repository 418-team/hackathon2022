import "./App.css";

import axios from "axios";
import moment from "moment";
import ruLocale from "moment/locale/ru";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import AdminRouter from "./components/AdminRouter";
import Auth from "./components/Auth";
import { AdminPrivateRoute, PrivateRoute } from "./components/PrivateRoute";
import CRouter from "./components/Router";
import { refresh } from "./utils/api";

function App() {
  axios.defaults.baseURL = window.location.host.includes("418.one")
    ? "https://api.energy.418.one"
    : "http://127.0.0.1:14400";
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.access_token}`,
  };
  axios.interceptors.response.use(
    // eslint-disable-next-line func-names
    function (response) {
      return response;
    },
    // eslint-disable-next-line func-names
    async function (error) {
      const status = error.response ? error.response.status : null;
      const message =
        error.response?.data?.message ||
        error.response?.statusText ||
        "Неизвестная ошибка";

      const errorMessage = error.response?.data?.error;
      if (
        status === 403 &&
        errorMessage !== "incorrect_login_or_password" &&
        errorMessage !== "not_enough_scopes"
      ) {
        const accessToken = await refresh(error);
        // eslint-disable-next-line no-param-reassign
        error.response.config.headers.Authorization = `Bearer ${accessToken}`;
        return axios(error.response.config);
      }
      if (status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.reload();
      }
      if (status !== 404) {
        console.error("AXIOS Global Error", { status, message });
      }

      return Promise.reject(error);
    }
  );
  moment.updateLocale("ru", [ruLocale]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Auth} />
          <SwitchRouter />
        </Switch>
      </Router>
    </div>
  );
}

function SwitchRouter() {
  console.error(localStorage.access_token && localStorage.refresh_token);
  if (localStorage.access_token && localStorage.refresh_token) {
    return localStorage.is_admin === "true" ? (
      <AdminPrivateRoute path="/" component={AdminRouter} />
    ) : (
      <PrivateRoute path="/" component={CRouter} />
    );
  }
  return <Redirect to="/login" />;
}

export default App;
