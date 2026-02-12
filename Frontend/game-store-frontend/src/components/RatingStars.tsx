import { FaStar } from "react-icons/fa";

interface Props {
  rating: number;
}

const RatingStars = ({ rating }: Props) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const diff = rating - (i - 1);
    let fill = 0;

    if (diff >= 1) fill = 100;
    else if (diff > 0) fill = diff * 100;
    else fill = 0;

    stars.push(
      <div key={i} className="relative w-6 h-6">
        <FaStar className="absolute top-0 left-0 text-gray-400 w-6 h-6" />
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fill - 5}%` }}
        >
          <FaStar className="text-yellow-400 w-6 h-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      <span className="ml-2 font-[outfit] text-xl italic text-gray-300">
        ({rating.toFixed(2)})
      </span>
    </div>
  );
};

export default RatingStars;
