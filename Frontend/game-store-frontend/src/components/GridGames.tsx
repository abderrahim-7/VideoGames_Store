import type { ReactNode } from "react";

interface Props {
  items: ReactNode[];
  margin?: boolean;
  padding?: boolean;
  gap?: number;
  minWidth?: number;
}

const GridGames = ({
  items,
  margin = true,
  minWidth = 12,
  padding = true,
  gap = 5,
}: Props) => {
  return (
    <div
      className={`
        grid
        gap-${gap}
        ${padding && "p-6 pt-5"}
        ${margin ? "mx-10 my-5" : ""}
        
        place-items-center
        border-neutral-800
        border
        rounded-lg
      `}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}rem, 1fr))`,
      }}
    >
      {items.map((item, index) => (
        <div key={index} className="w-full h-full flex justify-center">
          {item}
        </div>
      ))}
    </div>
  );
};

export default GridGames;
