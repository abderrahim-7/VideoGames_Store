import { type JSX, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "../utils/tokenValidation";
import Locked from "./Locked";

interface Props {
  children: JSX.Element;
  message?: string;
}

const ProtectedRoute = ({ children, message }: Props) => {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(false);
  const valid = isTokenValid();

  useEffect(() => {
    if (!valid) {
      setLocked(true);
    }
  }, [valid]);

  if (valid) return children;

  if (locked) {
    return <Locked close={() => navigate(-1)} message={message} />;
  }

  return null;
};

export default ProtectedRoute;
