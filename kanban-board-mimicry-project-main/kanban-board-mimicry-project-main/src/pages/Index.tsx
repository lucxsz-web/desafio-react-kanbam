import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task, Column } from '../types/kanban';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import FilterBar from '../components/FilterBar';
import { Search, Plus } from 'lucide-react';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentColumnId, setCurrentColumnId] = useState<string>('');
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'pendente',
      title: 'Pendente',
      tasks: [
        {
          id: '1',
          title: 'Tablet view',
          description: 'Create tablet view layout and responsive design',
          color: 'red',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Audio recording in note',
          description: 'Show audio in a note and preview it',
          color: 'red',
          priority: 'medium'
        },
        {
          id: '3',
          title: 'Bookmark in note',
          description: 'Bookmark link to a note, and feature to render website screenshot',
          color: 'red',
          priority: 'low'
        },
        {
          id: '4',
          title: 'Image viewer',
          description: 'Image viewer to see pictures that are stored in note',
          color: 'red',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'realizando',
      title: 'Realizando',
      tasks: [
        {
          id: '5',
          title: 'Mobile view',
          description: 'Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.',
          color: 'blue',
          priority: 'high'
        },
        {
          id: '6',
          title: 'Desktop view',
          description: 'PWA for website and native apps. Note: Windows and Mac will need unique share icons. Debug note view.',
          color: 'blue',
          priority: 'medium'
        },
        {
          id: '7',
          title: 'Formatting options',
          description: 'Include formatting via organized and changes from typing the format text.',
          color: 'blue',
          priority: 'low'
        },
        {
          id: '8',
          title: 'Mode in note',
          description: '',
          color: 'blue',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'concluida',
      title: 'Concluída',
      tasks: [
        {
          id: '9',
          title: 'Audio recording',
          description: 'Interface for when recording a new audio note',
          color: 'green',
          priority: 'medium'
        },
        {
          id: '10',
          title: 'Bookmarking',
          description: 'Interface for when creating a new link bookmark',
          color: 'green',
          priority: 'low'
        },
        {
          id: '11',
          title: 'Mobile home screen',
          description: 'Desktop view, and home list are sorted by recent',
          color: 'green',
          priority: 'high'
        }
      ]
    }
  ]);

  const getColumnColor = (columnId: string): string => {
    const colorMap: { [key: string]: string } = {
      'pendente': 'red',
      'realizando': 'blue',
      'concluida': 'green'
    };
    return colorMap[columnId] || 'red';
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newColumns = [...columns];
    const sourceColumn = newColumns.find(col => col.id === source.droppableId);
    const destColumn = newColumns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    const draggedTask = sourceColumn.tasks.find(task => task.id === draggableId);
    if (!draggedTask) return;

    // Update task color based on destination column
    const updatedTask = {
      ...draggedTask,
      color: getColumnColor(destination.droppableId)
    };

    // Remove task from source column
    sourceColumn.tasks.splice(source.index, 1);

    // Add updated task to destination column
    destColumn.tasks.splice(destination.index, 0, updatedTask);

    setColumns(newColumns);
  };

  const handleAddTask = (columnId: string) => {
    setCurrentColumnId(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setCurrentColumnId('');
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    const newColumns = columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId)
    }));
    setColumns(newColumns);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      // Edit existing task
      const newColumns = columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        )
      }));
      setColumns(newColumns);
    } else {
      // Add new task
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData
      };
      const newColumns = columns.map(column =>
        column.id === currentColumnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      );
      setColumns(newColumns);
    }
  };

  const handleClearFilters = () => {
    setSelectedPriorities([]);
    setSelectedColors([]);
  };

  // Apply filters and search
  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task => {
      // Search filter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Priority filter
      const matchesPriority = selectedPriorities.length === 0 || 
        selectedPriorities.includes(task.priority);
      
      // Color filter
      const matchesColor = selectedColors.length === 0 || 
        selectedColors.includes(task.color);
      
      return matchesSearch && matchesPriority && matchesColor;
    })
  }));

  return (
    <div className="min-h-screen p-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-3xl font-bold">Kanban</h1>
          
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 text-white border border-gray-600 focus:border-blue-500 focus:outline-none w-64 rounded bg-gray-800"
              />
            </div>
            
            <button
              onClick={() => {
                setCurrentColumnId('pendente');
                setEditingTask(null);
                setIsModalOpen(true);
              }}
              className="text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors bg-gray-700 hover:bg-gray-600"
            >
              <Plus size={16} />
              Nova atividade
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          selectedPriorities={selectedPriorities}
          selectedColors={selectedColors}
          onPriorityChange={setSelectedPriorities}
          onColorChange={setSelectedColors}
          onClearFilters={handleClearFilters}
        />

        {/* Kanban Board */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6">
            {filteredColumns.map(column => (
              <KanbanColumn
                key={column.id}
                column={column}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>

        {/* Task Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          task={editingTask}
          title={editingTask ? 'Editar atividade' : 'Nova atividade'}
        />
      </div>
    </div>
  );
};

export default Index;
