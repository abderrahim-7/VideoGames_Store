import { useEffect, useState } from "react";
import type { Game } from "../types/game";
import { useNavigate } from "react-router-dom";

interface Props {
  games: Game[];
}

const Reciept = ({ games }: Props) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const total = games.reduce((acc, game) => {
      const discount = game.discount ?? 0;
      return acc + game.price - (discount * game.price) / 100;
    }, 0);

    setTotal(total);
  }, [games]);

  return (
    <div
      className="flex flex-col
        my-5
        mr-10
        px-3
        pt-5
        pb-2
        border-neutral-800
        border
        rounded-lg"
    >
      <div className="flex justify-center mb-10 text-xl font-[Outfit] gap-1">
        <span className="text-[#FFD700]">Order</span>
        <span className="text-[#C0C0C0]">Summary</span>
      </div>
      {games.map((game) => (
        <>
          <div className="flex justify-between">
            <span className="font-bold font-[Outfit]">{game.name}</span>
            <span className="font-[Outfit]">{game.price + " $"}</span>
          </div>
          {game.discount && (
            <div className="flex justify-between">
              <span className="italic text-gray-400 font-[Outfit]">
                discount
              </span>
              <span className="italic text-gray-400 font-[Outfit]">
                {"- " +
                  (game.price - (game.discount * game.price) / 100).toFixed(2) +
                  " $"}
              </span>
            </div>
          )}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-dashed border-gray-400"></div>
          </div>
        </>
      ))}
      <div className="flex justify-between mb-5">
        <span className="font-bold font-[Outfit] text-lg">Total</span>
        <span className="font-[Outfit] text-[#FFD700] font-bold text-lg">
          {total.toFixed(2) + " $"}
        </span>
      </div>
      <button
        className="cursor-pointer rounded-md h-10 font-[outfit]  bg-[#ffc400] border-[#bfa200]  border-b-6 text-xl  hover:scale-105 transition-transform duration-300"
        onClick={() => navigate(`/buy?type=cart&amount=${total.toFixed(2)}`)}
      >
        Buy
      </button>
    </div>
  );
};

export default Reciept;
