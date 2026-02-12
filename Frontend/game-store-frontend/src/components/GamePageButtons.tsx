import AddBookmarkIcon from "@mui/icons-material/BookmarkAdd";
import RemoveBookmarkIcon from "@mui/icons-material/BookmarkRemove";
import { useOwnedGames } from "../context/OwnedGamesContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import {
  addToCart,
  addToWishlist,
  buyGame,
  removeFromWishlist,
} from "../api/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  gameId: string;
  gamePrice?: number;
}

const Install = () => {
  return (
    <button className="cursor-pointer rounded-xl h-16 font-[outfit]  bg-blue-600 border-blue-800  border-b-6 text-2xl  hover:scale-105 transition-transform duration-300">
      Install
    </button>
  );
};

const Buy = ({ gameId, gamePrice }: Props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() =>
        navigate(`/buy?type=game&id=${gameId}&amount=${gamePrice}`)
      }
      className="cursor-pointer rounded-xl h-12 font-[outfit]  bg-blue-600 border-blue-800  border-b-6 text-lg  hover:scale-105 transition-transform duration-300"
    >
      Buy
    </button>
  );
};

const AddToLibrary = ({ gameId }: Props) => {
  const { refreshOwned } = useOwnedGames();
  const { refreshWishlist } = useWishlist();
  return (
    <button
      onClick={async () => {
        try {
          await buyGame(gameId);
          refreshOwned();
          refreshWishlist();
          toast.success("Game added to library");
        } catch (err: any) {
          const status = err.response?.status;
          status === 401
            ? toast.error("This Action Require Authentification")
            : toast.error("Server Error");
        }
      }}
      className="cursor-pointer rounded-xl h-12 font-[outfit]  bg-blue-600 border-blue-800  border-b-6 text-lg  hover:scale-105 transition-transform duration-300"
    >
      Add To Library
    </button>
  );
};

const Cart = ({ gameId }: Props) => {
  const { inCart, refreshCart } = useCart();

  return inCart(gameId) ? (
    <button className="flex-4  bg-[#d2d2d2] border-[#bbbbbb] rounded-xl h-12 font-[outfit] text-black text-lg border-b-6 ">
      In Cart
    </button>
  ) : (
    <button
      onClick={async () => {
        try {
          await addToCart(gameId);
          await refreshCart();
        } catch (err: any) {
          const status = err.response?.status;
          status === 401
            ? toast.error("This Action Require Authentification")
            : toast.error("Server Error");
        }
      }}
      className="flex-4  bg-white border-[#d4d4d4] cursor-pointer rounded-xl h-12 font-[outfit] text-black text-lg border-b-6  hover:scale-105 transition-transform duration-300"
    >
      Add To Cart
    </button>
  );
};

const Wishlist = ({ gameId }: Props) => {
  const { isWished, refreshWishlist } = useWishlist();
  return isWished(gameId) ? (
    <div className="relative group flex-1">
      <button
        onClick={async () => {
          await removeFromWishlist(gameId);
          await refreshWishlist();
        }}
        className="w-full bg-[#9c9c9c] border-[#585858] cursor-pointer rounded-xl h-12 flex items-center justify-center border-b-6 hover:scale-105 transition-transform duration-300"
      >
        <RemoveBookmarkIcon className="w-6 h-6 text-white" />
      </button>
      <span className="absolute bottom-full font-[outfit] mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Remove from Wishlist
      </span>
    </div>
  ) : (
    <div className="relative group flex-1">
      <button
        onClick={async () => {
          try {
            await addToWishlist(gameId);
            await refreshWishlist();
          } catch (err: any) {
            const status = err.response?.status;
            status === 401
              ? toast.error("This Action Require Authentification")
              : toast.error("Server Error");
          }
        }}
        className="w-full bg-[#9c9c9c] border-[#585858] cursor-pointer rounded-xl h-12 flex items-center justify-center border-b-6 hover:scale-105 transition-transform duration-300"
      >
        <AddBookmarkIcon className="w-6 h-6 text-white" />
      </button>
      <span className="absolute bottom-full font-[outfit] mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Add to Wishlist
      </span>
    </div>
  );
};

const GamePageButtons = ({ gameId, gamePrice = 0 }: Props) => {
  const { isOwned } = useOwnedGames();
  return (
    <div className="flex flex-col w-1/2 my-5 gap-5">
      {isOwned(gameId) ? (
        <Install />
      ) : (
        <>
          {gamePrice === 0 ? (
            <AddToLibrary gameId={gameId} />
          ) : (
            <Buy gameId={gameId} gamePrice={gamePrice} />
          )}
          <div className="flex gap-2">
            {gamePrice !== 0 && <Cart gameId={gameId} />}
            <Wishlist gameId={gameId} />
          </div>
        </>
      )}
    </div>
  );
};

export default GamePageButtons;
