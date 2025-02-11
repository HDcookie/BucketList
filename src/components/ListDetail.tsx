import React, { useState } from 'react';
import { BucketList, BucketItem } from '../types';
import { Check, Plus, ArrowLeft, Trash2 } from 'lucide-react';

interface ListDetailProps {
  list: BucketList;
  onBack: () => void;
  onUpdate: (updatedList: BucketList) => void;
}

export function ListDetail({ list, onBack, onUpdate }: ListDetailProps) {
  const [newItem, setNewItem] = useState('');

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.trim()) {
      const updatedList = {
        ...list,
        items: [
          ...list.items,
          {
            id: crypto.randomUUID(),
            title: newItem.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ],
      };
      onUpdate(updatedList);
      setNewItem('');
    }
  };

  const toggleItem = (item: BucketItem) => {
    const updatedList = {
      ...list,
      items: list.items.map(i =>
        i.id === item.id ? { ...i, completed: !i.completed } : i
      ),
    };
    onUpdate(updatedList);
  };

  const deleteItem = (itemId: string) => {
    const updatedList = {
      ...list,
      items: list.items.filter(i => i.id !== itemId),
    };
    onUpdate(updatedList);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Lists
      </button>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{list.name}</h2>

      <form onSubmit={addItem} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-1" />
            Add
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {list.items.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleItem(item)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${item.completed
                    ? 'bg-purple-600 border-purple-600'
                    : 'border-gray-300'
                  }`}
              >
                {item.completed && <Check className="w-4 h-4 text-white" />}
              </button>
              <span className={item.completed ? 'line-through text-gray-500' : ''}>
                {item.title}
              </span>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}