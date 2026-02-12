import { createContext, useContext, useEffect, useState } from "react";
import { getOwnedGames } from "../api/user";
import type { Game } from "../types/game";

type OwnedGamesContextType = {
  ownedGames: Game[] | null;
  isOwned: (gameId: string) => boolean;
  refreshOwned: () => Promise<void>;
};

const OwnedGamesContext = createContext<OwnedGamesContextType>({
  ownedGames: null,
  isOwned: () => false,
  refreshOwned: async () => {},
});

export const OwnedGamesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ownedGames, setOwnedGames] = useState<Game[] | null>(null);

  const refreshOwned = async () => {
    const data = await getOwnedGames();
    setOwnedGames(data);
  };

  useEffect(() => {
    refreshOwned();
  }, []);

  const isOwned = (gameId: string) => {
    if (!ownedGames) return false;
    return ownedGames.some((g) => g._id === gameId);
  };

  return (
    <OwnedGamesContext.Provider value={{ ownedGames, isOwned, refreshOwned }}>
      {children}
    </OwnedGamesContext.Provider>
  );
};

export const useOwnedGames = () => useContext(OwnedGamesContext);
