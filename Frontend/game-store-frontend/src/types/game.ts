export interface Game {
  _id: string;
  name: string;
  price: number;
  genres:string [];
  publisher: string [];
  poster:string;
  min_requirement : requirement;
  recommended_requirement : requirement;
  release_date : string;
  description:string ;
  rating: number;
  discount?:number;
}

export interface requirement{
  os : string;
  cpu : string;
  gpu:string;
  storage:string;
}
