import { Link } from "react-router-dom";
import useTimeAndDateFormat from "../hooks/usetimeDateFormat";
const OrderDrawing = ({
  form,
  handleIsEmptyChange,
  pNames,
  user,
  select,
  isEmpty,
}) => {
  const { shortDateFormat, timeFormatFromDate } = useTimeAndDateFormat();
  return (
    <div className="container">
      <div className="row fs-4  text-center hover-zoomin"></div>
      <form
        onSubmit={form.handleSubmit}
        style={{
          maxWidth: "32rem",
          justifyContent: "center",
          margin: "auto",
          padding: "5px",
        }}
      >
        <label htmlFor="">Name project:</label>
        <div className="d-flex justify-content-center">
          <select
            className="form-select text-center"
            onChange={handleIsEmptyChange}
          >
            <option value="Choose project:">Choose project:</option>
            {pNames?.map((el, ind) => {
              return <option key={ind}>{el.name}</option>;
            })}
          </select>
        </div>
        <div className="col">
          <label className="">Employee name: </label>
          <div className="card col text-center bg-primary-subtle">
            <label className="pb-1 pt-1">{user.name}</label>
          </div>
        </div>
        <div className="col">
          <label className="">Date :</label>
          <div className="card col text-center bg-primary-subtle">
            <label className="pb-1 pt-1">{shortDateFormat(Date())}</label>
          </div>
        </div>
        <div className="col">
          <label className="">Start time :</label>
          <div className="card col text-center bg-primary-subtle">
            <label className="pb-1 pt-1">{timeFormatFromDate(Date())}</label>
          </div>
        </div>
        <div className="col">
          <label className="">Actions :</label>
          <div className="card col text-center bg-primary-subtle">
            <label className="pb-1 pt-1">{select}</label>
          </div>
        </div>
        <div className="col">
          <label className="">Revision :</label>
          <div className="card col text-center bg-primary-subtle">
            <label className="pb-1 pt-1">100</label>
          </div>
        </div>
        <div className="justify-content-center">
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={!isEmpty}
          >
            Start
          </button>

          <Link type="button" className="btn btn-primary ms-2 mt-2" to="/">
            <i className="bi bi-house-door"></i>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default OrderDrawing;
