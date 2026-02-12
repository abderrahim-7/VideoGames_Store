import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim();
      if (value.length >= 3) {
        navigate(`/search?name=${encodeURIComponent(value)}`);
        setShowAlert(false);
      } else {
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="relative w-2xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search games..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
          w-full
          bg-neutral-900
          text-[#C0C0C0]
          text-xl
          rounded-full
          pl-10
          pr-10
          py-2
          border
          border-neutral-700
          focus:outline-none
          focus:border-[#FFD700]
          focus:ring-1
          focus:ring-[#f3d947]
          placeholder-gray-500
          transition-all
          duration-300
        "
        style={{
          fontFamily: "Outfit",
          WebkitAppearance: "none",
        }}
      />

      <style>
        {`
          input[type="search"]::-webkit-search-decoration,
          input[type="search"]::-webkit-search-cancel-button,
          input[type="search"]::-webkit-search-results-button,
          input[type="search"]::-webkit-search-results-decoration {
            display: none;
          }
        `}
      </style>

      {value && (
        <button
          onClick={() => {
            setValue("");
            navigate("/");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FFD700] transition"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      {showAlert && (
        <div className="absolute top-full mt-2 w-full  text-[#FFD700] text-sm rounded-md pl-2">
          Please enter at least 3 characters to search.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
