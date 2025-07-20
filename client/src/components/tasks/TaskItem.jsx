import { useState } from 'react'
import { format } from 'date-fns'
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  FlagIcon,
} from '@heroicons/react/24/outline'
import TaskForm from './TaskForm'

const priorityColors = {
  high: 'red',
  medium: 'yellow',
  low: 'green',
}

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleComplete = () => {
    onToggleComplete(task._id, !task.completed)
  }

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onClose={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    )
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={handleComplete}
            className={`mt-1 flex-shrink-0 h-5 w-5 rounded border ${
              task.completed
                ? 'bg-accent-600 border-accent-600'
                : 'border-gray-500 hover:border-accent-500'
            } transition-colors flex items-center justify-center`}
          >
            {task.completed && <CheckIcon className="h-4 w-4 text-white" />}
          </button>
          <div className="flex-1">
            <h3
              className={`font-medium ${
                task.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-400 mt-1">{task.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
              {task.dueDate && (
                <span className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                </span>
              )}
              <span
                className={`flex items-center gap-1 text-${priorityColors[task.priority]}-400`}
              >
                <FlagIcon className="h-4 w-4" />
                {task.priority}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-accent-500 transition-colors"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem