import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../api/games";
import type { Game } from "../types/game";
import RatingStars from "../components/RatingStars";
import Paragraphe from "../components/Paragraphe";
import GamePageButtons from "../components/GamePageButtons";

const GamePage = () => {
  const Params = useParams();
  const id = Params.id;

  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (id) {
        const data = await getGameById(id);
        setGame(data);
      }
    };
    fetchGame();
  }, []);

  return (
    <div className="flex flex-col">
      {game === null ? (
        <h1>Game Not Found</h1>
      ) : (
        <div className="flex flex-col gap-10 py-10 px-20">
          <div className="flex gap-10">
            <div className="w-7/15 h-130 border-neutral-700 border-1 rounded-2xl ">
              <img
                src={game.poster}
                alt="poster"
                className="h-full rounded-2xl"
              />
            </div>
            <div className="flex flex-col w-8/15">
              <span className="font-bold font-[outfit] text-4xl text-white mb-10">
                {game.name.toUpperCase()}
              </span>
              <div className="space-y-6 text-gray-100">
                <p className="font-[outfit] text-xl">
                  <strong className="text-white">Genres:</strong>{" "}
                  <span className="capitalize italic">
                    {game.genres.join(", ")}
                  </span>
                </p>

                <p className="font-[outfit] text-xl">
                  <strong className="text-white">Publisher:</strong>{" "}
                  <span className="capitalize italic">{game.publisher}</span>
                </p>

                <p className="font-[outfit] text-xl">
                  <strong className="text-white">Release Date:</strong>{" "}
                  <span className="italic">
                    {new Date(game.release_date).toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>

                <p className="font-[outfit] text-xl flex gap-3">
                  <strong className="text-white">Rating:</strong>{" "}
                  <RatingStars rating={game.rating} />
                </p>

                <p className="font-[outfit] text-xl">
                  <strong className="text-white">Price:</strong>{" "}
                  <span className="italic">
                    {game.price === 0 ? "Free" : game.price + "$"}
                  </span>
                </p>
              </div>
              <GamePageButtons gameId={game._id} gamePrice={game.price} />
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <strong className="text-white font-[outfit] text-2xl">
              Description
            </strong>
            <Paragraphe text={game.description} />
          </div>

          <div className="flex flex-col gap-y-2">
            <strong className="text-white font-[outfit] text-2xl">
              System requirements
            </strong>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-700 rounded-lg text-gray-300 text-sm sm:text-base">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">
                      Component
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Minimum requirements
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Recommended requirements
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-700 hover:bg-gray-900 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">OS</td>
                    <td className="px-4 py-3">
                      {game.min_requirement?.os || ""}
                    </td>
                    <td className="px-4 py-3">
                      {game.recommended_requirement?.os || ""}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-700 hover:bg-gray-900 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">CPU</td>
                    <td className="px-4 py-3">
                      {game.min_requirement?.cpu || ""}
                    </td>
                    <td className="px-4 py-3">
                      {game.recommended_requirement?.cpu || ""}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-700 hover:bg-gray-900 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">GPU</td>
                    <td className="px-4 py-3">
                      {game.min_requirement?.gpu || ""}
                    </td>
                    <td className="px-4 py-3">
                      {game.recommended_requirement?.gpu || ""}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-700 hover:bg-gray-900 transition-colors">
                    <td className="px-4 py-3 font-medium text-white">
                      Storage
                    </td>
                    <td className="px-4 py-3">
                      {game.min_requirement?.storage || ""}
                    </td>
                    <td className="px-4 py-3">
                      {game.recommended_requirement?.storage || ""}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
