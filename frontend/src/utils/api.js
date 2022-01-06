import axios from 'axios';

// OAuth
export async function auth(username, password) {
    return await axios.post('oauth/authorize',
        JSON.stringify({username, password})
    );
}
export async function registration(body) {
    return await axios.post('oauth/registration',
        JSON.stringify(body)
    );
}

export async function getEvents() {
    return await axios.get("events/list")
}

export async function refresh() {
    try {
        const {data} = await oauthRefresh();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('is_admin', data.user.scopes.includes("admin").toString())
        axios.defaults.headers.Authorization = 'Bearer ' + data.access_token;
        console.info('[OAuth] Token has been refreshed');
        if (data.need_update) window.location.pathname = '/login';
        return data.access_token;
    } catch (e) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();
        console.warn('[OAuth] Session Expired!');
    }
}

export async function oauthRefresh() {
    return await axios.post('oauth/refresh',
        JSON.stringify({refresh_token: localStorage.getItem('refresh_token')})
    );
}

export const getTags = async () => await axios.get("/tags/list")

export const postTags = async (title) => await axios.post("/tags/create", {title})

export const getUnit = async (id) => await axios.get(`/units/${id}`)

export const getType = async (id) => await axios.get(`/types/${id}`)

export const getUnitsApi = async (id) => await axios.get("/units/list", {params: {type_id: id}})

export const getUsers = async () => await axios.get("/users/list")

export const deleteCheckList = async (id, checklistId) => await axios.delete(`/types/${id}/checklist/${checklistId}`)

export const putCheckList = async (id, checklistId, data) => await axios.put(`/types/${id}/checklist/${checklistId}`, data)

export const postNewType = async (value) => await axios.post("/types/create",  {title: value})

export const setUnit = async (data) => await axios.put(`units/${data.id}`, data)

export const getTypes = async () => await axios.get("/types/list")