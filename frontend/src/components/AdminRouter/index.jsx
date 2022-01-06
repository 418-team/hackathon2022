import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LeftMenu from "../LeftMenu";
// import Home from '../Home';
// import Unit from "../Unit"
// import Type from "../Type/Type"
import { Users } from "../Users";
import { Events } from "../Events";
// import Table from "../Table"/

function AdminRouter() {
  return (
    <Router>
      <div>
        <LeftMenu isAdmin />
        <div style={{ padding: "40px 40px 0px 230px" }}>
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/events" component={Events} />
            {/* <Route path={"/"} component={Home}/> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
