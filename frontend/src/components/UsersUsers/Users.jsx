import { useEffect, useState } from "react";

import { listForInvite } from "../../utils/api";
import filter from "../../utils/search";
import Divider from "../shared/Divider";
import Input from "../shared/Input/Input";

function Users() {
  const [data, setData] = useState(null);
  const [find, setFind] = useState("");

  useEffect(() => {
    listForInvite().then(({ data: result }) => {
      setData(result.rows);
    });
  }, []);

  return (
    <div className="user_list">
      <div>
        <h2>Пользователи, которые ищут команду</h2>
      </div>
      <div>
        <Input
          mode="secondary"
          onChange={(e) => setFind(e.target.value)}
          placeholder="Поиск"
          value={find}
        />
      </div>
      {filter(data, find)?.map((user) => (
        <>
          <div className="event_card">
            <div className="card_title">
              <div className="title">
                {user.last_name} {user.first_name}
              </div>
            </div>
          </div>
          <Divider />
        </>
      ))}
    </div>
  );
}

export default Users;
