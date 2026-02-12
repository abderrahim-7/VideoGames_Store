import { Outlet } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex justify-center ">
        <SearchBar />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
