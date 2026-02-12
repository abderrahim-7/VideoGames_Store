import type { PaymentMethod } from "../types/user.js";
import api from "./axios.js";

export const getUser = async () => {
    const res = await api.get(`/api/user/getUser`)
    return res.data 
}

export const changeName = async (newName : string) => {
    const res = await api.patch(`/api/user/updateUser`,{newName})
    return res.data 
}

export const changeEmail = async (newEmail : string) => {
    const res = await api.patch(`/api/auth/updateEmail`,{newEmail})
    return res.data 
}

export const changePassword = async (currentPassword : string, newPassword : string)=> {
    const res = await api.patch("/api/auth/updatePassword",{currentPassword,newPassword})
    return res.data
}

export const getOwnedGames = async () => {
    const res = await api.get("/api/user/ownedGames")
    return res.data
}

export const getWishlist = async () => {
    const res = await api.get("/api/user/wishlist")
    return res.data
}

export const addToWishlist = async (gameId : string) => {
    const res = await api.put("/api/user/addToWishlist",{gameId})
    return res.data
}

export const removeFromWishlist = async (gameId : string) => {
    const res = await api.delete("/api/user/removeFromWishlist",{data : {gameId},})
    return res.data
}

export const getCart = async () => {
    const res = await api.get("/api/user/cart")
    return res.data
}

export const addToCart = async (gameId : string) => {
    const res = await api.put("/api/user/addToCart",{gameId})
    return res.data
}

export const removeFromCart = async (gameId : string) => {
    const res = await api.delete("/api/user/removeFromCart",{data : {gameId},})
    return res.data
}

export const getPaymentMethods = async () => {
    const res = await api.get("/api/user/paymentMethod")
    return res.data
}

export const addPaymentMethod = async (type:"VISA" | "Mastercard" | undefined, cardNumber:string,expiryDate : string,holderName : string) => {
    const res = await api.put("/api/user/addPaymentMethod",{type, cardNumber,expiryDate,holderName})
    return res.data
}

export const removePaymentMehod = async (cardNum:string) => {
    const res = await api.delete("/api/user/removePaymentMethod",{data : {cardNum},})
    return res.data
}

export const buyGame = async (gameId?:string,paymentMethod?:PaymentMethod) => {
    const res = await api.post("/api/user/buyGame",{gameId,paymentMethod})
    return res.data
}

export const buyCart = async (paymentMethod?:PaymentMethod) => {
    const res = await api.post("/api/user/buyCart",{paymentMethod})
    return res.data
}
