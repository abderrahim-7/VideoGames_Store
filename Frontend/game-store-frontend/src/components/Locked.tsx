import lock from "../assets/lock.png";

interface Props {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
}

const Locked = ({
  close,
  message = "You need to login to see this page",
}: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/40 z-10">
      <div className="relative bg-black/90 border-neutral-600 border-2 rounded-2xl shadow-xl flex flex-col justify-center w-1/4 h-1/2 text-center">
        {/* Close button */}
        <button
          onClick={() => close(true)}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold transition"
        >
          ×
        </button>

        {/* Lock image */}
        <img
          src={lock}
          alt="locked"
          className="w-1/3 h-2/5 mx-auto mb-6 opacity-90"
        />

        {/* Message */}
        <span className="text-lg font-medium text-neutral-400 font-[Outfit]">
          {message}
        </span>
      </div>
    </div>
  );
};

export default Locked;
