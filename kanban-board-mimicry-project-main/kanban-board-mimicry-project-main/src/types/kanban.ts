
export interface Task {
  id: string;
  title: string;
  description: string;
  color: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface KanbanBoard {
  columns: Column[];
}
