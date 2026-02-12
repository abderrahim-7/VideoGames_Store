import { useEffect, useState } from "react";
import { buyCart, buyGame, getPaymentMethods } from "../api/user";
import GridGames from "../components/GridGames";
import CreditCard from "../components/CreditCard";
import type { PaymentMethod } from "../types/user";
import NoPaymentMethodes from "../assets/noPaymenyMethod.png";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useOwnedGames } from "../context/OwnedGamesContext";

const BuyPage = () => {
  const [params] = useSearchParams();

  const buyType = params.get("type");
  const amount = params.get("amount");
  const id = params.get("id") || undefined;

  const navigate = useNavigate();
  const { refreshCart } = useCart();
  const { refreshWishlist } = useWishlist();
  const { refreshOwned } = useOwnedGames();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [selectedPM, setSelectedPM] = useState<PaymentMethod | null>();
  const [show, setShow] = useState(false);
  const [holderName, setHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    const fetchPM = async () => {
      const res = await getPaymentMethods();
      setPaymentMethods(res.paymentMethods);
    };
    fetchPM();
  }, []);

  const isValidHolderName = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length >= 2 && parts.every((p) => /^[A-Za-z]+$/.test(p));
  };

  const getCardType = (num: string) => {
    if (!/^\d{16}$/.test(num)) return undefined;

    if (num.startsWith("4")) return "VISA";

    const two = Number(num.slice(0, 2));
    const four = Number(num.slice(0, 4));

    if ((two >= 51 && two <= 55) || (four >= 2221 && four <= 2720)) {
      return "Mastercard";
    }

    return undefined;
  };

  const isValidExpiry = (exp: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);

  const handleBuy = async () => {
    let pm = selectedPM;
    const type = getCardType(cardNumber) as "VISA" | "Mastercard" | undefined;

    if (show) {
      const tempPM: PaymentMethod = {
        type,
        cardNumber,
        expiryDate,
        holderName,
        useSaved: false,
      };

      if (!isValidHolderName(holderName)) {
        toast.error("Holder name must include first and last name.");
        return;
      }

      if (!tempPM.type) {
        toast.error("Invalid card number.");
        return;
      }

      if (!isValidExpiry(expiryDate)) {
        toast.error("Invalid expiry date.");
        return;
      }

      pm = tempPM;
      setSelectedPM(tempPM);
    }

    if (!pm) {
      toast.error("Please select or enter a payment method.");
      return;
    }

    try {
      if (buyType === "game") {
        const res = await buyGame(id, pm);
        toast.success(res.message);
      } else {
        const res = await buyCart(pm);
        toast.success(res.message);
      }

      refreshCart();
      refreshWishlist();
      refreshOwned();
      navigate("/Library");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-5 justify-center pt-20 text-center">
      <h1 className="text-white text-5xl font-[Outfit]">
        Choose A Payment Method
      </h1>

      <h2 className="text-neutral-300 text-3xl font-[Outfit]">
        Amount To Pay : <span>{amount + " $"}</span>
      </h2>

      {paymentMethods.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-6 text-center text-neutral-500"
          style={{ fontFamily: "Outfit" }}
        >
          <img
            src={NoPaymentMethodes}
            alt="No payment method found"
            className="w-60 h-60 object-contain opacity-80 mb-4"
          />
          <div className="-mt-15">
            <h2 className="text-4xl font-semibold tracking-wide">
              No Payment Method Found
            </h2>
          </div>
        </div>
      ) : (
        <div className="overflow-x-hidden">
          <GridGames
            margin={false}
            padding={false}
            gap={1}
            minWidth={5}
            items={paymentMethods.map((pm) => (
              <div
                key={pm.cardNumber}
                onClick={() => {
                  if (pm === selectedPM) {
                    setSelectedPM(null);
                  } else {
                    setSelectedPM(pm);
                    setShow(false);
                  }
                }}
                className={` flex cursor-pointer rounded-lg scale-85 p-6 transition-all duration-300 ${
                  pm === selectedPM ? "bg-[#FFD700] " : "bg-neutral-800"
                }`}
              >
                <CreditCard PaymentMethode={pm} removable={false} />
              </div>
            ))}
          />
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleBuy}
          className={`rounded-3xl px-20 py-2 text-xl transition-colors duration-300 ${
            selectedPM || show
              ? "bg-[#FFD700] text-black  cursor-pointer hover:scale-105 transition-transform duration-100 border-[#d2b200] border-b-6"
              : "border border-neutral-500 text-neutral-500 py-2.5"
          }`}
        >
          Buy
        </button>
      </div>
      {!show && (
        <button
          className="text-sm text-neutral-500 underline cursor-pointer hover:text-neutral-200 transtition-color duration-150"
          onClick={() => {
            setSelectedPM(null);
            setShow(true);
          }}
        >
          Use another card
        </button>
      )}

      {show && (
        <>
          <div className="  flex flex-col gap-4 mx-5">
            <div className="relative border border-white rounded px-3 pt-4 pb-2 w-full">
              <span className="absolute bg-black -top-2 left-3 px-1 text-xs text-white font-[Outfit]">
                Holder Name
              </span>

              <div className="flex">
                <input
                  type={"text"}
                  onChange={(e) => setHolderName(e.target.value)}
                  value={holderName}
                  className={`w-full bg-transparent outline-none  text-white font-[Outfit]`}
                />
              </div>
            </div>

            <div className="relative border border-white rounded px-3 pt-4 pb-2 w-full">
              <span className="absolute bg-black -top-2 left-3 px-1 text-xs text-white font-[Outfit]">
                Card Number
              </span>

              <div className="flex">
                <input
                  type={"text"}
                  onChange={(e) => setCardNumber(e.target.value)}
                  value={cardNumber}
                  className={`w-full bg-transparent outline-none  text-white font-[Outfit]`}
                />
              </div>
            </div>

            <div className="relative border border-white rounded px-3 pt-4 pb-2 w-full">
              <span className="absolute bg-black -top-2 left-3 px-1 text-xs text-white font-[Outfit]">
                Expiry Date
              </span>

              <div className="flex">
                <input
                  type={"text"}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  value={expiryDate}
                  className={`w-full bg-transparent outline-none  text-white font-[Outfit]`}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setShow(false);
              setHolderName("");
              setCardNumber("");
              setExpiryDate("");
            }}
            className="text-sm mb-10 text-neutral-500 underline cursor-pointer hover:text-neutral-200 transtition-color duration-150"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default BuyPage;
