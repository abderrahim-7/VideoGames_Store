import { useState } from "react";
import { login } from "../api/auth";
import backgroundImage from "../assets/background.png";
import { Link, useNavigate } from "react-router-dom";
import Sparkles from "../components/Sparkles";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.userId);

      navigate("/");
    } catch (err: any) {
      const status = err.response?.status;
      const errorMessage =
        err.response?.data?.message ||
        (status === 401
          ? "Invalid email or password"
          : "Something went wrong, please try again");

      toast.error(errorMessage);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src={backgroundImage}
        alt="background"
        className="absolute inset-0 h-full w-full object-cover "
      />
      <Sparkles />
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="  p-8  shadow-lg max-w-md w-full">
            <h2
              className="text-3xl mb-10 text-center bg-gradient-to-r from-yellow-400 via-amber-600 to-yellow-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-shine"
              style={{ fontFamily: "Outfit" }}
            >
              Login to Your Account
            </h2>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-[#9a9a9a]"
                  style={{ fontFamily: "Outfit" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 w-full px-3 py-2 bg-transparent text-white border border-gray-600 rounded-md outline-none transition duration-300
           hover:ring-2 hover:ring-neutral-500 hover:backdrop-blur-xs
           focus:ring-2 focus:ring-neutral-500 focus:backdrop-blur-xs"
                  style={{ fontFamily: "Outfit" }}
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm text-[#9a9a9a]"
                  style={{ fontFamily: "Outfit" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 w-full px-3 py-2 bg-transparent text-white border border-gray-600 rounded-md outline-none transition duration-300
           hover:ring-2 hover:ring-neutral-500 hover:backdrop-blur-xs
           focus:ring-2 focus:ring-neutral-500 focus:backdrop-blur-xs"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="text-sm text-yellow-400 hover:underline cursor-pointer"
                  style={{ fontFamily: "Outfit" }}
                >
                  Forgot your password?
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-5 cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-md py-2 transition duration-300 shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)]"
                style={{ fontFamily: "Outfit" }}
              >
                Login
              </button>
            </form>
            <Link to="/register">
              <p
                className="mt-6 text-center text-sm text-[#9a9a9a]"
                style={{ fontFamily: "Outfit" }}
              >
                Don't have an account?{" "}
                <span className="text-yellow-400 hover:underline cursor-pointer">
                  Sign Up
                </span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
