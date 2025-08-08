export interface Task {
    id: number;
    taskName: string;
    status: 'to_do' | 'doing' | 'done';
    // Adicione outros campos que existem no seu DTO
  }