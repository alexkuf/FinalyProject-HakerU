import { useState, useEffect } from "react";
import projectService from "../services/projectCervice";
import { useAuth } from "../context/auth.context";

export const useProjectNames = () => {
  const { user } = useAuth();
  const [prNames, setPrNames] = useState([]);

  useEffect(() => {
    if (user) {
      const getNames = async () => {
        try {
          const { data } = await projectService.getAll();
          setPrNames(data);
        } catch ({ response }) {
          return;
        }
      };

      getNames();
    }
  }, [user]);

  return prNames;
};
