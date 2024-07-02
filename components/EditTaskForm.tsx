"use client";
import React, { useState } from 'react';
import { Task } from '@/app/interface';
import { useTasks } from '@/app/TaskContext';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onClose }) => {
  const { editTask } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [date, setDate] = useState(task.date);
  const [recurring, setRecurring] = useState(task.recurring || false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>(task.frequency || 'daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: Task = {
      ...task,
      title,
      description,
      date,
      recurring,
      frequency: recurring ? frequency : undefined,
    };
    editTask(updatedTask);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='w-full flex flex-col space-y-8'>
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
        <label>Recurring:</label>
        <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
      </div>
      {recurring && (
        <div>
          <label>Frequency:</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      )}
      <Button type="submit">Save Changes</Button>
      <Button type="button" onClick={onClose}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditTaskForm;
