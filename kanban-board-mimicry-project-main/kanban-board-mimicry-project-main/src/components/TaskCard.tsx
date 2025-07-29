
import React from 'react';
import { Task } from '../types/kanban';
import { Draggable } from '@hello-pangea/dnd';
import { Edit2, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  index,
  onEdit,
  onDelete
}) => {
  const getColorClasses = (color: string) => {
    const colorMap: {
      [key: string]: string;
    } = {
      red: 'bg-red-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      pink: 'bg-pink-500',
      teal: 'bg-teal-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getPriorityBadge = (priority: string) => {
    const priorityMap: {
      [key: string]: {
        text: string;
        class: string;
      };
    } = {
      low: {
        text: 'Low',
        class: 'bg-green-100 text-green-800'
      },
      medium: {
        text: 'Medium',
        class: 'bg-yellow-100 text-yellow-800'
      },
      high: {
        text: 'High',
        class: 'bg-red-100 text-red-800'
      }
    };
    return priorityMap[priority] || priorityMap.low;
  };

  const priorityBadge = getPriorityBadge(task.priority);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${getColorClasses(task.color)} p-4 rounded-lg text-white shadow-md mb-3 cursor-grab active:cursor-grabbing transition-all duration-200 ${
            snapshot.isDragging ? 'rotate-2 shadow-xl' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm leading-tight">{task.title}</h3>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="opacity-70 hover:opacity-100 transition-opacity p-1"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="opacity-70 hover:opacity-100 transition-opacity p-1 hover:bg-red-600 rounded"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className="text-xs opacity-90 mb-2 line-clamp-2">{task.description}</p>
          )}
          
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded-full ${priorityBadge.class}`}>
              {priorityBadge.text}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
