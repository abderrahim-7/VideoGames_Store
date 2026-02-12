import { useEffect, useState } from "react";
import { removeFromCart } from "../api/user";
import GridGames from "../components/GridGames";
import Reciept from "../components/Reciept";
import { useCart } from "../context/CartContext";
import type { Game } from "../types/game";
import CartImg from "../assets/Cart.png";
import GameCard from "../components/GameCard";

const Cart = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const { cart, refreshCart } = useCart();

  useEffect(() => {
    setGames(cart);
  }, [cart]);

  const removeGame = async (id: string) => {
    await removeFromCart(id);
    await refreshCart();
  };

  if (!games)
    return (
      <div className="flex justify-center font-[Outfit] text-4xl py-20">
        Loading...
      </div>
    );

  return (
    <div>
      {games.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-6 text-center text-neutral-500"
          style={{ fontFamily: "Outfit" }}
        >
          <img
            src={CartImg}
            alt="No games found"
            className="w-60 h-60 object-contain opacity-80 mb-4"
          />
          <div className="-mt-15">
            <h2 className="text-4xl font-semibold tracking-wide">
              Your Cart Is Empty
            </h2>
            <p className="text-lg text-neutral-400 mb-9 mt-1">
              Add your favorite games and enjoy them now !
            </p>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl pt-5 ml-10">
            <span className="text-[#FFD700]" style={{ fontFamily: "Outfit" }}>
              In
            </span>{" "}
            <span className="text-[#C0C0C0]" style={{ fontFamily: "Outfit" }}>
              Cart
            </span>
          </h1>
          <div className="flex gap-2">
            <div className="basis-3/4">
              <GridGames
                items={games.map((game) => (
                  <GameCard
                    key={game._id}
                    id={game._id}
                    image={game.poster}
                    name={game.name}
                    price={game.price}
                    discount={game.discount}
                    scale={1.05}
                    isRemovable={true}
                    remove={removeGame}
                  />
                ))}
              />
            </div>
            <div className="basis-1/4">
              <Reciept games={games} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
