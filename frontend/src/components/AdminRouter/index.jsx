import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "../AdminView/Main/index";
import { Users } from "../Users";

function AdminRouter() {
  return (
    <Router>
      <div>
        <div>
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
