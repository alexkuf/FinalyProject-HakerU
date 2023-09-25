import { createContext, useContext, useState } from "react";
import usersServise from "../services/userService";

const fn_error_context_must_be_used = () => {
  throw new Error(
    "must use authContext provider for consumer to work properly"
  );
};

export const authContext = createContext({
  logout: fn_error_context_must_be_used,
  login: fn_error_context_must_be_used,
  createUser: fn_error_context_must_be_used,
  user: null,
});
authContext.displayName = "auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(usersServise.getUser());

  const refreshUser = () => {
    setUser(usersServise.getUser());
  };

  const login = async (credentials) => {
    const response = await usersServise.loginUser(credentials);
    setUser(usersServise.getUser());
    refreshUser();

    return response;
  };
  const logout = () => {
    usersServise.logout();
    refreshUser();
  };
  return (
    <authContext.Provider
      value={{ logout, login, user, createUser: usersServise.createUser }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
export default AuthProvider;
