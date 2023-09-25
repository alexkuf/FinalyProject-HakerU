import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import { v4 as uuid } from "uuid";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import moment from "moment";

const Todo = ({ setData, theme }) => {
  const [todos, setTodos] = useState(initLocalStorage);
  const [date, setDate] = useState();
  const [inputFromInp, setInputFromInp] = useState();
  const [inputValue, setInputValue] = useState();
  const [newInputValue, setNewInputValue] = useState();
  const [accordion, setAccordion] = useState(-1);
  const [existingDay, setExistingDay] = useState(false);
  const myDate = moment(date).format("DD/MM/YYYY");
  const [selects, setSelects] = useState("");

  useEffect(() => {
    setData(todos);
  }, [todos, setData]);

  const handleSelectChange = (e) => {
    setSelects(e.target.value);
  };

  function initLocalStorage() {
    return localStorage.getItem("todosReact")
      ? JSON.parse(localStorage.getItem("todosReact"))
      : [];
  }

  function saveToLocal() {
    localStorage.setItem("todosReact", JSON.stringify(todos));
  }
  saveToLocal();

  const handleAccordionClick = (todoId) => {
    setAccordion(todoId);
  };

  const handleChangeInputDate = (e) => {
    setDate(e.target.value);
  };

  const handleChangeInputExist = (e) => {
    setNewInputValue(e.target.value);
  };

  const existDateInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddNewList = (title, newTitle) => {
    const filteredDate = todos.filter((element) => {
      return element.date === myDate;
    });
    const maId = uuid();
    if (filteredDate.length === 0) {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const newDay = dd + "/" + mm + "/" + yyyy;
      setTodos((todos) => {
        setAccordion(maId);
        return [
          ...todos,
          {
            todoId: maId,
            date: myDate,
            items: [
              {
                idItem: uuid(),
                title,
                isComplete: false,
                isUpdate: false,
                createdDate: newDay,
                newTitle,
                todoId: maId,
              },
            ],
          },
        ];
      });
      return todos;
    } else {
      setExistingDay(true);
      setInputFromInp(title);
    }
  };

  const addNewItemInState = (title, newTitle) => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const newDay = dd + "/" + mm + "/" + yyyy;
    if (newInputValue.length >= 2) {
      setTodos((todos) =>
        todos.map((todo) => {
          if (todo.date === inputValue) {
            setAccordion(todo.todoId);
            return {
              ...todo,
              items: [
                ...todo.items,
                {
                  idItem: uuid(),
                  title: newInputValue,
                  isComplete: false,
                  isUpdate: false,
                  createdDate: newDay,
                  newTitle,
                  todoId: todo.todoId,
                },
              ],
            };
          }
          return todo;
        })
      );
    }
  };

  const handleIsCompleteChange = (id, isComplete) => {
    const newTodos = todos.map((todolist) => {
      todolist.items.map((todoItem) => {
        if (todoItem.idItem === id) {
          return (todoItem.isComplete = isComplete);
        }
        return todoItem;
      });
      return todolist;
    });
    setTodos(newTodos);
  };

  const handleDeleteItem = (id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        return {
          ...todo,
          items: todo.items.filter((elem) => elem.idItem !== id),
        };
      })
    );
  };

  const deleteList = (todoId) => {
    setTodos((todos) =>
      todos.filter((listItems) => listItems.todoId !== todoId)
    );
  };
  const handleEdit = (id) => {
    const newTodos = todos.map((todolist) => {
      todolist.items.map((todoItem) => {
        if (todoItem.idItem === id) {
          return (todoItem.isUpdate = true);
        }
        return todoItem;
      });
      return todolist;
    });
    setTodos(newTodos);
  };

  const handleEditInputVale = (todoId, newTitle) => {
    const newTodos = todos.map((todolist) => {
      todolist.items.map((todoItem) => {
        if (todoItem.idItem === todoId) {
          return (todoItem.newTitle = newTitle);
        }
        return todoItem;
      });
      return todolist;
    });
    setTodos(newTodos);
  };

  const handleSaveTodo = (todoId) => {
    const newTodos = todos.map((todolist) => {
      todolist.items.map((todoItem) => {
        if (todoItem.idItem === todoId) {
          if (typeof todoItem.newTitle === "undefined") {
            return (todoItem.isUpdate = false);
          } else {
            return (
              (todoItem.title = todoItem.newTitle), (todoItem.isUpdate = false)
            );
          }
        }
        return todoItem;
      });
      return todolist;
    });
    setTodos(newTodos);
  };

  const insertInExistDate = (title, newTitle) => {
    setExistingDay(false);
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const newDay = dd + "/" + mm + "/" + yyyy;
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.date === myDate) {
          setAccordion(todo.todoId);
          return {
            ...todo,
            items: [
              ...todo.items,
              {
                idItem: uuid(),
                title: inputFromInp,
                isComplete: false,
                isUpdate: false,
                createdDate: newDay,
                newTitle,
                todoId: todo.todoId,
              },
            ],
          };
        }
        return todo;
      })
    );
  };

  return (
    <>
      <PageHeader title="Manage Your Tasks list!" description="" />
      <TodoForm
        selects={selects}
        setSelects={setSelects}
        handleSelectChange={handleSelectChange}
        onSubmit={handleAddNewList}
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
      {todos.map((todo) => (
        <TodoList
          theme={theme}
          onCompleteChange={handleIsCompleteChange}
          key={todo.todoId}
          todo={todo}
          handleDeleteItem={handleDeleteItem}
          handleAccordionClick={handleAccordionClick}
          accordion={accordion}
          deleteList={deleteList}
          onClickEdit={handleEdit}
          handleEditInputVale={handleEditInputVale}
          onHandleSaveTodo={handleSaveTodo}
        />
      ))}
    </>
  );
};

export default Todo;
