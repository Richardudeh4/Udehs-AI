"use client";
import React,{useState} from 'react';
import { useTasks } from '@/app/TaskContext';
import { Pencil, X } from 'lucide-react';
import { Task } from '@/app/interface';
import EditTaskForm from './EditTaskForm';

const TaskList: React.FC = () => {
  const { tasks, removeTask, editTask} = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className='bg-slate-200 px-6 rounded-[20px] overflow-scroll h-screen py-8' >
      <h2 className='text-center text-4xl'>Task List</h2>
      <ul className=' rounded-2xl  gap-3 flex flex-col py-2 px-1 overflow-scroll'>
        {tasks.map((task:any) => (
          <div key={task.id} className='flex justify-between space-x-3'>
            <li className='flex  bg-slate-300 rounded-sm py-3 space-x-4 justify-between px-5'>
            <div className='flex flex-col space-y-2'>
            <h1 className='font-bold text-gray-700'>Title</h1>
            <h3 className='text-bold'>{task.title}</h3>
            </div>
            <div className='flex flex-col space-y-2'>
            <h1 className='font-bold text-gray-700'>Description</h1>
            <p className='truncate'>{task.description}</p>
            </div>
            <div className='flex flex-col space-y-2'>
            <h1 className='font-bold text-gray-700'>Date</h1>
            <p>{task.date}</p>
            </div>
            <div className='flex flex-col space-y-2'>
            <h1 className='font-bold text-gray-700'>Recurrance</h1>
            {task.recurring ? <p>{task.frequency}</p> : 'No repeat'}
            {task.cronExpression && <p>Cron Expression: {task.cronExpression}</p>}
            </div>
            <button onClick={() => removeTask(task.id)}><X className='h-4 w-4'/></button>
            <button onClick={() => setEditingTask(task)}><Pencil className='h-4 w-4'/></button>
          </li>
          </div>
          
        ))}
      </ul>
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
};

export default TaskList;
