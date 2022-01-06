import { BrowserRouter as Router, Switch } from "react-router-dom";
import LeftMenu from "../LeftMenu";
// import Home from '../Home';
// import Unit from "../Unit"
// import Type from "../Type/Type"
// import Users from '../Users';
// import Table from "../Table"/

function AdminRouter() {
  return (
    <Router>
      <div>
        <LeftMenu />
        <div style={{ padding: "40px 40px 0px 230px" }}>
          <Switch>
            {/* <Route path={"/unit/:id"} component={Unit}/>
                        <Route path={"/type/:id"} component={Type}/>
                        <Route path={"/users"} component={Users}/>
                        <Route path={"/table"} component={Table}/>
                        <Route path={"/"} component={Home}/> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminRouter;
