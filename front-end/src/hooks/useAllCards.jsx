import { useState, useEffect } from "react";
import cardsService from "../services/cardsCervice";
import { useAuth } from "../context/auth.context";

export const useAllCards = () => {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getCards = async () => {
      try {
        const { data } = await cardsService.getAll();
        setCards(data);
      } catch ({ response }) {
        return;
      }
    };
    if (user) {
      getCards();
    }
  }, [user]);

  return cards;
};
