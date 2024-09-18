
import { NewTaskForm } from '@/app/home/projects/_components/new-task-form'
import { BackButton } from '@/components/back-button'


export default function AddTaskPage({ params }: { params: { sprintId: string } }) {

  return (
    <div className='flex flex-col h-screen'>
      <div className="sticky top-0 z-40 bg-background w-full h-14 border-b">
        <div className="flex items-center gap-4 h-full px-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Add Task</h1>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <NewTaskForm sprintId={params.sprintId} />
      </div>
    </div>
  )
}