import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LeftMenu from "../LeftMenu";
import { Events } from "../UsersEvents";
import { Team } from "../UsersTeam";

function AdminRouter() {
  return (
    <Router>
      <div>
        <LeftMenu />
        <div style={{ padding: "40px 40px 0px 230px" }}>
          <Switch>
            <Route path="/team" component={Team} />
            <Route path="/" component={Events} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
