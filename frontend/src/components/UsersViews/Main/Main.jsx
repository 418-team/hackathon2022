import "./index.css";

import { useEffect, useState } from "react";

import { getMyTeam } from "../../../utils/api";
import AboutUs from "./components/AboutUs/AboutUs";
import Cases from "./components/Cases/Cases";
import Greeting from "./components/Greeting/Greeting";
import Team from "./components/Team/Team";

function Main() {
  const [data, setData] = useState({});

  const team = data?.teams?.length > 0 ? data?.teams[0] : false;

  const getMyTeamFunc = () =>
    getMyTeam().then(({ data: requestData }) => {
      setData(requestData.data);
    });

  useEffect(() => {
    getMyTeamFunc();
  }, []);
  return (
    <>
      <div className="background" />
      <Greeting />
      <AboutUs />
      <Team team={team} />
      <Cases />
    </>
  );
}

export default Main;
