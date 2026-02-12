import { getHighlyRated, getOnSales, getNewReleases } from "../api/games";
import ListGames from "../components/ListGames";
import { useGamesList } from "../Hooks/useGameList";
import decoration from "../assets/decoration.png";

const DefaultHome = () => {
  const highlyRated = useGamesList(getHighlyRated);
  const onSale = useGamesList(getOnSales);
  const newReleases = useGamesList(getNewReleases);

  return (
    <div className="flex flex-col gap-6 py-6">
      <img src={decoration} alt="" className="h-auto w-[500px] mx-auto" />

      <h1 className="text-4xl px-6 ml-4">
        <span className="text-[#FFD700]" style={{ fontFamily: "Outfit" }}>
          Highly
        </span>{" "}
        <span className="text-[#C0C0C0]" style={{ fontFamily: "Outfit" }}>
          Rated
        </span>
      </h1>

      <ListGames
        list={highlyRated.games}
        setPage={highlyRated.setPage}
        loading={highlyRated.loading}
        hasMore={highlyRated.hasMore}
      />

      <img src={decoration} alt="" className="h-auto w-[500px] mx-auto" />

      <h1 className="text-4xl px-6 ml-4">
        <span className="text-[#FFD700]" style={{ fontFamily: "Outfit" }}>
          Time-limited
        </span>{" "}
        <span className="text-[#C0C0C0]" style={{ fontFamily: "Outfit" }}>
          Sales
        </span>
      </h1>
      <ListGames
        list={onSale.games}
        setPage={onSale.setPage}
        loading={onSale.loading}
        hasMore={onSale.hasMore}
      />

      <img src={decoration} alt="" className="h-auto w-[500px] mx-auto" />

      <h1 className="text-4xl px-6 ml-4">
        <span className="text-[#FFD700]" style={{ fontFamily: "Outfit" }}>
          New
        </span>{" "}
        <span className="text-[#C0C0C0]" style={{ fontFamily: "Outfit" }}>
          Releases
        </span>
      </h1>
      <ListGames
        list={newReleases.games}
        setPage={newReleases.setPage}
        loading={newReleases.loading}
        hasMore={newReleases.hasMore}
      />

      <img src={decoration} alt="" className="h-auto w-[500px] mx-auto" />
    </div>
  );
};

export default DefaultHome;
