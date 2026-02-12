import { useEffect, useState, type JSX } from "react";

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.random() * 100; // random horizontal position
      const size = Math.random() * 3 + 2; // random size 2–5px
      const duration = Math.random() * 2 + 2; // 2–4s rise time
      const delay = Math.random() * 2; // delay for staggered timing

      const sparkle = (
        <span
          key={Math.random()}
          className="sparkle"
          style={{
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );

      setSparkles((prev) => [...prev.slice(-30), sparkle]); // keep last 30
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles}
    </div>
  );
}
