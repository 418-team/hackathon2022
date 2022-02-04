import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../Header/Header";
import Join from "../Join";
import { Cabinet } from "../UsersViews/Cabinet";
import { Users } from "../UsersViews/FindUsers";
import Main from "../UsersViews/Main";
import Team from "../UsersViews/Team/Team";

function AdminRouter() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/cabinet" component={Cabinet} />
        <Route path="/users" component={Users} />
        <Route path="/team" component={Team} />
        <Route path="/join/:code" component={Join} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  );
}

export default AdminRouter;
