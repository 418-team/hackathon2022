import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Join from "../Join";
import Main from "../UserMain";
import { Cabinet } from "../UsersCabinet";
import { Users } from "../UsersUsers";

function AdminRouter() {
  return (
    <Router>
      <div>
        <div>
          <Switch>
            <Route path="/cabinet" component={Cabinet} />
            <Route path="/users" component={Users} />
            <Route path="/join/:code" component={Join} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
