import { useState, useEffect } from "react";
import projectService from "../services/projectCervice";

export const useCard = (id) => {
  const [prName, setPrName] = useState(null);

  useEffect(() => {
    const getName = async () => {
      const { data } = await projectService.getProjectname(id);
      setPrName(data);
    };

    getName();
  }, [id]);

  return prName;
};
