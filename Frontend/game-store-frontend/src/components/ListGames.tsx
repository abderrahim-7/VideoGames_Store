import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/ListGames.css";
import { Navigation } from "swiper/modules";
import GameCard from "../components/GameCard";
import type { Game } from "../types/game";

interface Props {
  list: Game[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  hasMore: boolean;
}
const ListGames = ({ list, setPage, loading, hasMore }: Props) => {
  let canLoad = true;
  return (
    <div className="px-6 mb-4">
      {list.length === 0 ? (
        <h1
          style={{ fontFamily: "Outfit" }}
          className="text-5xl pl-3 text-gray-500"
        >
          No games found
        </h1>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView="auto"
          onReachEnd={() => {
            if (canLoad && !loading && hasMore) {
              canLoad = false;
              setTimeout(() => (canLoad = true), 800);
              setPage((p) => p + 1);
            }
          }}
          className="mySwiper"
          style={{
            padding: "1rem 0",
          }}
          breakpoints={{
            320: { slidesPerView: 2.2 },
            480: { slidesPerView: 3.2 },
            768: { slidesPerView: 4.2 },
            1024: { slidesPerView: 5.2 },
            1280: { slidesPerView: 6.2 },
          }}
        >
          {list.map((game) => (
            <SwiperSlide
              key={game._id}
              style={{
                width: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GameCard
                id={game._id}
                image={game.poster}
                name={game.name}
                price={game.price}
                discount={game.discount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ListGames;
