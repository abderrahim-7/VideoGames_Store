import { useState } from "react";

interface Props {
  text: string;
  limit?: number;
}

const Paragraphe = ({ text, limit = 300 }: Props) => {
  const [currentText, setCurrentText] = useState(text.slice(0, limit) + "...");
  const [label, setLabel] = useState("Show more");

  const changeSize = () => {
    if (label === "Show more") {
      setCurrentText(text);
      setLabel("Show less");
    } else {
      setCurrentText(text.slice(0, limit) + "...");
      setLabel("Show more");
    }
  };

  return text.slice(0, limit) === text ? (
    <p className="font-[outfit] text-neutral-300 text-[1.05rem]">{text}</p>
  ) : (
    <p className="font-[outfit] text-neutral-300 text-[1.05rem]">
      {currentText}{" "}
      {
        <span
          className="italic cursor-pointer hover:text-white underline"
          onClick={changeSize}
        >
          {label}
        </span>
      }
    </p>
  );
};

export default Paragraphe;
