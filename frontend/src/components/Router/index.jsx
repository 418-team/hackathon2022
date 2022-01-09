import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import LeftMenu from "../LeftMenu";
import { Cabinet } from "../UsersCabinet";
import { Events } from "../UsersEvents";
import { Users } from "../UsersUsers";

function AdminRouter() {
  return (
    <Router>
      <div>
        <LeftMenu />
        <div style={{ padding: "40px 40px 0px 230px" }}>
          <Switch>
            <Route path="/profile" component={Cabinet} />
            <Route path="/users" component={Users} />
            <Route path="/" component={Events} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
