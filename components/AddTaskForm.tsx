
"use client";
import React, { useState } from 'react';
import { Task } from '@/app/interface';
import { useTasks } from '@/app/TaskContext';
import { Input } from './ui/input';
import { v4 as uuidv4 } from 'uuid';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const AddTaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [cronExpression, setCronExpression] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      date,
      recurring,
      frequency: recurring ? frequency : undefined,
      cronExpression: cronExpression || undefined,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
    setDate('');
    setRecurring(false);
    setFrequency('daily');
    setCronExpression('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex space-y-2 flex-col w-[720px] h-full overflow-y-scroll' >
        <div>
        <Label>Title:</Label>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
      <div>
        <Label>Description:</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <Label>Date:</Label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <Label>Recurring:</Label>
        <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
      </div>
      {recurring && (
        <div>
          <Label>Frequency:</Label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      )}
        <div>
        <Label>Cron Expression:</Label>
        <Input type="text" value={cronExpression} onChange={(e) => setCronExpression(e.target.value)} />
      </div>
      <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
};

export default AddTaskForm;
