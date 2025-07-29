import React from 'react';
import { Filter, X } from 'lucide-react';
interface FilterBarProps {
  selectedPriorities: string[];
  selectedColors: string[];
  onPriorityChange: (priorities: string[]) => void;
  onColorChange: (colors: string[]) => void;
  onClearFilters: () => void;
}
const FilterBar: React.FC<FilterBarProps> = ({
  selectedPriorities,
  selectedColors,
  onPriorityChange,
  onColorChange,
  onClearFilters
}) => {
  const priorities = [{
    value: 'high',
    label: 'Alta',
    class: 'bg-red-100 text-red-800'
  }, {
    value: 'medium',
    label: 'Média',
    class: 'bg-yellow-100 text-yellow-800'
  }, {
    value: 'low',
    label: 'Baixa',
    class: 'bg-green-100 text-green-800'
  }];
  const colors = [{
    value: 'red',
    label: 'Vermelho',
    class: 'bg-red-500'
  }, {
    value: 'blue',
    label: 'Azul',
    class: 'bg-blue-500'
  }, {
    value: 'green',
    label: 'Verde',
    class: 'bg-green-500'
  }, {
    value: 'purple',
    label: 'Roxo',
    class: 'bg-purple-500'
  }, {
    value: 'orange',
    label: 'Laranja',
    class: 'bg-orange-500'
  }, {
    value: 'pink',
    label: 'Rosa',
    class: 'bg-pink-500'
  }, {
    value: 'teal',
    label: 'Azul-esverdeado',
    class: 'bg-teal-500'
  }];
  const handlePriorityToggle = (priority: string) => {
    if (selectedPriorities.includes(priority)) {
      onPriorityChange(selectedPriorities.filter(p => p !== priority));
    } else {
      onPriorityChange([...selectedPriorities, priority]);
    }
  };
  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      onColorChange(selectedColors.filter(c => c !== color));
    } else {
      onColorChange([...selectedColors, color]);
    }
  };
  const hasActiveFilters = selectedPriorities.length > 0 || selectedColors.length > 0;
  return <div className="rounded-lg p-4 mb-6 bg-[eeeee] bg-[#252525]">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-white" size={20} />
          <h3 className="text-white font-medium">Filtros</h3>
        </div>
        
        {hasActiveFilters && <button onClick={onClearFilters} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
            <X size={16} />
            Limpar filtros
          </button>}
      </div>

      <div className="space-y-4">
        {/* Priority Filters */}
        <div>
          <h4 className="text-white text-sm font-medium mb-2">Prioridade</h4>
          <div className="flex flex-wrap gap-2">
            {priorities.map(priority => <button key={priority.value} onClick={() => handlePriorityToggle(priority.value)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedPriorities.includes(priority.value) ? `${priority.class} ring-2 ring-white` : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
                {priority.label}
              </button>)}
          </div>
        </div>

        {/* Color Filters */}
        
      </div>
    </div>;
};
export default FilterBar;