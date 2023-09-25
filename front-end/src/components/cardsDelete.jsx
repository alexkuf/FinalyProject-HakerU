import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cardsService from "../services/cardsCervice";
import { toast } from "react-toastify";

const CardsDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteCard = async () => {
      await cardsService.deleteCard(id);
      toast.success("Card Deleted");
      navigate("/my-page");
    };

    deleteCard();
  }, [id, navigate]);

  return null;
};

export default CardsDelete;
