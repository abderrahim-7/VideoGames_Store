import { useEffect, useState, type HtmlHTMLAttributes } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmeIcon from "@mui/icons-material/Save";
import ShowIcon from "@mui/icons-material/RemoveRedEye";
import HideIcon from "@mui/icons-material/VisibilityOff";
import type { PaymentMethod } from "../types/user";
import CreditCard from "../components/CreditCard";
import GridGames from "../components/GridGames";
import {
  getUser,
  changeName,
  changeEmail,
  changePassword,
  getPaymentMethods,
  addPaymentMethod,
  removeFromWishlist,
} from "../api/user";

import toast from "react-hot-toast";
import NoPaymentMethodes from "../assets/noPaymenyMethod.png";
import EmptyWishList from "../assets/wishlist.png";
import { useWishlist } from "../context/WishlistContext";
import type { Game } from "../types/game";
import GameCard from "../components/GameCard";

interface ProfileImageProps {
  username: string;
  email: string;
}

const ProfileImage = ({ username, email }: ProfileImageProps) => {
  return (
    <div className="flex gap-10">
      <div className="rounded-full bg-gray-300 h-30 w-30 text-2xl justify-center align-middle"></div>
      <div className="flex flex-col justify-center">
        <span className="text-4xl font-[Outfit] text-[#FFD700]">
          {username}
        </span>
        <span className="text-2xl font-[Outfit] text-[#C0C0C0]">{email}</span>
      </div>
    </div>
  );
};

interface InputProps {
  label: string;
  value: string;
  onChangeValue: (v: string) => void;
  onSave: (v: string) => Promise<any>;
}

const Input = ({ label, value, onChangeValue, onSave }: InputProps) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await onSave(value);

      toast.success(res.message);
      setEditing(false);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative border border-white rounded px-3 pt-4 pb-2 w-full">
      <span className="absolute bg-black -top-2 left-3 px-1 text-xs text-white font-[Outfit]">
        {label}
      </span>

      <div className="flex">
        <input
          type={"text"}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
          disabled={!editing}
          className={`w-full bg-transparent outline-none ${
            !editing ? "text-neutral-400" : "text-white"
          } font-[Outfit]`}
        />

        <button
          className="cursor-pointer"
          onClick={() => (editing ? handleSave() : setEditing(true))}
          disabled={loading}
        >
          {editing ? (
            <ConfirmeIcon fontSize="small" />
          ) : (
            <EditIcon fontSize="small" className="text-neutral-400" />
          )}
        </button>
      </div>
    </div>
  );
};

const PasswordField = ({
  label,
  value,
  onChangeValue,
}: {
  label: string;
  value: string;
  onChangeValue: (v: string) => void;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-neutral-300 font-[Outfit]">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className="w-full bg-black border font-[Outfit] border-neutral-500 rounded px-3 py-2 text-white"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
        >
          {show ? <HideIcon fontSize="small" /> : <ShowIcon fontSize="small" />}
        </button>
      </div>
    </div>
  );
};

