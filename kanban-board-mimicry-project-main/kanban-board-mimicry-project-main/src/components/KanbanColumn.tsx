
import React from 'react';
import { Column, Task } from '../types/kanban';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  column: Column;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask
}) => {
  const getColumnHeaderColor = (columnId: string) => {
    const colorMap: {
      [key: string]: string;
    } = {
      'pendente': 'border-t-red-500',
      'realizando': 'border-t-blue-500',
      'concluida': 'border-t-green-500'
    };
    return colorMap[columnId] || 'border-t-gray-500';
  };

  return (
    <div className="rounded-lg p-4 min-h-[600px] w-80 bg-neutral-800">
      <div className="-mt-4 -mx-4 mb-4 pt-4 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-semibold text-lg">{column.title}</h2>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[500px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-700 bg-opacity-50 rounded-lg' : ''
            }`}
          >
            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;
