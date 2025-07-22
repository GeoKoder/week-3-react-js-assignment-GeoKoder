import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useTheme } from "../context/ThemeContext";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const { toggleTheme, theme } = useTheme();

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <Card title="Task Manager" className="max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border p-2 rounded"
        />
        <Button onClick={addTask}>Add</Button>
        <Button variant="secondary" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </Button>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <Button
          variant={filter === "all" ? "primary" : "secondary"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "primary" : "secondary"}
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "primary" : "secondary"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.text}
              </span>
            </div>
            <Button variant="danger" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
