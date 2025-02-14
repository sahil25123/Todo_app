import { useState } from "react";
import "./todo.css"; // Import modern styles

function Todo() {
    const [tasks, setTasks] = useState(["Complete the project"]);
    const [newTask, setNewTask] = useState("");

    function addNewTask() {
        if (newTask.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }
        setTasks([...tasks, newTask]);
        setNewTask(""); // Clear input field after adding
    }

    function updateTask(event) {
        setNewTask(event.target.value);
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
                        {tasks.map((task, index) => (
                            <li key={index} className="task-item">
                                {task}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Todo;
  