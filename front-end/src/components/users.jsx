import useTimeAndDateFormat from "../hooks/usetimeDateFormat";
import { Link } from "react-router-dom";

const Users = ({ allUsers, setBtnDelClick, setUserId, theme }) => {
  const { shortDateFormat } = useTimeAndDateFormat();

  return (
    <div>
      <div className="mb-3 text-center">
        <Link type="button" className="btn btn-primary" to="/">
          <i className="bi bi-house-door"></i>
        </Link>
        <button
          type="button"
          className="btn btn-success me-3 ms-3"
          to="/add-user"
        >
          <Link className="nav-link" to="/add-user">
            Add new employee
          </Link>
        </button>
      </div>

      <div
        className="table-responsive m-auto"
        style={{
          maxWidth: "1200px",
        }}
      >
        <div className="justify-content-center p-3 mt-3">
          <h4 className="mt-1">All users:</h4>

          <table
            className={
              theme === "dark"
                ? "table overflow-auto text-center table-dark"
                : "table overflow-auto text-center"
            }
          >
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name:</th>
                <th>Email:</th>
                <th>Administrator:</th>
                <th>Created date:</th>
                <th>Edit:</th>
                <th>Delete:</th>
                <th>Password:</th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((elem, ind) => {
                return (
                  <tr key={ind}>
                    <td>{ind}</td>
                    <td>{elem.name}</td>
                    <td>{elem.email}</td>
                    <td>{elem.isAdmin ? "Yes" : "No"}</td>
                    <td>{shortDateFormat(elem.createdAt)}</td>
                    <td>
                      <Link to={`/all-users/edit/${elem._id}`}>
                        <button
                          className={
                            theme === "dark" ? "changeTheme" : "change"
                          }
                          title="Edit Time in project"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className={theme === "dark" ? "changeTheme" : "delete"}
                        title="Delete project"
                        onClick={() => {
                          setBtnDelClick(true);
                          setUserId(elem._id);
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                    <td>
                      <Link to={`/refresh-password/${elem._id}`}>
                        <button
                          className={
                            theme === "dark" ? "changeTheme" : "delete"
                          }
                          title="Refresh password"
                        >
                          <i className="bi bi-arrow-clockwise"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className="card border border-0 mt-5"
        style={{
          maxWidth: "32rem",
          textAlign: "center",
          margin: "auto",
          background: "none",
          color: "white",
        }}
      >
        <img
          style={{
            maxHeight: "22rem",
          }}
          src="images/EditUser.webp"
          alt="edit user"
        />
      </div>
    </div>
  );
};

export default Users;
