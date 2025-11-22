import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todo");

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const filteredTodos = todos
    .filter((t) => (filter === "todo" ? !t.completed : t.completed))
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h1>Todo App</h1>

      <AddTodoForm addTodo={addTodo} />

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ margin: "10px 0", width: "100%", padding: 5 }}
      />

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => setFilter("todo")}>To Do</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: 10 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "none", marginLeft: 10 }}>
              {todo.text}
            </span>
            <button onClick={() => updateTodo(todo.id, prompt("Edit Todo", todo.text))}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddTodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: "80%", padding: 5 }}
      />
      <button type="submit">Add</button>
    </form>
  );
}
