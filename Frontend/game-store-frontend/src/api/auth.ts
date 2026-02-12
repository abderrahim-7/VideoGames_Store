import api from "./axios.js";

export const signUp = async (username : string , email : string ,password : string) => {
    const res = await api.post("/api/auth/signup", {
    username,
    email,
    password,
  });
    return res.data;
}

export const login = async (email : string, password : string) => {
    const res = await api.post("/api/auth/login",{email, password})
    return res.data;
}

