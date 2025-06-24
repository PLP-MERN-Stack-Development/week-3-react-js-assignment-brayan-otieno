import { useState } from 'react';
import { PlusIcon, TrashIcon, CheckIcon, PencilIcon } from '@heroicons/react/24/outline';
import Button from '../components/Button';

const Tasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Save tasks to localStorage whenever they change
  const saveTasks = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    saveTasks([...tasks, task]);
    setNewTask('');
  };

  // Toggle task completion
  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      saveTasks(updatedTasks);
      if (editingId === id) {
        setEditingId(null);
        setEditText('');
      }
    }
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  // Save edited task
  const saveEdit = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: editText.trim() } : task
    );
    saveTasks(updatedTasks);
    setEditingId(null);
    setEditText('');
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // Count tasks
  const activeTasksCount = tasks.filter(task => !task.completed).length;
  const completedTasksCount = tasks.length - activeTasksCount;

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Task Manager
            </h2>
            
            {/* Add Task Form */}
            <form onSubmit={addTask} className="mb-6">
              <div className="flex">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-l-none"
                >
                  <PlusIcon className="h-5 w-5 mr-1" />
                  Add Task
                </Button>
              </div>
            </form>

            {/* Task Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={filter === 'all' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({tasks.length})
              </Button>
              <Button
                variant={filter === 'active' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('active')}
              >
                Active ({activeTasksCount})
              </Button>
              <Button
                variant={filter === 'completed' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed ({completedTasksCount})
              </Button>
            </div>

            {/* Tasks List */}
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {filter === 'all'
                  ? 'No tasks yet. Add one above!'
                  : filter === 'active'
                  ? 'No active tasks.'
                  : 'No completed tasks yet.'}
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredTasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        
                        {editingId === task.id ? (
                          <div className="flex-1 flex ml-3">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="flex-1 ml-3 border-b border-blue-500 bg-transparent focus:outline-none focus:ring-0"
                              autoFocus
                            />
                            <Button
                              variant="primary"
                              size="sm"
                              className="ml-2"
                              onClick={() => saveEdit(task.id)}
                              disabled={!editText.trim()}
                            >
                              Save
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="ml-2"
                              onClick={() => {
                                setEditingId(null);
                                setEditText('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div className="flex-1 ml-3">
                            <span
                              className={`text-sm font-medium ${
                                task.completed
                                  ? 'line-through text-gray-400 dark:text-gray-500'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {task.text}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(task.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      {editingId !== task.id && (
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => startEditing(task)}
                            className="p-1"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                            className="p-1"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Clear Completed Button */}
            {completedTasksCount > 0 && filter !== 'active' && (
              <div className="mt-6 text-right">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all completed tasks?')) {
                      const updatedTasks = tasks.filter(task => !task.completed);
                      saveTasks(updatedTasks);
                    }
                  }}
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Clear Completed ({completedTasksCount})
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
