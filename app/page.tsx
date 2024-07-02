"use client";
import React,{useEffect} from 'react';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import { TaskProvider } from './TaskContext';
import { requestNotificationPermission } from './utils/Notification';

const Home: React.FC = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <TaskProvider>
      <div className='w-full h-full overflow-scroll flex bg-violet-500  justify-center items-center flex-col ' >
        <div className=' flex flex-col space-y-10 border my-6  rounded-2xl bg-zinc-700/20 shadow-lg border-zinc-300 px-12 py-8'>
          <div className='flex flex-col'>
        <h1 className='text-center text-4xl font-semibold'>Taskify</h1>
      <AddTaskForm />
      </div>
      <div>
      <TaskList />
      </div>  
        </div>
      </div>
    </TaskProvider>
  );
};

export default Home;




// import TaskScheduler from '@/components/TaskScheduler';
// import Notification from '../components/Notification';

// const Home = () => {
//   return (
//     <div>
//       <TaskScheduler/>
//       {/* <Notification /> */}
//     </div>
//   );
// };

// export default Home;





// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import { useState } from "react";


// export default function Home() {
//  const [task , setTask] = useState()
//  const addTask =()=> {
//  setTask(task)
//  console.log(task)
//  }
//   return (
//     <div className="w-full flex justify-center items-center h-screen bg-slate-700">
//       <div className=" px-20 py-4 border border-white-700 rounded-xl">
//       <div className="flex justify-center flex-col gap-6">
//       <h1 className="text-3xl text-center">Taskify</h1>
//         <div className="flex flex-row gap-5">
//         <Input type="text" placeholder="enter your task here..." className="py-3 px-2 rounded-md border-gray-400" value={task} />
//         <Input type="time" placeholder="enter a time here" value={task} />
//         <Button onClick={addTask} >Add Task</Button>
//         </div>
//       </div>                     
//       </div>
//  <div>
  
//  </div>
//     </div>
//   );
// }
