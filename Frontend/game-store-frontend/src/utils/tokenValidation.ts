import { jwtDecode } from "jwt-decode";

interface tokenPayload{
    exp : number
}

export const isTokenValid = () : boolean => {
    const token = localStorage.getItem("token")
    if (!token){
        return false;
    }

    try{
        const decoded = jwtDecode<tokenPayload>(token)
        const time = Date.now()/1000

        if (decoded.exp < time){
            localStorage.removeItem("token");
            console.log("token expired")
            return false   
        }
        return true
    }
    catch(err){
        console.log("token invalide")
        localStorage.removeItem("token");
        return false
    }
}