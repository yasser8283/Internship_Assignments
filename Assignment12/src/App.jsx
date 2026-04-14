import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed

  // Add a new task
  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task!')
      return
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    }

    setTasks([...tasks, newTask])
    setInputValue('')
  }

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed)
      case 'completed':
        return tasks.filter(task => task.completed)
      default:
        return tasks
    }
  }

  const filteredTasks = getFilteredTasks()
  const completedCount = tasks.filter(task => task.completed).length
  const activeCount = tasks.filter(task => !task.completed).length

  // Handle Enter key to add task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  // Clear completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>📝 Task List</h1>
        <p>Stay organized and keep track of your tasks</p>
      </header>

      <main className="main-content">
        {/* Input Section */}
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="task-input"
            />
            <button onClick={addTask} className="add-btn">
              + Add Task
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active</span>
            <span className="stat-value stat-active">{activeCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed</span>
            <span className="stat-value stat-completed">{completedCount}</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Tasks List */}
        <div className="tasks-section">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'completed' ? '✨' : filter === 'active' ? '🎯' : '📭'}
              </div>
              <p>
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                  ? 'No active tasks. Great job!'
                  : 'No tasks yet. Add one to get started!'}
              </p>
            </div>
          ) : (
            <ul className="tasks-list">
              {filteredTasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <div className="task-info">
                      <span className="task-text">{task.text}</span>
                      <span className="task-date">{task.createdAt}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-btn"
                    title="Delete task"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <button onClick={clearCompleted} className="clear-completed-btn">
            Clear Completed Tasks
          </button>
        )}
      </main>

      <footer className="footer">
        <p>Manage your tasks efficiently and stay productive! 💪</p>
      </footer>
    </div>
  )
}

export default App
