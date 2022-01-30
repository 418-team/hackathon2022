import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Header/Header";
import Join from "../Join";
import Main from "../UserMain";
import { Cabinet } from "../UsersCabinet";
import Team from "../UsersTeam/Team";
import { Users } from "../UsersUsers";

function AdminRouter() {
  return (
    <Router>
      <div>
        <div>
          <Header />
          <Switch>
            <Route path="/cabinet" component={Cabinet} />
            <Route path="/users" component={Users} />
            <Route path="/team" component={Team} />
            <Route path="/join/:code" component={Join} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
