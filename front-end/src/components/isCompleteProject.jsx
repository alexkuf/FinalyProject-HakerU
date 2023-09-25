import useTimeAndDateFormat from "../hooks/usetimeDateFormat";
import { Link } from "react-router-dom";

const IsCompleteProject = ({ handleStopClick, cardName }) => {
  const { shortDateFormat, timeFormatFromDate } = useTimeAndDateFormat();

  return (
    <div className="form justify-content-center mt-5">
      <h4 className="text-center text-danger">
        You have to finish the project...
      </h4>
      <div className="col mt-5">
        <label className="">Project name: </label>
        <div className="card col text-center">
          <label className="pb-1 pt-1">{cardName.projectName}</label>
        </div>
      </div>
      <div className="col">
        <label className="">Emploee name: </label>
        <div className="card col text-center">
          <label className="pb-1 pt-1">{cardName.employeeName}</label>
        </div>
      </div>
      <div className="col">
        <label className="">Date :</label>
        <div className="card col text-center">
          <label className="pb-1 pt-1">
            {shortDateFormat(cardName.createAt)}
          </label>
        </div>
      </div>
      <div className="col">
        <label className="">Start time :</label>
        <div className="card col text-center">
          <label className="pb-1 pt-1">
            {timeFormatFromDate(cardName.startTime)}
          </label>
        </div>
      </div>
      <div className="col">
        <label className="">Actions :</label>
        <div className="card col text-center">
          <label className="pb-1 pt-1">{cardName.actions}</label>
        </div>
      </div>
      <div className="col">
        <label className="">Revision :</label>
        <div className="card col text-center">
          <label className="pb-1 pt-1">{cardName.revision}</label>
        </div>
      </div>
      <button onClick={handleStopClick} className="btn btn-info mt-3">
        Stop project...
      </button>
      <Link type="button" className="btn btn-primary ms-2 mt-3" to="/">
        <i className="bi bi-house-door"></i>
      </Link>
    </div>
  );
};
export default IsCompleteProject;
