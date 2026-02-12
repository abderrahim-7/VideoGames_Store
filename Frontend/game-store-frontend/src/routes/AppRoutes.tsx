import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import Library from "../pages/Library";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import DefaultHome from "../pages/DefaultHome";
import SearchResults from "../pages/SearchResults";
import ProtectedRoute from "../components/ProtectedRoute";
import GamePage from "../pages/GamePage";
import BuyPage from "../pages/BuyPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/Buy"
        element={
          <ProtectedRoute message="Please login before buying the game">
            <BuyPage />
          </ProtectedRoute>
        }
      />
      <Route element={<MainLayout />}>
        <Route element={<Home />}>
          <Route path="/" element={<DefaultHome />} />
          <Route path="/search" element={<SearchResults />} />
        </Route>
        <Route path="/games/:id" element={<GamePage />} />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
