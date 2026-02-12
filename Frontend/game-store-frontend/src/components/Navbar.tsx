import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface Props {
  items: NavItem[];
  logo: string;
}

const Navbar = ({ items, logo }: Props) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="relative bg-black text-white px-6 py-3 flex items-center justify-between before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-[#FFD700] before:to-[#C0C0C0]">
      {/* Logo */}
      <div className="flex items-center z-50">
        <img src={logo} alt="Logo" className="w-12 object-contain -mt-1" />
        <span
          className="text-[#FFD700] text-2xl pr-0.5"
          style={{ fontFamily: "Outfit" }}
        >
          ROLL
        </span>
        <span
          className="text-[#C0C0C0] text-2xl"
          style={{ fontFamily: "Outfit" }}
        >
          &PLAY
        </span>
      </div>

      {/* Desktop Nav Items */}
      <div className="hidden md:flex gap-6 items-center">
        {items.map((item) => {
          const isActive = item.href === currentPath;
          return (
            <a
              key={item.label}
              onClick={() => navigate(item.href)}
              className={`flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "text-[#FFD700] hover:text-[#daba07]"
                  : "hover:text-gray-400 text-gray-300"
              }`}
            >
              <item.Icon className="w-5 h-5" />
              <span style={{ fontFamily: "Roboto" }} className="text-md">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Desktop Actions */}
      {localStorage.getItem("token") ? (
        <div className="hidden md:flex items-center gap-2">
          <a
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              navigate("/", { replace: true });
            }}
          >
            <button
              className="
    relative inline-block px-3 py-0.5 mx-8 rounded-md cursor-pointer
    text-gray-300 bg-black 
     hover:text-[#FFD700]
    transition-all duration-300
  "
            >
              Logout
            </button>
          </a>
        </div>
      ) : (
        <div className="hidden md:flex items-center gap-2">
          <a onClick={() => navigate("/login")}>
            <button
              className="
              relative inline-block text-[#FFD700] px-3 py-0.5 rounded-md cursor-pointer 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 
              after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300 
              hover:after:w-full
            "
            >
              Login
            </button>
          </a>
          <a onClick={() => navigate("/register")}>
            <button
              className="
              relative inline-block text-[#C0C0C0] px-2 py-0.5 rounded-md cursor-pointer 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 
              after:h-[2px] after:bg-[#C0C0C0] after:transition-all after:duration-300 
              hover:after:w-full
            "
            >
              Sign Up
            </button>
          </a>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-50 text-[#FFD700] focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-0 left-0 w-full bg-black flex flex-col items-center gap-6 pt-20 pb-8 transform transition-transform duration-300 md:hidden z-40  ${
          isOpen ? "translate-y-0 opacity-85" : "-translate-y-full opacity-0"
        }`}
      >
        {items.map((item) => {
          const isActive = item.href === currentPath;
          return (
            <a
              key={item.label}
              onClick={() => {
                setIsOpen(false);
                navigate(item.href);
              }}
              className={`flex items-center gap-2 text-lg cursor-pointer ${
                isActive
                  ? "text-[#FFD700]"
                  : "text-gray-300 hover:text-[#FFD700]"
              }`}
            >
              <item.Icon className="w-6 h-6" />
              {item.label}
            </a>
          );
        })}

        {/* Mobile Actions */}
        {localStorage.getItem("token") ? (
          <div>
            <a
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/", { replace: true });
              }}
            >
              <button
                className="relative inline-block text-[#FFD700] px-3 py-0.5 rounded-md cursor-pointer 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 
              after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300 
              hover:after:w-full text-lg"
              >
                Logout
              </button>
            </a>
          </div>
        ) : (
          <div className="flex  gap-4 mt-4">
            <a onClick={() => navigate("/login")}>
              <button
                className="relative inline-block text-[#FFD700] px-3 py-0.5 rounded-md cursor-pointer 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 
              after:h-[2px] after:bg-[#FFD700] after:transition-all after:duration-300 
              hover:after:w-full text-lg"
              >
                Login
              </button>
            </a>
            <a onClick={() => navigate("/register")}>
              <button
                className="relative inline-block text-[#C0C0C0] px-2 py-0.5 rounded-md cursor-pointer 
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 
              after:h-[2px] after:bg-[#C0C0C0] after:transition-all after:duration-300 
              hover:after:w-full text-lg"
              >
                Sign Up
              </button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
