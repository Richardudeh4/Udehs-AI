
import { tasks } from '../../../data/tasks';

export default function handler(req:any, res:any) {
  if (req.method === 'GET') {
    res.status(200).json(tasks);
  } else if (req.method === 'POST') {
    const { title, date, recurring } = req.body;
    const newTask = {
      id: tasks.length + 1,
      title,
      date,
      recurring,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// import { NextApiRequest, NextApiResponse } from 'next';
// import nodeCron from 'node-cron';
// import webPush from 'web-push';

// const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
// const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

// webPush.setVapidDetails('mailto: <richardudeh03@gmail.com>', publicVapidKey, privateVapidKey);

// interface Task {
//   id: string;
//   type: 'one-time' | 'recurring';
//   time: string;
//   message: string;
//   subscription: PushSubscription;
// }

// let tasks: Task[] = [];

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { type, time, message, subscription } = req.body;
//     const id = Math.random().toString(36).substr(2, 9);

//     const task: Task = { id, type, time, message, subscription };

//     if (type === 'one-time') {
//       const date = new Date(time);
//       const delay = date.getTime() - Date.now();
//       setTimeout(() => sendNotification(subscription, message), delay);
//     } else if (type === 'recurring') {
//       nodeCron.schedule(time, () => sendNotification(subscription, message));
//     }

//     tasks.push(task);
//     res.status(200).json({ success: true, id });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// const sendNotification = (subscription: PushSubscription, message: string) => {
//   const payload = JSON.stringify({ title: 'Reminder', body: message });
//   webPush.sendNotification(subscription, payload).catch(err => console.error(err));
// };
