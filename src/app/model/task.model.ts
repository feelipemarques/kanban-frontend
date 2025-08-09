export interface Task {
    id: number;
    taskName: string;
    status: 'to_do' | 'doing' | 'done';
  }