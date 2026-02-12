import { useState, useEffect } from "react";
import type { Game } from "../types/game";

export function useGamesList(
  fnc: (page: number, limit: number) => Promise<{ games: Game[] }>
) {
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await fnc(page, 10);
        if (data.games.length === 0) setHasMore(false);
        setGames((prev) => [...prev, ...data.games]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [page]);

  return { games, setPage, loading, hasMore };
}
