import PageHeader from "./common/pageHeader";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth.context";
import usersServise from "../services/userService";
import Users from "./users";
import { Link } from "react-router-dom";

const MySetings = ({ theme }) => {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useAuth();
  const [btnDelClick, setBtnDelClick] = useState(false);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    const getAllusers = async () => {
      try {
        const { data } = await usersServise.getAllUsers();
        setAllUsers(data);
      } catch ({ response }) {
        return;
      }
    };
    if (user) {
      getAllusers();
    }
  }, [user]);

  return (
    <>
      <PageHeader title="Administrator tools" description="" />

      {btnDelClick && (
        <div className="alert alert-danger m-auto ms-2 me-2 mb-3">
          <div className="d-flex justify-content-center">
            <p className="me-2">Are you sure you want to delete?</p>
            <Link to={`/all-users/delete/${userId}`}>
              <button
                className="btn btn-outline-primary me-3 border border-info"
                onClick={() => setBtnDelClick(false)}
              >
                Yes
              </button>
            </Link>
            <button
              className="btn btn-outline-primary border border-info"
              onClick={() => setBtnDelClick(false)}
            >
              No
            </button>
          </div>
        </div>
      )}

      <div className="row m-auto">
        <Users
          allUsers={allUsers}
          setBtnDelClick={setBtnDelClick}
          setUserId={setUserId}
          theme={theme}
        />
      </div>
    </>
  );
};

export default MySetings;
