import React from 'react';
import { BucketList } from '../types';
import { ListChecks } from 'lucide-react';

interface ListCardProps {
  list: BucketList;
  onClick: () => void;
}

export function ListCard({ list, onClick }: ListCardProps) {
  const completedCount = list.items.filter(item => item.completed).length;

  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{list.name}</h3>
        <ListChecks className="text-purple-600 w-6 h-6" />
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{list.items.length} items</span>
        <span>{completedCount} completed</span>
      </div>
    </div>
  );
}