const PasswordEditor = ({
  oldPassword,
  newPassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  onCancel,
}: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  setOldPassword: (v: string) => void;
  setNewPassword: (v: string) => void;
  setConfirmPassword: (v: string) => void;
  onCancel: () => void;
}) => {
  return (
    <div className="border border-white rounded p-4 flex flex-col gap-4 mt-2">
      <PasswordField
        label="Old Password"
        value={oldPassword}
        onChangeValue={setOldPassword}
      />
      <PasswordField
        label="New Password"
        value={newPassword}
        onChangeValue={setNewPassword}
      />
      <PasswordField
        label="Confirm Password"
        value={confirmPassword}
        onChangeValue={setConfirmPassword}
      />

      <div className="flex gap-4">
        <button
          className="px-4 py-2 cursor-pointer bg-yellow-400 text-black rounded font-[Outfit]"
          onClick={async () => {
            if (newPassword !== confirmPassword) {
              toast.error("Passwords do not match");
              return;
            }

            if (newPassword.length < 8) {
              toast.error("Password should be at least 8 characters");
              return;
            }

            try {
              const res = await changePassword(oldPassword, newPassword);
              toast.success(res.message);
              onCancel();
            } catch (err: any) {
              const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong";

              toast.error(errorMessage);
            }
          }}
        >
          Save
        </button>

        <button
          className="px-4 py-2 border cursor-pointer border-neutral-500 rounded text-neutral-300 font-[Outfit]"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
}

const PaymentMethods = ({
  paymentMethods,
  setPaymentMethods,
}: PaymentMethodsProps) => {
  const [show, setShow] = useState(false);
  const [holderName, setHoldeName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const isValidHolderName = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length >= 2 && parts.every((p) => /^[A-Za-z]+$/.test(p));
  };

  const getCardType = (num: string) => {
    if (!/^\d{16}$/.test(num)) return null;

    if (num.startsWith("4")) return "VISA";

    const two = Number(num.slice(0, 2));
    const four = Number(num.slice(0, 4));

    if ((two >= 51 && two <= 55) || (four >= 2221 && four <= 2720)) {
      return "Mastercard";
    }

    return null;
  };

  const isValidExpiry = (exp: string) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);

  const handleSave = async () => {
    if (!isValidHolderName(holderName)) {
      toast.error("Holder name must include first and last name.");
      return;
    }

    const cardType = getCardType(cardNumber);

    if (!cardType) {
      toast.error(
        "Invalid card number. Must be a valid VISA or Mastercard (16 digits)."
      );
      return;
    }

    if (!isValidExpiry(expiryDate)) {
      toast.error("Expiry date must be in MM/YY format.");
      return;
    }

    try {
      const res = await addPaymentMethod(
        cardType,
        cardNumber,
        expiryDate,
        holderName
      );

      toast.success(res.message);

      setPaymentMethods((prev) => [
        ...prev,
        {
          type: cardType,
          cardNumber,
          expiryDate,
          holderName,
        },
      ]);
      setShow(false);
      setHoldeName("");
      setCardNumber("");
      setExpiryDate("");
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Something went wrong";

      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-5">
        <span className="text-[#FFD700] font-[Outfit]">Payment</span>{" "}
        <span className="text-[#C0C0C0] font-[Outfit]">Methods</span>
      </h1>
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
            <p className="text-lg text-neutral-400 mb-9 mt-1">
              Save your payment methods now and use them esealy !
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl mb-5">
            <span className="text-[#FFD700] font-[Outfit]">Payment</span>{" "}
            <span className="text-[#C0C0C0] font-[Outfit]">Methods</span>
          </h1>

          <GridGames
            margin={false}
            minWidth={20}
            items={paymentMethods.map((pm) => (
              <CreditCard
                key={pm.cardNumber}
                PaymentMethode={pm}
                setPaymentMethods={setPaymentMethods}
              />
            ))}
          />
        </div>
      )}

      {!show && (
        <div className="flex  mt-3">
          <button
            onClick={() => setShow(true)}
            className="px-4 py-2 w-full border cursor-pointer border-neutral-500 mt-4 rounded text-neutral-300 font-[Outfit]"
          >
            Add Payment Method
          </button>
        </div>
      )}

      {show && (
        <>
          <div className="  flex flex-col gap-4 my-3">
            <div className="relative border border-white rounded px-3 pt-4 pb-2 w-full">
              <span className="absolute bg-black -top-2 left-3 px-1 text-xs text-white font-[Outfit]">
                Holder Name
              </span>

              <div className="flex">
                <input
                  type={"text"}
                  onChange={(e) => setHoldeName(e.target.value)}
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

          <div className="flex justify-start gap-2">
            <button
              className="px-4 py-2 bg-[#FFD700] text-black rounded font-[Outfit] cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              onClick={() => {
                setShow(false);
                setHoldeName("");
                setCardNumber("");
                setExpiryDate("");
              }}
              className="px-4 py-2 border border-neutral-500 rounded text-neutral-300 font-[Outfit] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Wishlist = () => {
  const { wishlist, refreshWishlist } = useWishlist();
  const [games, setGames] = useState<Game[] | null>([]);

  useEffect(() => {
    setGames(wishlist);
  }, [wishlist]);

  const removeGame = async (id: string) => {
    await removeFromWishlist(id);
    await refreshWishlist();
  };

  if (!games)
    return (
      <div className="flex justify-center font-[Outfit] text-4xl py-20">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col ">
      <h1 className="text-4xl mb-5">
        <span className="text-[#FFD700] font-[Outfit]">Wish</span>
        <span className="text-[#C0C0C0] font-[Outfit]">List</span>
      </h1>

      {games.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center  text-center text-neutral-500"
          style={{ fontFamily: "Outfit" }}
        >
          <img
            src={EmptyWishList}
            alt="No games found"
            className="w-80 h-80 object-contain opacity-80 mb-4"
          />
          <div className="-mt-15">
            <h2 className="text-4xl font-semibold tracking-wide">
              Your Wishlist Is Empty
            </h2>
            <p className="text-lg text-neutral-400 mb-9 mt-1">
              Add games that you like and start dreaming !
            </p>
          </div>
        </div>
      ) : (
        <GridGames
          margin={false}
          items={games.map((game) => (
            <GameCard
              key={game._id}
              id={game._id}
              image={game.poster}
              name={game.name}
              price={game.price}
              discount={game.discount}
              scale={1.05}
              isRemovable={true}
              remove={removeGame}
            />
          ))}
        />
      )}
    </div>
  );
};

