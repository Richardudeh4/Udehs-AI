
export interface Task {
    id: string;
    title: string;
    description?: string;
    date: string; // ISO date string for one-time tasks
    recurring?: boolean; // Whether the task is recurring
    frequency?: 'daily' | 'weekly' | 'monthly'; // Frequency for recurring tasks
    cronExpression?: string; 
  }
  