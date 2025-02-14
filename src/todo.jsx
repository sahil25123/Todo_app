import { useState, useEffect } from "react";
import "./Todo.css"; // Import CSS

function Todo() {
    // Load tasks from localStorage (if available)
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTask, setNewTask] = useState("");

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addNewTask() {
        if (newTask.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }
        const newTaskObj = { id: Date.now(), text: newTask, isDone: false };
        setTasks([...tasks, newTaskObj]);
        setNewTask(""); // Clear input field
    }

    function updateTask(event) {
        setNewTask(event.target.value);
    }

    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleTask(id) {
        setTasks(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task));
    }

    return (
        <div className="todo-container">
            <h2 className="title">🚀 Task Manager</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={updateTask}
                    placeholder="Enter a Task..."
                    className="task-input"
                />
                <button className="add-button" onClick={addNewTask}>
                    + Add Task
                </button>
            </div>

            <div className="task-list-container">
                <h3 className="task-title">Your Tasks</h3>
                {tasks.length === 0 ? (
                    <p className="no-task">🎉 No tasks! Enjoy your day!</p>
                ) : (
                    <ul className="task-list">
                        {tasks.map((task) => (
                            <li key={task.id} className={`task-item ${task.isDone ? "done" : ""}`}>
                                {task.text}
                                <button onClick={() => toggleTask(task.id)} className="toggle-button">
                                    {task.isDone ? "Undo" : "Done"}
                                </button>
                                <button onClick={() => deleteTask(task.id)} className="delete-button">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Todo;
