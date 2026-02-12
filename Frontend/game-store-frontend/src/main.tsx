import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { OwnedGamesProvider } from "./context/OwnedGamesContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { WishlistProvider } from "./context/WishlistContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <WishlistProvider>
      <OwnedGamesProvider>
        <App />
      </OwnedGamesProvider>
    </WishlistProvider>
  </CartProvider>
);
