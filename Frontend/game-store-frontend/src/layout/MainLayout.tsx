import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import logo from "../assets/icon.svg";
import {
  HomeIcon,
  UserIcon,
  ShoppingCartIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Footer from "../components/Footer";

const MainLayout = () => {
  const navItems = [
    { label: "Home", href: "/", Icon: HomeIcon },
    { label: "Profile", href: "/Profile", Icon: UserIcon },
    { label: "Cart", href: "/Cart", Icon: ShoppingCartIcon },
    { label: "Library", href: "/Library", Icon: BookOpenIcon },
  ];
  const icons = [FaFacebook, FaInstagram, FaXTwitter];
  const text =
    "© 2025, Roll&PLAY, Inc. All rights reserved. Roll&PLAY, the Roll&PLAY logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Roll&PLAY, Inc. in the United States of America and elsewhere. Other brands or product names are the trademarks of their respective owners. Our websites may contain links to other sites and resources provided by third parties. These links are provided for your convenience only. Roll&PLAY has no control over the contents of those sites or resources, and accepts no responsibility for them or for any loss or damage that may arise from your use of them.";

  const links = ["Terms of service", "Privacy policy", "Safety & security"];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar logo={logo} items={navItems} />
      <main className="flex-grow container mx-auto">
        <Outlet />
      </main>
      <Footer icons={icons} text={text} links={links} />
    </div>
  );
};

export default MainLayout;
