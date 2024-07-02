"use client";
import React, { createContext, useState,useEffect, useContext, ReactNode } from 'react';
import { Task } from './interface';
import { requestNotificationPermission, sendNotification } from './utils/Notification';
import cronParser from 'cron-parser';


interface TaskContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  editTask: (updatedTask: Task) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const loadTasksFromLocalStorage = (): Task[] => {
  if (typeof window === 'undefined') return [];
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

const checkDueTasks = (tasks: Task[]) => {
  const now = new Date();
  tasks.forEach(task => {
    if (task.date && new Date(task.date) <= now) {
      sendNotification('Task Due', { body: `${task.title} is due now!` });
    }
    else if (task.cronExpression) {
      try {
        const interval = cronParser.parseExpression(task.cronExpression);

        const nextRun = interval.next().toDate();
        if (nextRun <= now) {
          sendNotification('Task Due', { body: `${task.title} is due now!` });
        }
      } catch (err) {
        console.error(`Invalid cron expression for task "${task.title}":`, err);
      }
}
});
};



export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage);

  useEffect(() => {
    requestNotificationPermission();
    saveTasksToLocalStorage(tasks);

    const interval = setInterval(() => {
      checkDueTasks(tasks);
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);
  
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const editTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };
  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask , editTask}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
