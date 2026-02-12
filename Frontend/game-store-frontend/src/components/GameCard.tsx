import { useNavigate } from "react-router-dom";
import { useOwnedGames } from "../context/OwnedGamesContext";

interface Props {
  id: string;
  image: string;
  name: string;
  price: number;
  discount?: number;
  scale?: number;
  isRemovable?: boolean;
  remove?: (gameId: string) => Promise<any>;
}

const GameCard = ({
  id,
  image,
  name,
  price,
  discount = 0,
  scale = 1,
  isRemovable = false,
  remove = async () => {},
}: Props) => {
  const newPrice = (price * (1 - discount / 100)).toFixed(2);
  const navigate = useNavigate();
  const { isOwned } = useOwnedGames();

  return (
    <div
      onClick={() => {
        navigate(`/games/${id}`);
      }}
      className="
        bg-neutral-900 
        rounded-lg 
        overflow-hidden 
        w-40 
        text-white 
        shadow-md 
        transition-all 
        duration-300 
        cursor-pointer 
        hover:scale-105 
        hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
      "
      style={{ transform: `scale(${scale})` }}
    >
      {/* Image */}
      <div className="relative w-full h-44">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
          loading="lazy"
        />

        {isRemovable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              remove(id);
            }}
            className="
                absolute top-2 right-2
                w-8 h-8 
                rounded-full 
                bg-black/60 
                backdrop-blur 
                flex items-center justify-center 
                border border-white/20 
                hover:bg-white/20 
                transition
                cursor-pointer
            "
          >
            <span className="text-[#FFD700] text-sm">✕</span>
          </button>
        )}

        {/* Discount badge */}
        {!isOwned(id) && discount > 0 && (
          <div className="absolute bottom-2 left-2 bg-blue-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
            -{discount}%
          </div>
        )}
      </div>

      {/* Game info */}
      <div className="flex flex-col px-2 py-1.5 space-y-0.5">
        <span className="text-[10px] text-gray-400">Base Game</span>
        <span className="text-xs font-semibold truncate">{name}</span>

        {/* Price section */}
        <div className="flex items-center space-x-1.5">
          {isOwned(id) ? (
            <span className="text-xs font-semibold text-neutral-400">
              Owned
            </span>
          ) : (
            discount !== 0 && (
              <span className="text-gray-500 line-through text-[10px]">
                ${price.toFixed(2)}
              </span>
            )
          )}
          {!isOwned(id) && (
            <span className="text-xs font-semibold text-white">
              {newPrice === "0.00" ? "Free" : `$${newPrice}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
