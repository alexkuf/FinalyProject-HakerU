import { useAuth } from "../context/auth.context";
import { useAllCards } from "../hooks/useAllCards";
import { Link } from "react-router-dom";
import useTimeAndDateFormat from "../hooks/usetimeDateFormat";
import { useState, useEffect } from "react";

const MyPage = ({ theme }) => {
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
    const resultsArray = cards.filter((elem) =>
      elem.projectName.includes(e.target.value)
    );
    setAllCards(resultsArray);
  };

  return (
    <div className="container-fluid hover-zoomin ">
      <div className="text-center mt-3">
        <h4>All the projects of - {user.name}</h4>
        <div className="tools mt-4 d-flex justify-content-center">
          <Link type="button" className="btn btn-primary me-3" to="/">
            <i className="bi bi-house-door"></i>
          </Link>
          <Link type="button" className="btn btn-success" to="/create-card">
            Start
            <i className="bi bi-play-circle ms-2"></i>
          </Link>
          <input
            type="search"
            className="form-control border border-info ms-3"
            placeholder="Search by project"
            aria-label="Search"
            onChange={handleSearchChange}
            style={{
              maxWidth: "290px",
              marginLeft: "5px",
            }}
          />
        </div>
        <div
          className="table-responsive m-auto mt-5"
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
                <th className="th" onClick={() => reversTable("projectName")}>
                  Project name
                  <i className="bi bi-arrow-down-up ms-2"></i>
                </th>
                <th>Employee name</th>
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allCards
                ?.filter((card) => card.user_id === user._id)
                .map((card, ind) => {
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
                      <td>
                        {card.stopTime !== "Not finished" ? (
                          <Link to={`/all-cards/edit/${card._id}`}>
                            <button
                              className={
                                theme === "dark" ? "changeTheme" : "change"
                              }
                              title="Edit Time in project"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                          </Link>
                        ) : null}
                      </td>
                      <td>
                        <Link to={`/all-cards/delete/${card._id}`}>
                          <button
                            className={
                              theme === "dark" ? "changeTheme" : "delete"
                            }
                            title="Delete project"
                          >
                            <i className="bi bi-trash3"></i>
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
    </div>
  );
};

export default MyPage;
