// 'use client';
// import { useState, useEffect } from 'react';
// import { Button} from './ui/button';
// import { Input } from './ui/input';
// export default function TaskScheduler () {
//   const [tasks, setTasks] = useState<any>([]);
//   const [title, setTitle] = useState('');
//   const [date, setDate] = useState('');
//   const [recurring, setRecurring] = useState(false);

// const addTask = () => {
// setTitle(title);
// setDate(date);
// setRecurring(recurring)
// }
//   return (
//     <div className='w-full h-screen bg-slate-500 flex justify-center items-center'>
//       <div className='border border-gray-700 rounded-xl px-8 py-10 flex-col space-y-10'>
//       <h1 className='text-center font-semibold leading-5 text-4xl'>Taskify</h1>
//       <div className='flex flex-col space-y-6'>
//         <Input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Task Title"
//         />
//         <Input
//           type="datetime-local"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//         <label>
//           <input
//             type="checkbox"
//             checked={recurring}
//             onChange={(e) => setRecurring(e.target.checked)}
//           />
//           Recurring
//         </label>
//         <Button onClick={addTask}>Add Task</Button>
//       </div>
//       <ul>
       
//         {tasks.map((task:any) => (
//           <li key={task.id}>
//             {task.title} - {task.date} - {task.recurring ? 'Recurring' : 'One-time'}
//           </li>
//         ))}
//       </ul>
//     </div>
//     </div>
//   );
// }

