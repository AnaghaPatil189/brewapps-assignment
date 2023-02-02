import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoAge, setTodoAge] = useState("");
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(-1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex === -1) {
      setTodos([...todos, { name: todoName, date: todoDate, age: todoAge }]);
    } else {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].name = todoName;
      updatedTodos[editIndex].date = todoDate;
      updatedTodos[editIndex].age = todoAge;
      setTodos(updatedTodos);
      setEditIndex(-1);
    }
    setTodoName("");
    setTodoDate("");
    setTodoAge("");
  };

  const handleEdit = (index) => {
    const todo = todos[index];
    setTodoName(todo.name);
    setTodoDate(todo.date);
    setTodoAge(todo.age);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === todo.name) return true;
    return false;
  });

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-control mb-2 mr-2"
      >
        <option value="all">Filter-All</option>
        {todos.map((todo) => (
          <option key={todo.name} value={todo.name}>
            {todo.name}
          </option>
        ))}
      </select>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="Todo name"
          className="form-control mb-2 mr-2"
          required
        />
        <input
          type="date"
          value={todoDate}
          onChange={(e) => setTodoDate(e.target.value)}
          className="form-control mb-2 mr-2"
          required
        />
        <input
          type="number"
          value={todoAge}
          onChange={(e) => setTodoAge(e.target.value)}
          placeholder="Todo age"
          className="form-control mb-2 mr-2"
          required
        />
        <button type="submit" className="btn btn-primary mb-2">
          {editIndex === -1 ? "Add Todo" : "Update Todo"}
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo, index) => (
            <tr key={todo.name + todo.date + todo.age}>
              <td>{todo.name}</td>
              <td>{todo.date}</td>
              <td>{todo.age}</td>
              <td>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-danger mr-2"
                >
                  Delete
                </button>
                <span> </span>
                <button
                  onClick={() => handleEdit(index)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
