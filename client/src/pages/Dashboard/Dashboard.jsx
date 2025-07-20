import { useState } from 'react'
import TaskList from '../../components/tasks/TaskList'
import TaskForm from '../../components/tasks/TaskForm'
import { PlusIcon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0) // Add refresh key state

  const handleTaskCreated = () => {
    setShowForm(false)
    setRefreshKey(prev => prev + 1) // Trigger refresh of TaskList
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1 bg-accent-600 hover:bg-accent-700 py-2 px-4 rounded-md transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Add Task
        </button>
      </div>

      {showForm && (
        <div className="animate-fade-in">
          <TaskForm onClose={() => setShowForm(false)} onSuccess={handleTaskCreated} />
        </div>
      )}

      {/* Pass refreshKey to TaskList */}
      <TaskList key={refreshKey} />
    </div>
  )
}

export default Dashboard