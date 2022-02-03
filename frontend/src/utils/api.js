import axios from "axios";

// OAuth
export async function auth(username, password) {
  const result = await axios.post(
    "oauth/authorize",
    JSON.stringify({ username, password })
  );
  return result;
}
export async function registration(body) {
  const [first_name, last_name] = body.name.split(" ");
  const data = {
    email: body.email,
    password: body.password,
    first_name,
    last_name,
  };
  const result = await axios.post("oauth/registration", JSON.stringify(data));
  return result;
}

export async function getEvents() {
  const result = await axios.get("events/list");
  return result;
}

export const addNewSkill = async (body) => {
  const result = await axios.post(`/skills/create`, JSON.stringify(body));
  return result;
};

export const editUser = async (id, body) => {
  const result = await axios.put(`/users/${id}`, JSON.stringify(body));
  return result;
};

export async function createEvent(body) {
  const data = { ...body };
  data.date_start = new Date(body.date_start).toISOString();
  data.date_end = new Date(body.date_end).toISOString();
  const result = await axios.post("events/create", JSON.stringify(data));
  return result;
}

export async function createTeam(body) {
  const result = await axios.post("teams/create", JSON.stringify(body));
  return result;
}

export async function oauthRefresh() {
  const result = await axios.post(
    "oauth/refresh",
    JSON.stringify({ refresh_token: localStorage.getItem("refresh_token") })
  );
  return result;
}

export async function join(id) {
  const result = await axios.post(`teams/join/${id}`);
  return result;
}

// eslint-disable-next-line consistent-return
export const refresh = async () => {
  try {
    const { data } = await oauthRefresh();
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem(
      "is_admin",
      data.user.scopes.includes("admin").toString()
    );
    axios.defaults.headers.Authorization = `Bearer ${data.access_token}`;
    if (data.need_update) window.location.pathname = "/login";
    return data.access_token;
  } catch (e) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
    console.warn("[OAuth] Session Expired!");
  }
};

export const getMyTeam = async () => {
  const result = await axios.get(`/teams/my`);
  return result;
};

export const getSkillsList = async () => {
  const result = await axios.get(`/skills/list`);
  return result;
};

export const rejectInvite = async (id) => {
  const result = await axios.delete(`/invites/reject/${id}`);
  return result;
};

export const acceptInvite = async (id) => {
  const result = await axios.post(`/invites/accept/${id}`);
  return result;
};

export const listForInvite = async () => {
  const result = await axios.get(`/users/ulist`);
  return result;
};

export const getType = async (id) => {
  const result = await axios.get(`/types/${id}`);
  return result;
};

export const getUnitsApi = async (id) => {
  const result = await axios.get("/units/list", { params: { type_id: id } });
  return result;
};

export const getUsers = async () => {
  const result = await axios.get("/users/list");
  return result;
};

export const createUsers = async (body) => {
  const result = await axios.post("/users/create", JSON.stringify(body));
  return result;
};

export const deleteUser = async (id) => {
  const result = await axios.delete(`/users/delete/${id}`);
  return result;
};

export const deleteEvent = async (id) => {
  const result = await axios.delete(`/events/delete/${id}`);
  return result;
};

export const deleteCheckList = async (id, checklistId) => {
  const result = await axios.delete(`/types/${id}/checklist/${checklistId}`);
  return result;
};

export const putCheckList = async (id, checklistId, data) => {
  const result = await axios.put(`/types/${id}/checklist/${checklistId}`, data);
  return result;
};

export const postNewType = async (value) => {
  const result = await axios.post("/types/create", { title: value });
  return result;
};

export const setUnit = async (data) => {
  const result = await axios.put(`units/${data.id}`, data);
  return result;
};

export const getTypes = async () => {
  const result = await axios.get("/types/list");
  return result;
};

export const invite = async (body) => {
  const result = await axios.post("/invites/create", JSON.stringify(body));
  return result;
};