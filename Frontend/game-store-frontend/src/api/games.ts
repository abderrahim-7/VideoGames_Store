import api from "./axios.js";

export const getAllGames = async (page = 1, limit = 10) => {
    const res = await api.get(`/api/games?page=${page}&limit=${limit}`)
    return res.data
}

export const getGameById = async (id : string) => {
    const res = await api.get(`/api/games/search?id=${id}`)
    return res.data;
}

export const getGameByName = async (name : string) => {
    const res = await api.get(`/api/games/searchName?name=${name}`)
    return res.data;
}

export const getHighlyRated = async (page = 1, limit = 10) => {
    const res = await api.get(`/api/games/highlyRated?page=${page}&limit=${limit}`)
    return res.data
}

export const getOnSales = async (page=1,limit=10) => {
    const res = await api.get(`/api/games/onSale?page=${page}&limit=${limit}`)
    return res.data
}

export const getNewReleases = async (page = 1, limit = 10) => {
    const res = await api.get(`/api/games/newReleases?page=${page}&limit=${limit}`)
    return res.data
}