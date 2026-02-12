export interface User{
    
_id : string,
username : string,
email : string,
password : string,
isAdmin : boolean,
cart : string [],
ownedGames : string [],
wishlist : string [],
paymentMethods : [],
}

export interface PaymentMethod{
    type : "VISA" | "Mastercard" | undefined,
    cardNumber : string,
    expiryDate : string,
    holderName: string,
    useSaved?:boolean
}