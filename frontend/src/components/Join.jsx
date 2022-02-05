import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { join } from "../utils/api";

function Join(props) {
  const { code } = props.match.params;
  const history = useHistory();

  useEffect(() => {
    join(code).then(() => {
      return history.push("/team");
    });
  }, []);

  return null;
}

export default Join;
