import "./index.css";

import AboutUs from "./components/AboutUs/AboutUs";
import Greeting from "./components/Greeting/Greeting";
import Team from "./components/Team/Team";

function Main() {
  return (
    <>
      <div className="background" />
      <Greeting />
      <AboutUs />
      <Team />
    </>
  );
}

export default Main;
