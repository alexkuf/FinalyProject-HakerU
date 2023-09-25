import { useState, useEffect } from "react";
import usersServise from "../services/userService";

export const useUser = (id) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await usersServise.getSelectUser(id);

      setUser(data);
    };

    getUser();
  }, [id]);

  return user;
};
