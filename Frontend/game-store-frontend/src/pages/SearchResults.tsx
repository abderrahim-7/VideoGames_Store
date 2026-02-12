import { useEffect, useState } from "react";
import { getGameByName } from "../api/games";
import type { Game } from "../types/game";
import { useSearchParams } from "react-router-dom";
import notFoundImg from "../assets/controller.png";
import GridGames from "../components/GridGames";
import GameCard from "../components/GameCard";

const SearchResults = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    const fetchData = async () => {
      if (name) {
        const data = await getGameByName(name);
        setGames(data);
      }
    };
    fetchData();
  }, [name]);

  return (
    <div>
      {games.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-6 text-center text-neutral-500"
          style={{ fontFamily: "Outfit" }}
        >
          <img
            src={notFoundImg}
            alt="No games found"
            className="w-60 h-60 object-contain opacity-80"
          />
          <div className="-mt-15">
            <h2 className="text-4xl font-semibold tracking-wide">
              No Games Found
            </h2>
            <p className="text-lg text-neutral-400 mb-9 mt-1">
              Try searching for something else or check back later.
            </p>
          </div>
        </div>
      ) : (
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
            />
          ))}
        />
      )}
    </div>
  );
};

export default SearchResults;
