import { useState } from "react";

const TodoItem = ({
  elem: { title, isComplete, createdDate, isUpdate },
  onCompleteChange = () => {},
  handleDeleteItem = () => {},
  onClickEdit = () => {},
  handleEditInputVale = () => {},
  onHandleSaveTodo = () => {},
}) => {
  const styles = {
    fromCheckBox: {
      textDecoration: isComplete ? "line-through solid red" : "none",
    },
  };
  const [message, setMessage] = useState(title);

  const handleChange = () => {
    setMessage(title);
    onClickEdit();
  };
  return (
    <div className="d-flex align-items-center fs-4 border-bottom mt-2">
      {isUpdate ? (
        <>
          <input
            type="text"
            className="border border-0 bg-primary-subtle text-emphasis-primary rounded-1"
            style={{
              width: "100%",
              height: "35px",
              marginLeft: "5px",
            }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleEditInputVale(e.target.value);
            }}
          />
          <button className="btnSave" onClick={onHandleSaveTodo}>
            <i className="bi bi-check2"></i>
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            className="mt-1"
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "5px",
            }}
            checked={isComplete}
            onChange={(e) => onCompleteChange(e.target.checked)}
          />
          <label
            className="container"
            htmlFor="firstCheckbox"
            style={styles.fromCheckBox}
            title={createdDate}
          >
            {title}
          </label>
          <div className="d-flex">
            <button
              onClick={handleChange}
              className="change border border-0 bg-transparent "
              title="Edit item"
            >
              <i className="bi bi-pencil-fill"></i>
            </button>
            <button
              onClick={handleDeleteItem}
              className="delete"
              title="Delete item"
            >
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default TodoItem;
