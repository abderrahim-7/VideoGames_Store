import type { PaymentMethod } from "../types/user";
import VISA from "../assets/visa.png";
import MasterCard from "../assets/mastercard.png";
import Chip from "../assets/chip.png";
import CreditCardBackground from "../assets/creditCard.webp";
import { removePaymentMehod } from "../api/user";
import toast from "react-hot-toast";

interface Props {
  PaymentMethode: PaymentMethod;
  setPaymentMethods?: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  removable?: boolean;
}

const CreditCard = ({
  PaymentMethode,
  setPaymentMethods = () => {},
  removable = true,
}: Props) => {
  return (
    <div
      className="flex flex-col relative shadow-[#FFD700] shadow-md border-t border-r border-[#FFD700] rounded-2xl w-xs"
      style={{
        backgroundImage: `url(${CreditCardBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {removable && (
        <button
          className="
                absolute -top-2 -right-2
                w-8 h-8 
                rounded-full 
                bg-black/60 
                backdrop-blur 
                flex items-center justify-center 
                border border-white/20 
                hover:bg-white/20 
                transition
                cursor-pointer
            "
          onClick={async () => {
            try {
              const res = await removePaymentMehod(PaymentMethode.cardNumber);
              toast.success(res.message);
              setPaymentMethods((prev) =>
                prev.filter((pm) => pm.cardNumber !== PaymentMethode.cardNumber)
              );
            } catch (err: any) {
              const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong";

              toast.error(errorMessage);
            }
          }}
        >
          <span className="text-[#FFD700] text-sm">✕</span>
        </button>
      )}
      <div className="flex justify-between items-center p-2 ">
        <img src={Chip} alt="" className="w-15 h-auto flex-none" />
        <img
          src={PaymentMethode.type === "VISA" ? VISA : MasterCard}
          alt=""
          className="w-20 h-auto flex-none"
        />
      </div>

      <div className="flex justify-center text-2xl mx-1 mt-3 mb-1">
        <span className="font-[Audiowide]">
          <span>**** **** **** </span>
          {PaymentMethode.cardNumber.slice(12)}
        </span>
      </div>
      <div className="mx-5">
        <span className="font-[Outfit] mr-10">{PaymentMethode.expiryDate}</span>
      </div>
      <span className="font-[Outfit] font-semibold ml-5 my-2">
        {PaymentMethode.holderName.toUpperCase()}
      </span>
    </div>
  );
};

export default CreditCard;
