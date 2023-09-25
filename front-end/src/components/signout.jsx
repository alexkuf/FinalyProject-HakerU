import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/auth.context";

const SignOut = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate("/");
  }, [navigate, logout]);

  return null;
};

export default SignOut;
