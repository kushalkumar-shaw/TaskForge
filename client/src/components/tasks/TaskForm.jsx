import { useState } from 'react'
import api from '../../services/api'
import { toast } from 'react-hot-toast'
import { XMarkIcon } from '@heroicons/react/24/outline'

const TaskForm = ({ task, onClose, onSuccess }) => {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  )
  const [priority, setPriority] = useState(task?.priority || 'medium')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const taskData = { title, description, dueDate, priority }
      
      if (task) {
        // Update existing task
        await api.put(`/api/tasks/${task._id}`, taskData)
        toast.success('Task updated successfully!', {
          duration: 3000,
          position: 'top-center',
        })
      } else {
        // Create new task
        await api.post('/api/tasks', taskData)
        toast.success('Task created successfully!', {
          duration: 3000,
          position: 'top-center',
        })
      }
      
      onSuccess() // This should trigger a refetch in the parent component
    } catch (err) {
      console.error('Task operation failed:', err)
      toast.error(err.response?.data?.msg || 'Failed to save task. Please try again.', {
        duration: 4000,
        position: 'top-center',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{task ? 'Edit Task' : 'Add New Task'}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title*</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-600 hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading
              ? task
                ? 'Updating...'
                : 'Creating...'
              : task
              ? 'Update Task'
              : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm