import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usersServise from "../services/userService";
import { toast } from "react-toastify";

const UserDelete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteUser = async () => {
      await usersServise.deleteUser(id);
      toast.success("User Deleted");
      navigate("/manage");
    };

    deleteUser();
  }, [id, navigate]);

  return null;
};

export default UserDelete;
