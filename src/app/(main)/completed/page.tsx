import TaskCard from "@/components/TaskCard/TaskCard"
import { TaskDocument } from "@/models/task";

const getCompletedTasks = async() => {
  const res = await fetch(`${process.env.API_URL}/tasks/completed`, {
    cache: "no-store",
  })

  if(res.status !== 200) {
    throw new Error('fail to get tasks data')
  }

  const data = await res.json();
  return data.completedTasks as TaskDocument[];
}

const CompletedTaskPage= async() => {
  const completedTasks = await getCompletedTasks();

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">Completed Tasks</h1>
      </header>
      <div className="mt-8 flex flex-wrap gap-4">
        {completedTasks.map((task) => (
           <TaskCard key={task._id} task={task}/>
        ))}
      </div>
    </div>
  )
}

export default CompletedTaskPage