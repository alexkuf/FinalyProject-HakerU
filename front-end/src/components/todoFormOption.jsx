const TodoFormOption = ({
  selects,
  setSelects,
  error,
  input,
  todos,
  handleSubmit = () => {},
  handleSubmitTwo = () => {},
  handleInputChange,
  handleChangeInputDate = () => {},
  addNewItemInState = () => {},
  existDateInputChange = () => {},
  handleChangeInputExist = () => {},
  myDate,
  existingDay,
  setExistingDay,
  insertInExistDate = () => {},
}) => {
  const changeSelectValue = () => {
    setSelects("Please choose:");
    // setSelects("Please choose:");
  };

  return (
    <>
      {(() => {
        if (selects === "New list") {
          return (
            <>
              <input
                type="date"
                className="form-control mb-3 text-center"
                onChange={handleChangeInputDate}
              />
              <input
                type="text"
                placeholder="What do you want to do:"
                value={input}
                onInput={handleInputChange}
                className="form-control mb-3"
              />
              <button
                onClick={() => {
                  handleSubmit();
                  changeSelectValue();
                }}
                className="btn btn-primary"
                title="Add new item to list"
              >
                Add
              </button>
              {error ? <div className="textError">{error}</div> : null}
              {existingDay ? (
                <div className="textexist">
                  {myDate} - exists! Want to add new item to an existing date?
                  <button
                    className="yes"
                    onClick={() => {
                      insertInExistDate();
                    }}
                  >
                    Yes
                  </button>
                  <button className="no" onClick={() => setExistingDay(false)}>
                    No
                  </button>
                </div>
              ) : null}
            </>
          );
        } else if (selects === "Existing list") {
          return (
            <>
              <select
                className="form-control mb-3 text-center"
                onChange={existDateInputChange}
              >
                <option>Choose date:</option>
                {todos &&
                  todos.map((todo) => {
                    return <option key={todo.todoId}>{todo.date}</option>;
                  })}
              </select>
              <input
                type="text"
                placeholder="What do you want to do:"
                value={input}
                onInput={handleInputChange}
                onChange={handleChangeInputExist}
                className="form-control mb-3 text-center"
              />
              <button
                onClick={() => {
                  handleSubmitTwo();
                  addNewItemInState();
                  setExistingDay(false);
                  changeSelectValue();
                }}
                className="btn btn-primary"
                title="Add new item to list"
              >
                <i className="bi bi-arrow-return-left"></i>
              </button>
              {error ? <div className="textError">{error}</div> : null}
            </>
          );
        }
      })()}
    </>
  );
};

export default TodoFormOption;
