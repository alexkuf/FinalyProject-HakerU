import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth.context";
import { useEffect, useState } from "react";
import ReactSwitch from "react-switch";

const Navbar = ({ data, setData, toggleTheme, theme }) => {
  const { user } = useAuth();
  const [todos] = useState(initLocalStorage);

  const handleCollapse = () => {
    const nav = document.getElementById("navbarsExample04");
    nav.classList.remove("show");
  };

  function initLocalStorage() {
    return localStorage.getItem("todosReact")
      ? JSON.parse(localStorage.getItem("todosReact"))
      : [];
  }
  useEffect(() => {
    setData(todos);
  }, [todos, setData]);

  const getCountTodoItems = () => {
    let a = 0;
    data?.map((elem) => {
      if (elem.items.length > 0) {
        elem.items.map((el) => {
          if (el.isComplete === false) {
            a = a + 1;
          }
          return elem;
        });
      }
      return data;
    });
    return a;
  };

  getCountTodoItems();

  return (
    <nav
      className={
        theme === "dark"
          ? "navbar navbar-expand-sm bg-primary"
          : "navbar navbar-expand-sm navbar-dark bg-dark"
      }
      data-bs-theme="dark"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <i>
          <img
            className="bi"
            width="40"
            height="32"
            role="img"
            aria-label="Bootstrap"
            src="images/fenestra.png"
            alt=""
          />
        </i>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink
                className="nav-link text-center"
                to="/"
                onClick={handleCollapse}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item text-center">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={handleCollapse}
              >
                About
              </NavLink>
            </li>
            {user && (
              <li className="nav-item text-center">
                <NavLink
                  className="nav-link"
                  to="/my-page"
                  onClick={handleCollapse}
                >
                  My project
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item text-center">
                <NavLink
                  className="nav-link"
                  to="/todo"
                  onClick={handleCollapse}
                >
                  My to-do {"(" + getCountTodoItems() + ")"}
                </NavLink>
              </li>
            )}

            {user?.isAdmin && (
              <>
                <li className="nav-item ms-1 text-center">
                  <NavLink
                    className="nav-link ms-1"
                    to="/manage"
                    onClick={handleCollapse}
                  >
                    Tools
                    <i className="bi bi-gear ms-2"></i>
                  </NavLink>
                </li>
                <li className="nav-item ms-1 text-center">
                  <NavLink
                    className="nav-link ms-1"
                    to="/reports"
                    onClick={handleCollapse}
                  >
                    Reports
                    <i className="bi bi-table ms-2"></i>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav align-items-center">
            {user ? (
              <div className="d-flex text-white align-items-center">
                <div className="me-3">
                  <li className="nav-item ms-1">
                    <NavLink
                      className="nav-link ms-1"
                      to="/sign-out"
                      onClick={handleCollapse}
                    >
                      Sign Out
                    </NavLink>
                  </li>
                </div>
                <div
                  className="d-flex text-white align-items-center"
                  style={{ width: "150px", height: "40px" }}
                >
                  <img
                    src="images/avatar.png"
                    alt=""
                    style={{
                      width: "40px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                  <p className="col text-white h-25 text-start">
                    {user && user.name}
                  </p>
                </div>
                <div className="d-flex mt-2 float-end">
                  <label className="me-2 ms-3">
                    {theme === "light" ? (
                      <i className="bi bi-moon"></i>
                    ) : (
                      <i className="bi bi-brightness-high"></i>
                    )}
                  </label>
                  <ReactSwitch
                    onChange={() => {
                      toggleTheme();
                    }}
                    checked={theme === "dark"}
                    onClick={handleCollapse}
                  />
                </div>
              </div>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/sign-in"
                    onClick={handleCollapse}
                  >
                    Sing In
                  </NavLink>
                </li>
                <div className="d-flex mt-2 float-end">
                  <label className="me-2 ms-3">
                    {theme === "light" ? (
                      <i className="bi bi-moon"></i>
                    ) : (
                      <i className="bi bi-brightness-high"></i>
                    )}
                  </label>
                  <ReactSwitch
                    onChange={() => {
                      toggleTheme();
                    }}
                    checked={theme === "dark"}
                  />
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
