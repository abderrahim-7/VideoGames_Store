import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../api/user";
import type { Game } from "../types/game";

type CartContextType = {
  cart: Game[] | null;
  inCart: (gameId: string) => boolean;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cart: null,
  inCart: () => false,
  refreshCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Game[] | null>(null);

  const refreshCart = async () => {
    const data = await getCart();
    setCart(data);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const inCart = (gameId: string) => {
    if (!cart) return false;
    return cart.some((g) => g._id === gameId);
  };

  return (
    <CartContext.Provider value={{ cart, inCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
