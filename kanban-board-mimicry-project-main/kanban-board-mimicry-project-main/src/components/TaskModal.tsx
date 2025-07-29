
import React, { useState, useEffect } from 'react';
import { Task } from '../types/kanban';
import { X } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id'>) => void;
  task?: Task | null;
  title: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task, title }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: 'red',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        color: task.color,
        priority: task.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        color: 'red',
        priority: 'medium',
      });
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const colors = [
    { name: 'red', class: 'bg-red-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'teal', class: 'bg-teal-500' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Digite o título da tarefa"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none h-24 resize-none"
              placeholder="Interface for when recording a new audio note"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-medium mb-2">
              Cor
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.name })}
                  className={`w-8 h-8 rounded-full ${color.class} ${
                    formData.color === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Prioridade
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
