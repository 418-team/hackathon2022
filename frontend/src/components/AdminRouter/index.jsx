import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Users } from "../Users";

function AdminRouter() {
  return (
    <Router>
      <div>
        <div>
          <Switch>
            <Route path="/users" component={Users} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
