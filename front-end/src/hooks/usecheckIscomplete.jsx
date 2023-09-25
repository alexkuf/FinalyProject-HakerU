import { useAuth } from "../context/auth.context";
import { useState } from "react";
import { useAllCards } from "../hooks/useAllCards";
const useCheckIsComplete = () => {
  const { user } = useAuth();
  const cards = useAllCards();
  const [checkComplete, setCheckIsComplete] = useState(true);
  const [cardName, setCardName] = useState([]);
  const checkIscomplete = () => {
    cards?.map((card) => {
      if (user._id === card.user_id) {
        if (card.stopTime === "Not finished") {
          setCheckIsComplete(false);
          setCardName(card);
        }
      }
      return cards;
    });
  };

  return {
    checkComplete,
    cardName,
    setCardName,
    checkIscomplete,
    setCheckIsComplete,
  };
};

export default useCheckIsComplete;
