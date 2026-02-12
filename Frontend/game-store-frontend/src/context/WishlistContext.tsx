import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist } from "../api/user";
import type { Game } from "../types/game";

type WishlistContextType = {
  wishlist: Game[] | null;
  isWished: (gameId: string) => boolean;
  refreshWishlist: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlist: null,
  isWished: () => false,
  refreshWishlist: async () => {},
});

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, setWishlist] = useState<Game[] | null>(null);

  const refreshWishlist = async () => {
    const data = await getWishlist();
    setWishlist(data);
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  const isWished = (gameId: string) => {
    if (!wishlist) return false;
    return wishlist.some((g) => g._id === gameId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, isWished, refreshWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
