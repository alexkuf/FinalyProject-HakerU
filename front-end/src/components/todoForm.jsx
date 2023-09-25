import useTodoForm from "../hooks/useTodoForm";
import TodoFormOption from "./todoFormOption";

const TodoForm = ({
  onSubmit,
  handleChangeInputDate,
  todos,
  addNewItemInState,
  existDateInputChange,
  handleChangeInputExist,
  myDate,
  existingDay,
  setExistingDay,
  insertInExistDate,
  selects,
  setSelects,
  handleSelectChange,
}) => {
  const { input, error, handleInputChange, handleSubmit, handleSubmitTwo } =
    useTodoForm({ onSubmit });

  return (
    <div
      className="card mb-5 m-auto p-3"
      style={{
        maxWidth: "550px",
      }}
    >
      <select
        onChange={handleSelectChange}
        className="form-control text-center mb-3"
        value={selects}
      >
        <option>Please choose:</option>
        <option value="New list">New list</option>
        <option value="Existing list">Existing date</option>
      </select>

      <TodoFormOption
        error={error}
        selects={selects}
        setSelects={setSelects}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleSubmitTwo={handleSubmitTwo}
        handleChangeInputDate={handleChangeInputDate}
        todos={todos}
        addNewItemInState={addNewItemInState}
        existDateInputChange={existDateInputChange}
        handleChangeInputExist={handleChangeInputExist}
        myDate={myDate}
        existingDay={existingDay}
        setExistingDay={setExistingDay}
        insertInExistDate={insertInExistDate}
      />
    </div>
  );
};

export default TodoForm;
