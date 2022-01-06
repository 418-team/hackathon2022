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
  const result = await axios.post("oauth/registration", JSON.stringify(body));
  return result;
}

export async function getEvents() {
  const result = await axios.get("events/list");
  return result;
}

export async function oauthRefresh() {
  const result = await axios.post(
    "oauth/refresh",
    JSON.stringify({ refresh_token: localStorage.getItem("refresh_token") })
  );
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

export const getTags = async () => {
  const result = await axios.get("/tags/list");
  return result;
};

export const postTags = async (title) => {
  const result = await axios.post("/tags/create", { title });
  return result;
};

export const getUnit = async (id) => {
  const result = await axios.get(`/units/${id}`);
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
