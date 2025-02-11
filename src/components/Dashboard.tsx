import React, { useState } from 'react';
import { BucketList, User } from '../types';
import { ListCard } from './ListCard';
import { ListDetail } from './ListDetail';
import { Plus, LogOut } from 'lucide-react';

interface DashboardProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onLogout: () => void;
}

export function Dashboard({ user, onUpdate, onLogout }: DashboardProps) {
  const [selectedList, setSelectedList] = useState<BucketList | null>(null);
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [newListName, setNewListName] = useState('');

  const createNewList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      const newList: BucketList = {
        id: crypto.randomUUID(),
        name: newListName.trim(),
        items: [],
      };
      onUpdate({
        ...user,
        lists: [...user.lists, newList],
      });
      setNewListName('');
      setShowNewListModal(false);
    }
  };

  const updateList = (updatedList: BucketList) => {
    const updatedUser = {
      ...user,
      lists: user.lists.map(list =>
        list.id === updatedList.id ? updatedList : list
      ),
    };
    onUpdate(updatedUser);
    setSelectedList(updatedList);
  };

  if (selectedList) {
    return (
      <ListDetail
        list={selectedList}
        onBack={() => setSelectedList(null)}
        onUpdate={updateList}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user.displayName}!
          </h1>
          <p className="text-gray-600">Manage your bucket lists</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowNewListModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            New List
          </button>
          <button
            onClick={onLogout}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.lists.map(list => (
          <ListCard
            key={list.id}
            list={list}
            onClick={() => setSelectedList(list)}
          />
        ))}
      </div>

      {showNewListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create New List</h2>
            <form onSubmit={createNewList}>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="List name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewListModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}