import { useEffect, useState } from 'react'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import TaskItem from './TaskItem'
import { LoadingSpinner } from '../ui/LoadingSpinner'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isAuthenticated } = useAuth()

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await api.get('/api/tasks')
      setTasks(data)
    } catch (err) {
      console.error('Failed to fetch tasks:', err)
      setError('Failed to load tasks')
      toast.error('Failed to fetch tasks. Please try again.', {
        duration: 3000,
        position: 'top-center',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks()
    }
  }, [isAuthenticated])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`)
      setTasks(tasks.filter((task) => task._id !== id))
      toast.success('Task deleted successfully!', {
        duration: 3000,
        position: 'top-center',
      })
    } catch (err) {
      console.error('Failed to delete task:', err)
      toast.error('Failed to delete task. Please try again.', {
        duration: 3000,
        position: 'top-center',
      })
    }
  }

  const handleToggleComplete = async (id, completed) => {
    try {
      const { data } = await api.put(`/api/tasks/${id}`, { completed })
      setTasks(tasks.map((task) => (task._id === id ? data : task)))
      toast.success(`Task marked as ${completed ? 'completed' : 'incomplete'}!`, {
        duration: 3000,
        position: 'top-center',
      })
    } catch (err) {
      console.error('Failed to update task:', err)
      toast.error('Failed to update task. Please try again.', {
        duration: 3000,
        position: 'top-center',
      })
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-400">
        {error}
        <button
          onClick={fetchTasks}
          className="ml-2 text-accent-400 hover:text-accent-300"
        >
          Retry
        </button>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No tasks found. Create your first task!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  )
}

export default TaskList