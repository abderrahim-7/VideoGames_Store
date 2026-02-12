import { useState } from "react";
import backgroundImage from "../assets/background.png";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../api/auth";
import Sparkles from "../components/Sparkles";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors = { username: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (formData.username.trim().length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const res = await signUp(
          formData.username,
          formData.email,
          formData.password
        );

        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId);

        navigate("/");
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Something went wrong.";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={backgroundImage}
        alt="background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Sparkles */}
      <Sparkles />

      {/* Alert */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50"></div>

      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="p-8 shadow-lg max-w-md w-full">
          {/* Title */}
          <h2
            className="text-3xl mb-10 text-center bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-shine"
            style={{ fontFamily: "Outfit" }}
          >
            Create an Account
          </h2>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-[#9a9a9a]"
                style={{ fontFamily: "Outfit" }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-transparent text-white border border-gray-600 rounded-md outline-none transition duration-300
                  hover:ring-2 hover:ring-neutral-500 hover:backdrop-blur-xs
                  focus:ring-2 focus:ring-neutral-500 focus:backdrop-blur-xs"
                placeholder="username"
                required
              />
              {errors.username && (
                <p className="text-yellow-400 text-xs mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
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
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-transparent text-white border border-gray-600 rounded-md outline-none transition duration-300
                  hover:ring-2 hover:ring-neutral-500 hover:backdrop-blur-xs
                  focus:ring-2 focus:ring-neutral-500 focus:backdrop-blur-xs"
                placeholder="email"
                required
              />
            </div>

            {/* Password */}
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
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-transparent text-white border border-gray-600 rounded-md outline-none transition duration-300
                  hover:ring-2 hover:ring-neutral-500 hover:backdrop-blur-xs
                  focus:ring-2 focus:ring-neutral-500 focus:backdrop-blur-xs"
                placeholder="password"
                required
              />
              {errors.password && (
                <p className="text-yellow-400 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-[#9a9a9a]"
                style={{ fontFamily: "Outfit" }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 bg-transparent text-white border border-gray-600 rounded-md outline-none transition duration-300
                  hover:ring-2 hover:ring-neutral-500 hover:backdrop-blur-xs
                  focus:ring-2 focus:ring-neutral-500 focus:backdrop-blur-xs"
                placeholder="confirm password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-yellow-400 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-5 cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-md py-2 transition duration-300 shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.8)]"
              style={{ fontFamily: "Outfit" }}
            >
              Sign Up
            </button>
          </form>

          {/* Link to Login */}
          <Link to="/login">
            <p
              className="mt-6 text-center text-sm text-[#9a9a9a]"
              style={{ fontFamily: "Outfit" }}
            >
              Already have an account?{" "}
              <span className="text-yellow-400 hover:underline cursor-pointer">
                Log In
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
