import GameCard from "../components/GameCard";
import GridGames from "../components/GridGames";
import { useOwnedGames } from "../context/OwnedGamesContext";
import empty from "../assets/controller.png";

const Library = () => {
  const { ownedGames } = useOwnedGames();

  if (!ownedGames)
    return (
      <div className="flex justify-center font-[Outfit] text-4xl py-20">
        Loading...
      </div>
    );

  return (
    <div>
      {ownedGames.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-6 text-center text-neutral-500"
          style={{ fontFamily: "Outfit" }}
        >
          <video
            src={empty}
            autoPlay
            loop
            className="w-200 h-100 object-contain opacity-40 mb-4 "
          />
          <div className="-mt-15">
            <h2 className="text-4xl font-semibold tracking-wide">
              No Games Owned
            </h2>
            <p className="text-lg text-neutral-400 mb-9 mt-1">
              Add your favorite games to your library and enjoy them now !
            </p>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl pt-5 ml-10">
            <span className="text-[#FFD700]" style={{ fontFamily: "Outfit" }}>
              Your
            </span>{" "}
            <span className="text-[#C0C0C0]" style={{ fontFamily: "Outfit" }}>
              Games
            </span>
          </h1>
          <GridGames
            items={ownedGames.map((game) => (
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
        </>
      )}
    </div>
  );
};

export default Library;
