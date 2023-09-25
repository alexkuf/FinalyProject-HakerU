import { useAllCards } from "../hooks/useAllCards";
import PageHeader from "./common/pageHeader";
import { useState, useEffect } from "react";
import cardsService from "../services/cardsCervice";
import useTimeAndDateFormat from "../hooks/usetimeDateFormat";

const Reports = ({ theme }) => {
  const {
    shortDateFormat,
    timeFormatFromDate,
    totalTime,
    handleSaveToExcel,
    convertToTime,
    setTotalTimes,
    totalTimes,
  } = useTimeAndDateFormat();
  const cards = useAllCards();
  const [allCards, setAllCards] = useState();
  const [startDate, setStartDate] = useState();
  const [endtDate, setEndDate] = useState();
  const [filteredCards, setFilteredCards] = useState([]);
  const [retCards, setRetCards] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [iscliced, setIsCliced] = useState(false);
  const [totallFilTime, setTotallFilTime] = useState(0);

  const reversTable = (col) => {
    if (order === "ASC") {
      let sorted = [...filteredCards].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setFilteredCards(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      let sorted = [...filteredCards].sort((a, b) =>
        a[col] > b[col] ? -1 : 1
      );
      setFilteredCards(sorted);
      setOrder("ASC");
    }
  };

  const handleSearchChange = (e) => {
    if (!e.target.value) return setFilteredCards(retCards);
    const resultsArray = filteredCards.filter(
      (elem) =>
        elem.projectName.includes(e.target.value) ||
        elem.employeeName.includes(e.target.value)
    );
    setFilteredCards(resultsArray);
    return resultsArray;
  };

  useEffect(() => {
    const getCards = async () => {
      try {
        const { data } = await cardsService.getAll();
        setAllCards(data);
      } catch ({ response }) {
        return cards;
      }
    };
    getCards();
  }, [cards]);

  const handlecliclSearch = () => {
    const newResult = [];
    allCards.filter((el) => {
      let a = new Date(el.createAt);
      if (
        a.getTime() / 1000 > new Date(startDate).getTime() / 1000 &&
        a.getTime() / 1000 < new Date(endtDate).getTime() / 1000 + 100000
      ) {
        newResult.push(el);
      }
      setFilteredCards(newResult);
      setRetCards(newResult);
      return newResult;
    });
  };

  useEffect(() => {
    setTotallFilTime(0);
    filteredCards.map((el) => {
      const a = new Date(el.stopTime);
      const b = new Date(el.startTime);
      const diff = (a.getTime() - b.getTime()) / 1000;
      return setTotallFilTime((count) => count + diff);
    });
  }, [filteredCards]);

  useEffect(() => {
    setTotalTimes(convertToTime(totallFilTime));
  }, [totallFilTime, setTotalTimes, convertToTime]);

  return (
    <>
      <PageHeader title="Reports" description="" />
      <div className="container">
        <div className="row justify-content-center mt-3">
          <div className="col-auto mr-auto mt-2 mb-3">
            <label className="me-2">Start date:</label>
            <input
              type="date"
              className="border border-dark rounded-1 text-center"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-auto mr-auto mt-2 mb-3">
            <label className="me-2">End date:</label>
            <input
              type="date"
              className="border border-dark rounded-1 text-center"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-auto mr-auto mt-2 mb-3">
            <button
              onClick={() => {
                handlecliclSearch();
                setIsCliced(true);
              }}
              className="btn btn-primary"
              style={{
                maxWidth: "50px",
                marginLeft: "5px",
              }}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
          <div className="col-auto mr-auto mt-2 mb-3">
            <input
              type="search"
              className="border border-info rounded-1 form-control"
              placeholder="Search by project or employeer"
              aria-label={<i className="bi bi-search"></i>}
              onChange={handleSearchChange}
              disabled={!iscliced}
            />
          </div>
          <div className="d-flex justify-content-center">
            {filteredCards.length > 0 ? (
              <div
                id="down"
                className={
                  theme === "dark"
                    ? "th mt-3 mb-3 ms-3 fw-bold text-white fs-4"
                    : "th mt-3 mb-3 ms-3 fw-bold text-success fs-4"
                }
                onClick={handleSaveToExcel}
              >
                Download excel
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <div
          className="table-responsive m-auto mt-2 text-center"
          style={{
            maxWidth: "1650px",
            height: "450px",
          }}
        >
          <table
            id="tableSheet"
            className={
              theme === "dark"
                ? "table p-3 m-auto overflow-auto table-dark"
                : "table p-3 m-auto overflow-auto"
            }
            style={{
              maxWidth: "1200px",
            }}
          >
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th className="th" onClick={() => reversTable("projectName")}>
                  Project name
                  <i className="bi bi-arrow-down-up ms-2"></i>
                </th>
                <th className="th" onClick={() => reversTable("employeeName")}>
                  Employee name
                  <i className="thbi bi-arrow-down-up ms-2"></i>
                </th>
                <th>Date</th>
                <th>Start time</th>
                <th>Stop time</th>
                <th>Total time</th>
                <th>Actions</th>
                <th>Revision</th>
              </tr>
            </thead>
            <tbody>
              {filteredCards?.map((card, ind) => {
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
        <div className="d-flex justify-content-center">
          {filteredCards.length > 0 ? (
            <div
              style={{
                maxWidth: "1200px",
              }}
            >
              <p className="text-center fw-bold fs-4 mt-3 text-primary">
                Total rows: {filteredCards.length}
              </p>
              <div className="">
                {totalTimes !== "00:00:0" ? (
                  <p className="text-center fw-bold fs-4 text-danger">
                    Total time: {totalTimes}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Reports;