// ===============================================
// MAIN PROFILE PAGE
// ===============================================

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [showPasswordEditor, setShowPasswordEditor] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUser({ username: data.username, email: data.email });
    };
    const fetchPaymentMethodes = async () => {
      try {
        const data = await getPaymentMethods();
        setPaymentMethods(data.paymentMethods);
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";

        toast.error(errorMessage);
      }
    };
    fetchUser();
    fetchPaymentMethodes();
  }, []);

  return (
    <div className="flex flex-col mx-10 my-10 border-neutral-700 border-1 rounded-2xl p-10 gap-10">
      <ProfileImage username={user.username} email={user.email} />

      <div className="flex flex-col gap-3">
        <h1 className="text-4xl mb-5">
          <span className="text-[#FFD700] font-[Outfit]">Personal</span>{" "}
          <span className="text-[#C0C0C0] font-[Outfit]">Infos</span>
        </h1>

        <Input
          label="Username"
          value={user.username}
          onChangeValue={(v) => setUser({ ...user, username: v })}
          onSave={changeName}
        />

        <Input
          label="Email"
          value={user.email}
          onChangeValue={(v) => setUser({ ...user, email: v })}
          onSave={changeEmail}
        />

        <button
          className="px-4 py-2 border cursor-pointer border-neutral-500 mt-4 rounded text-neutral-300 font-[Outfit]"
          onClick={() => setShowPasswordEditor(!showPasswordEditor)}
        >
          Change Password
        </button>

        {showPasswordEditor && (
          <PasswordEditor
            oldPassword={oldPassword}
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            setOldPassword={setOldPassword}
            setNewPassword={setNewPassword}
            setConfirmPassword={setConfirmPassword}
            onCancel={() => {
              setShowPasswordEditor(false);
              setOldPassword("");
              setNewPassword("");
              setConfirmPassword("");
            }}
          />
        )}
      </div>

      <PaymentMethods
        paymentMethods={paymentMethods}
        setPaymentMethods={setPaymentMethods}
      />

      <Wishlist />
    </div>
  );
};

export default Profile;
