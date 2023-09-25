import { useAllCards } from "../hooks/useAllCards";
import { useAuth } from "../context/auth.context";
import PageHeader from "./common/pageHeader";
import { NavLink } from "react-router-dom";
import useTimeAndDateFormat from "../hooks/usetimeDateFormat";
import { useState, useEffect } from "react";

const Home = ({ theme }) => {
  const { shortDateFormat, timeFormatFromDate, totalTime } =
    useTimeAndDateFormat();
  const cards = useAllCards();
  const { user } = useAuth();
  const [order, setOrder] = useState("ASC");
  const [allCards, setAllCards] = useState();

  useEffect(() => {
    setAllCards(cards);
  }, [cards]);

  const reversTable = (col) => {
    if (order === "ASC") {
      let sorted = [...cards].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setAllCards(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      let sorted = [...cards].sort((a, b) => (a[col] > b[col] ? -1 : 1));
      setAllCards(sorted);
      setOrder("ASC");
    }
  };

  const handleSearchChange = (e) => {
    if (!e) return setAllCards(cards);
    const resultsArray = cards.filter(
      (elem) =>
        elem.projectName.includes(e.target.value) ||
        elem.employeeName.includes(e.target.value)
    );
    setAllCards(resultsArray);
  };

  return (
    <div className="container-fluid hover-zoomin">
      {user ? (
        <div className="text-center">
          <div className="mt-3">
            <h4>All users projects</h4>
            <div className="tools d-flex justify-content-center mt-3">
              <button
                type="button"
                className="btn btn-success me-3"
                to="/create-card"
              >
                <NavLink className="nav-link" to="/create-card">
                  Start new project
                </NavLink>
              </button>
              <button
                type="button"
                className="btn btn-outline-primary me-3 border border-info"
                style={{
                  color: theme === "dark" ? "#e7e7e7" : "#024575",
                }}
              >
                <NavLink className="nav-link " to="/my-page">
                  My project
                </NavLink>
              </button>

              <input
                type="search"
                className="form-control border border-info"
                placeholder="Search by project & employeer"
                aria-label={<i className="bi bi-search"></i>}
                onChange={handleSearchChange}
                style={{
                  maxWidth: "290px",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div
              className="table-responsive m-auto mt-5 "
              style={{
                maxWidth: "1650px",
                height: "550px",
              }}
            >
              <table
                className={
                  theme === "dark"
                    ? "table w-75 p-3 overflow-auto m-auto table-dark"
                    : "table w-75 p-3 overflow-auto m-auto"
                }
              >
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th
                      className="th"
                      onClick={() => reversTable("projectName")}
                    >
                      Project name
                      <i className="bi bi-arrow-down-up ms-2"></i>
                    </th>
                    <th
                      className="th"
                      onClick={() => reversTable("employeeName")}
                    >
                      Employee name
                      <i className="bi bi-arrow-down-up ms-2"></i>
                    </th>
                    <th className="th" onClick={() => reversTable("Date")}>
                      Date
                      <i className="bi bi-arrow-down-up ms-2"></i>
                    </th>
                    <th>Start time</th>
                    <th>Stop time</th>
                    <th>Total time</th>
                    <th className="th" onClick={() => reversTable("actions")}>
                      Actions
                      <i className="bi bi-arrow-down-up ms-2"></i>
                    </th>
                    <th className="th" onClick={() => reversTable("revision")}>
                      Revision
                      <i className="bi bi-arrow-down-up ms-2"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allCards?.map((card, ind) => {
                    return (
                      <tr key={ind}>
                        <td>{ind}</td>
                        <td>{card.projectName}</td>
                        <td>{card.employeeName}</td>
                        <td>{shortDateFormat(card.createAt)}</td>
                        <td>{timeFormatFromDate(card.startTime)}</td>
                        <td>
                          {card.stopTime !== "Not finished"
                            ? timeFormatFromDate(card.stopTime)
                            : "Not finished"}
                        </td>
                        <td>{totalTime(card.startTime, card.stopTime)}</td>
                        <td>{card.actions}</td>
                        <td>{card.revision}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p className="fs-4 mt-3 text-danger fw-bold">
            Total rows: {cards.length}
          </p>
        </div>
      ) : (
        <div>
          <PageHeader
            title={"Welcome to Project Manager"}
            description="You must log in to get started."
          />
          <div className="row text-center fw-bold text-primary">
            <NavLink className="nav-link" to="/sign-in">
              Sing In
            </NavLink>
          </div>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div
                className="col me-2 mt-2 mb-2 text-center"
                style={{ width: "320px" }}
              >
                <img src="images/project1.jpg" alt="" className="img rounded" />
              </div>
              <div
                className="col me-2 mt-2 mb-2 text-center"
                style={{ width: "320px" }}
              >
                <img src="images/project2.jpg" alt="" className="img rounded" />
              </div>
              <div
                className="col me-2 mt-2 mb-2 text-center"
                style={{ width: "320px" }}
              >
                <img src="images/project3.jpg" alt="" className="img rounded" />
              </div>
              <div
                className="col me-2 mt-2 mb-2 text-center"
                style={{ width: "320px" }}
              >
                <img src="images/project4.jpg" alt="" className="img rounded" />
              </div>
            </div>
          </div>
          <h3 className="text-center mt-3 mb-3">
            Have a nice day from Fenestra company !!!
          </h3>
        </div>
      )}
    </div>
  );
};

export default Home;
