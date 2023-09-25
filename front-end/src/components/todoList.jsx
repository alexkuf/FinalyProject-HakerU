import TodoItem from "./todoItem";
const TodoList = ({
  todo: { todoId, date, items },
  onCompleteChange,
  handleDeleteItem,
  handleAccordionClick,
  handleEditInputVale,
  onHandleSaveTodo,
  accordion,
  deleteList,
  onClickEdit,
  theme,
}) => {
  const completedTodos = items.filter((elem) => elem.isComplete);
  const styleChange = {
    background: "#1898ee",
    color: "black",
    border: "none",
    transition: "max-height 0.5s ease-out",
  };

  return (
    <div
      className="container mb-2"
      style={{
        maxWidth: "50rem",
        color: "black",
      }}
    >
      <div
        className="accardion"
        style={accordion === todoId ? styleChange : null}
      >
        <button
          className="deleteIcon"
          onClick={() => deleteList(todoId)}
          title="Delete this day"
        >
          <i className="bi bi-x-circle"></i>
        </button>
        <div className="d-flex justify-content-center m-auto">
          <h3
            className="mt-2"
            id="date"
            onClick={() => handleAccordionClick(todoId)}
          >
            {date}
          </h3>
          <h5 className="mt-2 ms-2">
            {"("}
            {completedTodos.length} /{items.length}
            {")"}
          </h5>
        </div>
      </div>
      <div
        className="spanVertical"
        onClick={() => handleAccordionClick(todoId)}
      >
        {accordion === todoId ? (
          <span className="verticle">
            <i className="bi bi-caret-down"></i>
          </span>
        ) : (
          <span className="verticle">
            <i className="bi bi-caret-right"></i>
          </span>
        )}
      </div>
      <div className={accordion === todoId ? "m_active" : "m_inactive"}>
        {items
          .sort((a) => (a.isComplete ? 1 : -1))
          .map((elem) => (
            <TodoItem
              key={elem.idItem}
              elem={elem}
              onCompleteChange={(isComplete) =>
                onCompleteChange(elem.idItem, isComplete)
              }
              handleDeleteItem={() => handleDeleteItem(elem.idItem)}
              onClickEdit={(isUpdate) => onClickEdit(elem.idItem, isUpdate)}
              handleEditInputVale={(newTitle) =>
                handleEditInputVale(elem.idItem, newTitle)
              }
              onHandleSaveTodo={() => onHandleSaveTodo(elem.idItem)}
            />
          ))}
      </div>
    </div>
  );
};

export default TodoList;
