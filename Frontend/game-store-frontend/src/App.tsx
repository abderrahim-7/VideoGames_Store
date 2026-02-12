import { BrowserRouter } from "react-router-dom";
import "./App.css";

import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { isTokenValid } from "./utils/tokenValidation";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    isTokenValid();
  }, []);
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#000",
            color: "#FFD700",
            borderRadius: "0.5em",
            border: "0.1em solid #FFD700",
          },
          success: {
            style: { background: "#000" },
          },
          error: {
            style: { background: "#000" },
          },
        }}
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
